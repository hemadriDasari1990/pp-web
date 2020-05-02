import React from 'react'

export default function isReactedToComment(userId, reactions) {
  if (!reactions || !reactions.length) {
    return false
  }
  const reaction = reactions.filter(r => r.reactedBy._id === userId)
  return reaction.length ? true : false
}
