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

// copy to clipboard
const copyToClipboard = (str: string) => {
  const el = document.createElement('textarea')
  el.value = str
  el.setAttribute('readonly', '')
  el.style.position = 'absolute'
  el.style.left = '-9999px'
  el.style.fontSize = '12pt'
  document.body.appendChild(el)

  const selection = document.getSelection()

  if (!selection) {
    return
  }

  const range = document.createRange()
  range.selectNode(el)
  selection.removeAllRanges()
  selection.addRange(range)

  let success = false
  try {
    success = document.execCommand('copy')

    if (!success) {
      throw new Error('copy command was unsuccessful')
    }
  } catch (err) {
    console.error('This error was caught while copying the text', err)
  } finally {
    selection.removeAllRanges()
    document.body.removeChild(el)
  }

  return success
}

const getAttributes = (name: string, str: string): string[] | [] => {
  const re = new RegExp(`${name}="(.*?)"`, 'g')
  const matches = []
  let match = re.exec(str)
  while (match) {
    matches.push(match[1])
    match = re.exec(str)
  }
  return matches.filter(m => !!m)
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
  copyToClipboard,
  getAttributes,
  getLangFromRoot
}
