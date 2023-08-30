// 모듈
import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
// 리덕스

// 컴포넌트
import Step1 from './Step1'
import Step2 from './Step2'
import Step3 from './Step3'
import Step4 from './Step4'
import Step5 from './Step5'
// API
import GetUrlParams from '../../apis/GetUrlParams'

const Compare = () => {
  const navigate = useNavigate()
  const [step, setStep] = useState(1)
  const [isReady, setIsReady] = useState(false)

  const steps = [Step1, Step2, Step3, Step4, Step5]

  const StepComponent = steps[step - 1]

  // 비밀번호 로그인 했는지 체크 (직접 compare url로 접속 blcok)
  useEffect(() => {
    const isLogin = localStorage.getItem('isLogin')
    if (isLogin !== 'true') {
      setIsReady(false)
      navigate('/mo')
    } else {
      setIsReady(true)
    }
  }, [])

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
    // setStep(4)
    // 페이지 디자인시 사용

    return () => {
      setStep(1)
    }
  }, [])
  return (
    <div>{isReady ? <StepComponent setStep={setStep} /> : <div></div>}</div>
  )
}

export default Compare
