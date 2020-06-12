export default {
  contained: {
    backgroundColor: '#5383ff',
    color: '#fff !important',
  },
  outlined: {
    // padding: '6px 9px',
    border: '1px solid #6a6a6a',
    '&:hover': {
      // fontWeight: 'bold',
      // backgroundColor: '#fff !important',
    },
  },
  containedPrimary: {},
  outlinedSecondary: {
    '&:hover': {
      // fontWeight: 'bold',
      // backgroundColor: '#fff !important',
    },
    border: '1px solid #fff',
    color: '#fff !important',
  },
  label: {
    fontWeight: 600,
    width: '100%',
    display: 'inherit',
    alignItems: 'inherit',
    justifyContent: 'inherit',
  },
  root: {
    letterSpacing: '0.02857em',
    textTransform: 'none',
    transition:
      'background-color 250ms cubic-bezier(0.4, 0, 0.2, 1) 0ms,box-shadow 250ms cubic-bezier(0.4, 0, 0.2, 1) 0ms,border 250ms cubic-bezier(0.4, 0, 0.2, 1) 0ms',
    fontFamily: 'inherit',
    justifyContent: 'space-between !important',
    alignItems: 'center',
    textDecoration: 'none',
    '-webkit-appearance': 'none',
    appearance: 'none',
    textalign: 'left',
    padding: '0 24px !important',
    cursor: 'pointer',
    boxSizing: 'border-box',
    width: 250,
    height: '45px !important',
    fontWeight: 500,
    borderRadius: 28,
    outline: 'none',
    position: 'relative',
    zIndex: 0,
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
