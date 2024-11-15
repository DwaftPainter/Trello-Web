let apiRoot = ''

if (process.env.BUILD_MODE === 'dev') {
  apiRoot = 'https://trello-api-xzib.onrender.com'
}
if (process.env.BUILD_MODE === 'production') {
  apiRoot = 'https://trello-api-xzib.onrender.com'
}

export const API_ROOT = apiRoot
