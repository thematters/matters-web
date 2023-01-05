import _isEmpty from 'lodash/isEmpty'
import _pickBy from 'lodash/pickBy'
import { useContext } from 'react'

import { ADD_TOAST, REFETCH_TAG_DETAIL_ARTICLES } from '~/common/enums'
import { translate } from '~/common/utils'
import {
  Button,
  DropdownDialog,
  IconAdd24,
  IconEdit16,
  IconProfile24,
  IconRemove24,
  IconSettings32,
  LanguageContext,
  Menu,
  TagDialog,
  TagEditorDialog,
  TagLeaveDialog,
  TextIcon,
  Translate,
  useMutation,
  ViewerContext,
} from '~/components'
import { SearchSelectDialog } from '~/components/Dialogs/SearchSelectDialog'
import { SearchSelectNode } from '~/components/Forms/SearchSelectForm'
import ADD_ARTICLES_TAGS from '~/components/GQL/mutations/addArticlesTags'
import updateTagArticlesCount from '~/components/GQL/updates/tagArticlesCount'
import { AddArticlesTagsMutation, TagFragmentFragment } from '~/gql/graphql'

import styles from './styles.css'

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
  const { lang } = useContext(LanguageContext)

  const Content = ({ isInDropdown }: { isInDropdown?: boolean }) => (
    <Menu width={isInDropdown ? 'sm' : undefined}>
      {hasEditTag && (
        <Menu.Item onClick={openTagDialog} ariaHasPopup="dialog">
          <TextIcon icon={<IconEdit16 size="md" />} size="md" spacing="base">
            <Translate id="editTag" />
          </TextIcon>
        </Menu.Item>
      )}
      {hasAddSelectedArticle && (
        <Menu.Item
          onClick={openTagAddSelectedArticlesDialog}
          ariaHasPopup="dialog"
        >
          <TextIcon icon={<IconAdd24 size="md" />} size="md" spacing="base">
            <Translate
              zh_hant="添加精選"
              zh_hans="添加精选"
              en="Add Articles into Featured"
            />
          </TextIcon>
        </Menu.Item>
      )}
      {hasManageCommunity && (
        <Menu.Item onClick={openTagEditorDialog} ariaHasPopup="dialog">
          <TextIcon icon={<IconProfile24 size="md" />} size="md" spacing="base">
            <Translate
              zh_hant="管理社群"
              zh_hans="管理社群"
              en="Manage Community"
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
            <Translate
              zh_hant="辭去權限"
              zh_hans="辞去权限"
              en="Resign From Maintainer"
            />
          </TextIcon>
        </Menu.Item>
      )}
    </Menu>
  )

  return (
    <DropdownDialog
      dropdown={{
        content: <Content isInDropdown />,
        placement: 'bottom-end',
      }}
      dialog={{
        content: <Content />,
        title: 'moreActions',
      }}
    >
      {({ openDialog, type, ref }) => (
        <section className="container">
          <Button
            bgColor="half-black"
            aria-label={translate({ id: 'moreActions', lang })}
            onClick={openDialog}
            aria-haspopup={type}
            ref={ref}
          >
            <IconSettings32 size="lg" color="white" />
          </Button>
          <style jsx>{styles}</style>
        </section>
      )}
    </DropdownDialog>
  )
}

const DropdownActions = (props: DropdownActionsProps) => {
  const viewer = useContext(ViewerContext)
  const { lang } = useContext(LanguageContext)
  const { tag } = props

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
            content: translate({ id: 'addedArticleTag', lang }),
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
          content: <Translate id="FORBIDDEN_BY_STATE" />,
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
          title="tagAddSelectedArticle"
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
