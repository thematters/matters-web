import classNames from 'classnames'
import gql from 'graphql-tag'
import _uniq from 'lodash/uniq'

import {
  Button,
  ButtonProps,
  IconEdit,
  IconPen,
  IconSpinner,
  TextIcon,
  Translate,
} from '~/components'
import { useMutation } from '~/components/GQL'
import articleFragments from '~/components/GQL/fragments/article'

import { ADD_TOAST } from '~/common/enums'

import styles from './styles.css'

import { ArticleDetailPublic_article } from '../__generated__/ArticleDetailPublic'
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
  canEdit,
  editing,
  setEditing,
  editingArticles,
}: {
  article: ArticleDetailPublic_article
  canEdit: boolean
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
          first: null,
        },
      })

      window.dispatchEvent(
        new CustomEvent(ADD_TOAST, {
          detail: {
            color: 'green',
            content: <Translate zh_hant="關聯已更新" zh_hans="关联已更新" />,
            duration: 2000,
          },
        })
      )
    } catch (error) {
      window.dispatchEvent(
        new CustomEvent(ADD_TOAST, {
          detail: {
            color: 'red',
            content: <Translate zh_hant="關聯失敗" zh_hans="关联失敗" />,
            clostButton: true,
            duration: 2000,
          },
        })
      )
    }
    setEditing(false)
  }
  const editButtonClass = classNames({
    'edit-button': true,
  })

  const buttonProps = {
    size: ['4rem', '1.25rem'],
    bgColor: 'grey-lighter',
  } as ButtonProps

  if (!editing) {
    return (
      <span className={editButtonClass}>
        <Button
          {...buttonProps}
          onClick={() => {
            if (!canEdit) {
              window.dispatchEvent(
                new CustomEvent(ADD_TOAST, {
                  detail: {
                    color: 'red',
                    content: <Translate id="FORBIDDEN" />,
                  },
                })
              )
              return
            }
            setEditing(true)
          }}
        >
          <TextIcon
            icon={<IconEdit size="sm" />}
            color="grey"
            size="xs"
            weight="md"
          >
            <Translate id="edit" />
          </TextIcon>
        </Button>

        <style jsx>{styles}</style>
      </span>
    )
  }

  return (
    <span className={editButtonClass}>
      <Button {...buttonProps} onClick={() => setEditing(false)}>
        <TextIcon color="grey" size="xs" weight="md">
          <Translate id="cancel" />
        </TextIcon>
      </Button>

      <Button {...buttonProps} disabled={!!loading} onClick={onSave}>
        <TextIcon
          icon={loading ? <IconSpinner size="xs" /> : <IconPen size="xs" />}
          color="grey"
          size="xs"
          weight="md"
        >
          <Translate id="done" />
        </TextIcon>
      </Button>

      <style jsx>{styles}</style>
    </span>
  )
}

export default EditButton
