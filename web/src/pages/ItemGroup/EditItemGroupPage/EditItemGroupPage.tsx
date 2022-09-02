import EditItemGroupCell from 'src/components/ItemGroup/EditItemGroupCell'

type ItemGroupPageProps = {
  id: number
}

const EditItemGroupPage = ({ id }: ItemGroupPageProps) => {
  return <EditItemGroupCell id={id} />
}

export default EditItemGroupPage
