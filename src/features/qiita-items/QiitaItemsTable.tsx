'use client'

import { ArticleLinkButton } from '@/components/Buttons'
import DataTable from '@/components/DataTable'
import SearchForm from '@/components/SearchForm'
import Spinner from '@/components/Spinner'
import { Box, Typography } from '@mui/material'
import type { MRT_ColumnDef } from 'material-react-table'
import { FC } from 'react'
import {
  useQiitaItems,
  useQiitaItemsAtom,
  useQiitaItemsSearchQuery,
} from './hooks'
import type { QiitaItem } from './types'

type QiitaItemsTableProps = {
  path: string
  initItems: QiitaItem[]
}

type QiitaItemsTableRow = {
  id: string
  title: string
  userId: string
  created_at: string
}

type QiitaItemsTableColumn = MRT_ColumnDef<QiitaItemsTableRow>

const QiitaItemsTable: FC<QiitaItemsTableProps> = ({ path, initItems }) => {
  const [query, setQuery] = useQiitaItemsSearchQuery()
  const { data, error } = useQiitaItems(query, initItems)
  const { qiitaItems, setQiitaItems } = useQiitaItemsAtom()

  if (data === undefined) {
    return <Spinner size={100} />
  }
  let items: QiitaItem[]
  if (error) {
    console.error(error)
    items = []
  } else {
    items = data
  }

  // 検索が実行されたらqueryを更新 -> SWRによって自動的にdata fetch
  const handleSearch = (query: string) => {
    setQuery(query)
  }

  // 記事詳細ページへの移動ボタンが押されたら、その記事のデータをatomに追加する
  const handleArticleLinkButtonClick = (id: string) => {
    const item = items.find((i) => i.id === id)
    if (item) {
      const exist = qiitaItems.some((i) => i.id === item.id)
      if (!exist) {
        setQiitaItems([...qiitaItems, item])
      }
    }
  }

  const tableData: QiitaItemsTableRow[] = items.map((item) => ({
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
      {error && (
        <Typography
          my={2}
          p={1}
          borderRadius={4}
          width="fit-content"
          fontSize={16}
          bgcolor="error.main"
          color="white"
        >
          エラーが発生しました。Qiita APIの制限に達した可能性があります。
          <br />
          アクセストークンを設定している場合は、アクセストークンを確認してください。
        </Typography>
      )}
      {query && (
        <Typography
          my={2}
          p={1}
          borderRadius={4}
          width="fit-content"
          fontSize={16}
          bgcolor="primary.light"
          color="white"
        >
          「{query}」の検索結果を表示しています
        </Typography>
      )}
      <DataTable data={tableData} columns={columns} />
    </>
  )
}

export default QiitaItemsTable
