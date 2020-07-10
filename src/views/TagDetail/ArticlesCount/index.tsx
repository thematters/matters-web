import { useQuery } from '@apollo/react-hooks'

import { Translate } from '~/components'
import TAG_ARTICLES_COUNT from '~/components/GQL/queries/tagArticlesCount'

import { numAbbr } from '~/common/utils'

import styles from './styles.css'

import { TagArticlesCount } from '~/components/GQL/queries/__generated__/TagArticlesCount'

interface ArticlesCountProps {
  id: string
}

const ArticlesCount = ({ id }: ArticlesCountProps) => {
  const { data } = useQuery<TagArticlesCount>(TAG_ARTICLES_COUNT, {
    variables: { id },
  })

  if (!data || !data.node || data.node.__typename !== 'Tag') {
    return null
  }

  const { totalCount } = data?.node?.articles || { totalCount: 0 }

  return (
    <section className="container">
      <b>{numAbbr(totalCount)}</b>
      <span>
        <Translate zh_hant=" 篇作品" zh_hans=" 篇作品" />
      </span>

      <style jsx>{styles}</style>
    </section>
  )
}

export default ArticlesCount
