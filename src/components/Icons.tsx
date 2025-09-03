import { SvgIcon, type SvgIconProps } from "@mui/material"

export function MosqueIcon(props: SvgIconProps) {
  return (
    <SvgIcon {...props}>
      <path d="M12 2L8 6v2h8V6l-4-4zm0 8c-1.1 0-2 .9-2 2v8h4v-8c0-1.1-.9-2-2-2zm-6 2c0-1.1-.9-2-2-2s-2 .9-2 2v8h4v-8zm12 0c0-1.1.9-2 2-2s2 .9 2 2v8h-4v-8z" />
    </SvgIcon>
  )
}

export function RestaurantIcon(props: SvgIconProps) {
  return (
    <SvgIcon {...props}>
      <path d="M11 9H9V2H7v7H5V2H3v7c0 2.12 1.66 3.84 3.75 3.97V22h2.5v-9.03C11.34 12.84 13 11.12 13 9V2h-2v7zm5-3v8h2.5v8H21V2c-2.76 0-5 2.24-5 4z" />
    </SvgIcon>
  )
}

export function CalendarIcon(props: SvgIconProps) {
  return (
    <SvgIcon {...props}>
      <path d="M19 3h-1V1h-2v2H8V1H6v2H5c-1.11 0-1.99.9-1.99 2L3 19c0 1.1.89 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm0 16H5V8h14v11zM7 10h5v5H7z" />
    </SvgIcon>
  )
}

export function InfoIcon(props: SvgIconProps) {
  return (
    <SvgIcon {...props}>
      <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-6h2v6zm0-8h-2V7h2v2z" />
    </SvgIcon>
  )
}
