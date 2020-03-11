import palette from '../palette'

export default {
  root: {
    color: palette.icon,
    '&:hover': {
      backgroundColor: '#ffffff',
    },
    marginBottom: 10,
    borderRadius: 15,
    borderColor: 'transparent',
    borderLeftWidth: 0,
    borderRightWidth: 0,
    boxShadow:
      '0 14px 28px rgba(145, 148, 170, 0.25), 0 10px 10px rgba(79, 99, 158, 0.22)',
  },
}
