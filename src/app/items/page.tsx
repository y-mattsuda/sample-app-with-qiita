import QiitaItemsList from '@/features/qiita-items/QiitaItemsList'
import { asyncComponent } from '@/lib'

const QiitaItemsListAsync = asyncComponent(QiitaItemsList)

export default function Items() {
  return <QiitaItemsListAsync path="/items" />
}
