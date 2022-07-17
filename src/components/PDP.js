import React from 'react'
import styled from 'styled-components'
import { GlobalContext } from '../context/global_context'

class PDP extends React.Component {
  constructor(props) {
    super(props)
  }
  static contextType = GlobalContext

  render() {
    const { data, currency } = this.context
    const productID = window.location.href.split('/')[3]
    const product = data[0]?.products.find((item) => item.id === productID)
    if (!product) {
      return (
        <Wrapper>
          <h2>{`There is no product with id of ${productID}`}</h2>
        </Wrapper>
      )
    }
    const price = product.prices.find(
      (item) => item.currency.symbol === currency
    ).amount
    return (
      <Wrapper>
        <div className='img-gallery'>
          {product.gallery.slice(0, 4).map((item, index) => {
            return (
              <img key={index} src={item} alt={product.name} className='img' />
            )
          })}
        </div>
        <img
          src={product.gallery[0]}
          alt={product.name}
          className='mainImage'
        />
        <div className='info-section'>
          <p className='brand'>{product.brand}</p>
          <p className='name'>{product.name}</p>
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
                            <p key={j.id} className='attribute-value-text'>
                              {j.displayValue}
                            </p>
                          )
                        } else {
                          return (
                            <p
                              key={j.id}
                              className='attribute-value-swatch'
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
          <p className='attribute-name'>Price:</p>
          <p className='price'>
            {currency}
            {price}
          </p>
          <button className='addtocard'>ADD TO CART</button>
          <div
            className='description'
            dangerouslySetInnerHTML={{ __html: product.description }}
          />
        </div>
      </Wrapper>
    )
  }
}

export default PDP

const Wrapper = styled.main`
  position: absolute;
  top: 160px;
  left: 100px;

  .img-gallery {
    display: flex;
    flex-direction: column;
    position: absolute;
    row-gap: 40px;
  }

  .img {
    width: 79px;
    height: 80px;
    object-fit: cover;
    cursor: pointer;
    border: 1px solid #c4c4c4;
  }

  .mainImage {
    width: 610px;
    height: 511px;
    object-fit: contain;
    position: absolute;
    left: 119px;
    /* background: #c4c4c4; */
    border: 1px solid #c4c4c4;
  }

  .info-section {
    position: absolute;
    left: 829px;
    width: 292px;
    display: grid;
    grid-auto-flow: row;
    grid-row-gap: 16px;
  }

  .brand {
    font-family: 'Raleway';
    font-weight: 600;
    font-size: 30px;
    line-height: 27px;
  }

  .name {
    font-family: 'Raleway';
    font-weight: 400;
    font-size: 30px;
    line-height: 27px;
  }

  .attributes {
    display: grid;
    grid-auto-flow: row;
    /* grid-auto-rows: 100px; */
    grid-row-gap: 24px;
    margin-top: 27px;
    margin-bottom: 22px;
  }

  .attribute-container {
    display: grid;
    grid-auto-flow: row;
    grid-row-gap: 8px;
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
    cursor: pointer;
  }

  .attribute-value-swatch {
    width: 32px;
    height: 32px;
    cursor: pointer;
  }

  .price {
    width: 86px;
    height: 46px;
    font-family: 'Raleway';
    font-weight: 700;
    font-size: 24px;
    line-height: 18px;
    color: #1d1f22;
    margin-top: -6px;
    display: flex;
    align-items: center;
  }

  .addtocard {
    width: 292px;
    height: 52px;
    border: none;
    background: #5ece7b;
    color: #fff;
    font-family: 'Raleway';
    font-weight: 600;
    font-size: 16px;
    line-height: 120%;
    cursor: pointer;
    margin-top: 4px;
  }

  .description {
    font-family: 'Roboto';
    font-weight: 400;
    font-size: 16px;
    line-height: 159.96%;
    color: #1d1f22;
    h1 {
      margin: 1rem 0;
      font-size: 1.2rem;
    }
    h3 {
      margin: 1rem 0;
    }
  }
`
