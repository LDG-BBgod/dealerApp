// 모듈
import { useState, useEffect } from 'react'
// 리덕스

// 컴포넌트
import Step1 from './Step1'
import Step2 from './Step2'
import Step3 from './Step3'
import Step4 from './Step4'
import Step5 from './Step5'
import Overlay from '../../components/mo/Overlay'
// API

const Compare = () => {
  const [step, setStep] = useState(1)

  const steps = [Step1, Step2, Step3, Step4, Step5]

  const StepComponent = steps[step - 1]

  useEffect(() => {
    const handleBeforUnload = (e) => {
      e.preventDefault()
      e.returnValue = ''
    }
    window.addEventListener('beforeunload', handleBeforUnload)
    return () => {
      window.removeEventListener('beforeunload', handleBeforUnload)
    }
  }, [])

  useEffect(() => {
    const curPage = window.history.state.index
    if (curPage !== 'dumpPage') {
      window.history.pushState({ index: 'dumpPage' }, '', '')
    }

    function handleBackNavigation(e) {
      const isBack = window.confirm(
        '뒤로가시겠습니까? 뒤로가실경우 홈 화면으로 이동하게 됩니다.',
      )
      if (isBack) {
        window.removeEventListener('popstate', handleBackNavigation)
        window.history.go(-1)
      } else {
        window.history.pushState({ index: 'dumpPage' }, '', '')
      }
    }
    window.addEventListener('popstate', handleBackNavigation)
  }, [])

  useEffect(() => {
    // 페이지 디자인시 사용
    // setStep(1)
    // 페이지 디자인시 사용

    return () => {
      setStep(1)
    }
  }, [])
  return (
    <div>
      <StepComponent setStep={setStep} />
    </div>
  )
}

export default Compare
