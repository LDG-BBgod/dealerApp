import { applyMiddleware, combineReducers, createStore } from 'redux'
import { changeCarInfo } from '../reducers/carInfo'
import { carSelectComplete } from '../reducers/carSelectComplete'
import { dealer } from '../reducers/dealer'
import { phone } from '../reducers/phone'
import { resultData } from '../reducers/resultData'

import logger from 'redux-logger'

const rootReducer = combineReducers({
  changeCarInfo: changeCarInfo,
  carSelectComplete: carSelectComplete,
  dealer: dealer,
  phone: phone,
  resultData: resultData,
})

// const store = createStore(rootReducer, applyMiddleware(logger))
const store = createStore(rootReducer)

export default store
