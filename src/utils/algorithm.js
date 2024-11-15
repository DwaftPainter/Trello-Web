export const getUserId = () => {
  const encodedPayload = localStorage.token?.split('.')
  const payload = JSON.parse(atob(encodedPayload[1]))
  const userId = payload._id

  return userId
}

export const getRandomRGBColor = () => {
  const getRandomValue = () => Math.floor(Math.random() * 256)
  const red = getRandomValue()
  const green = getRandomValue()
  const blue = getRandomValue()

  return `rgb(${red}, ${green}, ${blue})`
}