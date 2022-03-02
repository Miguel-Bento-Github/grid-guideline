export const property = {
  opacity: 'opacity',
  color: 'color',
  margin: 'margin',
  gutters: 'gutters',
  disabled: 'disabled',
  controller: 'controller',
  width: 'width',
} as const

export interface Property {
  opacity: number
  color: string
  margin: string
  gutters: string
  width?: string
  disabled?: string | boolean
  controller?: string | boolean
}
