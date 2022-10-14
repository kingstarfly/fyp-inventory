import {
  Badge,
  Button,
  Card,
  Group,
  Image,
  Mark,
  Text,
  Title,
} from '@mantine/core'

interface Props {
  name: string
  qtyTotal: number
  qtyAvailable?: number
  qtyInUse?: number
  qtyWriteOff?: number
  imgUrl?: string
}

const SummaryCard = ({
  name,
  qtyTotal,
  qtyAvailable = 0,
  qtyInUse = 0,
  qtyWriteOff = 0,
  imgUrl,
}: Props) => {
  return (
    <Card shadow="sm" p="lg" radius="md" withBorder>
      <Image src={imgUrl} height={160} alt={name} withPlaceholder />

      <Title order={3}>{name}</Title>

      {qtyAvailable !== undefined && (
        <Group position="apart" mt="md" mb="xs">
          <Text weight={500}>Available</Text>
          <Badge color="green" variant="filled" size="xl">
            {qtyAvailable}
          </Badge>
        </Group>
      )}

      {qtyInUse !== undefined && (
        <Group position="apart" mt="md" mb="xs">
          <Text weight={500}>In Use</Text>
          <Badge color="yellow" variant="filled" size="xl">
            {qtyInUse}
          </Badge>
        </Group>
      )}

      {qtyWriteOff !== undefined && (
        <Group position="apart" mt="md" mb="xs">
          <Text weight={500}>Write Off</Text>
          <Badge color="red" variant="filled" size="xl">
            {qtyWriteOff}
          </Badge>
        </Group>
      )}

      <Group position="apart" mt="md" mb="xs">
        <Text weight={500}>Total</Text>

        <Badge color="dark" variant="filled" size="xl">
          {qtyTotal}
        </Badge>
      </Group>
    </Card>
  )
}

export default SummaryCard
