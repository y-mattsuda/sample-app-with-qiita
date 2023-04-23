'use strict'

import type { FC, ReactNode } from 'react'
import Header from './Header'

export type LayoutProps = {
  children: ReactNode
}

const Layout: FC<LayoutProps> = ({ children }) => {
  return (
    <>
      <Header title="Sample App with Qiita" />
      {children}
    </>
  )
}

export default Layout
