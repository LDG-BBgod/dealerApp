import { useEffect } from 'react'
import styled from 'styled-components'

import Spacer from './Spacer'

const CompanyArea = ({ data = null, selected = false, func = null }) => {
  const Box = ({ children }) => {
    return (
      <div
        style={{
          textAlign: 'center',
          boxSizing: 'border-box',
          backgroundColor: `${selected ? `#DBE9FF` : '#fff'}`,
          width: `100%`,
          height: 40,
          border: `solid 0.5px ${selected ? '#5b8def' : '#cacaca'}`,
          borderRadius: 10,
          display: 'grid',
          gridTemplateColumns: `1fr 3fr 2.5fr 1fr`,
          justifyItems: 'center',
          alignItems: 'center',
        }}
        onClick={func}
      >
        {children}
      </div>
    )
  }
  const isMoney = data.money !== '조회불가'

  return (
    <Box>
      <Text>{data.rank}</Text>
      <img src={`/img/${data.name}.svg`} alt="logo" width={100} />
      {isMoney ? <Text2>{data.money} 원</Text2> : <Text2>{data.money}</Text2>}

      {selected ? (
        <img src={`/img/companySelect.svg`} alt="logo" height={20} width={10} />
      ) : (
        <img
          src={`/img/companyUnSelect.svg`}
          alt="logo"
          height={20}
          width={10}
        />
      )}
    </Box>
  )
}

export default CompanyArea

const Text = styled.div`
  font-size: 16px;
  font-weight: bold;
  color: #9f9f9f;
`
const Text2 = styled.div`
  font-size: 14px;
  font-weight: bold;
  color: #9f9f9f;
`
