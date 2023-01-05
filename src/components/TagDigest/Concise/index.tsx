import gql from 'graphql-tag'

import { numAbbr, toPath } from '~/common/utils'
import {
  IconArticle16,
  IconHashTag16,
  LinkWrapper,
  TextIcon,
} from '~/components'
import { TagDigestConciseTagFragment } from '~/gql/graphql'

import styles from './styles.css'

export type TagDigestConciseTagProps = {
  tag: TagDigestConciseTagFragment
  textSize?: 'sm' | 'md-s'
  showArticlesNum?: boolean
}

const fragments = {
  tag: gql`
    fragment TagDigestConciseTag on Tag {
      id
      content
      numArticles
    }
  `,
}

const Concise = ({
  tag,
  textSize = 'md-s',
  showArticlesNum,
}: TagDigestConciseTagProps) => {
  const path = toPath({
    page: 'tagDetail',
    tag,
  })
  return (
    <LinkWrapper {...path}>
      <section className="content">
        <TextIcon
          icon={<IconHashTag16 color="grey" />}
          color="black"
          size={textSize}
          spacing="xxtight"
          weight="md"
        >
          {tag.content}
        </TextIcon>

        {showArticlesNum && (
          <TextIcon
            icon={<IconArticle16 color="grey-dark" size="xs" />}
            size="xs"
            spacing="xxtight"
            color="grey-dark"
          >
            {numAbbr(tag.numArticles)}
          </TextIcon>
        )}
        <style jsx>{styles}</style>
      </section>
    </LinkWrapper>
  )
}

Concise.fragments = fragments

export default Concise
