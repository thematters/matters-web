import Link from 'next/link'

import { ReactComponent as IconRight } from '@/public/static/icons/24px/right.svg'
import { DotDivider, Icon, ResponsiveImage, TextIcon } from '~/components'
import { MOCK_CAMPAIGN } from '~/stories/mocks'

import Apply from '../Apply'
import { fragments } from './gql'
import Participants from './Participants'
import styles from './styles.module.css'

const InfoHeader = ({ campaign }: { campaign: typeof MOCK_CAMPAIGN }) => {
  const now = new Date()
  const isInApplicationPeriod =
    !campaign.applicationPeriod.end ||
    now < new Date(campaign.applicationPeriod.end)

  return (
    <Apply.Dialog campaign={campaign}>
      {({ openDialog }) => (
        <header className={styles.header}>
          <section className={styles.cover}>
            <ResponsiveImage url={campaign.cover} width={1376} />
          </section>

          <h1 className={styles.name}>{campaign.name}</h1>

          <section className={styles.meta}>
            <section className={styles.left}>
              {isInApplicationPeriod && (
                <span>Registration period: June 24 - June 30</span>
              )}
              {!isInApplicationPeriod && (
                <span>Wiriting period: June 24 - June 30</span>
              )}

              <section className={styles.dot}>
                <DotDivider />
              </section>

              <Link href={campaign.link} legacyBehavior>
                <a className={styles.viewMore}>
                  <TextIcon
                    icon={<Icon icon={IconRight} size={14} />}
                    spacing={4}
                    placement="left"
                  >
                    View More
                  </TextIcon>
                </a>
              </Link>
            </section>

            <section className={styles.right}>
              <Apply.Button
                campaign={campaign}
                size="sm"
                onClick={openDialog}
              />
            </section>
          </section>

          <Participants campaign={campaign} />

          <section className={styles.mobileApply}>
            <Apply.Button campaign={campaign} size="lg" onClick={openDialog} />
          </section>
        </header>
      )}
    </Apply.Dialog>
  )
}

InfoHeader.fragments = fragments

export default InfoHeader
