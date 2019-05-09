// match and decode uri

const urlMatcher = (node: Node & { data: any }, delta: any) => {
  const isUrl = /(https?:\/\/[^\s]+)|(www\.[^\s]+)/g
  if (typeof node.data !== 'string') {
    return
  }

  const matches = node.data.match(isUrl)
  if (matches && matches.length > 0) {
    const ops: any[] = []
    let str = node.data
    matches.forEach(match => {
      const split = str.split(match)

      // get and push prefix
      const beforeLink = split.shift()
      ops.push({ insert: beforeLink })

      // get and push decoded uri
      ops.push({ insert: decodeURI(match), attributes: { link: match } })

      // preserved the rest
      str = split.join(decodeURI(match))
    })

    // push the rest of data
    ops.push({ insert: str })
    delta.ops = ops
  }

  return delta
}

export default urlMatcher
