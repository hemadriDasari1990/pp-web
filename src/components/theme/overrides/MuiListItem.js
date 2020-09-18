export default {
  root: {
    '&$selected, &$selected:hover': {
      backgroundColor: '#e7f3ff',
    },
    '&$focusVisible': {
      backgroundColor: '#3333',
    },
    fontFamily: 'inherit',
    '&:hover': {
      backgroundColor: '#f0f2f5',
      borderRadius: 7,
    },
    margin: 5,
  },
  button: {
    margin: '5px 5px 20px 5px',
    padding: 10,
    flexDirection: 'column',
    borderRadius: 20,
    backgroundColor: '#ffffff',
    '&:hover': {
      color: '#fff',
      textDecoration: 'none',
      fontWeight: 'bold',
      // Reset on touch devices, it doesn't add specificity
      '@media (hover: none)': {
        backgroundColor: 'transparent',
      },
    },
    boxShadow: '0 14px 28px #d9dde0, 0 10px 10px #c2c6d038',
    width: 70,
    height: 100,
  },
}
