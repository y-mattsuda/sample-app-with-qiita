'use client'

import { BackButton } from '@/components/Buttons'
import Card from '@/components/Card'
import Markdown from '@/components/Markdown'
import Spinner from '@/components/Spinner'
import { formatDate } from '@/lib'
import LocalOfferIcon from '@mui/icons-material/LocalOffer'
import { Avatar, Box, Typography } from '@mui/material'
import { notFound } from 'next/navigation'
import { FC, Suspense } from 'react'
import { useQiitaItem } from './hooks'

type QiitaItemProps = {
  id: string
  tablePagePath: string
}

type QiitaItemHeaderProps = {
  userImageUrl: string
  userId: string
  createdAt: Date
  updatedAt: Date
  title: string
  tags: string[]
}

type QiitaItemDetailProps = {
  content: string
}

const QiitaItemHeader: FC<QiitaItemHeaderProps> = ({
  userImageUrl,
  userId,
  createdAt,
  updatedAt,
  title,
  tags,
}) => {
  return (
    <>
      <Box display="flex" alignItems="center">
        <Avatar
          src={userImageUrl}
          alt={userId}
          sx={{ width: 24, height: 24 }}
        />
        <Box ml={1} height={20}>
          <b>@{userId}</b>
        </Box>
      </Box>
      <Box color="gray" fontSize={14}>
        投稿日 {formatDate(createdAt, 'yyyy年MM月dd日')}　更新日{' '}
        {formatDate(updatedAt, 'yyyy年MM月dd日')}
      </Box>
      <Typography variant="h1" fontSize={40} mt={1}>
        <b>{title}</b>
      </Typography>
      <Box display="flex" alignItems="center" mt={1}>
        <LocalOfferIcon sx={{ fontSize: 16 }} />
        <Box ml={1}>{tags.join(', ')}</Box>
      </Box>
    </>
  )
}

const QiitaItemDetail: FC<QiitaItemDetailProps> = ({ content }) => {
  return <Markdown content={content} />
}

const QiitaItem: FC<QiitaItemProps> = ({ id, tablePagePath }) => {
  const item = useQiitaItem(id)
  if (!item) {
    notFound()
  }
  return (
    <>
      <Box my={2}>
        <BackButton link={tablePagePath} title="記事一覧ページへ" />
      </Box>
      <Card>
        <QiitaItemHeader
          userImageUrl={item.user.profile_image_url}
          userId={item.user.id}
          createdAt={new Date(item.created_at)}
          updatedAt={new Date(item.updated_at)}
          title={item.title}
          tags={item.tags.map((tag) => tag.name)}
        />
        <Suspense fallback={<Spinner size={50} />}>
          <QiitaItemDetail content={item.body} />
        </Suspense>
      </Card>
    </>
  )
}

export default QiitaItem
