import React from 'react'
import styled from 'styled-components'
import { GlobalContext } from '../context/global_context'

class SmallCart extends React.Component {
  static contextType = GlobalContext

  render() {
    const { data, currency, cartProducts, setCartProducts } = this.context
    const totalPrice = cartProducts
      .reduce((acc, item) => {
        const product = data[0].products.find((i) => i.id === item.productID)
        const price = product.prices.find(
          (j) => j.currency.symbol === currency
        ).amount
        return acc + item.amount * price
      }, 0)
      .toFixed(2)

    const totalAmount = cartProducts.reduce((acc, item) => {
      return acc + item.amount
    }, 0)

    return (
      <Wrapper>
        <div className='heading'>
          My Bag,{' '}
          <span>
            {totalAmount} item{totalAmount > 1 ? 's' : ''}
          </span>
        </div>
      </Wrapper>
    )
  }
}

export default SmallCart

const Wrapper = styled.div`
  width: 325px;
  height: 677px;
  padding: 32px 16px;
  background: lightblue;
  position: absolute;
  top: 40px;
  right: -30px;
  z-index: 1000;

  .heading {
    width: 100%;
    height: 90px;
    font-family: 'Raleway';
    font-weight: 700;
    font-size: 16px;
    line-height: 160%;
    span {
      font-weight: 100;
    }
  }
`
