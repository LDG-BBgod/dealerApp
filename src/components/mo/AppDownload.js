import { styled } from 'styled-components'
import { useEffect, useState } from 'react'
import Spacer from './Spacer'

const useA2HS = () => {
  /**
   * prompt가 실행될 수 있는 환경인 경우에만 모달창을 나타내기 위해
   * 변경 시 리렌더링을 발생시키기 위해서 useRef가 아닌 useState를 사용하였습니다.
   */
  const [deferredPrompt, setDeferredPrompt] = useState(null)

  useEffect(() => {
    console.log(456)
    const handler = (e) => {
      e.preventDefault()
      setDeferredPrompt(e)
    }
    // beforeinstallprompt에 이벤트 핸들러를 등록합니다.
    window.addEventListener('beforeinstallprompt', handler)
  }, [])

  const installApp = () => {
    // 설치 메서드 실행
    deferredPrompt?.prompt()
    deferredPrompt?.userChoice.then((choiceResult) => {
      clearPrompt()
    })
  }

  const clearPrompt = () => {
    setDeferredPrompt(null)
  }

  return { deferredPrompt, installApp, clearPrompt }
}

const AppDownload = () => {
  const { deferredPrompt, installApp, clearPrompt } = useA2HS()
  // const [deferredPrompt, setDeferredPrompt] = useState(null)

  // useEffect(() => {
  //   window.addEventListener('beforeinstallprompt', (event) => {
  //     console.log(123213)
  //     console.log(event)
  //     event.preventDefault()
  //     setDeferredPrompt(event)
  //   })
  // }, [])

  // const installApp = () => {
  //   // Check if the deferredPrompt is available

  //   if (deferredPrompt) {
  //     // Show a custom UI to prompt the user to install the app
  //     deferredPrompt.prompt()

  //     // Wait for the user to respond to the prompt
  //     deferredPrompt.userChoice.then((choiceResult) => {
  //       if (choiceResult.outcome === 'accepted') {
  //         console.log('User accepted the A2HS prompt')
  //       } else {
  //         console.log('User dismissed the A2HS prompt')
  //       }

  //       // Reset the deferredPrompt variable
  //       setDeferredPrompt(null)
  //     })
  //   }
  // }

  const handleButton = () => {
    console.log(123)
    installApp()
    // if (window.navigator && window.navigator['standalone']) {
    //   alert('이미 바탕화면에 추가되어 있습니다.')
    // } else if (window.matchMedia('(display-mode: standalone)').matches) {
    //   alert('이미 바탕화면에 추가되어 있습니다.')
    // } else {

    // }
  }

  return (
    <Box onClick={handleButton}>
      <img src="/img/buttonLogo.svg" alt="logo" width={20} height={20} />
      <Spacer horizontal={false} space={10} />
      <Text>앱 다운로드</Text>
      <Spacer horizontal={false} space={5} />
      <img src="/img/download.svg" alt="down" width={9.5} height={11.5} />
    </Box>
  )
}

export default AppDownload

const Box = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  box-sizing: border-box;
  width: 145px;
  height: 34px;
  border-radius: 5px;
  background-color: #5cdaa7;
`

const Text = styled.div`
  font-size: 14px;
  font-weight: bold;
  color: #fff;
`
