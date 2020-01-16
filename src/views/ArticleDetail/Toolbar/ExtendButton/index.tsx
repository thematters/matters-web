import gql from 'graphql-tag'
import Router from 'next/router'
import { useContext } from 'react'

import { Icon, LanguageContext, Tooltip, Translate } from '~/components'
import { useMutation } from '~/components/GQL'
import { ViewerContext } from '~/components/Viewer'

import { TEXT } from '~/common/enums'
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
      state
    }
  `
}

const ExtendButton = ({ article }: { article: ExtendButtonArticle }) => {
  const viewer = useContext(ViewerContext)
  const { lang } = useContext(LanguageContext)
  const [extend] = useMutation<ExtendArticle>(EXTEND_ARTICLE, {
    variables: {
      title: translate({
        zh_hans: TEXT.zh_hans.untitle,
        zh_hant: TEXT.zh_hant.untitle,
        lang
      }),
      collection: [article.id]
    }
  })
  const canExtend = !viewer.isInactive

  if (!canExtend) {
    return null
  }

  return (
    <Tooltip
      content={<Translate zh_hant="關聯當前作品" zh_hans="关联当前作品" />}
      placement="top"
    >
      <button
        type="button"
        aria-label="關聯當前作品"
        onClick={async () => {
          const { data } = await extend()
          const { slug, id } = data?.putDraft || {}

          if (slug && id) {
            const path = toPath({ page: 'draftDetail', slug, id })
            Router.push(path.as)
          }
        }}
      >
        <Icon.Extend size="md" />
      </button>
    </Tooltip>
  )
}

ExtendButton.fragments = fragments

export default ExtendButton
