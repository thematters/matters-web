import classNames from 'classnames'
import gql from 'graphql-tag'
import _get from 'lodash/get'
import _uniq from 'lodash/uniq'
import { useContext } from 'react'
import { QueryResult } from 'react-apollo'

import { ArticleDigest, Spinner, Translate } from '~/components'
import CollectionEditor from '~/components/CollectionEditor'
import { HeaderContext } from '~/components/GlobalHeader/Context'
import { Mutation, Query } from '~/components/GQL'

import Collapsable from '../Collapsable'
import { CollectArticlesDraft } from './__generated__/CollectArticlesDraft'
import { DraftCollectionQuery } from './__generated__/DraftCollectionQuery'
import styles from './styles.css'

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
        collection(input: { first: 20 }) {
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
      collection(input: { first: 20 }) {
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

  const handleCollectionChange = (setCollection: any) => async (
    articleIds: string[]
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
          collection: _uniq(articleIds)
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

  return (
    <Collapsable
      title={<Translate zh_hans="關聯" zh_hant="关联" />}
      defaultCollapsed={draft.collection.totalCount <= 0}
    >
      <p className="intro">
        <Translate
          zh_hant="關聯自己或他人的作品，幫助讀者更好地發現內容。"
          zh_hans="关联自己或他人的作品，帮助读者更好地发现内容。"
        />
      </p>

      <section className={containerClasses}>
        <Query query={DRAFT_COLLECTION} variables={{ id: draftId }}>
          {({
            data,
            loading
          }: QueryResult & { data: DraftCollectionQuery }) => {
            const edges = _get(data, 'node.collection.edges')

            if (loading || !edges) {
              return <Spinner />
            }

            return (
              <Mutation mutation={SET_DRAFT_COLLECTION}>
                {setCollection => (
                  <CollectionEditor
                    articles={edges.map(({ node }: { node: any }) => node)}
                    onEdit={handleCollectionChange(setCollection)}
                  />
                )}
              </Mutation>
            )
          }}
        </Query>
      </section>

      <style jsx>{styles}</style>
    </Collapsable>
  )
}

CollectArticles.fragments = fragments

export default CollectArticles
