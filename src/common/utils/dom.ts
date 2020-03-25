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

export const getLangFromRoot = (): HTMLLanguage => {
  return (document.documentElement.getAttribute('lang') ||
    'zh-Hant') as HTMLLanguage
}

export const dom = {
  $,
  $$,
  getWindowHeight,
  getWindowWidth,
  offset,
  getAttributes,
  getLangFromRoot,
}
