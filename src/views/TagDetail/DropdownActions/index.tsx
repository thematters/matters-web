import _isEmpty from 'lodash/isEmpty'
import _pickBy from 'lodash/pickBy'
import { useContext } from 'react'
import { FormattedMessage, useIntl } from 'react-intl'

import { ADD_TOAST, REFETCH_TAG_DETAIL_ARTICLES } from '~/common/enums'
import {
  Button,
  Dropdown,
  IconAdd24,
  IconEdit16,
  IconProfile24,
  IconRemove24,
  IconSettings32,
  Menu,
  TagDialog,
  TagEditorDialog,
  TagLeaveDialog,
  TextIcon,
  useMutation,
  ViewerContext,
} from '~/components'
import { SearchSelectDialog } from '~/components/Dialogs/SearchSelectDialog'
import { SearchSelectNode } from '~/components/Forms/SearchSelectForm'
import ADD_ARTICLES_TAGS from '~/components/GQL/mutations/addArticlesTags'
import updateTagArticlesCount from '~/components/GQL/updates/tagArticlesCount'
import { AddArticlesTagsMutation, TagFragmentFragment } from '~/gql/graphql'
interface DropdownActionsProps {
  // id: string
  isOwner: boolean
  isEditor: boolean
  isMaintainer: boolean
  tag: TagFragmentFragment
}

interface DialogProps {
  openTagAddSelectedArticlesDialog: () => void
  openTagDialog: () => void
  openTagEditorDialog: () => void
  openTagLeaveDialog: () => void
}

interface Controls {
  hasEditTag: boolean
  hasAddSelectedArticle: boolean
  hasManageCommunity: boolean
  hasTagLeave: boolean
}

type BaseDropdownActionsProps = DropdownActionsProps & DialogProps & Controls

const BaseDropdownActions = ({
  hasEditTag,
  hasAddSelectedArticle,
  hasManageCommunity,
  hasTagLeave,

  openTagAddSelectedArticlesDialog,
  openTagDialog,
  openTagEditorDialog,
  openTagLeaveDialog,
}: BaseDropdownActionsProps) => {
  const intl = useIntl()
  const Content = () => (
    <Menu width="sm">
      {hasEditTag && (
        <Menu.Item onClick={openTagDialog} ariaHasPopup="dialog">
          <TextIcon icon={<IconEdit16 size="md" />} size="md" spacing="base">
            <FormattedMessage defaultMessage="Edit" description="" />
          </TextIcon>
        </Menu.Item>
      )}
      {hasAddSelectedArticle && (
        <Menu.Item
          onClick={openTagAddSelectedArticlesDialog}
          ariaHasPopup="dialog"
        >
          <TextIcon icon={<IconAdd24 size="md" />} size="md" spacing="base">
            <FormattedMessage
              defaultMessage="Add Articles into Featured"
              description="src/views/TagDetail/DropdownActions/index.tsx"
            />
          </TextIcon>
        </Menu.Item>
      )}
      {hasManageCommunity && (
        <Menu.Item onClick={openTagEditorDialog} ariaHasPopup="dialog">
          <TextIcon icon={<IconProfile24 size="md" />} size="md" spacing="base">
            <FormattedMessage
              defaultMessage="Manage Community"
              description="src/views/TagDetail/DropdownActions/index.tsx"
            />
          </TextIcon>
        </Menu.Item>
      )}
      {hasTagLeave && (
        <Menu.Item onClick={openTagLeaveDialog} ariaHasPopup="dialog">
          <TextIcon
            icon={<IconRemove24 size="md" />}
            color="red"
            size="md"
            spacing="base"
          >
            <FormattedMessage
              defaultMessage="Resign From Maintainer"
              description="src/views/TagDetail/DropdownActions/index.tsx"
            />
          </TextIcon>
        </Menu.Item>
      )}
    </Menu>
  )

  return (
    <Dropdown content={<Content />}>
      {({ ref }) => (
        <Button
          bgColor="halfBlack"
          aria-label={intl.formatMessage({
            defaultMessage: 'More Actions',
            description: '',
          })}
          aria-haspopup="listbox"
          ref={ref}
        >
          <IconSettings32 size="lg" color="white" />
        </Button>
      )}
    </Dropdown>
  )
}

