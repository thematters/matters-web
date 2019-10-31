import { ADD_TOAST } from '~/common/enums'

const getPath = (url: string) => new URL(url).pathname.replace(/\//g, '')

export const code = (value: string) => {
  if (!value) {
    return ''
  }

  if (value.match(/http(s)?:\/\/jsfiddle.net\//)) {
    return `https://jsfiddle.net/${getPath(value)}/embedded/`
  }

  if (value.match(/http(s)?:\/\/(button\.)?like\.co\//)) {
    // return `https://button.like.co/in/embed/${getPath(value)}/button`
    window.dispatchEvent(
      new CustomEvent(ADD_TOAST, {
        detail: {
          color: 'green',
          translations: {
            zh_hant: '請使用文章頁面中讚賞按鈕',
            zh_hans: '请使用文章页面中赞赏按钮'
          }
        }
      })
    )
  }

  return ''
}

export const video = (value: string) => {
  if (!value) {
    return ''
  }

  let id: string | null
  if (value.match('/(http(s)?://)?(www.)?youtube|youtu.be/')) {
    id = value.match('embed')
      ? value.split(/embed\//)[1].split('"')[0]
      : value.split(/v\/|v=|youtu\.be\//)[1].split(/[?&]/)[0]
    return 'https://www.youtube.com/embed/' + id + '?rel=0'
  } else if (value.match(/vimeo.com\/(\d+)/)) {
    const matches = value.match(/vimeo.com\/(\d+)/)
    id = matches && matches[1]
    return 'https://player.vimeo.com/video/' + id
  } else if (value.match(/id_(.*)\.html/i)) {
    const matches = value.match(/id_(.*)\.html/i)
    id = matches && matches[1]
    return 'http://player.youku.com/embed/' + id
  }
  return ''
}
