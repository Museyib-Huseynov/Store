import React from 'react'
import styled from 'styled-components'
import Header from './components/Header'
import PLP from './components/PLP'
import PDP from './components/PDP'
import { BrowserRouter, Routes, Route } from 'react-router-dom'

class App extends React.Component {
  render() {
    return (
      <Wrapper>
        <BrowserRouter>
          <Routes>
            <Route path='/' element={<Header />}>
              <Route path='' element={<PLP />} />
              <Route path=':productID' element={<PDP />} />
            </Route>
          </Routes>
        </BrowserRouter>
      </Wrapper>
    )
  }
}

const Wrapper = styled.div`
  position: relative;
`

export default App
