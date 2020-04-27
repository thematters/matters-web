import gql from 'graphql-tag'
import { useContext } from 'react'

import {
  Icon,
  LanguageContext,
  Menu,
  TextIcon,
  Translate,
  ViewerContext,
} from '~/components'
import { useMutation } from '~/components/GQL'

import { ADD_TOAST } from '~/common/enums'
import { routerPush, toPath, translate } from '~/common/utils'

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
  const viewer = useContext(ViewerContext)
  const { lang } = useContext(LanguageContext)
  const [extendArticle] = useMutation<ExtendArticle>(EXTEND_ARTICLE, {
    variables: {
      title: translate({ id: 'untitle', lang }),
      collection: [article.id],
    },
  })

  return (
    <Menu.Item
      onClick={async () => {
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

        const { data } = await extendArticle()
        const { slug, id } = data?.putDraft || {}

        if (slug && id) {
          const path = toPath({ page: 'draftDetail', slug, id })
          routerPush(path.href, path.as)
        }
      }}
    >
      <TextIcon
        icon={<Icon.CollectionMedium size="md" />}
        size="md"
        spacing="base"
      >
        <Translate id="extendArticle" />
      </TextIcon>
    </Menu.Item>
  )
}

ExtendButton.fragments = fragments

export default ExtendButton
