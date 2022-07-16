import React from 'react'
import styled from 'styled-components'
import Header from './components/Header'
import PLP from './components/PLP'

class App extends React.Component {
  render() {
    return (
      <Wrapper>
        <Header />
        <PLP />
      </Wrapper>
    )
  }
}

const Wrapper = styled.div`
  position: relative;
`

export default App
