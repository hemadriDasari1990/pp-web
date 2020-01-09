import palette from '../palette';

export default {
  root: {
    color: palette.icon,
    '&:hover': {
      backgroundColor: '#fff'
    },
    padding: 8,
    backgroundColor: '#e9ebee',
  },
  title: {
  	fontFamily: 'inherit',
  	color: palette.text.primary
  },
  subheader: {
    fontFamily: 'inherit',
    color: palette.text.primary
  }
};
