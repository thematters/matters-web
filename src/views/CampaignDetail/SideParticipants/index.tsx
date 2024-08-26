import _shuffle from 'lodash/shuffle'
import dynamic from 'next/dynamic'
import { useContext, useState } from 'react'
import { FormattedMessage } from 'react-intl'

import { ReactComponent as IconRight } from '@/public/static/icons/24px/right.svg'
import { analytics, toPath } from '~/common/utils'
import {
  Avatar,
  Button,
  DrawerProvider,
  Icon,
  LinkWrapper,
  TextIcon,
  Tooltip,
  ViewerContext,
} from '~/components'
import {
  AvatarUserFragment,
  SideParticipantsCampaignPrivateFragment,
  SideParticipantsCampaignPublicFragment,
} from '~/gql/graphql'

import { fragments } from './gql'
import styles from './styles.module.css'

const DynamicParticipantsDrawer = dynamic(
  () => import('../Participants/Drawer').then((mod) => mod.ParticipantsDrawer),
  {
    ssr: false,
  }
)

type SideParticipantsProps = {
  campaign: SideParticipantsCampaignPublicFragment &
    Partial<SideParticipantsCampaignPrivateFragment>
}

const Participant = ({
  user,
  onClick,
}: {
  user: AvatarUserFragment & {
    userName?: string | null
    displayName?: string | null
  }
  onClick?: () => void
}) => {
  const path = toPath({
    page: 'userProfile',
    userName: user.userName || '',
  })
  if (!user.displayName) {
    return (
      <LinkWrapper {...path} onClick={onClick}>
        <Avatar user={user} size={40} />
      </LinkWrapper>
    )
  }

  return (
    <Tooltip content={user.displayName} placement="top">
      <span>
        <LinkWrapper {...path}>
          <Avatar user={user} size={40} />
        </LinkWrapper>
      </span>
    </Tooltip>
  )
}

const SideParticipants = ({ campaign }: SideParticipantsProps) => {
  const viewer = useContext(ViewerContext)
  const edges = campaign.sideParticipants.edges
  const totalCount = campaign.sideParticipants.totalCount
  const isViewerApplySucceeded = campaign.application?.state === 'succeeded'
  const maxAvatarCount = 60
  const [openDrawer, setOpenDrawer] = useState(false)
  const toggleDrawer = () => {
    setOpenDrawer((prevState) => !prevState)
  }

  if (edges && edges.length <= 0) {
    return null
  }

  return (
    <DrawerProvider>
      <section className={styles.participants}>
        <section className={styles.header}>
          <h2>
            <FormattedMessage
              defaultMessage="Writers"
              id="xl95XN"
              description="src/views/CampaignDetail/SideParticipants/index.tsx"
            />{' '}
            <span className={styles.count}>
              {campaign.sideParticipants.totalCount}
            </span>
          </h2>
          <Button
            textColor="grey"
            textActiveColor="black"
            onClick={toggleDrawer}
          >
            <TextIcon
              icon={<Icon icon={IconRight} size={14} />}
              placement="left"
              size={14}
            >
              <FormattedMessage
                defaultMessage="View all"
                id="0SQatS"
                description="src/views/CampaignDetail/SideParticipants/index.tsx"
              />
            </TextIcon>
          </Button>
        </section>

        <section className={styles.avatars}>
          {isViewerApplySucceeded && <Participant user={viewer} />}

          {totalCount <= maxAvatarCount &&
            _shuffle(edges?.filter((u) => u.node.id !== viewer.id)).map(
              ({ node, cursor }, i) => (
                <Participant
                  key={cursor}
                  user={node}
                  onClick={() =>
                    analytics.trackEvent('click_feed', {
                      type: 'campaign_detail_participant',
                      contentType: 'user',
                      location: i,
                      id: node.id,
                    })
                  }
                />
              )
            )}
          {totalCount > maxAvatarCount && (
            <>
              {_shuffle(
                edges
                  ?.slice(
                    0,
                    isViewerApplySucceeded
                      ? maxAvatarCount - 2
                      : maxAvatarCount - 1
                  )
                  ?.filter((u) => u.node.id !== viewer.id)
              ).map(({ node, cursor }, i) => (
                <Participant
                  key={cursor}
                  user={node}
                  onClick={() =>
                    analytics.trackEvent('click_feed', {
                      type: 'campaign_detail_participant',
                      contentType: 'user',
                      location: i,
                      id: node.id,
                    })
                  }
                />
              ))}
              <Button
                borderRadius="5rem"
                size={['2.5rem', '2.5rem']}
                bgColor="greyDarker"
                textColor="white"
                onClick={() => {
                  // console.log('open drawer')
                  toggleDrawer()
                }}
              >
                <TextIcon size={14} weight="medium">
                  +{totalCount - maxAvatarCount + 1}
                </TextIcon>
              </Button>
            </>
          )}
        </section>
      </section>
      <DynamicParticipantsDrawer
        isOpen={openDrawer}
        onClose={toggleDrawer}
        totalParticipants={totalCount}
      />
    </DrawerProvider>
  )
}

SideParticipants.fragments = fragments

export default SideParticipants
