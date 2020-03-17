export default {
  contained: {
    boxShadow:
      '0 1px 1px 0 rgba(0,0,0,0.14), 0 2px 1px -1px rgba(0,0,0,0.12), 0 1px 3px 0 rgba(0,0,0,0.20)',
    marginRight: 5,
    backgroundColor: '#2a7fff',
    color: '#4de0f9 !important',
    width: '150px !important',
    textTransform: 'none',
  },
  root: {
    boxShadow: 'none',
    textTransform: 'none',
    fontWeight: 500,
    fontSize: 16,
    lineHeight: 1.5,
    color: '#4de0f9',
    '&:hover': {
      boxShadow: 'none',
    },
    '&:active': {
      boxShadow: 'none',
    },
    '&:focus': {
      boxShadow: '0 0 0 0.2rem rgba(0,123,255,.5)',
    },
  },
}
