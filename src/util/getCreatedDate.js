import moment from 'moment'

export default function getCreatedDate(timestamp) {
  if (!timestamp) {
    return ''
  }
  return moment(timestamp).format('Do MMMM YYYY')
}
