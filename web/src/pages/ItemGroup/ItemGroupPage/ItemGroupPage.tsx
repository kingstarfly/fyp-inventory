import ItemGroupCell from 'src/components/ItemGroup/ItemGroupCell'

type ItemGroupPageProps = {
  id: number
}

const ItemGroupPage = ({ id }: ItemGroupPageProps) => {
  return <ItemGroupCell id={id} />
}

export default ItemGroupPage
