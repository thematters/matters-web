import classNames from 'classnames'
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
  Spinner,
  TextIcon,
  Translate
} from '~/components'
import { Mutation, Query } from '~/components/GQL'
import { LanguageContext } from '~/components/Language'

import { ANALYTICS_EVENTS, FEED_TYPE } from '~/common/enums'
import {
  analytics,
  getQuery,
  mergeConnections,
  translate
} from '~/common/utils'
import ICON_ADD from '~/static/icons/add.svg?sprite'
import ICON_EDIT from '~/static/icons/collection-edit.svg?sprite'
import ICON_MORE_CONTENT from '~/static/icons/more-content.svg?sprite'
import ICON_SAVE from '~/static/icons/pen.svg?sprite'

import { EditorCollection } from './__generated__/EditorCollection'
import { SidebarCollection } from './__generated__/SidebarCollection'
import styles from './styles.css'

const SIDEBAR_COLLECTION = gql`
  query SidebarCollection(
    $mediaHash: String
    $uuid: UUID
    $cursor: String
    $first: Int
  ) {
    article(input: { mediaHash: $mediaHash, uuid: $uuid }) {
      id
      collection(input: { after: $cursor, first: $first })
        @connection(key: "articleCollection") {
        pageInfo {
          startCursor
          endCursor
          hasNextPage
        }
        totalCount
        edges {
          cursor
          node {
            ...PlainDigestArticle
          }
        }
      }
    }
  }
  ${ArticleDigest.Plain.fragments.article}
`

const EDITOR_COLLECTION = gql`
  query EditorCollection($mediaHash: String, $uuid: UUID, $first: Int) {
    article(input: { mediaHash: $mediaHash, uuid: $uuid }) {
      id
      collection(input: { first: $first })
        @connection(key: "articleCollection") {
        pageInfo {
          startCursor
          endCursor
          hasNextPage
        }
        totalCount
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
      collection(input: { first: $first })
        @connection(key: "articleCollection") {
        totalCount
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

const CollectionEditButton = ({
  editing,
  setEditing,
  inPopover
}: {
  editing: boolean
  setEditing: any
  inPopover?: boolean
}) => {
  const editButtonClass = classNames({
    'edit-button': true,
    inner: inPopover
  })

  if (editing) {
    return (
      <span className={editButtonClass}>
        <Button
          icon={<IconBox icon={ICON_SAVE} />}
          size="small"
          onClick={() => setEditing(false)}
          outlineColor="green"
        >
          <Translate zh_hant="完成" zh_hans="完成" />
        </Button>
        <style jsx>{styles}</style>
      </span>
    )
  }

  return (
    <span className={editButtonClass}>
      <button onClick={() => setEditing(true)}>
        <TextIcon color="grey" icon={<IconBox icon={ICON_EDIT} />}>
          <Translate zh_hant="修訂" zh_hans="修订" />
        </TextIcon>
      </button>
      <style jsx>{styles}</style>
    </span>
  )
}

const CollectionList = ({
  mediaHash,
  uuid,
  setEditing,
  canEdit
}: {
  mediaHash: string | undefined
  uuid: string | undefined
  setEditing: any
  canEdit?: boolean
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
      const { edges, pageInfo, totalCount } = _get(data, path, {})
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

      if (totalCount <= 0 && canEdit) {
        return (
          <button type="button" onClick={() => setEditing(true)}>
            <TextIcon
              icon={
                <Icon
                  id={ICON_ADD.id}
                  viewBox={ICON_ADD.viewBox}
                  size="xsmall"
                />
              }
              spacing="xtight"
              color="green"
              size="sm"
            >
              <Translate zh_hant="關聯一篇作品" zh_hans="关联一篇作品" />
            </TextIcon>
          </button>
        )
      }

      return (
        <>
          <ol>
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
                  <ArticleDigest.Plain article={node} hasArchivedTooltip />
                </li>
              )
            )}
          </ol>

          {pageInfo.hasNextPage && (
            <section className="load-more">
              <button type="button" onClick={loadRest}>
                <TextIcon
                  icon={
                    <Icon
                      id={ICON_MORE_CONTENT.id}
                      viewBox={ICON_MORE_CONTENT.viewBox}
                    />
                  }
                  color="green"
                  size="sm"
                  textPlacement="left"
                  spacing="xxtight"
                >
                  <Translate zh_hans="查看全部" zh_hant="查看全部" />
                </TextIcon>
              </button>
            </section>
          )}

          <style jsx>{styles}</style>
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
          <section className="editing-list">
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

            <style jsx>{styles}</style>
          </section>
        )
      }}
    </Query>
  )
}

const Collection: React.FC<
  WithRouterProps & {
    inPopover?: boolean
    canEdit?: boolean
  }
> = ({ router, inPopover, canEdit }) => {
  const { lang } = useContext(LanguageContext)
  const [editing, setEditing] = useState<boolean>(false)
  const mediaHash = getQuery({ router, key: 'mediaHash' })
  const uuid = getQuery({ router, key: 'post' })

  if (!mediaHash && !uuid) {
    return null
  }

  return (
    <>
      {canEdit && (
        <CollectionEditButton
          editing={editing}
          setEditing={setEditing}
          inPopover={inPopover}
        />
      )}

      {!editing && (
        <CollectionList
          mediaHash={mediaHash}
          uuid={uuid}
          setEditing={setEditing}
          canEdit={canEdit}
        />
      )}

      {editing && (
        <CollectionEditingList mediaHash={mediaHash} uuid={uuid} lang={lang} />
      )}

      <style jsx>{styles}</style>
    </>
  )
}

export default withRouter(Collection)
