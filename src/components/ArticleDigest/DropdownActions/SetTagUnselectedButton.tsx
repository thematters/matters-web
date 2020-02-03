import gql from 'graphql-tag'
import _filter from 'lodash/filter'
import _get from 'lodash/get'
import { useRouter } from 'next/router'

import { Icon, TextIcon, Translate } from '~/components'
import { useMutation } from '~/components/GQL'

import { ADD_TOAST } from '~/common/enums'

import styles from './styles.css'

import {
  TagArticles,
  TagArticles_node_Tag
} from '~/components/GQL/queries/__generated__/TagArticles'
import { SetTagUnselected } from './__generated__/SetTagUnselected'
import { SetTagUnselectedButtonArticle } from './__generated__/SetTagUnselectedButtonArticle'

const SET_TAG_UNSELECTED = gql`
  mutation SetTagUnselected($id: ID!, $articles: [ID!]) {
    putArticlesTags(input: { id: $id, articles: $articles, selected: false }) {
      id
      articles(input: { first: 0, selected: true }) {
        totalCount
      }
    }
  }
`

const fragments = {
  article: gql`
    fragment SetTagUnselectedButtonArticle on Article {
      id
    }
  `
}

const SetTagUnselectedButton = ({
  article,
  hideDropdown
}: {
  article: SetTagUnselectedButtonArticle
  hideDropdown: () => void
}) => {
  const router = useRouter()
  const [update] = useMutation<SetTagUnselected>(SET_TAG_UNSELECTED, {
    variables: { id: router.query.id, articles: [article.id] },
    update: cache => {
      try {
        const query = require('~/components/GQL/queries/tagArticles').default
        const variables = { id: router.query.id, selected: true }
        const data = cache.readQuery<TagArticles>({ query, variables })
        const node = _get(data, 'node', {}) as TagArticles_node_Tag
        if (
          !node.articles ||
          !node.articles.edges ||
          node.articles.edges.length === 0
        ) {
          return
        }
        const newEdges = node.articles.edges.filter(
          item => item.node.id !== article.id
        )
        cache.writeQuery({
          query,
          variables,
          data: {
            node: {
              ...node,
              articles: {
                ...node.articles,
                edges: newEdges
              }
            }
          }
        })
        sync()
      } catch (error) {
        console.error(error)
      }
    }
  })

  const sync = () => {
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
  }

  return (
    <button
      type="button"
      onClick={async event => {
        event.stopPropagation()
        await update()
      }}
    >
      <TextIcon icon={<Icon.UnPinMedium />} spacing="tight">
        <Translate zh_hant="取消精選" zh_hans="取消精选" />
      </TextIcon>
      <style jsx>{styles}</style>
    </button>
  )
}

SetTagUnselectedButton.fragments = fragments

export default SetTagUnselectedButton
