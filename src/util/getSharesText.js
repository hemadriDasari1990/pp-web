export default function getSharesText(userId, shares) {
  if (!shares || !shares.length) {
    return 'Share'
  }
  const share = shares.filter(s => s.user._id === userId)
  return share.length ? 'Shared' : 'Share'
}
