export default function getReactionsText(userId, reactions) {
  if (!reactions || !reactions.length) {
    return ''
  }
  const reaction = reactions.filter(r => r.user._id === userId)
  return reaction.length
    ? reaction[0].type.charAt(0).toUpperCase() + reaction[0].type.slice(1)
    : ''
}
