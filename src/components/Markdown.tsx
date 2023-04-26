/* eslint-disable react/no-children-prop */
import 'katex/dist/katex.min.css'
import type { FC } from 'react'
import ReactMarkdown from 'react-markdown'
import { Prism as SyntaxHilighter } from 'react-syntax-highlighter'
import { prism } from 'react-syntax-highlighter/dist/esm/styles/prism'
import rehypeKatex from 'rehype-katex'
import remarkGfm from 'remark-gfm'
import remarkMath from 'remark-math'

export type MarkdownProps = {
  content: string
}

const Markdown: FC<MarkdownProps> = ({ content }) => {
  return (
    <ReactMarkdown
      children={content}
      remarkPlugins={[remarkGfm, remarkMath]}
      rehypePlugins={[rehypeKatex]}
      components={{
        code({ node, inline, className, children, ...props }) {
          const match = /language-(\w+)/.exec(className || '')
          return !inline && match ? (
            <SyntaxHilighter
              // @ts-expect-error
              style={prism}
              language={match[1]}
              PreTag="div"
              children={String(children).replace(/\n$/, '')}
              {...props}
            />
          ) : (
            <code className={className} {...props}>
              {children}
            </code>
          )
        },
      }}
    />
  )
}

export default Markdown
