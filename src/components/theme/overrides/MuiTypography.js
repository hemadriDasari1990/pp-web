import palette from '../palette'

export default {
  gutterBottom: {
    marginBottom: 8,
  },
  root: {},
  // body1: {
  //   fontSize: 13
  // },
  h1: {
    color: palette.text.primary,
    fontWeight: 500,
    fontSize: '35px',
    letterSpacing: '-0.24px',
    lineHeight: '40px',
  },
  h2: {
    color: palette.text.primary,
    fontWeight: 500,
    fontSize: '29px',
    letterSpacing: '-0.24px',
    lineHeight: '32px',
  },
  h3: {
    color: palette.text.primary,
    fontWeight: 500,
    fontSize: '24px',
    letterSpacing: '-0.06px',
    lineHeight: '28px',
  },
  h4: {
    color: palette.text.secondary,
    fontWeight: 500,
    fontSize: '20px',
    letterSpacing: '-0.06px',
    lineHeight: '24px',
  },
  h5: {
    color: palette.text.primary,
    fontWeight: 500,
    fontSize: '16px',
    letterSpacing: '-0.05px',
    lineHeight: '20px',
  },
  h6: {
    color: palette.text.primary,
    fontWeight: 500,
    fontSize: '14px',
    letterSpacing: '-0.05px',
    lineHeight: '20px',
  },
  subtitle1: {
    color: palette.text.primary,
    fontSize: 35,
    letterSpacing: '-0.05px',
    lineHeight: '25px',
    fontWeight: 600,
    padding: 20,
    color: palette.primary.main,
  },
  subtitle2: {
    color: palette.text.secondary,
    fontWeight: 400,
    fontSize: '14px',
    letterSpacing: '-0.05px',
    lineHeight: '21px',
  },
  body1: {
    color: palette.text.primary,
    fontSize: 13,
    letterSpacing: '-0.05px',
    lineHeight: '21px',
  },
  body2: {
    color: palette.text.secondary,
    fontSize: 14,
    letterSpacing: '-0.04px',
    lineHeight: '18px',
    whiteSpace: 'initial',
    // marginTop: 10,
  },
  button: {
    color: palette.text.primary,
    fontSize: '14px',
  },
  caption: {
    color: palette.color,
    fontFamily: `inherit`,
    display: 'inline-block',
    fontSize: 22,
    lineHeight: 3,
    paddingLeft: 8,
    position: 'relative',
    top: -1.5,
    verticalAlign: 'middle',
  },
  overline: {
    background: palette.secondary.main,
    color: palette.color,
    borderRadius: 6,
    textAlign: 'center',
    marginLeft: 5,
    fontFamily: `inherit`,
    display: 'inline-block',
    fontSize: 15,
    width: 60,
    lineHeight: 2.1,
  },
}
