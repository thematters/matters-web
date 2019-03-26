export default (value: string) => {
  if (!value) {
    return ''
  }

  if (value.match(/http(s)?:\/\/gist.github.com\//)) {
    return value
  } else if (value.match(/http(s)?:\/\/jsfiddle.net\//)) {
    const path = new URL(value).pathname
    return `https://jsfiddle.net${path}${
      path.endsWith('/') ? '' : '/'
    }embedded/`
  }
  return ''
}
