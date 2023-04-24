import type { Meta, StoryObj } from '@storybook/react'

import Markdown from './Markdown'

const meta: Meta<typeof Markdown> = {
  title: 'Markdown',
  component: Markdown,
}

export default meta
type Story = StoryObj<typeof Markdown>

const content = `
# Qiita Item
## Subtitle
Lorem ipsum dolor sit amet, consectetur adipiscing elit
\`\`\`js
const a = 1
export default a
\`\`\`
[link](https://example.com)
## Footnote
A footnote[^1]
[^1]: This is a footnote
## Table
| a | b  |  c |  d  |
| - | :- | -: | :-: |
| 1 | 2  |  3 |  4 
## Math
$$
\\rho \\frac{D \\bm{u}}{Dt} = -\\nabla p + (\\lambda + \\mu ) \\nabla (\\nabla \\cdot \\bm{u}) + \\mu \\nabla ^{2} \\bm{u} +\\rho \\tilde{\\bm{F}}
$$
## Tasklist
* [ ] to do
* [x] done |
## Image
This is a example image from Qiita
![qiitaImage](https://qiita-image-store.s3.ap-northeast-1.amazonaws.com/0/3071716/3c444db8-1c57-7796-7cdb-9c74d8467e19.jpeg)
`

export const Default: Story = {
  args: {
    content,
  },
}
