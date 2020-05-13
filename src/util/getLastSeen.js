import moment from 'moment'

export default function getLastSeen(timestamp) {
  if (!timestamp) {
    return ''
  }
  return moment(timestamp).fromNow()
}
