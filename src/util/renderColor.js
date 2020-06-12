import React from 'react'

export default function renderColor(type) {
  let color = '#606770'
  switch (type.toLowerCase()) {
    case 'like':
      color = '#5383ff'
      break
    case 'dislike':
      color = '#5383ff'
      break
    case 'perfect':
      color = '#f7b125'
      break
    case 'thinking':
      color = '#f7b125'
      break
    case 'love':
      color = 'red'
      break
    case 'wow':
      color = '#5383ff'
      break
    case 'tounghout':
      color = '#f7b125'
      break
    default:
      break
  }
  return color
}
