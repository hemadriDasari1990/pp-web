export default {
  root: {
    '&$selected, &$selected:hover': {
      backgroundColor: '#fff',
    },
    '&$focusVisible': {
      backgroundColor: 'red',
    },
    fontFamily: 'inherit',
  },
  button: {
    margin: '5px 5px 20px 5px',
    padding: 10,
    flexDirection: 'column',
    boxShadow:
      '0 14px 28px rgba(145, 148, 170, 0.25), 0 10px 10px rgba(79, 99, 158, 0.22)',
    // transition: theme.transitions.create('background-color', {
    //   duration: theme.transitions.duration.shortest,
    // }),
    borderRadius: 20,
    backgroundColor: '#ffffff',
    // boxShadow: 'inset 0 0 10px #0f0',
    '&:hover': {
      color: '#fff',
      textDecoration: 'none',
      backgroundColor: '#eaebec',
      fontWeight: 'bold',
      // Reset on touch devices, it doesn't add specificity
      '@media (hover: none)': {
        backgroundColor: 'transparent',
      },
      boxShadow:
        'inset 0 14px 28px rgba(145, 148, 170, 0.25), 0 10px 10px rgba(79, 99, 158, 0.22)',
    },
    width: 70,
    height: 100,
  },
}
