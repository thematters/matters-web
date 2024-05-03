import React from 'react'

import { ReactComponent as IconMore } from '@/public/static/icons/24px/more.svg'
import { ReactComponent as IconNavSearch } from '@/public/static/icons/24px/nav-search.svg'
import { TEXT } from '~/common/enums'
import {
  Button,
  Icon,
  LoginButton,
  ViewMoreButton,
  WriteButton,
} from '~/components'
import NavListItem from '~/components/Layout/NavBar/NavListItem'

import styles from './styles.module.css'

const Buttons = () => (
  <section className={styles.container}>
    <ul>
      <li>
        <Button
          spacing={[8, 8]}
          bgActiveColor="greyLighterActive"
          aria-haspopup="dialog"
        >
          <Icon icon={IconMore} color="grey" />
        </Button>
      </li>

      <li>
        <LoginButton size={[null, '2rem']} />
      </li>

      <li>
        <LoginButton bgColor="green" />
      </li>

      <li>
        <WriteButton />
      </li>

      <li>
        <ViewMoreButton />
      </li>

      <li>
        <NavListItem
          name={TEXT.zh_hant.search}
          icon={<Icon icon={IconNavSearch} size={24} />}
          activeIcon={<Icon icon={IconNavSearch} size={24} color="green" />}
          active
        />
      </li>
    </ul>
  </section>
)

export default Buttons
