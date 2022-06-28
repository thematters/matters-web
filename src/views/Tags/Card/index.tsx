import classNames from 'classnames'
import gql from 'graphql-tag'
import Link from 'next/link'

import { ResponsiveImage } from '~/components'

import { toPath } from '~/common/utils'

import IMAGE_TAG_COVER from '@/public/static/images/tag-cover.png'

import styles from './styles.css'

import { CardTag } from './__generated__/CardTag'

interface CardProps {
  tag: CardTag
}

const Card = ({ tag }: CardProps) => {
  const path = toPath({ page: 'tagDetail', id: tag.id, content: tag.content })
  const url = tag.cover || IMAGE_TAG_COVER.src
  const nameClasses = classNames({ name: true, mask: !!tag.cover })

  return (
    <Link {...path}>
      <a>
        <section className="card">
          <ResponsiveImage url={url} size="360w" />

          <div className={nameClasses}>
            <h4>{tag.content}</h4>
          </div>
        </section>

        <style jsx>{styles}</style>
      </a>
    </Link>
  )
}

Card.fragments = {
  tag: gql`
    fragment CardTag on Tag {
      id
      content
      cover
    }
  `,
}

export default Card
