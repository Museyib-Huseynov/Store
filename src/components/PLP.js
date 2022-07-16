import React from 'react'
import styled from 'styled-components'
import { GlobalContext } from '../context/global_context'
import circleIcon from '../circle-icon.svg'

class PLP extends React.Component {
  static contextType = GlobalContext

  render() {
    const { category, data, currency } = this.context
    const products = data.find(
      (item) => item.name.toUpperCase() === category
    )?.products
    return (
      <Wrapper>
        <p className='category'>{category}</p>
        <div className='products-container'>
          {products?.map((item) => {
            return (
              <div key={item.id} className='single-product-container'>
                <img
                  src={item.gallery[0]}
                  alt={item.name}
                  className='product-img'
                />
                {!item.inStock && <p className='outOfStock'>OUT OF STOCK</p>}
                {item.inStock && item.attributes.length === 0 && (
                  <img
                    src={circleIcon}
                    alt='Circle Icon'
                    className='circleIcon'
                  />
                )}
                <div className='content'>
                  <p className='title'>{item.name}</p>
                  <p className='price'>{`${currency}${
                    item.prices.find((i) => i.currency.symbol === currency)
                      .amount
                  }`}</p>
                </div>
              </div>
            )
          })}
        </div>
      </Wrapper>
    )
  }
}

export default PLP

const Wrapper = styled.main`
  .category {
    position: absolute;
    left: 101px;
    top: 160px;
    font-family: 'Raleway';
    font-weight: 400;
    font-size: 42px;
  }

  .products-container {
    position: absolute;
    left: 100px;
    top: 331px;
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    grid-column-gap: 40px;
    grid-row-gap: 103px;
    padding-bottom: 5rem;
  }

  .single-product-container {
    width: 386px;
    height: 444px;
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 16px 0;
    position: relative;
    /* border: 1px solid blue; */
  }

  .single-product-container:hover {
    box-shadow: 0px 4px 35px rgba(168, 172, 176, 0.19);
    .circleIcon {
      display: initial;
    }
  }

  .product-img {
    width: 354px;
    height: 330px;
    object-fit: cover;
    /* border: 1px solid red; */
  }

  .outOfStock {
    position: absolute;
    left: 90px;
    top: 151px;
    font-family: 'Raleway';
    font-weight: 400;
    font-size: 24px;
    line-height: 160%;
    color: #8d8f9a;
  }

  .circleIcon {
    display: none;
    position: absolute;
    right: 31px;
    bottom: 72px;
    filter: drop-shadow(0px 4px 11px rgba(29, 31, 34, 0.1));
    cursor: pointer;
  }

  .content {
    width: 354px;
    height: 58px;
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    position: absolute;
    top: 370px;
  }

  .title {
    width: 354px;
    height: 29px;
    font-family: 'Raleway';
    font-weight: 300;
    font-size: 18px;
    display: flex;
    align-items: center;
  }

  .price {
    width: 100px;
    height: 29px;
    display: flex;
    align-items: center;
    font-family: 'Raleway';
    font-weight: 500;
  }
`
