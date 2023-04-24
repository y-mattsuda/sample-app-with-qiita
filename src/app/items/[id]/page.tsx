import QiitaItemDetail from '@/features/qiita-items/QiitaItem'

type ItemPageProps = {
  params: {
    id: string
  }
}

export default function Item({ params: { id } }: ItemPageProps) {
  return <QiitaItemDetail id={id} />
}
