export const property = {
  opacity: 'opacity',
  color: 'color',
  margin: 'margin',
  gutters: 'gutters',
  disabled: 'disabled',
  controller: 'controller',
} as const

export interface Property {
  opacity: number
  color: string
  margin: string
  gutters: string
  disabled?: string | boolean
  controller?: string | boolean
}
