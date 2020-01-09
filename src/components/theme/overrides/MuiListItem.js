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
	    // transition: theme.transitions.create('background-color', {
	    //   duration: theme.transitions.duration.shortest,
	    // }),
	    '&:hover': {
	      textDecoration: 'none',
	      backgroundColor: '#f4f4f4',
	      fontWeight: 'bold',
	      // Reset on touch devices, it doesn't add specificity
	      '@media (hover: none)': {
	        backgroundColor: 'transparent',
	      },
	    },
	    height: 40,
	    width: 250
   },
}