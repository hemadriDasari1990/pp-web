export default {
  root: {
    padding: '5px 3px 5px 15px',
    backgroundColor: 'none',
    '&:hover': {
      color: '#fff',
      // Reset on touch devices, it doesn't add specificity
      '@media (hover: none)': {
        backgroundColor: 'transparent',
      },
    },
  },
}
