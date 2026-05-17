import { parse, print } from 'graphql'
import { describe, expect, it, vi } from 'vitest'

vi.mock('~/components/UserDigest', () => ({
  UserDigest: {
    Rich: {
      fragments: {
        user: {
          public: parse(`
            fragment UserDigestRichUserPublic on User {
              id
            }
          `),
          private: parse(`
            fragment UserDigestRichUserPrivate on User {
              id
            }
          `),
        },
      },
    },
  },
}))

vi.mock('./AuthorSidebar', () => ({
  AuthorSidebar: {
    fragments: {
      article: parse(`
        fragment AuthorSidebarArticle on Article {
          id
        }
      `),
    },
  },
}))

vi.mock('./Channel', () => ({
  default: {
    fragments: {
      article: {
        public: parse(`
          fragment ChannelArticlePublic on Article {
            id
          }
        `),
        private: parse(`
          fragment ChannelArticlePrivate on Article {
            id
          }
        `),
      },
    },
  },
}))

vi.mock('./Header', () => ({
  default: {
    fragments: {
      article: parse(`
        fragment HeaderArticle on Article {
          id
        }
      `),
    },
  },
}))

vi.mock('./MetaInfo', () => ({
  default: {
    fragments: {
      article: parse(`
        fragment MetaInfoArticle on Article {
          id
        }
      `),
    },
  },
}))

vi.mock('./StickyTopBanner', () => ({
  default: {
    fragments: {
      article: parse(`
        fragment StickyTopBannerArticle on Article {
          id
        }
      `),
    },
  },
}))

vi.mock('./Support/SupportWidget/gql', () => ({
  fragments: {
    article: {
      public: parse(`
        fragment SupportWidgetArticlePublic on Article {
          id
        }
      `),
      private: parse(`
        fragment SupportWidgetArticlePrivate on Article {
          id
        }
      `),
    },
  },
}))

vi.mock('./TagList', () => ({
  default: {
    fragments: {
      article: parse(`
        fragment TagListArticle on Article {
          id
        }
      `),
    },
  },
}))

vi.mock('./Toolbar', () => ({
  default: {
    fragments: {
      article: {
        public: parse(`
          fragment ToolbarArticlePublic on Article {
            id
          }
        `),
        private: parse(`
          fragment ToolbarArticlePrivate on Article {
            id
          }
        `),
      },
    },
  },
}))

vi.mock('./Wall/Circle/gql', () => ({
  fragments: {
    circle: {
      public: parse(`
        fragment CircleWallCirclePublic on Circle {
          id
        }
      `),
      private: parse(`
        fragment CircleWallCirclePrivate on Circle {
          id
        }
      `),
    },
  },
}))

describe('ArticleDetail gql', () => {
  it('keeps the comment section visible for Community Watch placeholders', async () => {
    const { ARTICLE_DETAIL_PUBLIC } = await import('./gql')
    const query = print(ARTICLE_DETAIL_PUBLIC)

    expect(query).toContain('comments(input: {filter: {parentComment: null}})')
    expect(query).not.toContain(
      'comments(input: {filter: {state: active, parentComment: null}})'
    )
  })
})
