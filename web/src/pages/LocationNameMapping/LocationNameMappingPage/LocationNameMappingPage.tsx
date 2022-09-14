import LocationNameMappingCell from 'src/components/LocationNameMapping/LocationNameMappingCell'

type LocationNameMappingPageProps = {
  id: number
}

const LocationNameMappingPage = ({ id }: LocationNameMappingPageProps) => {
  return <LocationNameMappingCell id={id} />
}

export default LocationNameMappingPage
