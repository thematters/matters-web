import classNames from 'classnames'
import gql from 'graphql-tag'
import _uniq from 'lodash/uniq'

import { Button, Icon, TextIcon, Translate } from '~/components'
import { useMutation } from '~/components/GQL'
import articleFragments from '~/components/GQL/fragments/article'

import { ADD_TOAST } from '~/common/enums'

import styles from './styles.css'

import { ArticleDetail_article } from '../__generated__/ArticleDetail'
import { EditorSetCollection } from './__generated__/EditorSetCollection'

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
  ) {
    setCollection(input: { id: $id, collection: $collection }) {
      ...ArticleCollection
    }
  }
  ${articleFragments.articleCollection}
`

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
  const onSave = async () => {
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
            content: <Translate zh_hant="關聯已更新" zh_hans="关联已更新" />,
            duration: 2000
          }
        })
      )
    } catch (error) {
      window.dispatchEvent(
        new CustomEvent(ADD_TOAST, {
          detail: {
            color: 'red',
            content: <Translate zh_hant="關聯失敗" zh_hans="关联失敗" />,
            clostButton: true,
            duration: 2000
          }
        })
      )
    }
    setEditing(false)
  }
  const editButtonClass = classNames({
    'edit-button': true
  })

  if (!editing) {
    return (
      <span className={editButtonClass}>
        <Button
          size={['4rem', '1.5rem']}
          bgHoverColor="grey-lighter"
          onClick={() => setEditing(true)}
        >
          <TextIcon
            color="grey"
            size="xs"
            weight="md"
            icon={<Icon.Edit size="sm" />}
          >
            <Translate zh_hant="修訂" zh_hans="修订" />
          </TextIcon>
        </Button>

        <style jsx>{styles}</style>
      </span>
    )
  }

  return (
    <span className={editButtonClass}>
      <Button
        size={['4rem', '1.5rem']}
        bgColor="grey-lighter"
        onClick={() => setEditing(false)}
      >
        <TextIcon color="grey" size="xs" weight="md">
          <Translate id="cancel" />
        </TextIcon>
      </Button>

      <Button
        size={['4rem', '1.5rem']}
        textColor="green"
        textHoverColor="white"
        bgHoverColor="green"
        borderColor="green"
        disabled={!!loading}
        onClick={onSave}
      >
        <TextIcon
          size="xs"
          weight="md"
          icon={loading ? <Icon.Spinner size="xs" /> : <Icon.Pen size="xs" />}
        >
          <Translate id="done" />
        </TextIcon>
      </Button>

      <style jsx>{styles}</style>
    </span>
  )
}

export default EditButton
