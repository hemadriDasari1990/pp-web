import { colors } from '@material-ui/core'

const white = '#FFFFFF'
const black = '#606770'

export default {
  common: {
    contrastText: white,
    dark: '#e4e6eb',
    main: '#e4e6eb',
    light: '#e4e6eb',
  },
  primary: {
    contrastText: white,
    dark: '#5383ff',
    main: '#5383ff',
    light: '#5383ff',
  },
  secondary: {
    contrastText: white,
    dark: white,
    main: white,
    light: white,
  },
  success: {
    contrastText: white,
    dark: colors.green[900],
    main: colors.green[600],
    light: colors.green[400],
  },
  info: {
    contrastText: white,
    dark: colors.blue[900],
    main: colors.blue[600],
    light: colors.blue[400],
  },
  warning: {
    contrastText: white,
    dark: colors.orange[900],
    main: colors.orange[600],
    light: colors.orange[400],
  },
  error: {
    contrastText: white,
    dark: colors.red[900],
    main: colors.red[600],
    light: colors.red[400],
  },
  text: {
    primary: colors.blueGrey[900],
    secondary: colors.blueGrey[900],
    link: colors.blue[600],
  },
  background: {
    default: '#fff',
    paper: white,
  },
  icon: colors.white,
  divider: colors.grey[200],
  color: white,
}
