import React from 'react'

export default function renderColor(type) {
  let color = '#606770'
  switch (type.toLowerCase()) {
    case 'like':
      color = '#2a7fff'
      break
    case 'dislike':
      color = '#2a7fff'
      break
    case 'perfect':
      color = '#3ef106'
      break
    case 'thinking':
      color = '#fd7e14'
      break
    case 'love':
      color = 'red'
      break
    case 'wow':
      color = '#2a7fff'
      break
    case 'tounghout':
      color = '#f106b2'
      break
    default:
      break
  }
  return color
}
