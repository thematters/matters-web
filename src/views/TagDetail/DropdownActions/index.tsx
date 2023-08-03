import _isEmpty from 'lodash/isEmpty'
import _pickBy from 'lodash/pickBy'
import { useContext } from 'react'
import { FormattedMessage, useIntl } from 'react-intl'

import { REFETCH_TAG_DETAIL_ARTICLES } from '~/common/enums'
import {
  Button,
  Dropdown,
  EditTagDialog,
  IconAdd24,
  IconEdit16,
  IconProfile24,
  IconRemove24,
  IconSettings32,
  Menu,
  TagEditorDialog,
  TagLeaveDialog,
  toast,
  useMutation,
  ViewerContext,
} from '~/components'
import { SearchSelectDialog } from '~/components/Dialogs/SearchSelectDialog'
import { SearchSelectNode } from '~/components/Forms/SearchSelectForm'
import { updateTagArticlesCount } from '~/components/GQL'
import ADD_ARTICLES_TAGS from '~/components/GQL/mutations/addArticlesTags'
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
  openEditTagDialog: () => void
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
  openEditTagDialog,
  openTagEditorDialog,
  openTagLeaveDialog,
}: BaseDropdownActionsProps) => {
  const intl = useIntl()
  const Content = () => (
    <Menu>
      {hasEditTag && (
        <Menu.Item
          text={<FormattedMessage defaultMessage="Edit" />}
          icon={<IconEdit16 size="mdS" />}
          onClick={openEditTagDialog}
          ariaHasPopup="dialog"
        />
      )}
      {hasAddSelectedArticle && (
        <Menu.Item
          text={
            <FormattedMessage
              defaultMessage="Add Articles into Featured"
              description="src/views/TagDetail/DropdownActions/index.tsx"
            />
          }
          icon={<IconAdd24 size="mdS" />}
          onClick={openTagAddSelectedArticlesDialog}
          ariaHasPopup="dialog"
        />
      )}
      {hasManageCommunity && (
        <Menu.Item
          text={
            <FormattedMessage
              defaultMessage="Manage Community"
              description="src/views/TagDetail/DropdownActions/index.tsx"
            />
          }
          icon={<IconProfile24 size="mdS" />}
          onClick={openTagEditorDialog}
          ariaHasPopup="dialog"
        />
      )}
      {hasTagLeave && (
        <Menu.Item
          text={
            <FormattedMessage
              defaultMessage="Resign From Maintainer"
              description="src/views/TagDetail/DropdownActions/index.tsx"
            />
          }
          icon={<IconRemove24 size="mdS" />}
          onClick={openTagLeaveDialog}
          ariaHasPopup="dialog"
        />
      )}
    </Menu>
  )

  return (
    <Dropdown content={<Content />}>
      {({ openDropdown, ref }) => (
        <Button
          onClick={openDropdown}
          bgColor="halfBlack"
          aria-label={intl.formatMessage({
            defaultMessage: 'More Actions',
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

      toast.success({
        message: intl.formatMessage({
          defaultMessage: 'Tags added',
          description: 'src/views/TagDetail/DropdownActions/index.tsx',
        }),
      })

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
    toast.error({
      message: (
        <FormattedMessage defaultMessage="You do not have permission to perform this operation" />
      ),
    })
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
    <EditTagDialog {...props.tag}>
      {({ openDialog: openEditTagDialog }) => (
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
                      openEditTagDialog={
                        viewer.isFrozen ? forbid : openEditTagDialog
                      }
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
    </EditTagDialog>
  )
}

export default DropdownActions
