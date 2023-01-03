import { numAbbr } from '~/common/utils'
import { Translate } from '~/components'
import tagFragments from '~/components/GQL/fragments/tag'
import { ArticleCountTagFragment } from '~/gql/graphql'

import styles from './styles.css'

interface ArticlesCountProps {
  tag: ArticleCountTagFragment
}

const ArticlesCount = ({ tag }: ArticlesCountProps) => {
  const { totalCount } = tag.articles || { totalCount: 0 }

  return (
    <section className="container">
      <b>{numAbbr(totalCount)}</b>
      <span>
        &nbsp;
        <Translate zh_hant="篇作品" zh_hans="篇作品" en="Articles" />
      </span>

      <style jsx>{styles}</style>
    </section>
  )
}

ArticlesCount.fragments = {
  tag: tagFragments.articleCount,
}

export default ArticlesCount
