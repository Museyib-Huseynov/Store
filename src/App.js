import React from 'react'
import styled from 'styled-components'
import Header from './components/Header'

class App extends React.Component {
  render() {
    return (
      <Wrapper>
        <Header />
      </Wrapper>
    )
  }
}

const Wrapper = styled.header`
  position: relative;
`

export default App
