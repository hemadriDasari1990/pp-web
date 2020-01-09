import { colors } from '@material-ui/core';

const white = '#FFFFFF';
const black = '#333';

export default {
  black,
  white,
  primary: {
    contrastText: white,
    dark: '#616b8f',
    main: '#616b8f',
    light: '#616b8f'
  },
  secondary: {
    contrastText: white,
    dark: colors.orange[900],
    main: colors.orange[500],
    light: colors.orange[400]
  },
  success: {
    contrastText: white,
    dark: colors.green[900],
    main: colors.green[600],
    light: colors.green[400]
  },
  info: {
    contrastText: white,
    dark: colors.blue[900],
    main: colors.blue[600],
    light: colors.blue[400]
  },
  warning: {
    contrastText: white,
    dark: colors.orange[900],
    main: colors.orange[600],
    light: colors.orange[400]
  },
  error: {
    contrastText: white,
    dark: colors.red[900],
    main: colors.red[600],
    light: colors.red[400]
  },
  text: {
    primary: colors.blueGrey[900],
    secondary: colors.blueGrey[900],
    link: colors.blue[600]
  },
  background: {
    default: '#e9ebee',
    paper: white
  },
  icon: colors.blueGrey[900],
  divider: colors.grey[200],
  color: white
};
