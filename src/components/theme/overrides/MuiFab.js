export default {
  root: {
    boxShadow:
      '0 14px 28px rgba(145, 148, 170, 0.25), 0 10px 10px rgba(79, 99, 158, 0.22)',
    marginLeft: 10,
    backgroundColor: '#fff',
  },
  label: {
    color: '#fff',
    textTransform: 'capitalize',
    fontWeight: 600,
  },
  extended: {
    '&$sizeSmall': {
      height: 40,
      borderRadius: 34 / 2,
      minWidth: 140,
    },
  },
}
