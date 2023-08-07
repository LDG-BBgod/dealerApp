import { Route, Routes } from 'react-router-dom'

import Home from './screen/mo/Home'
import Root from './screen/mo/Root'
import Step1 from './screen/mo/Step1'
import Step2 from './screen/mo/Step2'
import Step3 from './screen/mo/Step3'
import Step4 from './screen/mo/Step4'
import Step5 from './screen/mo/Step5'

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" Component={Root} />
        <Route path="/mo" Component={Home} />
        <Route path="/mo/step1" Component={Step1} />
        <Route path="/mo/step2" Component={Step2} />
        <Route path="/mo/step3" Component={Step3} />
        <Route path="/mo/step4" Component={Step4} />
        <Route path="/mo/step5" Component={Step5} />
      </Routes>
    </div>
  )
}

export default App
