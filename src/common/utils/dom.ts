// Select
export const $ = (selector: string) => document.querySelector(selector)
export const $$ = (selector: string) => document.querySelectorAll(selector)

// Size
const getWindowHeight = () =>
  window.innerHeight ||
  document.documentElement.clientHeight ||
  document.body.clientHeight
const getWindowWidth = () =>
  window.innerWidth ||
  document.documentElement.clientWidth ||
  document.body.clientWidth

// Position
const offset = (el: HTMLElement) => {
  const rect = el.getBoundingClientRect()

  return {
    top: rect.top + document.body.scrollTop,
    left: rect.left + document.body.scrollLeft,
  }
}

const getAttributes = (name: string, str: string): string[] | [] => {
  const re = new RegExp(`${name}="(.*?)"`, 'g')
  const matches = []
  let match = re.exec(str)
  while (match) {
    matches.push(match[1])
    match = re.exec(str)
  }
  return matches.filter((m) => !!m)
}

// https://github.com/facebook/react/issues/10135#issuecomment-314441175
const setNativeValue = (element: HTMLInputElement, value: string) => {
  const valueSetter = Object.getOwnPropertyDescriptor(element, 'value')?.set
  const prototype = Object.getPrototypeOf(element)
  const prototypeValueSetter = Object.getOwnPropertyDescriptor(
    prototype,
    'value'
  )?.set

  if (valueSetter && valueSetter !== prototypeValueSetter) {
    prototypeValueSetter?.call(element, value)
  } else {
    valueSetter?.call(element, value)
  }
}

export const dom = {
  $,
  $$,
  getWindowHeight,
  getWindowWidth,
  offset,
  getAttributes,
  setNativeValue,
}
