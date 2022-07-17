import React from 'react'

export const GlobalContext = React.createContext()

export class GlobalProvider extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      category: 'ALL',
      data: [],
      currency: '$',
      cartProducts: [],
    }
  }

  setCategory = (category) => {
    this.setState({ category })
  }

  setData = (data) => {
    this.setState({ data })
  }

  setCurrency = (currency) => {
    this.setState({ currency })
  }

  setCartProducts = (cartProducts) => {
    this.setState({ cartProducts })
  }

  render() {
    return (
      <GlobalContext.Provider
        value={{
          ...this.state,
          setCurrency: this.setCurrency,
          setCategory: this.setCategory,
          setData: this.setData,
          setCartProducts: this.setCartProducts,
        }}
      >
        {this.props.children}
      </GlobalContext.Provider>
    )
  }
}
