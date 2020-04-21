export default {
  root: {},
  indicator: {
    // backgroundColor: '#2a7fff',
  },
  /* Styles applied to the root element if the parent [`Tabs`](/api/tabs/) has `textColor="primary"`. */
  textColorPrimary: {
    color: '#2a7fff',
    '&$selected': {
      color: '#fff',
    },
    '&$disabled': {
      color: '#3333',
    },
  },
}
