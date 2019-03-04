export default (url: string) => {
  let id: string | null

  if (url.match('(http(s)?://)?(www.)?youtube|youtu.be')) {
    id = url.match('embed')
      ? url.split(/embed\//)[1].split('"')[0]
      : url.split(/v\/|v=|youtu\.be\//)[1].split(/[?&]/)[0]
    return 'https://www.youtube.com/embed/' + id + '?rel=0'
  } else if (url.match(/vimeo.com\/(\d+)/)) {
    const matches = url.match(/vimeo.com\/(\d+)/)
    id = matches && matches[1]
    return 'http://player.vimeo.com/video/' + id
  } else if (url.match(/id_(.*)\.html/i)) {
    const matches = url.match(/id_(.*)\.html/i)
    id = matches && matches[1]

    return 'http://player.youku.com/embed/' + id
  }

  return false
}
