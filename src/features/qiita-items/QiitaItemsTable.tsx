'use client'

import { ArticleLinkButton } from '@/components/Buttons'
import DataTable from '@/components/DataTable'
import SearchForm from '@/components/SearchForm'
import Spinner from '@/components/Spinner'
import { Box } from '@mui/material'
import type { MRT_ColumnDef } from 'material-react-table'
import { FC, useState } from 'react'
import { useQiitaItems, useQiitaItemsAtom } from './hooks'

type QiitaItemsTableProps = {
  path: string
}

type QiitaItemsTableRow = {
  id: string
  title: string
  userId: string
  created_at: string
}

type QiitaItemsTableColumn = MRT_ColumnDef<QiitaItemsTableRow>

const QiitaItemsTable: FC<QiitaItemsTableProps> = ({ path }) => {
  const [query, setQuery] = useState('')
  const { rawData, error, isLoading } = useQiitaItems(query)
  const { qiitaItems, setQiitaItems } = useQiitaItemsAtom()

  if (error) {
    return <div>error</div>
  }
  if (isLoading) {
    return <Spinner size={100} />
  }

  // 検索が実行されたらqueryを更新 -> SWRによって自動的にdata fetch
  const handleSearch = (query: string) => {
    setQuery(query)
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
            link={`${path}/${row.id}`}
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
  return (
    <>
      <Box my={2}>
        <SearchForm handleSearch={handleSearch} />
      </Box>
      {query && (
        <Box my={2}>
          <p>{`${query}の検索結果だよ!!!`}</p>
        </Box>
      )}
      <DataTable data={data} columns={columns} />
    </>
  )
}

export default QiitaItemsTable
