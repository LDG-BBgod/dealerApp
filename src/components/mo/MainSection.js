import React from 'react'
import styled from 'styled-components'

const SafeArea = styled.div`
  box-sizing: border-box;
  padding: 20px 25px 0 25px;
  width: 100%;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
`

const MainSection = ({ children }) => {
  return <SafeArea>{children}</SafeArea>
}
export default MainSection
