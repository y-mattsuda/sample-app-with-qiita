import { QIITA_API_ITEMS_URL } from '@/constants'
import QiitaItemsTable from './QiitaItemsTable'
import type { QiitaItem } from './types'

export type QiitaItemsListProps = {
  path: string
}

export default async function QiitaItemsList({ path }: QiitaItemsListProps) {
  // 記事一覧ページの初回ロードを高速にするために, prefetchしておく
  const res = await fetch(QIITA_API_ITEMS_URL, {
    next: {
      revalidate: 60 * 3, // revalidate every 3 minutes
    },
  })
  let data: QiitaItem[]
  if (!res.ok) {
    data = []
  } else {
    data = await res.json()
  }
  return <QiitaItemsTable path={path} initItems={data} />
}
