export default function getReactionsText(userId, reactions) {
  if (!reactions || !reactions.length) {
    return 'Like'
  }
  const reaction = reactions.filter(r => r.user._id === userId)
  return reaction.length ? reaction[0].type.toLowerCase() : 'Like'
}
