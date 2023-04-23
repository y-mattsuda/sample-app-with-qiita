'use client'

import { Box, CircularProgress } from '@mui/material'
import { FC } from 'react'

export type SpinnerProps = {
  size: number | string
}

const Spinner: FC<SpinnerProps> = ({ size }) => {
  return (
    <Box
      height="100vh"
      width="100%"
      display="flex"
      justifyContent="center"
      alignItems="center"
    >
      <CircularProgress size={size} />
    </Box>
  )
}

export default Spinner
