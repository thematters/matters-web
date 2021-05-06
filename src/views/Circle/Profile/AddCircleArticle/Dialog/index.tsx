import dynamic from 'next/dynamic'
import { useContext, useState } from 'react'

import {
  Dialog,
  LanguageContext,
  Spinner,
  useDialogSwitch,
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

import { ArticleAccessType } from '@/__generated__/globalTypes'
import { PutCircleArticles } from '~/components/GQL/mutations/__generated__/PutCircleArticles'

interface AddCircleArticleDialogProps {
  circle: { id: string }
  children: ({ open }: { open: () => void }) => React.ReactNode
}

const DynamicContent = dynamic(() => import('./Content'), { loading: Spinner })

const AddCircleArticleDialog = ({
  circle,
  children,
}: AddCircleArticleDialogProps) => {
  const { show, open, close } = useDialogSwitch(false)

  const viewer = useContext(ViewerContext)
  const { lang } = useContext(LanguageContext)

  const [articles, setArticles] = useState<SearchSelectNode[]>([])
  const [add, { loading }] = useMutation<PutCircleArticles>(PUT_CIRCLE_ARTICLES)
  const addArticlesToCircle = async (paywalled: boolean) => {
    const articleIds = articles.map((article) => article.id)

    await add({
      variables: {
        id: circle.id,
        articles: articleIds,
        type: 'add',
        accessType: paywalled
          ? ArticleAccessType.paywall
          : ArticleAccessType.public,
      },
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

    close()
  }
  const onSaveArticles = async (nodes: SearchSelectNode[]) => {
    setArticles(nodes)
    open()
  }

  return (
    <SearchSelectDialog
      title="circleAddArticles"
      hint="hintCircleAddArticles"
      searchType="Article"
      searchFilter={{ authorId: viewer.id }}
      onSave={onSaveArticles}
      saving={loading}
    >
      {({ open: openAddCircleArticlesDialog }) => (
        <>
          {children({ open: openAddCircleArticlesDialog })}

          <Dialog isOpen={show} onDismiss={close} size="sm">
            <DynamicContent
              onConfirm={addArticlesToCircle}
              closeDialog={close}
              loading={loading}
            />
          </Dialog>
        </>
      )}
    </SearchSelectDialog>
  )
}

export default AddCircleArticleDialog
