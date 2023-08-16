import { SELECTING, SELECTED } from '../actions/carSelectComplete'

export const initialState = {
  isComplete: true,
}

export const carSelectComplete = (state = initialState, action) => {
  switch (action.type) {
    case SELECTING:
      return {
        isComplete: false,
      }
    case SELECTED:
      return {
        isComplete: true,
      }
    default:
      return state
  }
}