import { styled } from 'styled-components'
import { useEffect, useState } from 'react'
import Spacer from './Spacer'

const AppDownload = () => {
  const [deferredPrompt, setDeferredPrompt] = useState(null)

  useEffect(() => {
    window.addEventListener('beforeinstallprompt', (event) => {
      event.preventDefault()
      setDeferredPrompt(event)
    })
  }, [])

  const installApp = () => {
    // const dynamicManifest = {
    //   name: 'CABO',
    //   short_name: 'CABO',
    //   icons: [
    //     {
    //       src: 'favicon.ico',
    //       sizes: '64x64 32x32 24x24 16x16',
    //       type: 'image/x-icon',
    //     },
    //     {
    //       src: 'logo192.png',
    //       type: 'image/png',
    //       sizes: '192x192',
    //     },
    //     {
    //       src: 'logo512.png',
    //       type: 'image/png',
    //       sizes: '512x512',
    //     },
    //   ],
    //   start_url: window.location.pathname,
    //   display: 'standalone',
    //   background_color: '#5b8def',
    //   theme_color: '#5b8def',
    // }
    // const blob = new Blob([JSON.stringify(dynamicManifest)], {
    //   type: 'application/json',
    // })
    // const manifestURL = URL.createObjectURL(blob)
    // const link = document.createElement('link')
    // link.rel = 'manifest'
    // link.href = manifestURL
    // document.head.appendChild(link)

    if (deferredPrompt) {
      deferredPrompt.prompt()
      // deferredPrompt.userChoice.then((choiceResult) => {
      //   if (choiceResult.outcome === 'accepted') {
      //     console.log('User accepted the A2HS prompt')
      //   } else {
      //     console.log('User dismissed the A2HS prompt')
      //   }
      // })
    }
  }

  const handleButton = () => {
    alert('바탕화면에 바로가기를 추가합니다.')
    // if (window.navigator && window.navigator['standalone']) {
    //   alert('이미 바탕화면에 추가되어 있습니다.')
    // } else if (window.matchMedia('(display-mode: standalone)').matches) {
    //   alert('이미 바탕화면에 추가되어 있습니다.')
    // } else {
    installApp()
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
