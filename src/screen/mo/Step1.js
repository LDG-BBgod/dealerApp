import { styled } from 'styled-components'
import { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import axios from 'axios'

import { setPhone as setPhoneNum } from '../../actions/phone'
import { setJumin } from '../../actions/jumin'

import MainSection from '../../components/mo/MainSection'
import StepHeader from '../../components/mo/StepHeader'
import Title from '../../components/mo/Title'
import Spacer from '../../components/mo/Spacer'
import StepButton from '../../components/mo/StepButton'
import InputArea from '../../components/mo/InputArea'
import Overlay from '../../components/mo/Overlay'
import Loading from '../../components/mo/Loading'
import Auth from './Auth'
import AuthList from './AuthList'

const Step1test = ({ setStep, isPageInit = false }) => {
  const [name, setName] = useState('') //초기 ''
  const [fsn, setFsn] = useState('') //초기 ''
  const [bsn, setBsn] = useState('') //초기 ''
  const [telcom, setTelcom] = useState('SKT') //초기 'SKT'
  const [phone, setPhone] = useState('') //초기 ''
  const [isComplete, setIsComplete] = useState(false)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [isModalOpen2, setIsModalOpen2] = useState(false)
  const [isModalOpen3, setIsModalOpen3] = useState(false)
  const [isLoading, setIsLoading] = useState(false)

  const dispatch = useDispatch()

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
      setIsModalOpen(true)
    } else {
      alert('세션준비중입니다. 잠시후 다시 시도해주세요.')
    }
  }
  const handleModalButton = async () => {
    setIsModalOpen(false)
    setIsLoading(true)
    const body = {
      name,
      fsn,
      bsn,
      telcom,
      phone,
    }
    try {
      await axios
        .post(
          `http://${window.location.hostname}:5000/api/compare/phoneSubmit`,
          body,
          {
            timeout: 10000,
          },
        )
        .then((res) => {
          setIsLoading(false)
          if (!res.data.err) {
            if (res.data.msg.success) {
              dispatch(setPhoneNum(phone))
              dispatch(setJumin(fsn))
              setStep(2)
            } else {
              alert('조회불가, 고객정보를 다시한번 확인해주세요.')
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
    const checkInput = () => {
      if (name && fsn && bsn && telcom && phone) {
        setIsComplete(true)
      } else {
        setIsComplete(false)
      }
    }
    checkInput()
  }, [name, fsn, bsn, telcom, phone])

  return (
    <MainSection>
      <StepHeader src={'/img/step1.svg'} />
      <Spacer space={30} />
      <Title>보험료 비교를 위해 정보를 입력해주세요.</Title>
      <Spacer space={30} />

      <InputArea text={'고객(피보험자) 성함'}>
        <InputName
          type="text"
          value={name}
          onChange={handleName}
          autoComplete="one-time-code"
        />
      </InputArea>
      <Spacer space={16} />

      <InputArea text={'고객(피보험자) 주민번호'}>
        <SnBox>
          <InputFsn
            type="text"
            value={fsn}
            onChange={handleFsn}
            style={{ flexBasis: '50%' }}
            autoComplete="one-time-code"
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
            autoComplete="one-time-code"
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
          <InputPhone
            type="text"
            value={phone}
            onChange={handlePhone}
            autoComplete="one-time-code"
          />
        </InputArea>
      </div>
      <Spacer space={40} />
      <StepButton
        buttonFunc={handleButton}
        text={'고객에게 정보 동의 요청'}
        completed={isComplete}
      />
      <Spacer space={8} />
      <BottomText>자동차 보험료 확인에만 사용됩니다</BottomText>
      <Spacer space={6} />
      <BottomText>광고 전화는 가지 않습니다</BottomText>
      <Spacer space={40} />
      {isLoading && <Loading />}
      {isModalOpen && (
        <Overlay>
          <Auth
            func={handleModalButton}
            backFunc={() => {
              setIsModalOpen(false)
            }}
            bogiFunc={() => {
              setIsModalOpen(false)
              setIsModalOpen2(true)
            }}
          />
        </Overlay>
      )}
      {isModalOpen2 && (
        <Overlay>
          <AuthList
            backFunc={() => {
              setIsModalOpen(true)
              setIsModalOpen2(false)
            }}
          />
        </Overlay>
      )}
      {isModalOpen3 && <Overlay></Overlay>}
    </MainSection>
  )
}

const SnBox = styled.div`
  display: flex;
  align-items: center;
`
const InputName = styled.input`
  padding-top: 15px;
  border: none;
  box-sizing: border-box;
  width: 100%;
  font-size: 16px;
  color: #9f9f9f;
`
const InputFsn = styled.input`
  padding-top: 15px;
  border: none;
  box-sizing: border-box;
  width: 100%;
  font-size: 16px;
  color: #9f9f9f;
  letter-spacing: 2px;
`
const InputBsn = styled.input`
  padding-top: 15px;
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
  padding-top: 15px;
  border: none;
  box-sizing: border-box;
  width: 100%;
  font-size: 14px;
  color: #9f9f9f;
`
const InputPhone = styled.input`
  padding-top: 15px;
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

export default Step1test
