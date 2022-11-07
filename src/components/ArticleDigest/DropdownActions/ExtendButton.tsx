import gql from 'graphql-tag'
import { useRouter } from 'next/router'
import { useContext } from 'react'

import {
  IconCollection24,
  LanguageContext,
  Menu,
  TextIcon,
  Translate,
  useMutation,
  ViewerContext,
} from '~/components'

import {
  ADD_TOAST,
  OPEN_UNIVERSAL_AUTH_DIALOG,
  UNIVERSAL_AUTH_SOURCE,
} from '~/common/enums'
import { toPath, translate } from '~/common/utils'

import { ExtendArticle } from './__generated__/ExtendArticle'
import { ExtendButtonArticle } from './__generated__/ExtendButtonArticle'

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

const ExtendButton = ({ article }: { article: ExtendButtonArticle }) => {
  const router = useRouter()
  const viewer = useContext(ViewerContext)
  const { lang } = useContext(LanguageContext)
  const [collectArticle] = useMutation<ExtendArticle>(EXTEND_ARTICLE, {
    variables: {
      title: translate({ id: 'untitle', lang }),
      collection: [article.id],
    },
  })

  return (
    <Menu.Item
      onClick={async () => {
        if (!viewer.isAuthed) {
          window.dispatchEvent(
            new CustomEvent(OPEN_UNIVERSAL_AUTH_DIALOG, {
              detail: { source: UNIVERSAL_AUTH_SOURCE.collectArticle },
            })
          )
          return
        }

        if (viewer.isInactive) {
          window.dispatchEvent(
            new CustomEvent(ADD_TOAST, {
              detail: {
                color: 'red',
                content: <Translate id="FORBIDDEN" />,
              },
            })
          )
          return
        }

        const { data } = await collectArticle()
        const { slug, id } = data?.putDraft || {}

        if (slug && id) {
          const path = toPath({ page: 'draftDetail', slug, id })
          router.push(path.href)
        }
      }}
    >
      <TextIcon icon={<IconCollection24 size="md" />} size="md" spacing="base">
        <Translate id="collectArticle" />
      </TextIcon>
    </Menu.Item>
  )
}

ExtendButton.fragments = fragments

export default ExtendButton
