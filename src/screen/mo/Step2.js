import { useState, useEffect } from 'react'
import { styled } from 'styled-components'

import axios from 'axios'

import MainSection from '../../components/mo/MainSection'
import StepHeader from '../../components/mo/StepHeader'
import Title from '../../components/mo/Title'
import Spacer from '../../components/mo/Spacer'
import StepButton from '../../components/mo/StepButton'
import InputArea from '../../components/mo/InputArea'
import Loading from '../../components/mo/Loading'

const Step2 = ({ setStep, isPageInit = false }) => {
  const [authNum, setAuthNum] = useState('')
  const [isComplete, setIsComplete] = useState(false)
  const [countdown, setCountdown] = useState(179) // 3분 - 1초
  const [isLoading, setIsLoading] = useState(false)

  const handleAuthNum = (e) => {
    const input = e.target.value.replace(/\D/g, '') // 숫자 외의 문자 제거
    if (input.length <= 6) {
      setAuthNum(input)
      if (input.length === 6) {
        setIsComplete(true)
      }
    }
  }
  const handleButtonRequest = () => {
    // 재전송 로직 생성
    alert('재전송 기능 준비중입니다. 페이지를 새로고침해주세요.')
  }
  const handleButtonSubmit = async () => {
    setIsLoading(true)
    try {
      const body = {
        authNum,
      }
      const res = await axios
        .post(
          `http://${window.location.hostname}:5000/api/compare/authCheck`,
          body,
          {
            timeout: 10000,
          },
        )
        .then((res) => {
          setIsLoading(false)
          if (!res.data.err) {
            if (res.data.msg.success) {
              setStep(3)
            } else {
              alert('인증번호 6자리를 다시 확인해주세요.')
            }
          } else {
            alert('전산프로그램에 오류가 발생하였습니다.')
            window.location.reload()
          }
        })
    } catch (err) {
      setIsLoading(false)
      alert('전산프로그램에 오류가 발생하였습니다.')
      window.location.reload()
    }
  }

  useEffect(() => {
    const interval = setInterval(() => {
      setCountdown((prevCountdown) => prevCountdown - 1)
    }, 1000)

    return () => {
      clearInterval(interval)
    }
  }, [])

  return (
    <MainSection>
      <StepHeader src={'/img/step2.svg'} />
      <Spacer space={30} />
      <Title>고객님 핸드폰으로</Title>
      <Spacer space={5} />
      <Title>인증번호가 발송되었습니다.</Title>
      <Spacer space={30} />
      {countdown > 0 ? (
        <div style={{ color: '#CACACA', fontSize: 14, fontWeight: 'bold' }}>
          {Math.floor(countdown / 60)} : {countdown % 60}
        </div>
      ) : (
        <div style={{ color: '#CACACA', fontSize: 14, fontWeight: 'bold' }}>
          시간초과
        </div>
      )}
      <Spacer space={8} />
      <InputArea text={'인증번호'}>
        <InputAuth type="text" value={authNum} onChange={handleAuthNum} />
      </InputArea>
      <Spacer space={20} />
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: '0.8fr 1fr',
          gridColumnGap: 10,
        }}
      >
        <StepButton
          style={{
            backgroundColor: '#CACACA',
          }}
          text={'재전송'}
          completed={false}
          nonCompletedButtonFunc={handleButtonRequest}
        />
        <StepButton
          buttonFunc={handleButtonSubmit}
          text={'확인'}
          completed={isComplete}
        />
      </div>
      <Spacer space={40} />
      {isLoading && <Loading />}
    </MainSection>
  )
}

export default Step2

const InputAuth = styled.input`
padding-top: 15px;
  border: none;
  box-sizing: border-box;
  width: 100%;
  font-size: 16px;
  color: #9f9f9f;
  letter-spacing: 2px;
`
