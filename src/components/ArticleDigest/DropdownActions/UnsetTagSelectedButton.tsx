import gql from 'graphql-tag'
import { useRouter } from 'next/router'

import { Icon, TextIcon, Translate } from '~/components'
import { useMutation } from '~/components/GQL'

import { ADD_TOAST } from '~/common/enums'

import styles from './styles.css'

import { UnsetTagSelected } from './__generated__/UnsetTagSelected'
import { UnsetTagSelectedButtonArticle } from './__generated__/UnsetTagSelectedButtonArticle'

const UNSET_TAG_SELECTED = gql`
  mutation UnsetTagSelected($id: ID!, $articles: [ID!]) {
    putArticlesTags(input: { id: $id, articles: $articles, selected: false }) {
      id
    }
  }
`

const fragments = {
  article: gql`
    fragment UnsetTagSelectedButtonArticle on Article {
      id
    }
  `
}

const UnsetTagSelectedButton = ({
  article,
  hideDropdown
}: {
  article: UnsetTagSelectedButtonArticle
  hideDropdown: () => void
}) => {
  const router = useRouter()
  const [update] = useMutation<UnsetTagSelected>(UNSET_TAG_SELECTED, {
    variables: { id: router.query.id, articles: [article.id] }
  })

  return (
    <button
      type="button"
      onClick={async event => {
        event.stopPropagation()
        await update()
        window.dispatchEvent(
          new CustomEvent(ADD_TOAST, {
            detail: {
              color: 'green',
              content: (
                <Translate zh_hant="文章已取消精選" zh_hans="文章已取消精选" />
              ),
              closeButton: true,
              duration: 2000
            }
          })
        )
        hideDropdown()
      }}
    >
      <TextIcon icon={<Icon.UnSticky />} spacing="tight">
        <Translate zh_hant="取消精選" zh_hans="取消精选" />
      </TextIcon>
      <style jsx>{styles}</style>
    </button>
  )
}

UnsetTagSelectedButton.fragments = fragments

export default UnsetTagSelectedButton
