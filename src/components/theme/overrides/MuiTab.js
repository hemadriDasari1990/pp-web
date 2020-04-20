export default {
  root: {},
  wrapper: {
    flexDirection: 'row',
    color: '#333',
  },
  /* Styles applied to the root element if both `icon` and `label` are provided. */
  labelIcon: {
    minHeight: 40,
    paddingTop: 9,
    '& $wrapper > *:first-child': {
      marginBottom: 6,
    },
  },
  wrapped: {
    lineHeight: 1.5,
  },
  /* Styles applied to the root element if the parent [`Tabs`](/api/tabs/) has `textColor="primary"`. */
  textColorPrimary: {
    color: '#3333',
    '&$selected': {
      color: '#2a7fff',
    },
    '&$disabled': {
      color: '#333',
    },
  },
}
