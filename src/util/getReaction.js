import CancelIcon from '@material-ui/icons/Cancel'
import CheckCircleIcon from '@material-ui/icons/CheckCircle'
import CommentIcon from '@material-ui/icons/ChatBubble'
import DisLikeIcon from '@material-ui/icons/ThumbDownAlt'
import LikeIcon from '@material-ui/icons/ThumbUpAlt'
import LoveIcon from '@material-ui/icons/Favorite'
import React from 'react'
import RssFeedOutlinedIcon from '@material-ui/icons/RssFeedOutlined'
import perfect from '../../assets/emojis/perfect.svg'
import thinking from '../../assets/emojis/thinking.svg'
import tounghout from '../../assets/emojis/tounghout.svg'

export default function getReaction(type) {
  let icon = <LikeIcon style={{ fontSize: 12 }} />
  switch (type.toLowerCase()) {
    case 'like':
      icon = <LikeIcon style={{ fontSize: 12 }} color="secondary" />
      break
    case 'dislike':
      icon = <DisLikeIcon style={{ fontSize: 12 }} color="secondary" />
      break
    case 'perfect':
      icon = <img src={perfect} />
      break
    case 'thinking':
      icon = <img src={thinking} />
      break
    case 'love':
      icon = <LoveIcon style={{ fontSize: 12 }} color="secondary" />
      break
    case 'tounghout':
      icon = <img src={tounghout} />
      break
    case 'profile-like':
      icon = <LikeIcon style={{ fontSize: 12 }} color="secondary" />
      break
    case 'profile-love':
      icon = <LoveIcon style={{ fontSize: 12 }} color="secondary" />
      break
    case 'follow':
      icon = <RssFeedOutlinedIcon style={{ fontSize: 12 }} color="secondary" />
      break
    case 'post-comment':
      icon = <CommentIcon style={{ fontSize: 12 }} color="secondary" />
      break
    case 'post-accept':
      icon = <CheckCircleIcon style={{ fontSize: 15 }} color="secondary" />
      break
    case 'post-reject':
      icon = <CancelIcon style={{ fontSize: 15 }} color="secondary" />
      break
    case 'comment-like':
      icon = <LikeIcon style={{ fontSize: 12 }} color="secondary" />
      break
    default:
      break
  }
  return icon
}
