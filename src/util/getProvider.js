import React from 'react'
import FacebookIcon from '@material-ui/icons/Facebook'
import TwitterIcon from '@material-ui/icons/Twitter'
import googleIcon from '../../assets/social/google.png'

export default function getProvider(provider) {
  if (!provider) {
    return
  }
  let icon = null
  switch (provider.toLowerCase()) {
    case 'google.com':
      icon = (
        <img
          src={googleIcon}
          style={{ marginTop: -3 }}
          width={15}
          height={15}
        />
      )
      break
    case 'twitter.com':
      icon = (
        <TwitterIcon style={{ fontSize: 15, marginTop: -3 }} color="primary" />
      )
      break
    case 'facebook.com':
      icon = (
        <FacebookIcon style={{ fontSize: 15, marginTop: -3 }} color="primary" />
      )
      break
    default:
      break
  }
  return icon
}
