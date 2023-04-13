import React from 'react'

import { TEXT } from '~/common/enums'
import {
  Button,
  Dialog,
  IconMore16,
  IconNavSearch32,
  LoginButton,
  Translate,
  ViewMoreButton,
  WriteButton,
} from '~/components'
import NavListItem from '~/components/Layout/NavBar/NavListItem'

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
        <WriteButton variant="sidenav" allowed />
      </li>

      <li>
        <ViewMoreButton />
      </li>

      <li>
        <NavListItem
          name={TEXT.zh_hant.search}
          icon={<IconNavSearch32 size="md" />}
          activeIcon={<IconNavSearch32 size="md" color="green" />}
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
