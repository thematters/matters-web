import gql from 'graphql-tag'
import _get from 'lodash/get'
import _uniq from 'lodash/uniq'
import dynamic from 'next/dynamic'
import { withRouter, WithRouterProps } from 'next/router'
import { useContext, useState } from 'react'
import { QueryResult } from 'react-apollo'

import {
  ArticleDigest,
  Button,
  Icon,
  Label,
  LoadMore,
  Spinner,
  TextIcon,
  Translate
} from '~/components'
import { Mutation, Query } from '~/components/GQL'
import { LanguageContext } from '~/components/Language'
import { ViewerContext } from '~/components/Viewer'

import { ANALYTICS_EVENTS, FEED_TYPE } from '~/common/enums'
import {
  analytics,
  getQuery,
  mergeConnections,
  translate
} from '~/common/utils'
import ICON_EDIT from '~/static/icons/collection-edit.svg?sprite'
import ICON_SAVE from '~/static/icons/pen.svg?sprite'

import { EditorCollection } from './__generated__/EditorCollection'
import { SidebarCollection } from './__generated__/SidebarCollection'

const SIDEBAR_COLLECTION = gql`
  query SidebarCollection(
    $mediaHash: String
    $uuid: UUID
    $cursor: String
    $first: Int
    $hasArticleDigestActionAuthor: Boolean = true
    $hasArticleDigestActionBookmark: Boolean = false
    $hasArticleDigestActionTopicScore: Boolean = false
    $hasArticleDigestCover: Boolean = true
  ) {
    article(input: { mediaHash: $mediaHash, uuid: $uuid }) {
      id
      collection(input: { after: $cursor, first: $first }) {
        pageInfo {
          startCursor
          endCursor
          hasNextPage
        }
        edges {
          cursor
          node {
            ...SidebarDigestArticle
          }
        }
      }
    }
  }
  ${ArticleDigest.Sidebar.fragments.article}
`

const EDITOR_COLLECTION = gql`
  query EditorCollection($mediaHash: String, $uuid: UUID, $first: Int) {
    article(input: { mediaHash: $mediaHash, uuid: $uuid }) {
      id
      collection(input: { after: "", first: $first }) {
        pageInfo {
          startCursor
          endCursor
          hasNextPage
        }
        edges {
          cursor
          node {
            ...DropdownDigestArticle
          }
        }
      }
    }
  }
  ${ArticleDigest.Dropdown.fragments.article}
`

const EDITOR_SET_COLLECTION = gql`
  mutation EditorSetCollection($id: ID!, $collection: [ID!]!, $first: Int) {
    setCollection(input: { id: $id, collection: $collection }) {
      id
      collection(input: { after: "", first: $first }) {
        edges {
          cursor
          node {
            ...DropdownDigestArticle
          }
        }
      }
    }
  }
  ${ArticleDigest.Dropdown.fragments.article}
`

const CollectionEditor = dynamic(
  () => import('~/components/CollectionEditor'),
  {
    ssr: false,
    loading: () => <Spinner />
  }
)

const IconBox = ({ icon }: { icon: any }) => (
  <Icon id={icon.id} viewBox={icon.viewBox} size="small" />
)

const CollectionButton = ({
  editing,
  setEditing,
  isAdmin
}: {
  editing: boolean
  setEditing: any
  isAdmin: boolean
}) => {
  if (!isAdmin) {
    return null
  }

  if (editing) {
    return (
      <Button
        icon={<IconBox icon={ICON_SAVE} />}
        size="small"
        onClick={() => setEditing(false)}
        outlineColor="green"
      >
        <Translate zh_hant="完成" zh_hans="完成" />
      </Button>
    )
  }
  return (
    <button onClick={() => setEditing(true)}>
      <TextIcon color="grey" icon={<IconBox icon={ICON_EDIT} />}>
        <Translate zh_hant="修訂" zh_hans="修订" />
      </TextIcon>
    </button>
  )
}

