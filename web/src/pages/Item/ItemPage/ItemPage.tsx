import ItemCell from 'src/components/Item/ItemCell'

type ItemPageProps = {
  id: string
}

const ItemPage = ({ id }: ItemPageProps) => {
  return <ItemCell id={id} />
}

export default ItemPage
