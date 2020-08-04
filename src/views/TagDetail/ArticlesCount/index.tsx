import { Translate } from '~/components'
import tagFragments from '~/components/GQL/fragments/tag'

import { numAbbr } from '~/common/utils'

import styles from './styles.css'

import { ArticleCountTag } from '~/components/GQL/fragments/__generated__/ArticleCountTag'

interface ArticlesCountProps {
  tag: ArticleCountTag
}

const ArticlesCount = ({ tag }: ArticlesCountProps) => {
  const { totalCount } = tag.articles || { totalCount: 0 }

  return (
    <section className="container">
      <b>{numAbbr(totalCount)}</b>
      <span>
        &nbsp;
        <Translate zh_hant="篇作品" zh_hans="篇作品" />
      </span>

      <style jsx>{styles}</style>
    </section>
  )
}

ArticlesCount.fragments = {
  tag: tagFragments.articleCount,
}

export default ArticlesCount
