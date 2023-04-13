import React from 'react'

import { toPath } from '~/common/utils'
import { IconCircle16, LinkWrapper, TextIcon } from '~/components'
import { DigestPlainCircleFragment } from '~/gql/graphql'

import { fragments } from './gql'
import styles from './styles.css'

export type CircleDigestPlainProps = {
  circle: DigestPlainCircleFragment

  onClick?: () => void
}

const CircleDigestPlain = ({ circle, onClick }: CircleDigestPlainProps) => {
  const path = toPath({
    page: 'circleDetail',
    circle,
  })

  return (
    <LinkWrapper {...path} onClick={onClick}>
      <TextIcon
        icon={<IconCircle16 size="xs" />}
        color="green"
        spacing="xxtight"
        weight="normal"
        size="xs"
      >
        <span className="name">{circle.displayName}</span>
      </TextIcon>

      <style jsx>{styles}</style>
    </LinkWrapper>
  )
}

CircleDigestPlain.fragments = fragments

export default CircleDigestPlain
