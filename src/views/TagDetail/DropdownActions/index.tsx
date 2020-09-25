import { useContext } from 'react'

import {
  Button,
  DropdownDialog,
  IconAddMedium,
  IconEdit,
  IconMoreLarge,
  IconProfileMedium,
  IconRemoveMedium,
  LanguageContext,
  Menu,
  TagDialog,
  TagEditorDialog,
  TagLeaveDialog,
  TextIcon,
  Translate,
  useResponsive,
  ViewerContext,
} from '~/components'
import {
  SearchSelectDialog,
  SearchSelectNode,
} from '~/components/Dialogs/SearchSelectDialog'
import { useMutation } from '~/components/GQL'
import ADD_ARTICLES_TAGS from '~/components/GQL/mutations/addArticlesTags'
import updateTagArticlesCount from '~/components/GQL/updates/tagArticlesCount'

import { ADD_TOAST, REFETCH_TAG_DETAIL_ARTICLES, TEXT } from '~/common/enums'
import { translate } from '~/common/utils'

import styles from './styles.css'

import { AddArticlesTags } from '~/components/GQL/mutations/__generated__/AddArticlesTags'
import { TagDetailPublic_node_Tag } from '../__generated__/TagDetailPublic'

interface DropdownActionsProps {
  isOwner: boolean
  isEditor: boolean
  tag: TagDetailPublic_node_Tag
}

interface DialogProps {
  openTagAddSelectedArticlesDialog: () => void
  openTagDialog: () => void
  openTagEditorDialog: () => void
  openTagLeaveDialog: () => void
}

type BaseDropdownActionsProps = DropdownActionsProps & DialogProps

const BaseDropdownActions = ({
  isOwner,
  isEditor,
  openTagAddSelectedArticlesDialog,
  openTagDialog,
  openTagEditorDialog,
  openTagLeaveDialog,
}: BaseDropdownActionsProps) => {
  const isSmallUp = useResponsive('sm-up')

  const Content = ({ isInDropdown }: { isInDropdown?: boolean }) => (
    <Menu width={isInDropdown ? 'sm' : undefined}>
      {isOwner && (
        <Menu.Item onClick={openTagDialog}>
          <TextIcon icon={<IconEdit size="md" />} size="md" spacing="base">
            <Translate id="editTag" />
          </TextIcon>
        </Menu.Item>
      )}
      <Menu.Item onClick={openTagAddSelectedArticlesDialog}>
        <TextIcon icon={<IconAddMedium size="md" />} size="md" spacing="base">
          <Translate id="tagAddSelectedArticle" />
        </TextIcon>
      </Menu.Item>

      {isOwner && (
        <Menu.Item onClick={openTagEditorDialog}>
          <TextIcon
            icon={<IconProfileMedium size="md" />}
            size="md"
            spacing="base"
          >
            <Translate zh_hant="管理社群" zh_hans="管理社群" />
          </TextIcon>
        </Menu.Item>
      )}
      {(isOwner || isEditor) && (
        <Menu.Item onClick={openTagLeaveDialog}>
          <TextIcon
            icon={<IconRemoveMedium size="md" />}
            color="red"
            size="md"
            spacing="base"
          >
            <Translate zh_hant="辭去權限" zh_hans="辞去权限" />
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
      {({ open, ref }) => (
        <section className="container">
          <Button
            bgColor={isSmallUp ? 'green-lighter' : 'half-black'}
            aria-label={TEXT.zh_hant.moreActions}
            aria-haspopup="true"
            onClick={open}
            ref={ref}
          >
            <IconMoreLarge size="lg" color={isSmallUp ? 'green' : 'white'} />
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
  const [add, { loading }] = useMutation<AddArticlesTags>(ADD_ARTICLES_TAGS)
  const addArticlesToTag = (selected: boolean) => async (
    articles: SearchSelectNode[]
  ) => {
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

  return (
    <TagDialog {...props.tag}>
      {({ open: openTagDialog }) => (
        <SearchSelectDialog
          title="tagAddSelectedArticle"
          hint="hintEditCollection"
          searchType="Article"
          onSave={addArticlesToTag(true)}
          saving={loading}
        >
          {({ open: openTagAddSelectedArticlesDialog }) => (
            <TagLeaveDialog {...props}>
              {({ open: openTagLeaveDialog }) => (
                <TagEditorDialog {...props}>
                  {({ open: openTagEditorDialog }) => (
                    <BaseDropdownActions
                      {...props}
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
