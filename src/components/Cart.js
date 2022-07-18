import React from 'react'
import styled from 'styled-components'
import { GlobalContext } from '../context/global_context'

class Cart extends React.Component {
  static contextType = GlobalContext

  render() {
    const { data, currency, cartProducts, setCartProducts } = this.context
    return (
      <Wrapper>
        <h2 className='cart-heading'>Cart</h2>
        <div className='container'>
          <hr className='horizontal-line' />
          {cartProducts.map((item) => {
            const product = data[0].products.find(
              (i) => i.id === item.productID
            )
            const price = product.prices.find(
              (j) => j.currency.symbol === currency
            ).amount
            return (
              <div key={product.id} className='single-product-container'>
                <p className='brand'>{product.brand}</p>
                <p className='name'>{product.name}</p>
                <p className='price'>
                  {currency}
                  {price}
                </p>
                <div className='attributes'>
                  {product.attributes.length > 0 &&
                    product.attributes.map((i) => {
                      return (
                        <div key={i.id} className='attribute-container'>
                          <p className='attribute-name'>{i.name}:</p>
                          <div
                            className={
                              i.type === 'text'
                                ? 'attribute-values-container-text'
                                : 'attribute-values-container-text attribute-values-container-swatch'
                            }
                          >
                            {i.items.map((j) => {
                              if (i.type === 'text') {
                                return (
                                  <p
                                    key={j.id}
                                    className={
                                      j.value === item[i.name]
                                        ? 'attribute-value-text attribute-value-text-active'
                                        : 'attribute-value-text'
                                    }
                                  >
                                    {j.displayValue}
                                  </p>
                                )
                              } else {
                                return (
                                  <p
                                    key={j.id}
                                    className={
                                      j.value === item[i.name]
                                        ? 'attribute-value-swatch attribute-value-swatch-active'
                                        : 'attribute-value-swatch'
                                    }
                                    style={{ background: `${j.value}` }}
                                  ></p>
                                )
                              }
                            })}
                          </div>
                        </div>
                      )
                    })}
                </div>
                <hr className='horizontal-line' />
                <div className='product-imgs-container'>asasasasas</div>
              </div>
            )
          })}
        </div>
      </Wrapper>
    )
  }
}

export default Cart

const Wrapper = styled.main`
  position: absolute;
  top: 160px;
  left: 100px;
  z-index: -5;

  .cart-heading {
    font-family: 'Raleway';
    font-weight: 700;
    font-size: 32px;
    line-height: 40px;
    text-transform: uppercase;
    color: #1d1f22;
  }

  .container {
    position: absolute;
    top: 95px;
    padding-bottom: 10rem;
  }

  .horizontal-line {
    width: 1240px;
    height: 1px;
    border: none;
    background: #e5e5e5;
    grid-area: 5 / 1 / 6 / 3;
  }

  .single-product-container {
    width: 1240px;
    display: grid;
    grid-auto-flow: row;
    grid-row-gap: 16px;
    margin-top: 24px;
    grid-template-columns: 1fr 1fr;
  }

  .brand {
    font-family: 'Raleway';
    font-weight: 600;
    font-size: 30px;
    line-height: 27px;
    grid-area: 1 / 1 / 2 / 2;
  }

  .name {
    font-family: 'Raleway';
    font-weight: 400;
    font-size: 30px;
    line-height: 27px;
    grid-area: 2 / 1 / 3 / 2;
  }

  .price {
    font-family: 'Raleway';
    font-weight: 700;
    font-size: 24px;
    line-height: 24px;
    color: #1d1f22;
    margin-top: 4px;
    grid-area: 3 / 1 / 4 / 2;
  }

  .attributes {
    display: grid;
    grid-auto-flow: row;
    grid-row-gap: 16px;
    margin-top: 4px;
    margin-bottom: 22px;
    grid-area: 4 / 1 / 5 / 2;
  }

  .attribute-container {
    display: grid;
    grid-auto-flow: row;
    grid-row-gap: 7px;
  }

  .attribute-name {
    font-family: 'Roboto Condensed';
    font-weight: 700;
    font-size: 18px;
    line-height: 18px;
    color: #1d1f22;
    text-transform: uppercase;
  }

  .attribute-values-container-text {
    display: grid;
    grid-auto-flow: column;
    grid-auto-columns: 63px;
    grid-column-gap: 12px;
  }

  .attribute-values-container-swatch {
    grid-auto-columns: 32px;
  }

  .attribute-value-text {
    width: 63px;
    height: 45px;
    border: 1px solid #1d1f22;
    display: grid;
    place-items: center;
  }

  .attribute-value-text-active {
    background: #000;
    color: #fff;
  }

  .attribute-value-swatch {
    width: 32px;
    height: 32px;
  }

  .attribute-value-swatch-active {
    outline: 1px solid #5ece7b;
    outline-offset: 2px;
  }

  .product-imgs-container {
    grid-area: 1 / 2 / 6 / 3;
  }
`
