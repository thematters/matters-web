import { useQuery } from '@apollo/react-hooks'
import classNames from 'classnames'
import gql from 'graphql-tag'
import _uniq from 'lodash/uniq'
import dynamic from 'next/dynamic'

import { ArticleDigestDropdown, Spinner, Translate } from '~/components'
import { QueryError, useMutation } from '~/components/GQL'

import Collapsable from '../Collapsable'
import styles from './styles.css'

import { ArticleDigestDropdownArticle } from '~/components/ArticleDigest/Dropdown/__generated__/ArticleDigestDropdownArticle'
import { CollectArticlesDraft } from './__generated__/CollectArticlesDraft'
import { DraftCollectionQuery } from './__generated__/DraftCollectionQuery'
import { SetDraftCollection } from './__generated__/SetDraftCollection'

const CollectionEditor = dynamic(
  () => import('~/components/CollectionEditor'),
  {
    ssr: false,
    loading: Spinner
  }
)

const fragments = {
  draft: gql`
    fragment CollectArticlesDraft on Draft {
      id
      publishState
      collection(input: { first: 0 }) {
        totalCount
      }
    }
  `
}

const DRAFT_COLLECTION = gql`
  query DraftCollectionQuery($id: ID!) {
    node(input: { id: $id }) {
      id
      ... on Draft {
        collection(input: { first: null }) {
          edges {
            node {
              ...ArticleDigestDropdownArticle
            }
          }
        }
      }
    }
  }
  ${ArticleDigestDropdown.fragments.article}
`

const SET_DRAFT_COLLECTION = gql`
  mutation SetDraftCollection($id: ID!, $collection: [ID]) {
    putDraft(input: { id: $id, collection: $collection }) {
      id
      collection(input: { first: null }) {
        edges {
          node {
            ...ArticleDigestDropdownArticle
          }
        }
      }
    }
  }
  ${ArticleDigestDropdown.fragments.article}
`

interface CollectArticlesProps {
  draft: CollectArticlesDraft
  setSaveStatus: (status: 'saved' | 'saving' | 'saveFailed') => void
}

const CollectArticles = ({ draft, setSaveStatus }: CollectArticlesProps) => {
  const draftId = draft.id
  const isPending = draft.publishState === 'pending'
  const isPublished = draft.publishState === 'published'
  const containerClasses = classNames({
    container: true,
    'u-area-disable': isPending || isPublished
  })
  const handleCollectionChange = () => async (
    articles: ArticleDigestDropdownArticle[]
  ) => {
    setSaveStatus('saving')
    try {
      await setCollection({
        variables: {
          id: draft.id,
          collection: _uniq(articles.map(({ id }) => id))
        }
      })
      setSaveStatus('saved')
    } catch (e) {
      setSaveStatus('saveFailed')
    }
  }

  const [setCollection] = useMutation<SetDraftCollection>(SET_DRAFT_COLLECTION)
  const { data, loading, error } = useQuery<DraftCollectionQuery>(
    DRAFT_COLLECTION,
    {
      variables: { id: draftId }
    }
  )
  const edges =
    data &&
    data.node &&
    data.node.__typename === 'Draft' &&
    data.node.collection &&
    data.node.collection.edges

  return (
    <Collapsable
      title={<Translate id="extend" />}
      defaultCollapsed={draft.collection.totalCount <= 0}
    >
      <p className="intro">
        <Translate
          zh_hant="關聯自己或他人的作品，幫助讀者更好地發現內容。"
          zh_hans="关联自己或他人的作品，帮助读者更好地发现内容。"
        />
      </p>

      <section className={containerClasses}>
        {loading && <Spinner />}

        {error && <QueryError error={error} />}

        <CollectionEditor
          articles={(edges && edges.map(({ node }) => node)) || []}
          onEdit={handleCollectionChange()}
        />
      </section>

      <style jsx>{styles}</style>
    </Collapsable>
  )
}

CollectArticles.fragments = fragments

export default CollectArticles