const CollectionList = ({
  mediaHash,
  uuid
}: {
  mediaHash: string | undefined
  uuid: string | undefined
}) => (
  <Query query={SIDEBAR_COLLECTION} variables={{ mediaHash, uuid, first: 10 }}>
    {({
      data,
      loading,
      error,
      fetchMore
    }: QueryResult & { data: SidebarCollection }) => {
      if (loading) {
        return <Spinner />
      }
      const path = 'article.collection'
      const { edges, pageInfo } = _get(data, path, {})
      const loadRest = () =>
        fetchMore({
          variables: {
            mediaHash,
            uuid,
            cursor: pageInfo.endCursor,
            first: null
          },
          updateQuery: (previousResult, { fetchMoreResult }) =>
            mergeConnections({
              oldData: previousResult,
              newData: fetchMoreResult,
              path
            })
        })

      return (
        <>
          <ul>
            {edges.map(
              ({ node, cursor }: { node: any; cursor: any }, i: number) => (
                <li
                  key={cursor}
                  onClick={() =>
                    analytics.trackEvent(ANALYTICS_EVENTS.CLICK_COLLECTION, {
                      type: FEED_TYPE.COLLECTION,
                      location: i
                    })
                  }
                >
                  <ArticleDigest.Sidebar article={node} hasCover hasAuthor />
                </li>
              )
            )}
          </ul>
          {pageInfo.hasNextPage && (
            <LoadMore
              onClick={loadRest}
              text={<Translate zh_hans="顯示全部篇數" zh_hant="显示全部篇数" />}
            />
          )}
        </>
      )
    }}
  </Query>
)

const CollectionEditingList = ({
  mediaHash,
  uuid,
  lang
}: {
  mediaHash: string | undefined
  uuid: string | undefined
  lang: Language
}) => {
  const refetchQueries = [
    {
      query: SIDEBAR_COLLECTION,
      variables: { mediaHash, uuid, first: 10 }
    }
  ]

  const onEdit = (id: string, setCollection: any) => async (
    articleIds: string[]
  ) => {
    try {
      await setCollection({
        variables: {
          id,
          collection: _uniq(articleIds),
          first: null
        }
      })
      window.dispatchEvent(
        new CustomEvent('addToast', {
          detail: {
            color: 'white',
            content: translate({
              zh_hant: '關聯已更新',
              zh_hans: '关联已更新',
              lang
            }),
            closeButton: true,
            duration: 2000
          }
        })
      )
    } catch (error) {
      window.dispatchEvent(
        new CustomEvent('addToast', {
          detail: {
            color: 'red',
            content: translate({
              zh_hant: '關聯失敗',
              zh_hans: '关联失敗',
              lang
            }),
            clostButton: true,
            duration: 2000
          }
        })
      )
    }
  }

  return (
    <Query
      query={EDITOR_COLLECTION}
      variables={{ mediaHash, uuid, first: null }}
    >
      {({
        data,
        loading,
        error,
        fetchMore
      }: QueryResult & { data: EditorCollection }) => {
        if (loading) {
          return <Spinner />
        }
        const { id } = _get(data, 'article', {})
        const { edges } = _get(data, 'article.collection', {})
        return (
          <Mutation
            mutation={EDITOR_SET_COLLECTION}
            refetchQueries={refetchQueries}
          >
            {setCollection => (
              <CollectionEditor
                articles={edges.map(({ node }: { node: any }) => node)}
                onEdit={onEdit(id, setCollection)}
              />
            )}
          </Mutation>
        )
      }}
    </Query>
  )
}

const Collection: React.FC<WithRouterProps> = ({ router }) => {
  const viewer = useContext(ViewerContext)
  const { lang } = useContext(LanguageContext)
  const [editing, setEditing] = useState<boolean>(false)
  const mediaHash = getQuery({ router, key: 'mediaHash' })
  const uuid = getQuery({ router, key: 'post' })
  if (!mediaHash && !uuid) {
    return null
  }
  return (
    <>
      <header>
        <Label>
          <Translate zh_hant="關聯作品" zh_hans="关联作品" />
        </Label>
        <CollectionButton
          editing={editing}
          setEditing={setEditing}
          isAdmin={viewer.isAdmin}
        />
      </header>
      {!editing && <CollectionList mediaHash={mediaHash} uuid={uuid} />}
      {editing && (
        <CollectionEditingList mediaHash={mediaHash} uuid={uuid} lang={lang} />
      )}
    </>
  )
}

export default withRouter(Collection)
