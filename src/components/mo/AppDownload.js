import { styled } from 'styled-components'
import { useEffect, useState } from 'react'
import Spacer from './Spacer'

const AppDownload = () => {
  const [deferredPrompt, setDeferredPrompt] = useState(null)

  useEffect(() => {
    const handler = (event) => {
      console.log(123)
      event.preventDefault()
      setDeferredPrompt(event)
    }
    window.addEventListener('beforeinstallprompt', handler)
    return () => {
      window.removeEventListener('beforeinstallprompt', handler)
    }
  }, [])

  const installApp = () => {
    if (deferredPrompt) {
      deferredPrompt.prompt()
      deferredPrompt.userChoice.then((choiceResult) => {
        if (choiceResult.outcome === 'accepted') {
          console.log('User accepted the A2HS prompt')
        } else {
          console.log('User dismissed the A2HS prompt')
        }
        setDeferredPrompt(null)
      })
    }
  }

  const handleButton = () => {
    installApp()
    if (window.navigator && window.navigator['standalone']) {
      alert('이미 바탕화면에 추가되어 있습니다.')
    } else if (window.matchMedia('(display-mode: standalone)').matches) {
      alert('이미 바탕화면에 추가되어 있습니다.')
    } else {
      installApp()
    }
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
