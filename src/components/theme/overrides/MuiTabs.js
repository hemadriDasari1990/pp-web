export default {
  root: {},
  indicator: {
    backgroundColor: '#2a7fff',
  },
  /* Styles applied to the root element if the parent [`Tabs`](/api/tabs/) has `textColor="primary"`. */
  textColorPrimary: {
    color: '#3333',
    '&$selected': {
      color: '#2a7fff',
      backgroundColor: '#2a7fff',
    },
    '&$disabled': {
      color: '#333',
    },
  },
}
