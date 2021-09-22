import { useContext } from 'react'

import {
  Button,
  DropdownDialog,
  IconAdd16,
  IconArticle16,
  IconChapter16,
  LanguageContext,
  Menu,
  TextIcon,
  Translate,
  useMutation,
  ViewerContext,
} from '~/components'
import { SearchSelectDialog } from '~/components/Dialogs/SearchSelectDialog'
import { SearchSelectNode } from '~/components/Forms/SearchSelectForm'

import { ADD_TOAST } from '~/common/enums'
import { translate } from '~/common/utils'

import PutChapterDialog from '../../../PutChapterDialog'
import { ADD_TOPIC_ARTICLES, fragments } from './gql'

import { AddButtonTopic } from './__generated__/AddButtonTopic'
import { AddTopicArticles } from './__generated__/AddTopicArticles'

interface AddButtonProps {
  topic: AddButtonTopic
}

interface DialogProps {
  openAddChapterDialog: () => void
  openAddArticlesDialog: () => void
}

type BaseAddButtonProps = DialogProps

const BaseAddButton = ({
  openAddChapterDialog,
  openAddArticlesDialog,
}: BaseAddButtonProps) => {
  const Content = ({ isInDropdown }: { isInDropdown?: boolean }) => (
    <Menu width={isInDropdown ? 'sm' : undefined}>
      <Menu.Item onClick={openAddChapterDialog}>
        <TextIcon icon={<IconChapter16 size="md" />} size="md" spacing="base">
          <Translate id="chapter" />
        </TextIcon>
      </Menu.Item>

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

const AddButton = ({ topic }: AddButtonProps) => {
  const viewer = useContext(ViewerContext)
  const { lang } = useContext(LanguageContext)

  /**
   * Data
   */
  const [add, { loading }] = useMutation<AddTopicArticles>(ADD_TOPIC_ARTICLES)
  const addArticlesToTopic = async (articles: SearchSelectNode[]) => {
    const oldArticleIds = topic.articles?.map((article) => article.id) || []
    const newArticleIds = articles.map((article) => article.id)

    await add({
      variables: {
        input: { id: topic.id, articles: [...oldArticleIds, ...newArticleIds] },
      },
    })

    window.dispatchEvent(
      new CustomEvent(ADD_TOAST, {
        detail: {
          color: 'green',
          content: translate({ id: 'addedTopicArticles', lang }),
          duration: 2000,
        },
      })
    )

    // window.dispatchEvent(
    //   new CustomEvent(REFETCH_TOPIC_DETAIL, {
    //     detail: {
    //       event: 'add',
    //     },
    //   })
    // )
  }

  /**
   * Render
   */
  return (
    <PutChapterDialog topicId={topic.id}>
      {({ openDialog: openAddChapterDialog }) => (
        <SearchSelectDialog
          title="topicAddArticle"
          hint="hintTopicAddArticle"
          searchType="Article"
          searchFilter={{ authorId: viewer.id }}
          onSave={addArticlesToTopic}
          saving={loading}
        >
          {({ openDialog }) => (
            <BaseAddButton
              openAddChapterDialog={openAddChapterDialog}
              openAddArticlesDialog={openDialog}
            />
          )}
        </SearchSelectDialog>
      )}
    </PutChapterDialog>
  )
}

AddButton.fragments = fragments

export default AddButton
