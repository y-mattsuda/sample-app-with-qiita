'use client'

import { ArticleLinkButton } from '@/components/Buttons'
import DataTable from '@/components/DataTable'
import Spinner from '@/components/Spinner'
import type { MRT_ColumnDef } from 'material-react-table'
import { useQiitaItems, useQiitaItemsAtom } from './hooks'

type QiitaItemsTableRow = {
  id: string
  title: string
  userId: string
  created_at: string
}

type QiitaItemsTableColumn = MRT_ColumnDef<QiitaItemsTableRow>

const QiitaItemsTable = () => {
  const { rawData, error, isLoading } = useQiitaItems()
  const { qiitaItems, setQiitaItems } = useQiitaItemsAtom()

  if (error) {
    return <div>error</div>
  }
  if (isLoading) {
    return <Spinner size={100} />
  }

  // 記事詳細ページへの移動ボタンが押されたら、その記事のデータをatomに追加する
  const handleArticleLinkButtonClick = (id: string) => {
    const item = rawData.find((i) => i.id === id)
    if (item) {
      const exist = qiitaItems.some((i) => i.id === item.id)
      if (!exist) {
        setQiitaItems([...qiitaItems, item])
      }
    }
  }

  const data: QiitaItemsTableRow[] = rawData.map((item) => ({
    id: item.id,
    title: item.title,
    userId: item.user.id,
    created_at: item.created_at,
  }))
  const columns: QiitaItemsTableColumn[] = [
    {
      accessorKey: 'title',
      header: '記事タイトル',
      size: 350,
    },
    {
      accessorKey: 'userId',
      header: 'ユーザーID',
      size: 50,
    },
    {
      accessorFn(row) {
        return new Date(row.created_at).toLocaleString()
      },
      id: 'created_at',
      header: '投稿日',
      size: 100,
    },
    {
      accessorFn(row) {
        return (
          <ArticleLinkButton
            link={`/items/${row.id}`}
            actionFn={() => handleArticleLinkButtonClick(row.id)}
            tooltip="記事詳細ページへ移動します"
          />
        )
      },
      id: 'go-to-detail',
      header: '詳細へ',
      size: 50,
    },
  ]
  return <DataTable data={data} columns={columns} />
}

export default QiitaItemsTable
