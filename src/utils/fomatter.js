export const generatePlaceholderCard = (column) => {
  return {
    _id: `${column._id}-placeholder-card`,
    boardId: column.boardId,
    columnId: column._id,
    FE_placeholderCard: true
  }
}

export const parseErrorMessages = (message) => {
  const errorObj = {}
  if (message.includes('Username must be a string.')) {
    errorObj.username = 'Username must be a string.'
  }
  if (message.includes('Username is required.')) {
    errorObj.username = 'Username is required.'
  }
  if (message.includes('Username must be at least 3 characters long.')) {
    errorObj.username = 'Username must be at least 3 characters long.'
  }
  if (message.includes('Username must be less than or equal to 12 characters long.')) {
    errorObj.username = 'Username must be 12 characters or less.'
  }
  if (message.includes('Gmail must be a string.')) {
    errorObj.gmail = 'Gmail must be a string.'
  }
  if (message.includes('Gmail is required.')) {
    errorObj.gmail = 'Gmail is required.'
  }
  if (message.includes('Gmail must be a valid email address.')) {
    errorObj.gmail = 'Gmail must be a valid email address.'
  }
  if (message.includes('Email is already in use')) {
    errorObj.gmail = 'Email is already in use.'
  }
  if (message.includes('no account record')) {
    errorObj.gmail = 'No account record.'
  }
  if (message.includes('Password must be a string.')) {
    errorObj.password = 'Password must be a string.'
  }
  if (message.includes('Password is required.')) {
    errorObj.password = 'Password is required.'
  }
  if (message.includes('Password is incorrect.')) {
    errorObj.password = 'Password is incorrect.'
  }
  if (message.includes('Password must be at least 12 characters long.')) {
    errorObj.password = 'Password must be at least 12 characters long.'
  }
  if (message.includes('Password must be less than or equal to 30 characters long.')) {
    errorObj.password = 'Password must be less than or equal to 30 characters long.'
  }
  if (message.includes('Password must include upper/lowercase letters, numbers, and special characters.')) {
    errorObj.password = 'Password must include upper/lowercase letters, numbers, and special characters.'
  }
  return errorObj
}