import { useState, useEffect } from 'react'
import styled from 'styled-components'
import { useNavigate, useLocation } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import axios from 'axios'

import { changeIsLogin } from '../../actions/dealer'

import MainSection from '../../components/mo/MainSection'
import MobileHeader from '../../components/mo/MobileHeader'
import Spacer from '../../components/mo/Spacer'
import CompanyLogo from '../../components/mo/CompanyLogo'
import AppDownload from '../../components/mo/AppDownload'
import Loading from '../../components/mo/Loading'

const Home = () => {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const [isLoading, setIsLoading] = useState(false)
  const [value, setValue] = useState('')

  const { search } = useLocation()
  const queryParams = new URLSearchParams(search)
  const dtype =
    queryParams.get('dtype') !== null ? queryParams.get('dtype') : 'B'
  const pid = queryParams.get('pid') !== null ? queryParams.get('pid') : 'undef'
  localStorage.setItem('savedDtype', dtype);

  const [test, setTest] = useState(dtype)

  const handleInput = (e) => {
    setValue(e.target.value)
  }

  const handleButton = async () => {
    setIsLoading(true)
    const res = await axios
      .post(
        process.env.REACT_APP_PWCHECK,
        {
          value,
        },
        {
          timeout: 10000,
        },
      )
      .then((res) => {
        if (res.data) {
          dispatch(changeIsLogin(true))
          navigate(`/mo/compare?dtype=${dtype}&pid=${pid}`)
        } else {
          alert('잘못된 비밀번호입니다')
        }
      })
      .catch((res) => {
        alert(
          `전산프로그램에 오류가 발생하였습니다. '010-7770-2696'으로 연락주시면 빠르게 해결해드리겠습니다.`,
        )
        navigate(`/mo/error`)
      })
    setIsLoading(false)
  }

  return (
    <Backgroud>
      <MainSection>
        <div>{test}</div>
        <MobileHeader />
        <Spacer space={50} />
        <span
          style={{
            fontSize: 18,
            fontWeight: 'bold',
            color: '#fff',
            textAlign: 'center',
          }}
        >
          딜러 전용 다이렉트 보험료 비교
        </span>
        <Spacer space={20} />
        <div style={{ marginLeft: 'auto' }}>
          <AppDownload />
        </div>

        <Spacer space={50} />
        <img
          src="/img/home_img.svg"
          alt="logo"
          width={249}
          height={200}
          style={{ margin: '0 auto' }}
        />
        <Spacer space={50} />
        <Input
          type="text"
          onChange={handleInput}
          maxLength={6}
          placeholder="비밀번호를 입력해주세요"
        />
        <Spacer space={12} />
        <LoginButton onClick={handleButton}>로그인</LoginButton>
        <Spacer space={8} />
        <span
          style={{
            fontSize: 12,
            color: '#fff',
            textAlign: 'center',
          }}
        >
          Beta Service
        </span>
        <Spacer space={100} />
        <Spacer space={100} />
        <CompanyLogo src={'/img/kb.svg'} />
        <Spacer space={10} />
        <CompanyLogo src={'/img/axa.svg'} />
        <Spacer space={10} />
        <CompanyLogo src={'/img/db.svg'} />
        <Spacer space={10} />
        <CompanyLogo src={'/img/hyeondae.svg'} />
        <Spacer space={10} />
        <CompanyLogo src={'/img/heungkuk.svg'} />
        <Spacer space={10} />
        <CompanyLogo src={'/img/hanhwa.svg'} />
        <Spacer space={50} />
        {isLoading && <Loading />}
      </MainSection>
    </Backgroud>
  )
}

export default Home

const Backgroud = styled.div`
  background: linear-gradient(
    to bottom,
    #5b8def,
    #5483df,
    #314f88,
    #263e6d,
    #263e6d 70%
  );
`
const Input = styled.input`
  height: 40px;
  border: none;
  border-radius: 5px;
  text-align: center;
  font-size: 14px;
  letter-spacing: 2px;
`
const LoginButton = styled.button`
  height: 40px;
  background-color: #5cdaa7;
  border-radius: 5px;
  text-align: center;
  font-size: 20px;
  font-weight: bold;
  color: #fff;
  border: none;
`
