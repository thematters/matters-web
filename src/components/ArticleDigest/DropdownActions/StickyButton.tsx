import gql from 'graphql-tag'

import { Icon, Menu, TextIcon, Translate } from '~/components'
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

const StickyButton = ({ article }: { article: StickyButtonArticle }) => {
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
    <Menu.Item
      onClick={() => {
        update()
      }}
    >
      {article.sticky ? (
        <TextIcon
          icon={<Icon.UnPinMedium size="md" />}
          size="md"
          spacing="base"
        >
          <Translate id="unstickyArticle" />
        </TextIcon>
      ) : (
        <TextIcon icon={<Icon.PinMedium size="md" />} size="md" spacing="base">
          <Translate id="stickyArticle" />
        </TextIcon>
      )}

      <style jsx>{styles}</style>
    </Menu.Item>
  )
}

StickyButton.fragments = fragments

export default StickyButton
