import { useState, useEffect } from 'react'
import styled from 'styled-components'
import { useDispatch, batch } from 'react-redux'
import { useNavigate, useLocation } from 'react-router-dom'
import axios from 'axios'

import { changeDType, changePID } from '../../actions/dealer'

import MainSection from '../../components/mo/MainSection'
import MobileHeader from '../../components/mo/MobileHeader'
import Spacer from '../../components/mo/Spacer'
import CompanyLogo from '../../components/mo/CompanyLogo'

const Home = () => {
  const [value, setValue] = useState('')
  const navigate = useNavigate()
  const dispatch = useDispatch()

  const { search } = useLocation()
  const queryParams = new URLSearchParams(search)
  const dtype = queryParams.get('dtype')
  const pid = queryParams.get('pid')

  const handleInput = (e) => {
    setValue(e.target.value)
  }

  const handleButton = async () => {
    try {
      const res = await axios
        .post(
          `http://${window.location.hostname}:5000/api/apis/pwCheck`,
          {
            value,
          },
          {
            timeout: 10000,
          },
        )
        .then((res) => {
          if (res.data) {
            batch(() => {
              dispatch(changeDType(dtype))
              dispatch(changePID(pid))
            })
            navigate('/mo/compare')
          } else {
            alert('잘못된 비밀번호입니다')
          }
        })
    } catch (err) {
      console.log('에러 1')
    }
  }

  return (
    <Backgroud>
      <MainSection>
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
