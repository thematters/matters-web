export const $ = (selector: string) => document.querySelector(selector)
export const $$ = (selector: string) => document.querySelectorAll(selector)

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

export const dom = {
  $,
  $$,
  getAttributes,
}

export const isElementInViewport = (element: Element): boolean => {
  const rect = element.getBoundingClientRect()
  return (
    rect.top >= 0 &&
    rect.left >= 0 &&
    rect.bottom <=
      (window.innerHeight || document.documentElement.clientHeight) &&
    rect.right <= (window.innerWidth || document.documentElement.clientWidth)
  )
}
