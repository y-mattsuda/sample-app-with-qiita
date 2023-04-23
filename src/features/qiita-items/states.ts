import { atom } from 'jotai'
import { QiitaItem } from './types'

export const qiitaItemsAtom = atom<QiitaItem[]>([])
