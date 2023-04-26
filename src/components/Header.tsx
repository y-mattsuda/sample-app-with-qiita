'use client'

import { GITHUB_REPO_URL } from '@/constants'
import { useQiitaAPIAccessToken } from '@/hooks'
import GitHubIcon from '@mui/icons-material/GitHub'
import SettingsIcon from '@mui/icons-material/Settings'
import {
  AppBar,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  IconButton,
  TextField,
  Toolbar,
  Typography,
} from '@mui/material'
import React, { useState } from 'react'

const SettingDialogButton = () => {
  const [open, setOpen] = useState(false)
  const [tokenLocal, setTokenLocal] = useQiitaAPIAccessToken()
  const [token, setToken] = useState(tokenLocal)

  const handleClickOpen = () => setOpen(true)
  const handleClose = () => setOpen(false)

  return (
    <>
      <IconButton color="inherit" onClick={handleClickOpen}>
        <SettingsIcon />
      </IconButton>
      <Dialog open={open}>
        <DialogTitle>ユーザ設定</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Qiita APIのアクセストークンを入力してください。
            <br />
            アクセストークンは
            <a href="https://qiita.com/settings/applications" target="_blank">
              ユーザーの管理画面
            </a>
            から発行できます。
          </DialogContentText>
          <TextField
            value={token}
            onChange={(e) => setToken(e.target.value)}
            autoFocus
            margin="dense"
            id="qiita-api-key"
            type="text"
            variant="standard"
            fullWidth
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>キャンセル</Button>
          <Button
            onClick={() => {
              setTokenLocal(token)
              handleClose()
            }}
          >
            保存
          </Button>
        </DialogActions>
      </Dialog>
    </>
  )
}

const GitHubLink = () => {
  return (
    <IconButton
      color="inherit"
      href={GITHUB_REPO_URL}
      target="_blank"
      rel="noopener noreferrer"
    >
      <GitHubIcon />
    </IconButton>
  )
}

export type HeaderProps = {
  title: string
}

const Header: React.FC<HeaderProps> = ({ title }) => {
  return (
    <AppBar position="sticky">
      <Toolbar>
        <Typography variant="h6" component="div" flexGrow={1}>
          {title}
        </Typography>
        <SettingDialogButton />
        <GitHubLink />
      </Toolbar>
    </AppBar>
  )
}

export default Header
