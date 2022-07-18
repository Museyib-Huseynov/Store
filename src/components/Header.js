import React from 'react'
import styled from 'styled-components'
import { useQuery, gql } from '@apollo/client'
import logo from '../logo.svg'
import arrowDown from '../arrow-down.svg'
import arrowUp from '../arrow-up.svg'
import cart from '../cart.svg'
import { GlobalContext } from '../context/global_context'
import { Outlet } from 'react-router-dom'
import { useNavigate } from 'react-router-dom'

const GET_CATEGORIES = gql`
  query GetData {
    categories {
      name
      products {
        id
        name
        inStock
        gallery
        description
        category
        attributes {
          id
          name
          type
          items {
            id
            displayValue
            value
          }
        }
        prices {
          currency {
            label
            symbol
          }
          amount
        }
        brand
      }
    }
    currencies {
      label
      symbol
    }
  }
`

function withApollo(Component) {
  return function WrappedComponent(props) {
    const { loading, error, data } = useQuery(GET_CATEGORIES)
    const navigate = useNavigate()
    return (
      <Component
        {...props}
        apolloServer={{ loading, error, data }}
        navigate={navigate}
      />
    )
  }
}

class Header extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      currencyArrowOpen: false,
    }
    this.ref = React.createRef()
    this.handleClickOutside = this.handleClickOutside.bind(this)
  }

  static contextType = GlobalContext

  componentDidMount() {
    document.addEventListener('mousedown', this.handleClickOutside)
  }

  componentDidUpdate(prevProps) {
    if (this.props.apolloServer.data !== prevProps.apolloServer.data) {
      const { setData } = this.context
      setData(this.props.apolloServer.data?.categories)
    }
  }

  componentWillUnmount() {
    document.removeEventListener('mousedown', this.handleClickOutside)
  }

  handleClickOutside(event) {
    if (this.ref && !this.ref.current.contains(event.target)) {
      this.setState({ currencyArrowOpen: false })
    }
  }

  render() {
    const { loading, error, data } = this.props.apolloServer
    const { category, setCategory, currency, setCurrency } = this.context
    if (loading) return null
    if (error) return null

    return (
      <Wrapper>
        <ul className='ul'>
          {data.categories.map((item) => {
            return (
              <li
                key={item.name}
                className={
                  category === item.name.toUpperCase() ? 'li activeMenu' : 'li'
                }
                onClick={() => {
                  setCategory(item.name.toUpperCase())
                  this.props.navigate('/')
                }}
              >
                {item.name}
              </li>
            )
          })}
        </ul>
        <img
          src={logo}
          alt='logo'
          className='logo'
          onClick={() => this.props.navigate('/cart')}
        />
        <div className='actions' ref={this.ref}>
          <p
            className='currency'
            onClick={() =>
              this.setState({
                currencyArrowOpen: !this.state.currencyArrowOpen,
              })
            }
          >
            {currency}
          </p>
          <img
            src={this.state.currencyArrowOpen ? arrowUp : arrowDown}
            alt='arrowDown'
            className='arrow'
            onClick={() =>
              this.setState({
                currencyArrowOpen: !this.state.currencyArrowOpen,
              })
            }
          />
          <div
            className={
              this.state.currencyArrowOpen
                ? 'chooseCurrencyContainer display'
                : 'chooseCurrencyContainer'
            }
          >
            {data.currencies.map((item) => {
              return (
                <p
                  key={item.symbol}
                  className={
                    currency === item.symbol
                      ? 'currencyOption activeCurrency'
                      : 'currencyOption'
                  }
                  onClick={(e) => {
                    setCurrency(item.symbol)
                    this.setState({ currencyArrowOpen: false })
                  }}
                >{`${item.symbol} ${item.label}`}</p>
              )
            })}
          </div>
          <img src={cart} alt='cart' className='cart' />
        </div>
        <Outlet />
      </Wrapper>
    )
  }
}

export default withApollo(Header)

const Wrapper = styled.header`
  width: 1440px;
  height: 80px;
  position: absolute;
  top: 0;
  left: 0;
  /* background: red; */

  .ul {
    list-style-type: none;
    width: 234px;
    height: 56px;
    display: flex;
    flex-direction: row;
    justify-content: center;
    position: absolute;
    left: 101px;
    bottom: 0px;
    /* background: blue; */
  }

  .li {
    padding: 0 16px;
    font-family: 'Raleway';
    font-weight: 600;
    font-size: 16px;
    text-transform: uppercase;
    margin-top: 5px;
    cursor: pointer;
  }

  .activeMenu {
    color: #5ece7b;
    border-bottom: 2px solid #5ece7b;
  }

  .logo {
    position: absolute;
    left: 699px;
    top: calc(50% - 41px / 2 + 4.5px);
    cursor: pointer;
  }

  .actions {
    display: flex;
    flex-direction: row;
    align-items: center;
    padding: 0px;
    gap: 22px;

    position: absolute;
    width: 80px;
    height: 40px;
    right: 101px;
    top: 23px;
    /* background: red; */
  }

  .currency {
    font-family: 'Raleway';
    font-weight: 500;
    font-size: 18px;
    line-height: 28.8px;
    padding: 0 10px;
  }

  .arrow {
    width: 6px;
    height: 3px;
    position: absolute;
    left: 32px;
    bottom: 38.75%;
  }

  .chooseCurrencyContainer {
    display: none;
    width: 114px;
    /* height: 169px; */
    background: #fff;
    filter: drop-shadow(0px 4px 35px rgba(168, 172, 176, 0.19));
    position: absolute;
    top: 42px;
    right: -23px;
    padding: 17px 0;
  }

  .display {
    display: initial;
  }

  .currencyOption {
    font-family: 'Raleway';
    font-weight: 500;
    width: 114px;
    height: 45px;
    font-size: 18px;
    line-height: 45px;
    text-align: center;
    cursor: pointer;
  }

  .activeCurrency {
    background: #eee;
  }
`
