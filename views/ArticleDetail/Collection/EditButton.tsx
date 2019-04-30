import classNames from 'classnames'
import gql from 'graphql-tag'
import _get from 'lodash/get'
import _uniq from 'lodash/uniq'
import { useContext } from 'react'

import {
  ArticleDigest,
  Button,
  Icon,
  LanguageContext,
  TextIcon,
  Translate
} from '~/components'
import { Mutation } from '~/components/GQL'

import { translate } from '~/common/utils'
import ICON_EDIT from '~/static/icons/collection-edit.svg?sprite'
import ICON_SAVE from '~/static/icons/pen.svg?sprite'

import { ArticleDetail_article } from '../__generated__/ArticleDetail'
import { SIDEBAR_COLLECTION } from './CollectionList'
import styles from './styles.css'

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

const IconBox = ({ icon }: { icon: any }) => (
  <Icon id={icon.id} viewBox={icon.viewBox} size="small" />
)

const EditButton = ({
  article,
  editing,
  setEditing,
  editingArticles,
  inPopover
}: {
  article: ArticleDetail_article
  editing: boolean
  setEditing: any
  editingArticles: string[]
  inPopover?: boolean
}) => {
  const { lang } = useContext(LanguageContext)
  const editButtonClass = classNames({
    'edit-button': true,
    inner: inPopover
  })

  if (editing) {
    const refetchQueries = [
      {
        query: SIDEBAR_COLLECTION,
        variables: { mediaHash: article.mediaHash, first: 10 }
      }
    ]

    return (
      <Mutation
        mutation={EDITOR_SET_COLLECTION}
        refetchQueries={refetchQueries}
      >
        {setCollection => (
          <span className={editButtonClass}>
            <Button
              icon={<IconBox icon={ICON_SAVE} />}
              size="small"
              onClick={async () => {
                try {
                  await setCollection({
                    variables: {
                      id: article.id,
                      collection: _uniq(
                        editingArticles.map((item: any) => item.id)
                      ),
                      first: null
                    }
                  })
                  window.dispatchEvent(
                    new CustomEvent('addToast', {
                      detail: {
                        color: 'green',
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
                setEditing(false)
              }}
              outlineColor="green"
            >
              <Translate zh_hant="完成" zh_hans="完成" />
            </Button>
            <style jsx>{styles}</style>
          </span>
        )}
      </Mutation>
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

export default EditButton
