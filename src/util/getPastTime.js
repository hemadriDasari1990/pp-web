import moment from 'moment'

const CONFIG_NEW = {
  future: 'in %s',
  past: '%s',
  s: '1s',
  ss: '%ss',
  m: '1m',
  mm: '%dm',
  h: '1h',
  hh: '%dh',
  d: '1d',
  dd: '%dd',
  M: '1mo',
  MM: '%dM',
  y: '1y',
  yy: '%dY',
}

export default function getPastTime(timestamp) {
  if (!timestamp) {
    return ''
  }
  moment.updateLocale('en', { relativeTime: CONFIG_NEW })
  return moment(timestamp).fromNow()
}
