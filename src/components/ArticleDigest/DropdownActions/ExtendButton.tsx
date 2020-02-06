import gql from 'graphql-tag'
import Router from 'next/router'
import { useContext } from 'react'

import { Icon, LanguageContext, Menu, TextIcon, Translate } from '~/components'
import { useMutation } from '~/components/GQL'

import { TEXT } from '~/common/enums'
import { toPath, translate } from '~/common/utils'

import styles from './styles.css'

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
  `
}

const ExtendButton = ({
  article,
  hideDropdown
}: {
  article: ExtendButtonArticle
  hideDropdown: () => void
}) => {
  const { lang } = useContext(LanguageContext)
  const [extendArticle] = useMutation<ExtendArticle>(EXTEND_ARTICLE, {
    variables: {
      title: translate({
        zh_hans: TEXT.zh_hans.untitle,
        zh_hant: TEXT.zh_hant.untitle,
        lang
      }),
      collection: [article.id]
    }
  })

  return (
    <Menu.Item
      onClick={async () => {
        const { data } = await extendArticle()
        const { slug, id } = data?.putDraft || {}

        if (slug && id) {
          const path = toPath({ page: 'draftDetail', slug, id })
          Router.push(path.as)
        }

        hideDropdown()
      }}
    >
      <TextIcon
        icon={<Icon.CollectionMedium size="md" />}
        size="md"
        spacing="base"
      >
        <Translate zh_hant="關聯作品" zh_hans="关联作品" />
      </TextIcon>

      <style jsx>{styles}</style>
    </Menu.Item>
  )
}

ExtendButton.fragments = fragments

export default ExtendButton