const DropdownActions = (props: DropdownActionsProps) => {
  const viewer = useContext(ViewerContext)
  const { tag } = props

  const intl = useIntl()
  /**
   * Data
   */
  const [add, { loading }] =
    useMutation<AddArticlesTagsMutation>(ADD_ARTICLES_TAGS)
  const addArticlesToTag =
    (selected: boolean) => async (articles: SearchSelectNode[]) => {
      const articleIds = articles.map((article) => article.id)

      await add({
        variables: { id: tag.id, articles: articleIds, selected },
        update: (cache, { data }) => {
          if (selected) {
            const newCount = data?.addArticlesTags?.articles?.totalCount || 0
            const oldCount = tag.articles.totalCount || 0
            updateTagArticlesCount({
              cache,
              id: tag.id,
              count: newCount - oldCount,
              type: 'increment',
            })
          }
        },
      })

      window.dispatchEvent(
        new CustomEvent(ADD_TOAST, {
          detail: {
            color: 'green',
            content: intl.formatMessage({
              defaultMessage: 'Tags added',
              description: 'src/views/TagDetail/DropdownActions/index.tsx',
            }),
            duration: 2000,
          },
        })
      )

      window.dispatchEvent(
        new CustomEvent(REFETCH_TAG_DETAIL_ARTICLES, {
          detail: {
            event: 'add',
            differences: articles.length,
          },
        })
      )
    }

  const forbid = () => {
    window.dispatchEvent(
      new CustomEvent(ADD_TOAST, {
        detail: {
          color: 'red',
          content: (
            <FormattedMessage
              defaultMessage="You do not have permission to perform this operation"
              description=""
            />
          ),
        },
      })
    )
    return
  }

  const controls = {
    hasEditTag: props.isOwner,
    hasAddSelectedArticle: props.isMaintainer,
    hasManageCommunity: props.isOwner,
    hasTagLeave: props.isOwner || props.isEditor,
  }

  if (_isEmpty(_pickBy(controls))) {
    return null
  }

  return (
    <TagDialog {...props.tag}>
      {({ openDialog: openTagDialog }) => (
        <SearchSelectDialog
          title={
            <FormattedMessage
              defaultMessage="Add Articles into Featured"
              description="src/views/TagDetail/DropdownActions/index.tsx"
            />
          }
          hint="hintEditCollection"
          searchType="Article"
          onSave={addArticlesToTag(true)}
          saving={loading}
        >
          {({ openDialog: openTagAddSelectedArticlesDialog }) => (
            <TagLeaveDialog {...props} id={tag.id}>
              {({ openDialog: openTagLeaveDialog }) => (
                <TagEditorDialog {...props} id={tag.id}>
                  {({ openDialog: openTagEditorDialog }) => (
                    <BaseDropdownActions
                      {...props}
                      {...controls}
                      openTagAddSelectedArticlesDialog={
                        viewer.isFrozen
                          ? forbid
                          : openTagAddSelectedArticlesDialog
                      }
                      openTagDialog={viewer.isFrozen ? forbid : openTagDialog}
                      openTagLeaveDialog={
                        viewer.isFrozen ? forbid : openTagLeaveDialog
                      }
                      openTagEditorDialog={
                        viewer.isFrozen ? forbid : openTagEditorDialog
                      }
                    />
                  )}
                </TagEditorDialog>
              )}
            </TagLeaveDialog>
          )}
        </SearchSelectDialog>
      )}
    </TagDialog>
  )
}

export default DropdownActions
