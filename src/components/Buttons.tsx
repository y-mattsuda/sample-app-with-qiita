import ArticleOutlinedIcon from '@mui/icons-material/ArticleOutlined'
import { IconButton, Tooltip } from '@mui/material'
import { useRouter } from 'next/navigation'
import type { FC } from 'react'

type ArticleLinkButtonProps = {
  link: string
  actionFn?: () => void
  tooltip?: string
}

export const ArticleLinkButton: FC<ArticleLinkButtonProps> = ({
  link,
  actionFn,
  tooltip,
}) => {
  const router = useRouter()
  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault()
    if (actionFn) {
      actionFn()
    }
    router.push(link)
  }
  return (
    <Tooltip title={tooltip}>
      <IconButton color="inherit" onClick={handleClick}>
        <ArticleOutlinedIcon />
      </IconButton>
    </Tooltip>
  )
}
