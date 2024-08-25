export const get = async (url: string) => {
  const response = await fetch(url)
  if (!response.ok) {
    throw Error(response.statusText)
  }
  return await response.json()
}
