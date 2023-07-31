import gql from 'graphql-tag'
import { useRouter } from 'next/router'
import { useContext } from 'react'

import {
  OPEN_UNIVERSAL_AUTH_DIALOG,
  UNIVERSAL_AUTH_SOURCE,
} from '~/common/enums'
import { toPath } from '~/common/utils'
import {
  IconCollection24,
  Menu,
  toast,
  Translate,
  useMutation,
  ViewerContext,
} from '~/components'
import {
  ExtendArticleMutation,
  ExtendButtonArticleFragment,
} from '~/gql/graphql'

const EXTEND_ARTICLE = gql`
  mutation ExtendArticle($title: String!, $collection: [ID]) {
    putDraft(input: { title: $title, collection: $collection }) {
      id
      slug
    }
  }
`

const fragments = {
  article: gql`
    fragment ExtendButtonArticle on Article {
      id
      articleState: state
    }
  `,
}

const ExtendButton = ({
  article,
}: {
  article: ExtendButtonArticleFragment
}) => {
  const router = useRouter()
  const viewer = useContext(ViewerContext)
  const [collectArticle] = useMutation<ExtendArticleMutation>(EXTEND_ARTICLE, {
    variables: { title: '', collection: [article.id] },
  })

  const onClick = async () => {
    if (!viewer.isAuthed) {
      window.dispatchEvent(
        new CustomEvent(OPEN_UNIVERSAL_AUTH_DIALOG, {
          detail: { source: UNIVERSAL_AUTH_SOURCE.collectArticle },
        })
      )
      return
    }

    if (viewer.isInactive) {
      toast.error({
        message: <Translate id="FORBIDDEN" />,
      })

      return
    }

    const { data } = await collectArticle()
    const { slug = '', id } = data?.putDraft || {}

    if (id) {
      const path = toPath({ page: 'draftDetail', slug, id })
      router.push(path.href)
    }
  }

  return (
    <Menu.Item
      text={<Translate id="collectArticle" />}
      icon={<IconCollection24 size="mdS" />}
      onClick={onClick}
    />
  )
}

ExtendButton.fragments = fragments

export default ExtendButton
