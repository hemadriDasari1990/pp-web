import like from '../../assets/emojis/like.svg'
import angry from '../../assets/emojis/angry.svg'
import love from '../../assets/emojis/love.svg'
import silly from '../../assets/emojis/silly.svg'
import smiley from '../../assets/emojis/smiley.svg'
import wow from '../../assets/emojis/surprise.svg'
import sad from '../../assets/emojis/sad.svg'
import share from '../../assets/emojis/share.svg'

export default function getReaction(type) {
  let icon = null
  switch (type.toLowerCase()) {
    case 'like':
      icon = like
      break
    case 'love':
      icon = love
      break
    case 'sad':
      icon = sad
      break
    case 'wow':
      icon = wow
      break
    case 'silly':
      icon = silly
      break
    case 'smiley':
      icon = smiley
      break
    case 'angry':
      icon = angry
      break
    case 'share':
      icon = share
      break
      deafult: break
  }
  return icon
}
