import gql from 'graphql-tag'

import {
  Card,
  CardProps,
  IconArticle16,
  IconHashTag16,
  TextIcon,
} from '~/components'

import { numAbbr, toPath } from '~/common/utils'

import styles from './styles.css'

import { TagDigestConciseTag } from './__generated__/TagDigestConciseTag'

export type TagDigestConciseTagProps = {
  tag: TagDigestConciseTag
  textSize?: 'sm' | 'md-s'
  showArticlesNum?: boolean
} & CardProps

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
  ...cardProps
}: TagDigestConciseTagProps) => {
  const path = toPath({
    page: 'tagDetail',
    tag,
  })

  return (
    <Card {...path} {...cardProps}>
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
      </section>

      <style jsx>{styles}</style>
    </Card>
  )
}

Concise.fragments = fragments

export default Concise
