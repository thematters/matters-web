import React from 'react'

import IconCircle from '@/public/static/icons/24px/circle.svg'
import { TEST_ID } from '~/common/enums'
import { toPath } from '~/common/utils'
import { Icon, LinkWrapper, TextIcon } from '~/components'
import { DigestPlainCircleFragment } from '~/gql/graphql'

import { fragments } from './gql'
import styles from './styles.module.css'

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
    <LinkWrapper
      {...path}
      onClick={onClick}
      testId={TEST_ID.DIGRET_CIRCLE_PLAIN}
    >
      <TextIcon
        icon={<Icon icon={IconCircle} size={12} />}
        color="green"
        spacing={4}
        weight="normal"
        size={12}
      >
        <span className={styles.name}>{circle.displayName}</span>
      </TextIcon>
    </LinkWrapper>
  )
}

CircleDigestPlain.fragments = fragments

export default CircleDigestPlain
