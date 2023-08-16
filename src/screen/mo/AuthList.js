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
import CustomCheckbox from '../../components/mo/CustomCheckbox'
import StepButton from '../../components/mo/StepButton'

const AuthList = ({
  func = null,
  backFunc = null,
  bogiFunc1 = null,
  bogiFunc2 = null,
  bogiFunc3 = null,
  bogiFunc4 = null,
  bogiFunc5 = null,
  bogiFunc6 = null,
  bogiFunc7 = null,
  bogiFunc8 = null,
}) => {
  const [isChecked1, setIsChecked1] = useState(false)
  const [isChecked2, setIsChecked2] = useState(false)
  const [isChecked3, setIsChecked3] = useState(false)
  const [isChecked4, setIsChecked4] = useState(false)
  const [isChecked5, setIsChecked5] = useState(false)
  const [isChecked6, setIsChecked6] = useState(false)
  const [isChecked7, setIsChecked7] = useState(false)
  const [isChecked8, setIsChecked8] = useState(false)

  return (
    <div>
      <div style={{ textAlign: 'left' }} onClick={backFunc}>
        <img src="/img/back.svg" alt="exit" height={20} width={20} />
      </div>
      <Spacer space={30} />
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
        }}
      >
        <CustomCheckbox
          text={'개인(신용)정보의 수집•이용에 관한 사항'}
          isChecked={isChecked1}
          onChange={setIsChecked1}
        />
        <div
          style={{
            fontSize: 14,
            color: '#919191',
          }}
          onClick={bogiFunc1}
        >
          [보기]
        </div>
      </div>
      <Spacer space={30} />
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
        }}
      >
        <CustomCheckbox
          text={'개인정보 수집 전체동의'}
          isChecked={isChecked2}
          onChange={setIsChecked2}
        />
        <div
          style={{
            fontSize: 14,
            color: '#919191',
          }}
          onClick={bogiFunc2}
        >
          [보기]
        </div>
      </div>
      <Spacer space={30} />
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
        }}
      >
        <CustomCheckbox
          text={'개인정보 수집 전체동의'}
          isChecked={isChecked3}
          onChange={setIsChecked3}
        />
        <div
          style={{
            fontSize: 14,
            color: '#919191',
          }}
          onClick={bogiFunc3}
        >
          [보기]
        </div>
      </div>
      <Spacer space={30} />
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
        }}
      >
        <CustomCheckbox
          text={'개인정보 수집 전체동의'}
          isChecked={isChecked4}
          onChange={setIsChecked4}
        />
        <div
          style={{
            fontSize: 14,
            color: '#919191',
          }}
          onClick={bogiFunc4}
        >
          [보기]
        </div>
      </div>
      <Spacer space={30} />
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
        }}
      >
        <CustomCheckbox
          text={'개인정보 수집 전체동의'}
          isChecked={isChecked5}
          onChange={setIsChecked5}
        />
        <div
          style={{
            fontSize: 14,
            color: '#919191',
          }}
          onClick={bogiFunc5}
        >
          [보기]
        </div>
      </div>
      <Spacer space={30} />
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
        }}
      >
        <CustomCheckbox
          text={'개인정보 수집 전체동의'}
          isChecked={isChecked6}
          onChange={setIsChecked6}
        />
        <div
          style={{
            fontSize: 14,
            color: '#919191',
          }}
          onClick={bogiFunc6}
        >
          [보기]
        </div>
      </div>
      <Spacer space={30} />
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
        }}
      >
        <CustomCheckbox
          text={'개인정보 수집 전체동의'}
          isChecked={isChecked7}
          onChange={setIsChecked7}
        />
        <div
          style={{
            fontSize: 14,
            color: '#919191',
          }}
          onClick={bogiFunc7}
        >
          [보기]
        </div>
      </div>
      <Spacer space={30} />
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
        }}
      >
        <CustomCheckbox
          text={'개인정보 수집 전체동의'}
          isChecked={isChecked8}
          onChange={setIsChecked8}
        />
        <div
          style={{
            fontSize: 14,
            color: '#919191',
          }}
          onClick={bogiFunc8}
        >
          [보기]
        </div>
      </div>
      <Spacer space={12} />
    </div>
  )
}

export default AuthList

const Text = styled.div`
  font-size: 14px;
  font-weight: bold;
  color: #000;
  text-align: center;
`
const Text2 = styled.div`
  font-size: 10px;
  color: #ef5b5b;
  text-align: center;
`
