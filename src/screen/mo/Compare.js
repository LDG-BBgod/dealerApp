import { useState, useEffect } from 'react'
import { useBeforeunload } from 'react-beforeunload'
import axios from 'axios'

import Step1 from './Step1'
import Step2 from './Step2'
import Step3 from './Step3'
import Step4 from './Step4'
import Step5 from './Step5'
import Overlay from '../../components/mo/Overlay'

const Compare = () => {
  const [step, setStep] = useState(1)
  const [isPageInit, setIsPageInit] = useState(false)

  const steps = [Step1, Step2, Step3, Step4, Step5]

  const StepComponent = steps[step - 1]

  useBeforeunload((e) => {
    e.preventDefault()
  })

  useEffect(() => {
    const initPage = async () => {
      try {
        setTimeout(async () => {
          await axios
            .get(process.env.REACT_APP_PAGEINIT, {
              timeout: 10000,
            })
            .then((res) => {
              if (!res.data.err) {
                setIsPageInit(true)
              } else {
                alert('전산프로그램에 오류가 발생하였습니다.')
                window.location.reload()
              }
            })
        }, 1000)
      } catch (err) {
        alert('전산프로그램에 오류가 발생하였습니다.')
        window.location.reload()
      }

      // // 화면디자인할때 사용
      // setStep(1)
      // 화면디자인할때 사용
    }
    initPage()

    return () => {
      setStep(1)
    }
  }, [])
  return (
    <div>
      <StepComponent setStep={setStep} isPageInit={isPageInit} />
    </div>
  )
}

export default Compare
