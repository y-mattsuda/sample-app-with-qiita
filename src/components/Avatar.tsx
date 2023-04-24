import Avatar from '@mui/material/Avatar'
import type { ComponentProps, FC } from 'react'

export type ImageAvatarProps = ComponentProps<typeof Avatar>

export const ImageAvatar: FC<ImageAvatarProps> = ({ src, alt, ...props }) => {
  return <Avatar src={src} alt={alt || 'avatar image'} {...props} />
}
