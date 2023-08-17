import { Route, Routes, useLocation } from 'react-router-dom'
import { useEffect } from 'react'
import { isMobile } from 'react-device-detect'
import { useDispatch } from 'react-redux'
import axios from 'axios'

import { changeIsMobile } from './actions/dealer'

import Home from './screen/mo/Home'
import Root from './screen/mo/Root'
import Compare from './screen/mo/Compare'

function App() {
  const location = useLocation()
  const dispatch = useDispatch()
  useEffect(() => {
    if (location.pathname !== '/mo/compare') {
      const shutDown = async () => {
        try {
          await axios.post(
            process.env.REACT_APP_SHUTDOWN,
          )
        } catch (error) {
          console.error('Failed to send server shutdown request:', error)
        }
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
      </Routes>
    </div>
  )
}

export default App
