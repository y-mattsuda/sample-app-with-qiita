type ItemPageProps = {
  params: {
    id: string
  }
}

export default function Item({ params: { id } }: ItemPageProps) {
  return <p>This is item {id} page</p>
}
