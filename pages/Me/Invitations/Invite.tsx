import gql from 'graphql-tag'

import { Icon } from '~/components/Icon'
import { Translate } from '~/components/Language'
import { TextIcon } from '~/components/TextIcon'

import ICON_GIFT_GREEN from '~/static/icons/gift-green.svg?sprite'

import { InvitationStatus } from './__generated__/InvitationStatus'
import styles from './styles.css'

const fragments = {
  invitation: gql`
    fragment InvitationStatus on InvitationStatus {
      reward
      left
    }
  `
}

const Invite = ({ invitation }: { invitation: InvitationStatus }) => {
  return (
    <>
      <section>
        <div>
          <TextIcon
            icon={
              <Icon id={ICON_GIFT_GREEN.id} viewBox={ICON_GIFT_GREEN.viewBox} />
            }
            size="md"
            weight="medium"
            spacing="xtight"
          >
            <span>
              <Translate zh_hant="你有" zh_hans="你有" />
            </span>{' '}
            <span className="highlight">{invitation.left}</span>{' '}
            <span>
              <Translate zh_hant="個激活名額" zh_hans="个激活名额" />
            </span>
          </TextIcon>
        </div>

        <p className="reward">{invitation.reward}</p>
      </section>

      <style jsx>{styles}</style>
    </>
  )
}

Invite.fragments = fragments

export default Invite
