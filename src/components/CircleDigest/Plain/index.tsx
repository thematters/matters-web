import Link from 'next/link'
import React from 'react'

import { IconCircle24, TextIcon } from '~/components'

import { toPath } from '~/common/utils'

import { fragments } from './gql'
import styles from './styles.css'

import { DigestPlainCircle } from './__generated__/DigestPlainCircle'

export type CircleDigestPlainProps = {
  circle: DigestPlainCircle
}

const CircleDigestPlain = ({ circle }: CircleDigestPlainProps) => {
  const { displayName } = circle
  const path = toPath({
    page: 'circleDetail',
    circle,
  })

  return (
    <Link {...path}>
      <a>
        <TextIcon
          icon={<IconCircle24 size="md" />}
          color="green"
          spacing="xxtight"
          weight="md"
          size="md-s"
        >
          <span className="name">{displayName}</span>
        </TextIcon>

        <style jsx>{styles}</style>
      </a>
    </Link>
  )
}

CircleDigestPlain.fragments = fragments

export default CircleDigestPlain
