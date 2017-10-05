export default async (ctx, next) => {
  const message = ctx.weixin
  console.log('message', message)
  if (message.MsgType === 'event') {
    if (message.Event === 'subcribe') {
      ctx.body = 'Thank you for subcribe'
    } else if (message.Event === 'unsubscribe') {
      console.log(message.Event)
    } else if (message.Event === 'LOCATION') {
      ctx.body = message.Latitude + ' : ' + message.Longitude
    }
  }
  if (message.MsgType === 'text') {
    ctx.body = {
      MsgType: message.MsgType,
      content: message.Content
    }
  } else if (message.MsgType === 'image') {
    ctx.body = {
      MsgType: message.MsgType,
      mediaId: message.MediaId
    }
  } else if (message.MsgType === 'voice') {
    ctx.body = {
      MsgType: message.MsgType,
      mediaId: message.MediaId
    }
  } else if (message.MsgType === 'video') {
    ctx.body = {
      title: message.ThumbMediaId,
      MsgType: message.MsgType,
      mediaId: message.MediaId
    }
  } else if (message.MsgType === 'location') {
    ctx.body = message.Location_X + ':' + message.Location_y + ':' + message.Label
  } else if (message.MsgType === 'link') {
    ctx.body = message.Title
  }
}
