import gql from 'graphql-tag'

import { Icon, TextIcon, Translate } from '~/components'
import { Mutation } from '~/components/GQL'

import ICON_PIN_TO_TOP from '~/static/icons/pin-to-top.svg?sprite'
import ICON_UNSTICKY from '~/static/icons/unsticky.svg?sprite'

import { StickyButtonArticle } from './__generated__/StickyButtonArticle'
import styles from './styles.css'

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
      }
    }
  `
}

const TextIconUnsticky = () => (
  <TextIcon
    icon={
      <Icon
        id={ICON_UNSTICKY.id}
        viewBox={ICON_UNSTICKY.viewBox}
        size="small"
      />
    }
    spacing="tight"
  >
    <Translate zh_hant="取消置頂" zh_hans="取消置顶" />
  </TextIcon>
)

const TextIconSticky = () => (
  <TextIcon
    icon={
      <Icon
        id={ICON_PIN_TO_TOP.id}
        viewBox={ICON_PIN_TO_TOP.viewBox}
        size="small"
      />
    }
    spacing="tight"
  >
    <Translate zh_hant="置頂作品" zh_hans="置顶作品" />
  </TextIcon>
)

const StickyButton = ({
  article,
  hideDropdown,
  refetch
}: {
  article: StickyButtonArticle
  hideDropdown: () => void
  refetch?: () => void
}) => {
  return (
    <Mutation
      mutation={UPDATE_ARTICLE_INFO}
      variables={{ id: article.id, sticky: !article.sticky }}
      optimisticResponse={{
        updateArticleInfo: {
          id: article.id,
          sticky: !article.sticky,
          __typename: 'Article'
        }
      }}
      onCompleted={() => {
        if (refetch) {
          refetch()
        }
      }}
    >
      {update => (
        <button
          type="button"
          onClick={() => {
            update()
            hideDropdown()
          }}
        >
          {article.sticky ? <TextIconUnsticky /> : <TextIconSticky />}
          <style jsx>{styles}</style>
        </button>
      )}
    </Mutation>
  )
}

StickyButton.fragments = fragments

export default StickyButton
