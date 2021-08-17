// 这些模块没有 types 文件

declare module 'source-map-support'
declare module 'validator'
declare module 'date-format'
declare module 'file-extension'

declare namespace JSX {
  interface IntrinsicElements {
    'mp-miniprogram': any
  }
}

interface Window {
  __REDUX_DEVTOOLS_EXTENSION_COMPOSE__: any
  require: any
  nmcApi: any
  myBar: any
  myLine:any
  google:any
}

interface HTMLElement {
  createTextRange: () => void
  collapse: () => void
  select: () => void
}

interface Document {
  selection: any
}
