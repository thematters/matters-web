import { useContext } from 'react'

import {
  Button,
  DropdownDialog,
  IconAdd16,
  IconArticle16,
  LanguageContext,
  Menu,
  TextIcon,
  Translate,
  useMutation,
  ViewerContext,
} from '~/components'
import { SearchSelectDialog } from '~/components/Dialogs/SearchSelectDialog'
import { SearchSelectNode } from '~/components/Forms/SearchSelectForm'

import { ADD_TOAST, REFETCH_TOPIC } from '~/common/enums'
import { translate } from '~/common/utils'

import { ADD_CHAPTER_ARTICLES, fragments } from './gql'

import { AddButtonChapter } from './__generated__/AddButtonChapter'
import { AddChapterArticles } from './__generated__/AddChapterArticles'

interface AddButtonProps {
  chapter: AddButtonChapter
}

interface DialogProps {
  openAddArticlesDialog: () => void
}

type BaseAddButtonProps = DialogProps

const BaseAddButton = ({ openAddArticlesDialog }: BaseAddButtonProps) => {
  const Content = ({ isInDropdown }: { isInDropdown?: boolean }) => (
    <Menu width={isInDropdown ? 'sm' : undefined}>
      <Menu.Item onClick={openAddArticlesDialog}>
        <TextIcon icon={<IconArticle16 size="md" />} size="md" spacing="base">
          <Translate id="article" />
        </TextIcon>
      </Menu.Item>
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
      {({ openDialog, ref }) => (
        <Button
          borderColor="black"
          spacing={[0, 'tight']}
          size={[null, '2rem']}
          borderWidth="sm"
          onClick={openDialog}
          aria-haspopup="true"
          ref={ref}
        >
          <TextIcon icon={<IconAdd16 />} size="md-s" weight="md">
            <Translate id="add" />
          </TextIcon>
        </Button>
      )}
    </DropdownDialog>
  )
}

const AddButton = ({ chapter }: AddButtonProps) => {
  const viewer = useContext(ViewerContext)
  const { lang } = useContext(LanguageContext)

  /**
   * Data
   */
  const [add, { loading }] =
    useMutation<AddChapterArticles>(ADD_CHAPTER_ARTICLES)
  const addArticlesToChapter = async (articles: SearchSelectNode[]) => {
    const oldArticleIds = chapter.articles?.map((article) => article.id) || []
    const newArticleIds = articles.map((article) => article.id)

    await add({
      variables: {
        input: {
          id: chapter.id,
          articles: [...oldArticleIds, ...newArticleIds],
        },
      },
    })

    window.dispatchEvent(
      new CustomEvent(ADD_TOAST, {
        detail: {
          color: 'green',
          content: translate({ id: 'addedChapterArticles', lang }),
          duration: 2000,
        },
      })
    )

    window.dispatchEvent(new CustomEvent(REFETCH_TOPIC, {}))
  }

  /**
   * Render
   */
  return (
    <SearchSelectDialog
      title="chapterAddArticle"
      hint="hintChapterAddArticle"
      searchType="Article"
      searchFilter={{ authorId: viewer.id }}
      onSave={addArticlesToChapter}
      saving={loading}
    >
      {({ openDialog }) => <BaseAddButton openAddArticlesDialog={openDialog} />}
    </SearchSelectDialog>
  )
}

AddButton.fragments = fragments

export default AddButton
