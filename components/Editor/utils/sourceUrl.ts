export default (value: string) => {
  if (!value) {
    return ''
  }

  if (value.match('(http(s)?://)?(www.)?youtube|youtu.be')) {
    return 'youtube'
  } else if (value.match(/vimeo.com\/(\d+)/)) {
    return 'vimeo'
  } else if (value.match(/id_(.*)\.html/i)) {
    return 'youku'
  } else if (value.match(/http(s)?:\/\/gist.github.com\//)) {
    return 'gist'
  } else if (value.match(/http(s)?:\/\/jsfiddle.net\//)) {
    return 'jsfiddle'
  }
  return ''
}
