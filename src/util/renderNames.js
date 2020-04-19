export default function renderNames(reactions) {
  if (!reactions || !Array.isArray(reactions) || !reactions.length) {
    return ''
  }
  let names = ''
  if (
    reactions.filter(
      r => r && r.user && r.user._id === this.props.user && this.props.user._id,
    ).length
  ) {
    names += 'You,'
  }
  if (
    reactions.length > 2 &&
    reactions.filter(
      r => r && r.user && r.user._id === this.props.user && this.props.user._id,
    ).length
  ) {
    names += reactions.filter(
      r => r && r.user && r.user._id === this.props.user && this.props.user._id,
    ).length
      ? 'You and '
      : reactions[0].user
      ? reactions[0].user.userName
      : formateNumber(reactions.slice(2).length) + 'Others'
  }
  if (
    reactions.length > 2 &&
    !reactions.filter(
      r => r && r.user && r.user._id === this.props.user && this.props.user._id,
    ).length
  ) {
    names += reactions[0].user
      ? reactions[0].user.userName +
        ' and ' +
        formateNumber(reactions.slice(1).length) +
        ' Others'
      : formateNumber(reactions.length)
  }
  if (
    reactions.length <= 2 &&
    reactions.filter(
      r => r && r.user && r.user._id === this.props.user && this.props.user._id,
    ).length
  ) {
    names += 'You and ' + formateNumber(reactions.length) + 'Other'
  }

  if (
    reactions.length &&
    reactions.length <= 2 &&
    !reactions.filter(
      r => r && r.user && r.user._id === this.props.user && this.props.user._id,
    ).length
  ) {
    names += reactions[0].user
      ? reactions[0].user.userName +
        ' and ' +
        formateNumber(reactions.slice(1).length) +
        ' Other'
      : formateNumber(reactions.length)
  }
  return names
}
