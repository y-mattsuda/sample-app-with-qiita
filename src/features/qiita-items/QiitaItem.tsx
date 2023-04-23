import { notFound } from 'next/navigation'
import type { FC } from 'react'
import { useQiitaItem } from './hooks'

type QiitaItemProps = {
  id: string
}

const QiitaItemDetail: FC<QiitaItemProps> = ({ id }) => {
  const item = useQiitaItem(id)
  if (!item) {
    notFound()
  }
  return (
    <div>
      <h1>{item.title}</h1>
    </div>
  )
}

export default QiitaItemDetail
