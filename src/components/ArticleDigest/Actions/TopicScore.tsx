import gql from 'graphql-tag'

import { Icon, TextIcon, Translate } from '~/components'

import { numAbbr } from '~/common/utils'

import { TopicScoreArticle } from './__generated__/TopicScoreArticle'

const fragments = {
  article: gql`
    fragment TopicScoreArticle on Article {
      topicScore
    }
  `
}

const TopicScore = ({
  article,
  hasArrowIcon
}: {
  article: TopicScoreArticle
  hasArrowIcon?: boolean
}) => {
  const topicScore = numAbbr(article.topicScore || 0, 0)

  return (
    <TextIcon
      icon={hasArrowIcon && <Icon.ArrowRightGreen size="md" />}
      color="green"
      textPlacement="left"
      size="xs"
      spacing="xxtight"
    >
      <Translate
        zh_hant={`熱度 ${topicScore}`}
        zh_hans={`热度 ${topicScore}`}
      />
    </TextIcon>
  )
}

TopicScore.fragments = fragments

export default TopicScore
