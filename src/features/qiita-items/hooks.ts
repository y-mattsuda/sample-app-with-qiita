'use client'
import { QIITA_API_ITEMS_URL } from '@/constants'
import { useQiitaAPIAccessToken } from '@/hooks'
import { fetcher, newFetcherWithToken } from '@/lib'
import { useAtom } from 'jotai'
import useSWR from 'swr'
import { qiitaItemsAtom, qiitaItemsSearchQueryAtom } from './states'
import type { QiitaItem } from './types'

export const useQiitaItems = (query: string, initItems: QiitaItem[]) => {
  const [token] = useQiitaAPIAccessToken()
  let itemsFetcher: typeof fetcher
  if (token === '') {
    itemsFetcher = fetcher
  } else {
    itemsFetcher = newFetcherWithToken(token)
  }
  const url = query
    ? `${QIITA_API_ITEMS_URL}?query=${query}`
    : QIITA_API_ITEMS_URL
  const { data, error } = useSWR<QiitaItem[]>(url, itemsFetcher, {
    fallbackData: initItems,
    onErrorRetry: (error, key, config, revalidate, { retryCount }) => {
      if (error.status === 401 || error.status === 403) return
      if (retryCount >= 3) return
    },
  })
  return { data, error }
}

export const useQiitaItemsAtom = () => {
  const [qiitaItems, setQiitaItems] = useAtom(qiitaItemsAtom)
  return { qiitaItems, setQiitaItems }
}

export const useQiitaItem = (id: string) => {
  const [qiitaItems] = useAtom(qiitaItemsAtom)
  return qiitaItems.find((qiitaItem) => qiitaItem.id === id)
}

export const useQiitaItemsSearchQuery = () => {
  const [qiitaItemsSearchQuery, setQiitaItemsSearchQuery] = useAtom(
    qiitaItemsSearchQueryAtom
  )
  return [qiitaItemsSearchQuery, setQiitaItemsSearchQuery] as const
}
