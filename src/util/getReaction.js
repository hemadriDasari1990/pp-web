import like from '../../assets/emojis/like.svg'
import love from '../../assets/emojis/love.svg'
import tounghout from '../../assets/emojis/tounghout.svg'
import wow from '../../assets/emojis/surprise.svg'
import profileLike from '../../assets/profile-like.svg'
import profileLove from '../../assets/profile-love.svg'
import following from '../../assets/following.svg'
import follow from '../../assets/follow.svg'
import comment from '../../assets/comment.svg'
import dislike from '../../assets/emojis/dislike.svg'
import perfect from '../../assets/emojis/perfect.svg'
import thinking from '../../assets/emojis/thinking.svg'

export default function getReaction(type) {
  let icon = like
  switch (type.toLowerCase()) {
    case 'like':
      icon = like
      break
    case 'dislike':
      icon = dislike
      break
    case 'perfect':
      icon = perfect
      break
    case 'thinking':
      icon = thinking
      break
    case 'love':
      icon = love
      break
    case 'wow':
      icon = wow
      break
    case 'tounghout':
      icon = tounghout
      break
    case 'profile-like':
      icon = like
      break
    case 'profile-love':
      icon = profileLove
      break
    case 'follow':
      icon = following
      break
    case 'post-comment':
      icon = comment
      break
    case 'post-accept':
      icon = like
      break
    case 'post-reject':
      icon = like
      break
    case 'comment-like':
      icon = like
      break
    default:
      break
  }
  return icon
}
