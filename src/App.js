import React from 'react'
import styled from 'styled-components'
import Header from './components/Header'
import PLP from './components/PLP'
import PDP from './components/PDP'
import Cart from './components/Cart'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { GlobalContext } from './context/global_context'

class App extends React.Component {
  static contextType = GlobalContext

  render() {
    const { data, currency } = this.context
    return (
      <Wrapper>
        <BrowserRouter>
          <Routes>
            <Route path='/' element={<Header />}>
              <Route path='' element={<PLP />} />
              <Route
                path=':productID'
                element={<PDP data={data} currency={currency} />}
              />
              <Route path='cart' element={<Cart />} />
            </Route>
          </Routes>
        </BrowserRouter>
      </Wrapper>
    )
  }
}

export default App

const Wrapper = styled.div`
  position: relative;
`
