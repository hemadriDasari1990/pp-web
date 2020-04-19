import ShareIcon from '../components/SvgIcons/components/Share'
import React from 'react'

export default function getShareIcon(userId, shares) {
  if (!shares || !shares.length) {
    return <ShareIcon color="#606770" />
  }
  const share = shares.filter(s => s.user._id === userId)
  return share.length ? (
    <ShareIcon color="#2a7fff" />
  ) : (
    <ShareIcon color="#606770" />
  )
}
