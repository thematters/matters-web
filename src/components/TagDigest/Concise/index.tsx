import gql from 'graphql-tag'

import { IconArticle16, IconHashTag16, TextIcon } from '~/components'

import { numAbbr } from '~/common/utils'

import styles from './styles.css'

import { TagDigestConciseTag } from './__generated__/TagDigestConciseTag'

export type TagDigestConciseTagProps = {
  tag: TagDigestConciseTag
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
  return (
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
  )
}

Concise.fragments = fragments

export default Concise
