import _isEmpty from 'lodash/isEmpty'
import _pickBy from 'lodash/pickBy'
import { useContext } from 'react'
import { FormattedMessage, useIntl } from 'react-intl'

import { REFETCH_TAG_DETAIL_ARTICLES } from '~/common/enums'
import {
  Button,
  Dropdown,
  EditTagDialog,
  EditTagDialogProps,
  IconAdd24,
  IconEdit16,
  IconProfile24,
  IconRemove24,
  IconSettings32,
  Menu,
  TagEditorDialog,
  TagEditorDialogProps,
  TagLeaveDialog,
  TagLeaveDialogProps,
  toast,
  useMutation,
  ViewerContext,
  withDialog,
} from '~/components'
import {
  SearchSelectDialog,
  SearchSelectDialogProps,
} from '~/components/Dialogs/SearchSelectDialog'
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
          text={<FormattedMessage defaultMessage="Edit" id="wEQDC6" />}
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
              id="ySGgTo"
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
              id="L7Si5/"
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
              id="GRtGnZ"
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
            id: 'A7ugfn',
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
          id: 'UjKkhq',
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
        <FormattedMessage
          defaultMessage="You do not have permission to perform this operation"
          id="5FO4vn"
        />
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

  const WithEditTag = withDialog<Omit<EditTagDialogProps, 'children'>>(
    BaseDropdownActions,
    EditTagDialog,
    { ...props.tag },
    ({ openDialog }) => {
      return {
        ...props,
        ...controls,
        openEditTagDialog: viewer.isFrozen ? forbid : openDialog,
      }
    }
  )
  const WithSearchSelect = withDialog<
    Omit<SearchSelectDialogProps, 'children'>
  >(
    WithEditTag,
    SearchSelectDialog,
    {
      title: (
        <FormattedMessage
          defaultMessage="Add Articles into Featured"
          id="ySGgTo"
          description="src/views/TagDetail/DropdownActions/index.tsx"
        />
      ),
      hint: 'hintEditCollection',
      searchType: 'Article',
      onSave: addArticlesToTag(true),
      saving: loading,
    },
    ({ openDialog }) => ({
      openTagAddSelectedArticlesDialog: viewer.isFrozen ? forbid : openDialog,
    })
  )
  const WithTagLeave = withDialog<Omit<TagLeaveDialogProps, 'children'>>(
    WithSearchSelect,
    TagLeaveDialog,
    { ...props, id: tag.id },
    ({ openDialog }) => ({
      openTagLeaveDialog: viewer.isFrozen ? forbid : openDialog,
    })
  )
  const WithTagEditor = withDialog<Omit<TagEditorDialogProps, 'children'>>(
    WithTagLeave,
    TagEditorDialog,
    { ...props, id: tag.id },
    ({ openDialog }) => ({
      openTagEditorDialog: viewer.isFrozen ? forbid : openDialog,
    })
  )

  return <WithTagEditor />
}

export default DropdownActions
