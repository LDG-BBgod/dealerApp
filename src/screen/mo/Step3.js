import { useState, useEffect } from 'react'
import { useDispatch } from 'react-redux'
import axios from 'axios'

import { carSeleting, carSeleted } from '../../actions/carSelectComplete'

import MainSection from '../../components/mo/MainSection'
import StepHeader from '../../components/mo/StepHeader'
import Title from '../../components/mo/Title'
import Spacer from '../../components/mo/Spacer'
import StepButton from '../../components/mo/StepButton'
import Loading from '../../components/mo/Loading'
import SelectArea from '../../components/mo/SelectArea'

const Step3 = ({ setStep, isPageInit = false }) => {
  const [isComplete, setIsComplete] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [carValue1, setCarValue1] = useState({
    text: '선택',
    id: '',
    state: false,
  })
  const [carValue2, setCarValue2] = useState({
    text: '선택',
    id: '',
    state: false,
  })
  const [carValue3, setCarValue3] = useState({
    text: '선택',
    id: '',
    state: false,
  })
  const [carValue4, setCarValue4] = useState({
    text: '선택',
    id: '',
    state: false,
  })
  const [carValue5, setCarValue5] = useState({
    text: '선택',
    id: '',
    state: false,
  })

  const dispatch = useDispatch()

  const getCarInfo = async (url, body) => {
    let returnData = null
    setIsLoading(true)
    try {
      await axios
        .post(url, body, {
          timeout: 10000,
        })
        .then((res) => {
          returnData = res.data
        })
    } catch (err) {
      alert('전산프로그램에 오류가 발생하였습니다.')
      window.location.reload()
    }
    setIsLoading(false)
    return returnData
  }

  const handleSelect1 = async (options) => {
    return getCarInfo(
      `http://${window.location.hostname}:5000/api/carInfo/option1`,
      { options },
    )
  }
  const handleSelect2 = async (options) => {
    return getCarInfo(
      `http://${window.location.hostname}:5000/api/carInfo/option2`,
      { options },
    )
  }
  const handleSelect3 = async (options) => {
    return getCarInfo(
      `http://${window.location.hostname}:5000/api/carInfo/option3`,
      { options },
    )
  }
  const handleSelect4 = async (options) => {
    return getCarInfo(
      `http://${window.location.hostname}:5000/api/carInfo/option4`,
      { options },
    )
  }
  const handleSelect5 = async (options) => {
    return getCarInfo(
      `http://${window.location.hostname}:5000/api/carInfo/option5`,
      { options },
    )
  }
  const resetValue = (step) => {
    const reset = { text: '선택', id: '', state: false }
    switch (step) {
      case 1:
        setCarValue2(reset)
        setCarValue3(reset)
        setCarValue4(reset)
        setCarValue5(reset)
        break
      case 2:
        setCarValue3(reset)
        setCarValue4(reset)
        setCarValue5(reset)
        break
      case 3:
        setCarValue4(reset)
        setCarValue5(reset)
        break
      case 4:
        setCarValue5(reset)
        break
      case 5:
        break
      default:
        break
    }
  }
  const handleButton = async () => {
    dispatch(carSeleting())
    const body = {
      carValue1: carValue1.id,
      carValue2: carValue2.id,
      carValue3: carValue3.id,
      carValue4: carValue4.id,
      carValue5: carValue5.id,
    }
    try {
      axios
        .post(process.env.REACT_APP_SELECTCAR, body, {
          timeout: 10000,
        })
        .then((res) => {
          if (!res.data.err) {
            if (res.data.msg.success) {
              dispatch(carSeleted())
            }
          } else {
            alert('전산프로그램에 오류가 발생하였습니다.')
            window.location.reload()
          }
        })
      setStep(4)
    } catch (err) {
      alert('전산프로그램에 오류가 발생하였습니다.')
      window.location.reload()
    }
  }

  useEffect(() => {
    if (
      carValue1.state &&
      carValue2.state &&
      carValue3.state &&
      carValue4.state &&
      carValue5.state
    ) {
      setIsComplete(true)
    } else {
      setIsComplete(false)
    }
  }, [carValue1, carValue2, carValue3, carValue4, carValue5])

  return (
    <MainSection>
      <StepHeader src={'/img/step3.svg'} />
      <Spacer space={30} />
      <Title>차량정보를 설정해주세요.</Title>
      <Spacer space={30} />

      <SelectArea
        text={'차량제조사'}
        selectFunc={handleSelect1}
        optionFunc={setCarValue1}
        boxText={carValue1.text}
        resetFunc={resetValue}
        step={1}
        posible={true}
      />
      <Spacer space={20} />

      <SelectArea
        text={'자동차명'}
        selectFunc={handleSelect2}
        optionFunc={setCarValue2}
        boxText={carValue2.text}
        options={{ carValue1 }}
        resetFunc={resetValue}
        step={2}
        posible={carValue1.state}
      />
      <Spacer space={20} />

      <SelectArea
        text={'등록연도'}
        selectFunc={handleSelect3}
        optionFunc={setCarValue3}
        boxText={carValue3.text}
        options={{ carValue1, carValue2 }}
        resetFunc={resetValue}
        step={3}
        posible={carValue2.state}
      />
      <Spacer space={20} />

      <SelectArea
        text={'세부차명'}
        selectFunc={handleSelect4}
        optionFunc={setCarValue4}
        boxText={carValue4.text}
        options={{ carValue1, carValue2, carValue3 }}
        resetFunc={resetValue}
        step={4}
        posible={carValue3.state}
      />
      <Spacer space={20} />

      <SelectArea
        text={'세부항목'}
        selectFunc={handleSelect5}
        optionFunc={setCarValue5}
        boxText={carValue5.text}
        options={{ carValue1, carValue2, carValue3, carValue4 }}
        resetFunc={resetValue}
        step={5}
        posible={carValue4.state}
      />
      <Spacer space={20} />

      <StepButton
        buttonFunc={handleButton}
        text={'다 음'}
        completed={isComplete}
      />
      <Spacer space={40} />
      {isLoading && <Loading />}
    </MainSection>
  )
}

export default Step3
