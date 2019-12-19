import classNames from 'classnames'
import gql from 'graphql-tag'
import _uniq from 'lodash/uniq'
import { useContext } from 'react'

import {
  Button,
  Icon,
  LanguageContext,
  TextIcon,
  Translate
} from '~/components'
import { useMutation } from '~/components/GQL'
import articleFragments from '~/components/GQL/fragments/article'
import IconSpinner from '~/components/Icon/Spinner'

import { ADD_TOAST, TEXT } from '~/common/enums'
import { translate } from '~/common/utils'
import ICON_EDIT from '~/static/icons/collection-edit.svg?sprite'
import ICON_SAVE from '~/static/icons/pen.svg?sprite'

import { ArticleDetail_article } from '../__generated__/ArticleDetail'
import { EditorSetCollection } from './__generated__/EditorSetCollection'
import styles from './styles.css'

/**
 * Note:
 *
 * The response of this mutation is aligned with `COLLECTION_LIST` in `CollectionList.tsx`,
 * so that it will auto update the local cache and prevent refetch logics
 */
const EDITOR_SET_COLLECTION = gql`
  mutation EditorSetCollection(
    $id: ID!
    $after: String
    $first: Int
    $collection: [ID!]!
    $hasArticleDigestActionBookmark: Boolean = false
    $hasArticleDigestCover: Boolean = true
    $hasArticleDigestActionTopicScore: Boolean = false
  ) {
    setCollection(input: { id: $id, collection: $collection }) {
      ...ArticleCollection
    }
  }
  ${articleFragments.articleCollection}
`

const IconBox = ({ icon }: { icon: any }) => (
  <Icon id={icon.id} viewBox={icon.viewBox} size="small" />
)

const EditButton = ({
  article,
  editing,
  setEditing,
  editingArticles
}: {
  article: ArticleDetail_article
  editing: boolean
  setEditing: any
  editingArticles: string[]
}) => {
  const [setCollection, { loading }] = useMutation<EditorSetCollection>(
    EDITOR_SET_COLLECTION
  )
  const { lang } = useContext(LanguageContext)
  const editButtonClass = classNames({
    'edit-button': true
  })

  if (!editing) {
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

  return (
    <span className={editButtonClass}>
      <Button
        type="button"
        bgColor="transparent"
        textColor="grey"
        spacing="tight"
        size="small"
        onClick={() => setEditing(false)}
      >
        <Translate
          zh_hant={TEXT.zh_hant.cancel}
          zh_hans={TEXT.zh_hans.cancel}
        />
      </Button>

      <Button
        icon={loading ? <IconSpinner /> : <IconBox icon={ICON_SAVE} />}
        size="small"
        disabled={!!loading}
        onClick={async () => {
          try {
            await setCollection({
              variables: {
                id: article.id,
                collection: _uniq(editingArticles.map((item: any) => item.id)),
                first: null
              }
            })
            window.dispatchEvent(
              new CustomEvent(ADD_TOAST, {
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
              new CustomEvent(ADD_TOAST, {
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
        <Translate zh_hant={TEXT.zh_hant.done} zh_hans={TEXT.zh_hans.done} />
      </Button>

      <style jsx>{styles}</style>
    </span>
  )
}

export default EditButton
