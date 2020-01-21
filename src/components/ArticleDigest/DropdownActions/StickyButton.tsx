import gql from 'graphql-tag'

import { Icon, TextIcon, Translate } from '~/components'
import { useMutation } from '~/components/GQL'
import updateUserArticles from '~/components/GQL/updates/userArticles'

import styles from './styles.css'

import { StickyButtonArticle } from './__generated__/StickyButtonArticle'
import { UpdateArticleInfo } from './__generated__/UpdateArticleInfo'

const UPDATE_ARTICLE_INFO = gql`
  mutation UpdateArticleInfo($id: ID!, $sticky: Boolean!) {
    updateArticleInfo(input: { id: $id, sticky: $sticky }) {
      id
      sticky
    }
  }
`

const fragments = {
  article: gql`
    fragment StickyButtonArticle on Article {
      id
      sticky
      author {
        id
        userName
      }
    }
  `
}

const StickyButton = ({
  article,
  hideDropdown
}: {
  article: StickyButtonArticle
  hideDropdown: () => void
}) => {
  const [update] = useMutation<UpdateArticleInfo>(UPDATE_ARTICLE_INFO, {
    variables: { id: article.id, sticky: !article.sticky },
    optimisticResponse: {
      updateArticleInfo: {
        id: article.id,
        sticky: !article.sticky,
        __typename: 'Article'
      }
    },
    update: cache => {
      updateUserArticles({
        cache,
        articleId: article.id,
        userName: article.author.userName,
        type: article.sticky ? 'unsticky' : 'sticky'
      })
    }
  })

  return (
    <button
      type="button"
      onClick={() => {
        update()
        hideDropdown()
      }}
    >
      {article.sticky ? (
        <TextIcon icon={<Icon.UnSticky />} spacing="tight">
          <Translate zh_hant="取消置頂" zh_hans="取消置顶" />
        </TextIcon>
      ) : (
        <TextIcon icon={<Icon.PinToTop />} spacing="tight">
          <Translate zh_hant="置頂作品" zh_hans="置顶作品" />
        </TextIcon>
      )}

      <style jsx>{styles}</style>
    </button>
  )
}

StickyButton.fragments = fragments

export default StickyButton
