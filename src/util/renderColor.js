export default function renderColor(type) {
  let color = '#606770'
  switch (type.toLowerCase()) {
    case 'like':
      color = '#2078f4'
      break
    case 'love':
      color = '#2078f4'
      break
    case 'sad':
      color = '#2a7fff'
      break
    case 'wow':
      color = '#2a7fff'
      break
    case 'silly':
      color = '#2a7fff'
      break
    case 'smiley':
      color = '#2a7fff'
      break
    case 'angry':
      color = '#2a7fff'
      break
    case 'share':
      color = '#606770'
      break
    case 'shared':
      color = '#2a7fff'
      break
      deafult: break
  }
  return color
}
