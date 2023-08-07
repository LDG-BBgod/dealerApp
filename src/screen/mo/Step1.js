import { styled } from 'styled-components'
import { useNavigate } from 'react-router-dom'

import MainSection from '../../components/mo/MainSection'
import StepHeader from '../../components/mo/StepHeader'
import Spacer from '../../components/mo/Spacer'
import StepButton from '../../components/mo/StepButton'
import InputArea from '../../components/mo/InputArea'

const Title = styled.div`
  font-size: 14px;
  font-weight: bold;
`
const SnBox = styled.div`
  display: flex;
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
`
const InputBsn = styled.input`
  border: none;
  box-sizing: border-box;
  width: 100%;
  font-size: 16px;
  color: #9f9f9f;
`

const Step1 = () => {
  const navigate = useNavigate()

  const handleButton = () => {
    navigate('/mo/step2')
  }

  return (
    <MainSection>
      <StepHeader src={'/img/step1.svg'} />
      <Spacer space={30} />
      <Title>보험료 비교를 위해 정보를 입력해주세요.</Title>
      <Spacer space={20} />
      <InputArea text={'고객(피보험자) 성함'}>
        <InputName type="text"></InputName>
      </InputArea>
      <Spacer space={16} />
      <InputArea text={'고객(피보험자) 주민번호'}>
        <div>
          <InputFsn type="text"></InputFsn>
          <div>-</div>
          <InputBsn type="text"></InputBsn>
        </div>
      </InputArea>
      <StepButton
        buttonFunc={handleButton}
        text={'인증번호 발송'}
        completed={true}
      />
    </MainSection>
  )
}

export default Step1
