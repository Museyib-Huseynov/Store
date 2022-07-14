import React from 'react'
import styled from 'styled-components'
import { useQuery, gql } from '@apollo/client'

const GET_CATEGORIES = gql`
  query GetCategories {
    categories {
      name
    }
  }
`

function withApolloHook(Component) {
  return function WrappedComponent(props) {
    const { loading, error, data } = useQuery(GET_CATEGORIES)
    return <Component {...props} apollo={{ loading, error, data }} />
  }
}

class Header extends React.Component {
  constructor(props) {
    super(props)
  }

  render() {
    console.log(this.props)
    if (this.props.apollo.loading) return null
    if (this.props.apollo.error) return null
    return (
      <Wrapper>
        <ul>
          {this.props.apollo.data.categories.map((item) => {
            return <li key={item.name}>{item.name}</li>
          })}
        </ul>
      </Wrapper>
    )
  }
}

const Wrapper = styled.header`
  width: 100%;
  height: 80px;
  position: absolute;
  top: 0;
  left: 0;
  background: red;
`

export default withApolloHook(Header)
