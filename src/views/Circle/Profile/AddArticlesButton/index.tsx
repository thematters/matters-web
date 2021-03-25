import { useContext } from 'react'

import {
  Button,
  IconPen16,
  LanguageContext,
  TextIcon,
  Translate,
  useFeatures,
  useMutation,
  ViewerContext,
} from '~/components'
import {
  SearchSelectDialog,
  SearchSelectNode,
} from '~/components/Dialogs/SearchSelectDialog'
import PUT_CIRCLE_ARTICLES from '~/components/GQL/mutations/putCircleArticles'

import { ADD_TOAST, REFETCH_CIRCLE_DETAIL_ARTICLES } from '~/common/enums'
import { translate } from '~/common/utils'

import { PutCircleArticles } from '~/components/GQL/mutations/__generated__/PutCircleArticles'

interface AddArticlesButtonProps {
  circle: { id: string; name: string }
}

const AddArticlesButton = ({ circle }: AddArticlesButtonProps) => {
  const features = useFeatures()
  const viewer = useContext(ViewerContext)
  const { lang } = useContext(LanguageContext)

  const [add, { loading }] = useMutation<PutCircleArticles>(PUT_CIRCLE_ARTICLES)
  const addArticlesToCircle = async (articles: SearchSelectNode[]) => {
    const articleIds = articles.map((article) => article.id)

    await add({
      variables: { id: circle.id, articles: articleIds, type: 'add' },
    })

    window.dispatchEvent(
      new CustomEvent(ADD_TOAST, {
        detail: {
          color: 'green',
          content: translate({ id: 'addedArticleCircle', lang }),
        },
      })
    )

    window.dispatchEvent(new CustomEvent(REFETCH_CIRCLE_DETAIL_ARTICLES))
  }

  if (!features.circle_management) {
    return null
  }

  return (
    <SearchSelectDialog
      title="circleAddArticles"
      hint="hintCircleAddArticles"
      searchType="Article"
      searchFilter={{ authorId: viewer.id }}
      onSave={addArticlesToCircle}
      saving={loading}
    >
      {({ open: openAddCircleArticlesDialog }) => (
        <Button
          size={['7rem', '2rem']}
          textColor="gold"
          textActiveColor="white"
          bgActiveColor="gold"
          borderColor="gold"
          borderWidth="md"
          onClick={openAddCircleArticlesDialog}
          aria-haspopup="true"
        >
          <TextIcon icon={<IconPen16 />} weight="md" size="md-s">
            <Translate id="circleAddArticles" />
          </TextIcon>
        </Button>
      )}
    </SearchSelectDialog>
  )
}

export default AddArticlesButton
