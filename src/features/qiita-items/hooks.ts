import { fetcher } from '@/lib'
import { useAtom } from 'jotai'
import useSWR from 'swr'
import { qiitaItemsAtom } from './states'
import type { QiitaItem } from './types'

const QIITA_API_URL = 'https://qiita.com/api/v2'

export const useQiitaItems = () => {
  const { data, error, isLoading } = useSWR<QiitaItem[]>(
    `${QIITA_API_URL}/items`,
    fetcher
  )
  const rawData = data as QiitaItem[]
  return { rawData, error, isLoading }
}

export const useQiitaItemsAtom = () => {
  const [qiitaItems, setQiitaItems] = useAtom(qiitaItemsAtom)
  return { qiitaItems, setQiitaItems }
}

export const useQiitaItem = (id: string) => {
  const [qiitaItems] = useAtom(qiitaItemsAtom)
  return qiitaItems.find((qiitaItem) => qiitaItem.id === id)
}
