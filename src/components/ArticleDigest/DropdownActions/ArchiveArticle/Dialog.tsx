import gql from 'graphql-tag'
import { useState } from 'react'

import { Dialog, Translate } from '~/components'
import { useMutation } from '~/components/GQL'
import updateUserArticles from '~/components/GQL/updates/userArticles'

import { ADD_TOAST } from '~/common/enums'

import { ArchiveArticle } from './__generated__/ArchiveArticle'
import { ArchiveArticleArticle } from './__generated__/ArchiveArticleArticle'

const ARCHIVE_ARTICLE = gql`
  mutation ArchiveArticle($id: ID!) {
    archiveArticle(input: { id: $id }) {
      id
      articleState: state
      sticky
    }
  }
`

interface ArchiveArticleDialogProps {
  article: ArchiveArticleArticle
  children: ({ open }: { open: () => void }) => React.ReactNode
}

const ArchiveArticleDialog = ({
  article,
  children,
}: ArchiveArticleDialogProps) => {
  const [showDialog, setShowDialog] = useState(true)
  const open = () => setShowDialog(true)
  const close = () => setShowDialog(false)

  const [archiveArticle] = useMutation<ArchiveArticle>(ARCHIVE_ARTICLE, {
    variables: { id: article.id },
    optimisticResponse: {
      archiveArticle: {
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
      {children({ open })}

      <Dialog isOpen={showDialog} onDismiss={close} size="sm">
        <Dialog.Header title="hide" close={close} mode="inner" />

        <Dialog.Message>
          <p>
            <Translate
              zh_hant="確認隱藏，其他用戶將無法從站內訪問該作品。隱藏後無法回退，如需再次呈現作品，你需要重新發佈。"
              zh_hans="确认隐藏，其他用户将无法从站内访问该作品。隐藏后无法回退，如需再次呈现作品，你需要重新发布。"
            />
          </p>
        </Dialog.Message>

        <Dialog.Footer>
          <Dialog.Footer.Button
            bgColor="red"
            onClick={() => {
              onArchive()
              close()
            }}
          >
            <Translate id="archived" />
          </Dialog.Footer.Button>

          <Dialog.Footer.Button
            bgColor="grey-lighter"
            textColor="black"
            onClick={close}
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
    {({ open }) => <>{props.children({ open })}</>}
  </Dialog.Lazy>
)

export default LazyArchiveArticleDialog
