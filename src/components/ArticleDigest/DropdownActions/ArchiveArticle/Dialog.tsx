import gql from 'graphql-tag'

import { Dialog, Translate, useDialogSwitch, useMutation } from '~/components'
import updateUserArticles from '~/components/GQL/updates/userArticles'

import { ADD_TOAST } from '~/common/enums'

import { ArchiveArticle } from './__generated__/ArchiveArticle'
import { ArchiveArticleArticle } from './__generated__/ArchiveArticleArticle'

const ARCHIVE_ARTICLE = gql`
  mutation ArchiveArticle($id: ID!) {
    editArticle(input: { id: $id, state: archived }) {
      id
      articleState: state
      sticky
    }
  }
`

interface ArchiveArticleDialogProps {
  article: ArchiveArticleArticle
  children: ({ openDialog }: { openDialog: () => void }) => React.ReactNode
}

const ArchiveArticleDialog = ({
  article,
  children,
}: ArchiveArticleDialogProps) => {
  const { show, openDialog, closeDialog } = useDialogSwitch(true)

  const [archiveArticle] = useMutation<ArchiveArticle>(ARCHIVE_ARTICLE, {
    variables: { id: article.id },
    optimisticResponse: {
      editArticle: {
        id: article.id,
        articleState: 'archived' as any,
        sticky: false,
        __typename: 'Article',
      },
    },
    update: (cache) => {
      updateUserArticles({
        cache,
        articleId: article.id,
        userName: article.author.userName,
        type: 'archive',
      })
    },
  })

  const onArchive = async () => {
    await archiveArticle()

    window.dispatchEvent(
      new CustomEvent(ADD_TOAST, {
        detail: {
          color: 'green',
          content: <Translate zh_hant="作品已隱藏" zh_hans="作品已隐藏" />,
          buttonPlacement: 'center',
        },
      })
    )
  }

  return (
    <>
      {children({ openDialog })}

      <Dialog isOpen={show} onDismiss={closeDialog} size="sm">
        <Dialog.Header title="hide" closeDialog={closeDialog} mode="inner" />

        <Dialog.Message>
          <p>
            <Translate
              zh_hant="確認隱藏，其他用戶將無法從站內訪問該作品。隱藏後無法回退，如需再次呈現作品，你需要重新發布。"
              zh_hans="确认隐藏，其他用户将无法从站内访问该作品。隐藏后无法回退，如需再次呈现作品，你需要重新发布。"
            />
          </p>
        </Dialog.Message>

        <Dialog.Footer>
          <Dialog.Footer.Button
            bgColor="red"
            onClick={() => {
              onArchive()
              closeDialog()
            }}
          >
            <Translate id="archived" />
          </Dialog.Footer.Button>

          <Dialog.Footer.Button
            bgColor="grey-lighter"
            textColor="black"
            onClick={closeDialog}
          >
            <Translate id="cancel" />
          </Dialog.Footer.Button>
        </Dialog.Footer>
      </Dialog>
    </>
  )
}

const LazyArchiveArticleDialog = (props: ArchiveArticleDialogProps) => (
  <Dialog.Lazy mounted={<ArchiveArticleDialog {...props} />}>
    {({ openDialog }) => <>{props.children({ openDialog })}</>}
  </Dialog.Lazy>
)

export default LazyArchiveArticleDialog
