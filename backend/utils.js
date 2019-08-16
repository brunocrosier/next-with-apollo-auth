const jwt = require('jsonwebtoken')
const APP_SECRET = 'sdg9243g8ghdu482sdGS4DHGH424DSGSndwAPDG'

function getUserId(context) {
  const Authorization = context.request.get('Authorization')
  if (Authorization) {
    const token = Authorization.replace('Bearer ', '')
    const { userId } = jwt.verify(token, APP_SECRET)
    return userId
  }

  throw new Error('Not authenticated')
}

module.exports = {
  APP_SECRET,
  getUserId,
}
