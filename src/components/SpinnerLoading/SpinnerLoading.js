import React from 'react'
import { CustomSpinner, SpinnerWrapper } from './SpinnerLoading.style'

const SpinnerLoading = (props) => {
  return (
    <SpinnerWrapper>
      {/* <Mask></Mask> */}
      <CustomSpinner {...props} color={'#00a5e4'} className={'aaaa'} />
    </SpinnerWrapper>
  )
}

export default SpinnerLoading
