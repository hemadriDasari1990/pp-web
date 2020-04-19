export default function renderUserNames(reactions) {
  if (!Array.isArray(reactions)) {
    return ''
  }
  let names = ''
  reactions.forEach(r => {
    names += r.user ? r.user.userName + '\n' : ''
  })
  return names
}
