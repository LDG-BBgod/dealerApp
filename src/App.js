import { Route, Routes, useLocation } from 'react-router-dom'
import { useEffect } from 'react'
import { isMobile } from 'react-device-detect'
import { useDispatch } from 'react-redux'
import axios from 'axios'

import { changeIsMobile } from './actions/dealer'

import Home from './screen/mo/Home'
import Root from './screen/mo/Root'
import Compare from './screen/mo/Compare'
import ErrorPage from './screen/mo/ErrorPage'

import getUrlParams from './apis/GetUrlParams'

function App() {
  const location = useLocation()
  const dispatch = useDispatch()
  const { pid } = getUrlParams()

  useEffect(() => {
    if (location.pathname !== '/mo/compare') {
      const shutDown = async () => {
        await axios
          .post(process.env.REACT_APP_SHUTDOWN, { pid })
          .catch((err) => {
          })
      }
      shutDown()
    }
  }, [location])

  useEffect(() => {
    dispatch(changeIsMobile(isMobile))
  }, [dispatch])

  return (
    <div className="App">
      <Routes>
        <Route path="/" Component={Root} />
        <Route path="/mo" Component={Home} />
        <Route path="/mo/compare" Component={Compare} />
        <Route path="/mo/error" Component={ErrorPage} />
      </Routes>
    </div>
  )
}

export default App
