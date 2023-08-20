import { ISMOBILE } from '../actions/dealer'

export const initialState = {
  isMobile: true,
}

export const dealer = (state = initialState, action) => {
  switch (action.type) {
    case ISMOBILE:
      return {
        isMobile: action.payload,
      }
    default:
      return state
  }
}
