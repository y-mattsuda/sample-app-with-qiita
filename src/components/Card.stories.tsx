import type { Meta, StoryObj } from '@storybook/react'

import Card from './Card'

const meta: Meta<typeof Card> = {
  title: 'Card',
  component: Card,
}

export default meta
type Story = StoryObj<typeof Card>

const Content = () => {
  return (
    <div>
      <h1>Card</h1>
      <p>
        Card is a component that wraps the CardContent and CardActions
        components.
      </p>
    </div>
  )
}

const Actions = () => {
  return (
    <button
      onClick={(e) => {
        e.preventDefault()
        alert("You've clicked the button!")
      }}
    >
      Click me!
    </button>
  )
}

export const Default: Story = {
  args: {
    children: (
      <div>
        <Content />
        <Actions />
      </div>
    ),
  },
}
