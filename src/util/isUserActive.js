import moment from 'moment'

export default function isUserActive(timestamp) {
  if (!timestamp) {
    return ''
  }
  const seconds = moment().diff(timestamp, 'seconds')
  return seconds <= 60 ? true : false
}
