import React from 'react'

import IconDonate from '@/public/static/icons/24px/donate.svg'
import IconExpand from '@/public/static/icons/24px/expand.svg'
import IconExternal from '@/public/static/icons/24px/external.svg'
import IconPin from '@/public/static/icons/24px/pin.svg'
import { Icon, TextIcon } from '~/components'

import styles from './styles.module.css'

const Toasts = () => (
  <section className={styles.container}>
    <ul>
      <li>
        <TextIcon
          icon={<Icon icon={IconPin} size={24} />}
          size={16}
          spacing={16}
        >
          Pin Article
        </TextIcon>
      </li>

      <li>
        <TextIcon
          icon={<Icon icon={IconDonate} size={20} />}
          weight="medium"
          spacing={8}
          size={14}
        >
          100
        </TextIcon>
      </li>

      <li>
        <TextIcon icon={<Icon icon={IconExternal} color="grey" size={14} />} />
      </li>

      <li>
        <TextIcon
          icon={<Icon icon={IconExpand} size={12} />}
          placement="left"
          weight="normal"
          color="grey"
        >
          Expand
        </TextIcon>
      </li>

      <li>
        <TextIcon
          color="greyDark"
          size={14}
          weight="normal"
          placement="left"
          decoration="underline"
        >
          Search on Google
        </TextIcon>
      </li>
    </ul>
  </section>
)

export default Toasts
