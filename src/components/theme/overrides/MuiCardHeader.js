import palette from '../palette'

export default {
  root: {
    color: palette.icon,
    '&:hover': {},
    padding: 8,
    backgroundColor: '#f4f4f7ad',
  },
  title: {
    fontFamily: 'inherit',
    fontSize: 15,
    color: '#2a7fff',
    fontWeight: 500,
  },
  subheader: {
    fontFamily: 'inherit',
    color: palette.text.primary,
  },
  action: {
    margin: '0px !important',
  },
}
