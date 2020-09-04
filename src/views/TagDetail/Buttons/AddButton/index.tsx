import { useContext } from 'react'

import {
  Button,
  DropdownDialog,
  IconPen,
  LanguageContext,
  Menu,
  TextIcon,
  Translate,
  ViewerContext,
} from '~/components'
import {
  SearchSelectDialog,
  SearchSelectNode,
} from '~/components/Dialogs/SearchSelectDialog'
import { useMutation } from '~/components/GQL'
import ADD_ARTICLES_TAGS from '~/components/GQL/mutations/addArticlesTags'
import updateTagArticlesCount from '~/components/GQL/updates/tagArticlesCount'

import { ADD_TOAST, REFETCH_TAG_DETAIL_ARTICLES } from '~/common/enums'
import { translate } from '~/common/utils'

import AddMyArticlesButton from './AddMyArticlesButton'
import CreateDraftMenuItem from './CreateDraftMenuItem'

import { AddArticlesTags } from '~/components/GQL/mutations/__generated__/AddArticlesTags'
import { TagDetailPublic_node_Tag } from '../../__generated__/TagDetailPublic'

interface DropdownActionsProps {
  tag: TagDetailPublic_node_Tag
}

interface DialogProps {
  openAddMyArticlesDialog: () => void
}

type BaseDropdownActionsProps = DropdownActionsProps & DialogProps

const BaseDropdownActions = ({
  tag,
  openAddMyArticlesDialog,
}: BaseDropdownActionsProps) => {
  const Content = ({ isInDropdown }: { isInDropdown?: boolean }) => (
    <Menu width={isInDropdown ? 'sm' : undefined}>
      <CreateDraftMenuItem tag={tag} />

      <AddMyArticlesButton onClick={openAddMyArticlesDialog} />
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
        <Button
          size={['5rem', '2rem']}
          textColor="gold"
          textActiveColor="white"
          bgActiveColor="gold"
          borderColor="gold"
          onClick={open}
          aria-haspopup="true"
          ref={ref}
        >
          <TextIcon icon={<IconPen />} weight="md" size="md-s">
            <Translate zh_hant="投稿" zh_hans="投稿" />
          </TextIcon>
        </Button>
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

  /**
   * Render
   */
  return (
    <SearchSelectDialog
      title="tagAddArticle"
      hint="hintEditCollection"
      searchType="Article"
      searchFilter={{ authorId: viewer.id }}
      onSave={addArticlesToTag(false)}
      saving={loading}
    >
      {({ open: openAddMyArticlesDialog }) => (
        <BaseDropdownActions
          {...props}
          openAddMyArticlesDialog={
            viewer.isFrozen ? forbid : openAddMyArticlesDialog
          }
        />
      )}
    </SearchSelectDialog>
  )
}

export default DropdownActions
