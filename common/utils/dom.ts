// Select
export const $ = (selector: string): any => document.querySelector(selector)
export const $$ = (selector: string): any => document.querySelectorAll(selector)

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
    left: rect.left + document.body.scrollLeft
  }
}

export const dom = {
  $,
  $$,
  getWindowHeight,
  getWindowWidth,
  offset
}
