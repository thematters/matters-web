export const COMMENT_TYPE_TEXT = {
  zh_hant: {
    article: '評論',
    circleBroadcast: '廣播',
    circleDiscussion: '眾聊',
  },
  zh_hans: {
    article: '评论',
    circleBroadcast: '广播',
    circleDiscussion: '众聊',
  },
  en: {
    article: 'comment',
    circleBroadcast: 'broadcast',
    circleDiscussion: 'thread',
  },
}

const PUNCTUATION_CHINESE =
  '\u3002\uff1f\uff01\uff0c\u3001\uff1b\uff1a\u201c\u201d\u2018\u2019\uff08\uff09\u300a\u300b\u3008\u3009\u3010\u3011\u300e\u300f\u300c\u300d\ufe43\ufe44\u3014\u3015\u2026\u2014\uff5e\ufe4f\uffe5'
const PUNCTUATION_ASCII = '\x00-\x2f\x3a-\x40\x5b-\x60\x7a-\x7f'
export const REGEXP_ALL_PUNCTUATIONS = new RegExp(
  `^[${PUNCTUATION_CHINESE}${PUNCTUATION_ASCII}]*$`
)
export const REGEXP_PUNCTUATION = `${PUNCTUATION_CHINESE}\u0000-\u002F\u003A-\u003F\u0041\u005B-\u0060\u007A-\u007F` // without "@"

export const REGEXP_LATIN = '0-9A-Za-z\u00C0-\u00FF'
export const REGEXP_CJK =
  '\u4E00-\u9FFF\u3400-\u4DBF\u20000-\u2A6DF\u2A700-\u2B73F\u2B740-\u2B81F\u2B820-\u2CEAF\u2CEB0-\u2EBEF\u30000-\u3134F\u31350-\u323AF'
