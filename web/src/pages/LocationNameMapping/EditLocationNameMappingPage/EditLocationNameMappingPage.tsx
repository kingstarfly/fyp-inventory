import EditLocationNameMappingCell from 'src/components/LocationNameMapping/EditLocationNameMappingCell'

type LocationNameMappingPageProps = {
  id: number
}

const EditLocationNameMappingPage = ({ id }: LocationNameMappingPageProps) => {
  return <EditLocationNameMappingCell id={id} />
}

export default EditLocationNameMappingPage
