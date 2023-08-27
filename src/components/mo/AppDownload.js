import { styled } from 'styled-components'

import Spacer from './Spacer'

const AppDownload = () => {
  const handleButton = () => {
    if (window.navigator && window.navigator['standalone']) {
      // iOS Safari에서는 standalone 속성이 존재
      alert('이미 바탕화면에 추가되어 있습니다.')
    } else if (window.matchMedia('(display-mode: standalone)').matches) {
      // Chrome 브라우저에서는 display-mode를 확인
      alert('이미 바탕화면에 추가되어 있습니다.')
    } else {
      // 설치하기 위한 UI 보여주기 등의 작업
      alert('바탕화면에 추가하려면 메뉴에서 "홈 화면에 추가"를 선택하세요.')
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
