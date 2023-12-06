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
