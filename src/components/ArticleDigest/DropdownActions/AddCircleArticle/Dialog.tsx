import dynamic from 'next/dynamic'
import { useContext } from 'react'

import {
  Dialog,
  LanguageContext,
  Spinner,
  useDialogSwitch,
  useMutation,
} from '~/components'
import PUT_CIRCLE_ARTICLES from '~/components/GQL/mutations/putCircleArticles'

import { ADD_TOAST } from '~/common/enums'
import { translate } from '~/common/utils'

import { PutCircleArticles } from '~/components/GQL/mutations/__generated__/PutCircleArticles'
import { AddCircleArticleButtonArticle } from './__generated__/AddCircleArticleButtonArticle'

interface AddCircleArticleDialogProps {
  article: AddCircleArticleButtonArticle
  children: ({ open }: { open: () => void }) => React.ReactNode
}

const DynamicContent = dynamic(
  () => import('~/views/Circle/Profile/AddCircleArticle/Dialog/Content'),
  { loading: Spinner }
)

const AddCircleArticleDialog = ({
  article,
  children,
}: AddCircleArticleDialogProps) => {
  const { show, open, close } = useDialogSwitch(true)
  const { lang } = useContext(LanguageContext)

  const circle = article.author.ownCircles && article.author.ownCircles[0]
  const [add, { loading }] = useMutation<PutCircleArticles>(PUT_CIRCLE_ARTICLES)
  const addArticleToCircle = async () => {
    await add({
      variables: { id: circle?.id, articles: [article.id], type: 'add' },
    })

    window.dispatchEvent(
      new CustomEvent(ADD_TOAST, {
        detail: {
          color: 'green',
          content: translate({ id: 'addedArticleCircle', lang }),
        },
      })
    )

    close()
  }

  return (
    <>
      {children({ open })}

      <Dialog isOpen={show} onDismiss={close} size="sm">
        <DynamicContent
          onConfirm={addArticleToCircle}
          closeDialog={close}
          loading={loading}
        />
      </Dialog>
    </>
  )
}

const LazyAddCircleArticleDialog = (props: AddCircleArticleDialogProps) => (
  <Dialog.Lazy mounted={<AddCircleArticleDialog {...props} />}>
    {({ open }) => <>{props.children({ open })}</>}
  </Dialog.Lazy>
)

export default LazyAddCircleArticleDialog
