import gql from 'graphql-tag'
import { useContext } from 'react'

import { Icon } from '~/components/Icon'
import { Translate } from '~/components/Language'
import { TextIcon } from '~/components/TextIcon'
import { ViewerContext } from '~/components/Viewer'

import ICON_GIFT_GREEN from '~/static/icons/gift-green.svg?sprite'

import { InvitationStatus } from './__generated__/InvitationStatus'
import InviteForm from './InviteForm'
import styles from './styles.css'

const fragments = {
  invitation: gql`
    fragment InvitationStatus on InvitationStatus {
      reward
      left
    }
  `
}

const Invite = ({
  invitation,
  refetch
}: {
  invitation: InvitationStatus
  refetch: () => any
}) => {
  const viewer = useContext(ViewerContext)

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
            <span className="highlight">
              {viewer.isAdmin ? '∞' : invitation.left}
            </span>{' '}
            <span>
              <Translate
                zh_hant="個創作者邀請名額"
                zh_hans="个创作者邀请名额"
              />
            </span>
          </TextIcon>
        </div>

        <p
          className="reward"
          dangerouslySetInnerHTML={{ __html: invitation.reward }}
        />

        <InviteForm invitationLeft={invitation.left} submitCallback={refetch} />
      </section>

      <style jsx>{styles}</style>
    </>
  )
}

Invite.fragments = fragments

export default Invite
