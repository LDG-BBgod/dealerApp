export const DTYPE = 'DTYPE'
export const PID = 'PID'
export const ISMOBILE = 'ISMOBILE'

export const changeDType = (text) => {
  return {
    type: DTYPE,
    payload: text,
  }
}
export const changePID = (text) => {
  return {
    type: PID,
    payload: text,
  }
}

export const changeIsMobile = (boolean) => {
  return {
    type: ISMOBILE,
    payload: boolean,
  }
}
