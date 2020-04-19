import React from 'react'
import SvgIcon from '@material-ui/core/SvgIcon'

const PreferencesIcon = props => (
  <SvgIcon viewBox="0 0 80 80" {...props}>
    <g>
      <path
        fill={props.color}
        d="M40,31c-4.971,0-9,4.029-9,9s4.029,9,9,9s9-4.029,9-9S44.971,31,40,31z M40,44c-2.206,0-4-1.794-4-4s1.794-4,4-4   s4,1.794,4,4S42.206,44,40,44z"
      />
      <path
        fill={props.color}
        d="M66,42.5v-5h-5.162c-0.466-3.924-2.014-7.51-4.339-10.464l3.653-3.653l-3.535-3.536L52.964,23.5   c-2.954-2.324-6.539-3.872-10.464-4.338V14h-5v5.162c-3.924,0.466-7.51,2.014-10.464,4.338l-3.654-3.653l-3.535,3.536l3.653,3.653   c-2.324,2.954-3.872,6.54-4.339,10.464H14v5h5.162c0.466,3.924,2.015,7.51,4.339,10.464l-3.653,3.653l3.535,3.535l3.653-3.653   c2.954,2.324,6.54,3.872,10.464,4.339V66h5v-5.162c3.924-0.466,7.51-2.015,10.464-4.339l3.653,3.653l3.535-3.535l-3.653-3.653   c2.324-2.954,3.872-6.54,4.339-10.464H66z M56,40c0,8.822-7.178,16-16,16s-16-7.178-16-16s7.178-16,16-16S56,31.178,56,40z"
      />
    </g>
  </SvgIcon>
)

export default PreferencesIcon
