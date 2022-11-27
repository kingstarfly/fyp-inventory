// Split string into words with common delimiters and then capitalize each word
export function splitAndCapitalize(str: string): string {
  return str
    .split(/[\s_-]/)
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ')
}

// Capitalize the first letter of each word of a string delimited by spaces
export function capitalize(str: string): string {
  return str
    .split(' ')
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ')
}
