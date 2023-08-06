import { styled } from 'styled-components'
import { useNavigate } from 'react-router-dom'

import MainSection from '../../components/mo/MainSection'
import StepHeader from '../../components/mo/StepHeader'
import Spacer from '../../components/mo/Spacer'
import StepButton from '../../components/mo/StepButton'

const Title = styled.div`
  font-size: 14px;
  font-weight: bold;
`
const Step2 = () => {
  const navigate = useNavigate()

  const handleButton = () => {
    navigate('/mo/step3')
  }

  return (
    <MainSection>
      <StepHeader src={'/img/step1.svg'} />
      <Spacer space={30} />
      <Title>보험료 비교를 위해 정보를 입력해주세요.</Title>
      <Spacer space={20} />
      <StepButton
        buttonFunc={handleButton}
        text={'인증번호 발송'}
        completed={true}
      />
    </MainSection>
  )
}

export default Step2
