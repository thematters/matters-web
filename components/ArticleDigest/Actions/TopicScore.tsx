import gql from 'graphql-tag'
import _get from 'lodash/get'

import { Icon } from '~/components/Icon'
import { Translate } from '~/components/Language'
import { TextIcon } from '~/components/TextIcon'

import ICON_ARROW_RIGHT_GREEN from '~/static/icons/arrow-right-green.svg?sprite'

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
}) => (
  <TextIcon
    icon={
      hasArrowIcon && (
        <Icon
          id={ICON_ARROW_RIGHT_GREEN.id}
          viewBox={ICON_ARROW_RIGHT_GREEN.viewBox}
          style={{ width: 12, height: 6 }}
        />
      )
    }
    color="green"
    textPlacement="left"
    size="xs"
    spacing="xxtight"
  >
    <Translate
      zh_hant={`熱度 ${article.topicScore || 0}`}
      zh_hans={`热度 ${article.topicScore || 0}`}
    />
  </TextIcon>
)

TopicScore.fragments = fragments

export default TopicScore
