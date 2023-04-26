import type { Meta, StoryObj } from '@storybook/react'

import SearchForm from './SearchForm'

const meta: Meta<typeof SearchForm> = {
  title: 'SearchForm',
  component: SearchForm,
}

export default meta
type Story = StoryObj<typeof SearchForm>

export const Default: Story = {
  args: {
    handleSearch: (query: string) => {
      alert(`search: ${query}`)
    },
  },
}
