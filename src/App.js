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

function App() {
  const location = useLocation()
  const dispatch = useDispatch()

  useEffect(() => {
    const dynamicManifest = {
      name: 'CABO',
      short_name: 'CABO',
      icons: [
        {
          src: 'favicon.ico',
          sizes: '64x64 32x32 24x24 16x16',
          type: 'image/x-icon',
        },
        {
          src: 'logo192.png',
          type: 'image/png',
          sizes: '192x192',
        },
        {
          src: 'logo512.png',
          type: 'image/png',
          sizes: '512x512',
        },
      ],
      start_url: window.location.pathname,
      display: 'standalone',
      background_color: '#5b8def',
      theme_color: '#5b8def',
    }

    const manifestString = JSON.stringify(dynamicManifest)

    const link = document.createElement('link')
    link.rel = 'manifest'
    link.href = URL.createObjectURL(
      new Blob([manifestString], { type: 'application/json' }),
    )
    document.head.appendChild(link)
  })

  useEffect(() => {
    if (location.pathname !== '/mo/compare') {
      const shutDown = async () => {
        await axios.post(process.env.REACT_APP_SHUTDOWN).catch((err) => {})
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
