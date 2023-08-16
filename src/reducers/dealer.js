import { DTYPE, PID, ISMOBILE } from '../actions/dealer'

export const initialState = {
  dtype: 'B',
  pid: 'UNDEF',
  isMobile: true,
}

export const dealer = (state = initialState, action) => {
  switch (action.type) {
    case DTYPE:
      return {
        ...state,
        dtype: action.payload,
      }
    case PID:
      return {
        ...state,
        pid: action.payload,
      }
    case ISMOBILE:
      return {
        ...state,
        isMobile: action.payload,
      }
    default:
      return state
  }
}
