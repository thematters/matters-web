import { useQuery } from '@apollo/react-hooks'
import classNames from 'classnames'
import gql from 'graphql-tag'
import _uniq from 'lodash/uniq'
import dynamic from 'next/dynamic'
import { useContext } from 'react'

import { ArticleDigest, Spinner, Translate } from '~/components'
import { DropdownDigestArticle } from '~/components/ArticleDigest/DropdownDigest/__generated__/DropdownDigestArticle'
import { HeaderContext } from '~/components/GlobalHeader/Context'
import { QueryError, useMutation } from '~/components/GQL'

import Collapsable from '../Collapsable'
import { CollectArticlesDraft } from './__generated__/CollectArticlesDraft'
import { DraftCollectionQuery } from './__generated__/DraftCollectionQuery'
import { SetDraftCollection } from './__generated__/SetDraftCollection'
import styles from './styles.css'

const CollectionEditor = dynamic(
  () => import('~/components/CollectionEditor'),
  {
    ssr: false,
    loading: () => <Spinner />
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
              ...DropdownDigestArticle
            }
          }
        }
      }
    }
  }
  ${ArticleDigest.Dropdown.fragments.article}
`

const SET_DRAFT_COLLECTION = gql`
  mutation SetDraftCollection($id: ID!, $collection: [ID]) {
    putDraft(input: { id: $id, collection: $collection }) {
      id
      collection(input: { first: null }) {
        edges {
          node {
            ...DropdownDigestArticle
          }
        }
      }
    }
  }
  ${ArticleDigest.Dropdown.fragments.article}
`

const CollectArticles = ({ draft }: { draft: CollectArticlesDraft }) => {
  const { updateHeaderState } = useContext(HeaderContext)
  const draftId = draft.id
  const isPending = draft.publishState === 'pending'
  const isPublished = draft.publishState === 'published'
  const containerClasses = classNames({
    container: true,
    'u-area-disable': isPending || isPublished
  })
  const handleCollectionChange = () => async (
    articles: DropdownDigestArticle[]
  ) => {
    updateHeaderState({
      type: 'draft',
      state: 'saving',
      draftId
    })
    try {
      await setCollection({
        variables: {
          id: draft.id,
          collection: _uniq(articles.map(({ id }) => id))
        }
      })
      updateHeaderState({
        type: 'draft',
        state: 'saved',
        draftId
      })
    } catch (e) {
      updateHeaderState({
        type: 'draft',
        state: 'saveFailed',
        draftId
      })
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
      title={<Translate zh_hant="關聯" zh_hans="关联" />}
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
