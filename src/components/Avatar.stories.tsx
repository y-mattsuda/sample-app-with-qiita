import type { Meta, StoryObj } from '@storybook/react'

import { ImageAvatar } from './Avatar'

const meta: Meta<typeof ImageAvatar> = {
  title: 'ImageAvatar',
  component: ImageAvatar,
}

export default meta
type Story = StoryObj<typeof ImageAvatar>

export const Default: Story = {
  args: {
    src: 'https://w7.pngwing.com/pngs/340/946/png-transparent-avatar-user-computer-icons-software-developer-avatar-child-face-heroes-thumbnail.png',
  },
}
