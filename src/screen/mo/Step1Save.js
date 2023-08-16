import { styled } from 'styled-components'
import { useEffect, useState } from 'react'

import axios from 'axios'

import MainSection from '../../components/mo/MainSection'
import StepHeader from '../../components/mo/StepHeader'
import Title from '../../components/mo/Title'
import Spacer from '../../components/mo/Spacer'
import StepButton from '../../components/mo/StepButton'
import InputArea from '../../components/mo/InputArea'
import CustomCheckbox from '../../components/mo/CustomCheckbox'
import Overlay from '../../components/mo/Overlay'
import Loading from '../../components/mo/Loading'

const Step1 = ({ setStep, isPageInit = false }) => {
  const [name, setName] = useState('이동권') //초기 ''
  const [fsn, setFsn] = useState('960527') //초기 ''
  const [bsn, setBsn] = useState('1157812') //초기 ''
  const [telcom, setTelcom] = useState('알뜰LG') //초기 'SKT'
  const [phone, setPhone] = useState('01054088229') //초기 ''
  const [isChecked, setIsChecked] = useState(false)
  const [isComplete, setIsComplete] = useState(false)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [isLoading, setIsLoading] = useState(false)

  const handleName = (e) => {
    setName(e.target.value)
  }
  const handleFsn = (e) => {
    const inputFsn = e.target.value.replace(/\D/g, '') // 숫자 외의 문자 제거
    if (inputFsn.length <= 6) {
      setFsn(inputFsn)
    }
  }
  const handleBsn = (e) => {
    const inputBsn = e.target.value.replace(/\D/g, '') // 숫자 외의 문자 제거
    if (inputBsn.length <= 7) {
      setBsn(inputBsn)
    }
  }
  const handleTelcom = (e) => {
    setTelcom(e.target.value)
  }
  const handlePhone = (e) => {
    const inputBsn = e.target.value.replace(/\D/g, '') // 숫자 외의 문자 제거
    if (inputBsn.length <= 11) {
      setPhone(inputBsn)
    }
  }

  const handleButton = async () => {
    if (isPageInit) {
      setIsLoading(true)
      const body = {
        name,
        fsn,
        bsn,
        telcom,
        phone,
      }
      try {
        const res = axios
          .post(
            `http://${window.location.hostname}:5000/api/compare/phoneSubmit`,
            body,
          )
          .then((res) => {
            setIsLoading(false)
            if (!res.data.err) {
              if (res.data.msg.success) {
                setStep(2)
              } else {
                alert('입력값을 다시한번 확인해주세요')
              }
            } else {
              alert(
                '전산프로그램에 오류가 발생하였습니다. 페이지를 새로고침해주세요.',
              )
            }
          })
      } catch (err) {
        setIsLoading(false)
        console.log('백엔드 서버 에러')
      }
    } else {
      alert('세션준비중입니다. 잠시후 다시 시도해주세요.')
    }
  }

  useEffect(() => {
    const checkInput = () => {
      if (name && fsn && bsn && telcom && phone && isChecked) {
        setIsComplete(true)
      } else {
        setIsComplete(false)
      }
    }
    checkInput()
  }, [name, fsn, bsn, telcom, phone, isChecked])

  return (
    <MainSection>
      <StepHeader src={'/img/step1.svg'} />
      <Spacer space={30} />
      <Title>보험료 비교를 위해 정보를 입력해주세요.</Title>
      <Spacer space={30} />

      <InputArea text={'고객(피보험자) 성함'}>
        <InputName type="text" value={name} onChange={handleName} />
      </InputArea>
      <Spacer space={16} />

      <InputArea text={'고객(피보험자) 주민번호'}>
        <SnBox>
          <InputFsn
            type="text"
            value={fsn}
            onChange={handleFsn}
            style={{ flexBasis: '50%' }}
          />
          <div
            style={{
              flexBasis: '10px',
              textAlign: 'center',
              height: 2,
              backgroundColor: '#9F9F9F',
            }}
          ></div>
          <InputBsn
            type="password"
            value={bsn}
            onChange={handleBsn}
            style={{ flexBasis: '50%' }}
          />
        </SnBox>
      </InputArea>
      <Spacer space={16} />

      <div style={{ display: 'grid', gridTemplateColumns: '4fr 10px 6fr' }}>
        <InputArea text={'통신사'}>
          <InputTelcom onChange={handleTelcom}>
            <option>SKT</option>
            <option>KT</option>
            <option>LG</option>
            <option>알뜰SKT</option>
            <option>알뜰KT</option>
            <option>알뜰LG</option>
          </InputTelcom>
        </InputArea>
        <div></div>
        <InputArea text={'고객전화번호'}>
          <InputPhone type="text" value={phone} onChange={handlePhone} />
        </InputArea>
      </div>
      <Spacer space={50} />
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
        }}
      >
        <CustomCheckbox
          text={'개인정보 수집 동의'}
          isChecked={isChecked}
          onChange={setIsChecked}
        />
        <div
          style={{
            fontSize: 14,
            color: '#919191',
          }}
          onClick={() => {
            setIsModalOpen(true)
          }}
        >
          [보기]
        </div>
      </div>
      <Spacer space={10} />
      <StepButton
        buttonFunc={handleButton}
        text={'인증번호 발송'}
        completed={isComplete}
      />
      <Spacer space={8} />
      <BottomText>자동차 보험료 확인에만 사용됩니다</BottomText>
      <Spacer space={6} />
      <BottomText>광고 전화는 가지 않습니다</BottomText>
      <Spacer space={40} />
      {isModalOpen && (
        <Overlay>
          <div>
            <div>test</div>
            <button onClick={() => setIsModalOpen(false)}>닫기</button>
          </div>
        </Overlay>
      )}
      {isLoading && <Loading />}
    </MainSection>
  )
}

const SnBox = styled.div`
  display: flex;
  align-items: center;
`
const InputName = styled.input`
  border: none;
  box-sizing: border-box;
  width: 100%;
  font-size: 16px;
  color: #9f9f9f;
`
const InputFsn = styled.input`
  border: none;
  box-sizing: border-box;
  width: 100%;
  font-size: 16px;
  color: #9f9f9f;
  letter-spacing: 2px;
`
const InputBsn = styled.input`
  padding: 0 10%;
  border: none;
  box-sizing: border-box;
  width: 100%;
  font-size: 16px;
  font-weight: bold;
  color: #9f9f9f;
  letter-spacing: 4px;
`
const InputTelcom = styled.select`
  border: none;
  box-sizing: border-box;
  width: 100%;
  font-size: 14px;
  color: #9f9f9f;
`
const InputPhone = styled.input`
  border: none;
  box-sizing: border-box;
  width: 100%;
  font-size: 16px;
  color: #9f9f9f;
  letter-spacing: 2px;
`
const BottomText = styled.div`
  font-size: 11px;
  color: #919191;
  text-align: center;
`

export default Step1
