export const prettifyUrl = (url: string) => {
  let pretty = new URL(url).hostname

  if (pretty.includes('www.')) {
    pretty = pretty.split('www.')[1]
  }

  return pretty
}
