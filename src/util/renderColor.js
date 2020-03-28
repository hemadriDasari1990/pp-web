export default function renderColor(type) {
  let color = '#606770'
  switch (type.toLowerCase()) {
    case 'like':
      color = '#2078f4'
      break
    case 'love':
      color = '#4de0f9'
      break
    case 'sad':
      color = '#4de0f9'
      break
    case 'wow':
      color = '#4de0f9'
      break
    case 'silly':
      color = '#4de0f9'
      break
    case 'smiley':
      color = '#4de0f9'
      break
    case 'angry':
      color = '#4de0f9'
      break
      deafult: break
  }
  return color
}
