import FacebookIcon from '@material-ui/icons/Facebook'
import React from 'react'
import TwitterIcon from '@material-ui/icons/Twitter'
import Zoom from '@material-ui/core/Zoom'
import googleIcon from '../../assets/social/google.png'

export default function getProvider(provider) {
  if (!provider) {
    return
  }
  let icon = null
  switch (provider.toLowerCase()) {
    case 'google.com':
      icon = (
        <Zoom in={true} timeout={2000}>
          <img
            src={googleIcon}
            style={{ marginTop: -3 }}
            width={15}
            height={15}
          />
        </Zoom>
      )
      break
    case 'twitter.com':
      icon = (
        <Zoom in={true} timeout={2000}>
          <TwitterIcon
            style={{ fontSize: 15, marginTop: -3, color: '#1da1f2' }}
          />
        </Zoom>
      )
      break
    case 'facebook.com':
      icon = (
        <Zoom in={true} timeout={2000}>
          <FacebookIcon
            style={{ fontSize: 15, marginTop: -3, color: '#1876f2' }}
          />
        </Zoom>
      )
      break
    default:
      break
  }
  return icon
}
