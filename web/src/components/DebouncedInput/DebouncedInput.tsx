import { TextInput, TextInputProps } from '@mantine/core'

export default function DebouncedInput({
  value: initialValue,
  onChange,
  debounce = 500,
  ...props
}: {
  value: string | number
  onChange: (value: string | number) => void
  debounce?: number
} & Omit<TextInputProps, 'onChange'>) {
  const [value, setValue] = React.useState(initialValue)

  React.useEffect(() => {
    setValue(initialValue)
  }, [initialValue])

  React.useEffect(() => {
    const timeout = setTimeout(() => {
      onChange(value)
    }, debounce)

    return () => clearTimeout(timeout)
  }, [value])

  return (
    <TextInput
      className="flex-1"
      {...props}
      size="xs"
      value={value}
      onChange={(event) => setValue(event.target.value)}
      aria-label="search"
      variant="unstyled"
    />
  )
}
