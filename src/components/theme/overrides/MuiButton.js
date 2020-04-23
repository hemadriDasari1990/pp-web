export default {
  contained: {
    boxShadow:
      '0 1px 1px 0 rgba(0,0,0,0.14), 0 2px 1px -1px rgba(0,0,0,0.12), 0 1px 3px 0 rgba(0,0,0,0.20)',
    marginRight: 5,
    color: '#4de0f9 !important',
    width: '150px !important',
    textTransform: 'none',
  },
  root: {
    color: '#2a7fff',
    backgroundColor: '#f0f2f5d9',
    borderRadius: 30,
    boxShadow: 'none',
    textTransform: 'none',
    // fontWeight: 600,
    fontSize: 14,
    lineHeight: 1.5,
    '&:hover': {
      boxShadow: 'none',
      backgroundColor: '#f0f2f5d9 !important',
    },
    '&:active': {
      boxShadow: 'none',
    },
    '&:focus': {
      boxShadow: '0 0 0 0.2rem rgba(0,123,255,.5)',
    },
  },
}
