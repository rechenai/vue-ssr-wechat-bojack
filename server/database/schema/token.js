const mongoose = require('mongoose')
const Schema = mongoose.Schema

// "C:\Program Files\MongoDB\Server\3.4\bin\mongod.exe" mongodb启动命令

const TokenSchema = new Schema({
  name: String,
  token: String,
  expires_in: Number,
  meta: {
    createdAt: {
      type: Date,
      default: Date.now()
    },
    updatedAt: {
      type: Date,
      default: Date.now()
    }
  }
})

TokenSchema.pre('save', function (next) {
  if (this.isNew) {
    this.meta.createdAt = this.meta.updatedAt = Date.now()
  } else {
    this.meta.updatedAt = Date.now()
  }

  next()
})

TokenSchema.statics = {
  async getAccessToken () {
    const token = await this.findOne({
      name: 'access_token'
    }).exec()

    if (token && token.token) {
      token.access_token = token.token
    }

    return token
  },

  async saveAccessToken (data) {
    let token = await this.findOne({
      name: 'access_token'
    }).exec()

    if (token) {
      token.token = data.access_token
      token.expires_in = data.expires_in
    } else {
      token = new Token({
        name: 'access_token',
        token: data.access_token,
        expires_in: data.expires_in
      })
    }

    await token.save()

    return data
  }
}

const Token = mongoose.model('Token', TokenSchema)
