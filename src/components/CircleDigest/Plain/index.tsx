import React from 'react'

import { IconCircle24, LinkWrapper, TextIcon } from '~/components'

import { toPath } from '~/common/utils'

import { fragments } from './gql'
import styles from './styles.css'

import { DigestPlainCircle } from './__generated__/DigestPlainCircle'

export type CircleDigestPlainProps = {
  circle: DigestPlainCircle

  onClick?: () => void
}

const CircleDigestPlain = ({ circle, onClick }: CircleDigestPlainProps) => {
  const path = toPath({
    page: 'circleDetail',
    circle,
  })

  return (
    <LinkWrapper {...path} onClick={onClick}>
      <section>
        <TextIcon
          icon={<IconCircle24 size="md" />}
          color="green"
          spacing="xxtight"
          weight="md"
          size="md-s"
        >
          <span className="name">{circle.displayName}</span>
        </TextIcon>
      </section>

      <style jsx>{styles}</style>
    </LinkWrapper>
  )
}

CircleDigestPlain.fragments = fragments

export default CircleDigestPlain
