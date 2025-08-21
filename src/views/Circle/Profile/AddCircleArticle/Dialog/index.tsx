import dynamic from 'next/dynamic'
import { useContext, useState } from 'react'
import { FormattedMessage, useIntl } from 'react-intl'

import { REFETCH_CIRCLE_DETAIL_ARTICLES } from '~/common/enums'
import {
  Dialog,
  SpinnerBlock,
  toast,
  useDialogSwitch,
  useMutation,
  useStep,
  ViewerContext,
} from '~/components'
import { SearchSelectNode } from '~/components/Forms/SearchSelectForm'
import PUT_CIRCLE_ARTICLES from '~/components/GQL/mutations/putCircleArticles'
import {
  ArticleAccessType,
  ArticleLicenseType,
  PutCircleArticlesMutation,
} from '~/gql/graphql'

export type Step = 'select' | 'confirm'

interface AddCircleArticleDialogProps {
  circle: { id: string }
  children: ({ openDialog }: { openDialog: () => void }) => React.ReactNode
}

const DynamicSearchSelectForm = dynamic(
  () => import('~/components/Forms/SearchSelectForm'),
  { loading: () => <SpinnerBlock /> }
)

const DynamicConfirmContent = dynamic(() => import('./ConfirmContent'), {
  loading: () => <SpinnerBlock />,
})

const AddCircleArticleDialog = ({
  circle,
  children,
}: AddCircleArticleDialogProps) => {
  const {
    show,
    openDialog: baseOpenDialog,
    closeDialog: baseCloseDialog,
  } = useDialogSwitch(true)

  const initialStep = 'select'
  const { currStep, forward } = useStep<Step>(initialStep)
  const openDialog = () => {
    forward(initialStep)
    baseOpenDialog()
  }
  const isSelect = currStep === 'select'
  const isConfirm = currStep === 'confirm'

  const viewer = useContext(ViewerContext)
  const intl = useIntl()

  const [articles, setArticles] = useState<SearchSelectNode[]>([])
  const [add, { loading }] =
    useMutation<PutCircleArticlesMutation>(PUT_CIRCLE_ARTICLES)
  const addArticlesToCircle = async (
    paywalled: boolean,
    license: ArticleLicenseType
  ) => {
    const articleIds = articles.map((article) => article.id)

    await add({
      variables: {
        id: circle.id,
        articles: articleIds,
        type: 'add',
        accessType: paywalled
          ? ArticleAccessType.Paywall
          : ArticleAccessType.Public,
        license,
      },
    })

    toast.info({
      message: intl.formatMessage({
        defaultMessage: 'Articles added ',
        id: 'z1ucgb',
      }),
    })

    window.dispatchEvent(new CustomEvent(REFETCH_CIRCLE_DETAIL_ARTICLES))

    closeDialog()
  }
  const onSaveArticles = async (nodes: SearchSelectNode[]) => {
    setArticles(nodes)
    forward('confirm')
  }

  const closeDialog = () => {
    setArticles([])
    baseCloseDialog()
  }

  return (
    <>
      {children({ openDialog })}

      <Dialog isOpen={show} onDismiss={closeDialog}>
        {isSelect && (
          <DynamicSearchSelectForm
            title={
              <FormattedMessage defaultMessage="Add Articles" id="k97/u7" />
            }
            hint={
              <FormattedMessage
                defaultMessage="Add articles to your circle"
                id="D9R/ol"
              />
            }
            searchType="Article"
            searchFilter={{ authorId: viewer.id }}
            onSave={onSaveArticles}
            nodes={articles}
            saving={loading}
            headerRightButtonText={
              <FormattedMessage defaultMessage="Next Step" id="8cv9D4" />
            }
            closeDialog={closeDialog}
          />
        )}

        {isConfirm && (
          <DynamicConfirmContent
            onConfirm={addArticlesToCircle}
            onBack={() => forward('select')}
            loading={loading}
          />
        )}
      </Dialog>
    </>
  )
}

const DialogWrapper = (props: AddCircleArticleDialogProps) => (
  <Dialog.Lazy mounted={<AddCircleArticleDialog {...props} />}>
    {({ openDialog }) => <>{props.children({ openDialog })}</>}
  </Dialog.Lazy>
)

export default DialogWrapper
