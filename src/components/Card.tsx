import { CardContent, Card as MuiCard } from '@mui/material'
import type { ComponentProps, FC, ReactNode } from 'react'

export type CardProps = {
  children: ReactNode
} & ComponentProps<typeof MuiCard>

const Card: FC<CardProps> = ({ children, ...props }) => {
  return (
    <MuiCard {...props}>
      <CardContent>{children}</CardContent>
    </MuiCard>
  )
}

export default Card
