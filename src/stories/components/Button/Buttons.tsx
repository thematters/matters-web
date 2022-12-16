import React from 'react'

import {
  Button,
  Dialog,
  IconMore16,
  IconNavSearch24,
  LoginButton,
  Translate,
  ViewMoreButton,
  WriteButton,
} from '~/components'
import NavListItem from '~/components/Layout/NavBar/NavListItem'

import { TEXT } from '~/common/enums'

const Buttons = () => (
  <section>
    <ul>
      <li>
        <Button
          spacing={['xtight', 'xtight']}
          bgActiveColor="grey-lighter-active"
          aria-haspopup="dialog"
        >
          <IconMore16 color="grey" />
        </Button>
      </li>

      <li>
        <LoginButton size={[null, '2rem']} />
      </li>

      <li>
        <LoginButton bgColor="green" />
      </li>

      <li>
        <WriteButton allowed isLarge />
      </li>

      <li>
        <ViewMoreButton />
      </li>

      <li>
        <NavListItem
          name={TEXT.zh_hant.search}
          icon={<IconNavSearch24 size="md" />}
          activeIcon={<IconNavSearch24 size="md" color="green" />}
          active
        />
      </li>

      <li>
        <Dialog.Footer>
          <Dialog.Footer.Button type="submit">
            <Translate id="agreeAndContinue" />
          </Dialog.Footer.Button>

          <Dialog.Footer.Button bgColor="grey-lighter" textColor="black">
            <Translate id="disagree" />
          </Dialog.Footer.Button>
        </Dialog.Footer>
      </li>
    </ul>

    <style jsx>{`
      li {
        @mixin border-bottom-grey;
        padding: var(--spacing-base);
      }
    `}</style>
  </section>
)

export default Buttons
