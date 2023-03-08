import { FormattedMessage } from 'react-intl'

import { numAbbr } from '~/common/utils'
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
        <FormattedMessage defaultMessage="Articles" description="" />
      </span>

      <style jsx>{styles}</style>
    </section>
  )
}

ArticlesCount.fragments = {
  tag: tagFragments.articleCount,
}

export default ArticlesCount
