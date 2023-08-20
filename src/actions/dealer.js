export const ISMOBILE = 'ISMOBILE'

export const changeIsMobile = (boolean) => {
  return {
    type: ISMOBILE,
    payload: boolean,
  }
}
