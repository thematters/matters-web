import Link from 'next/link'

import { ReactComponent as IconRight } from '@/public/static/icons/24px/right.svg'
import {
  Avatar,
  DotDivider,
  Icon,
  ResponsiveImage,
  TextIcon,
} from '~/components'
import { MOCK_CAMPAIGN } from '~/stories/mocks'

import Apply from '../Apply'
import { fragments } from './gql'
import styles from './styles.module.css'

const InfoHeader = ({ campaign }: { campaign: typeof MOCK_CAMPAIGN }) => {
  const now = new Date()
  const isInApplicationPeriod =
    new Date(campaign.applicationPeriod.start) < now &&
    now < new Date(campaign.applicationPeriod.end)

  return (
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
            onClick={() => alert('TODO')}
          />
        </section>
      </section>

      <section className={styles.participants}>
        <span className={styles.count}>
          {' '}
          {campaign.participants.totalCount}
        </span>{' '}
        位寫作者
        <section className={styles.avatars}>
          {campaign.participants.edges.map(({ node }, i) => (
            <Avatar key={i} user={node} size={20} />
          ))}
        </section>
      </section>

      <section className={styles.mobileApply}>
        <Apply.Button
          campaign={campaign}
          size="lg"
          onClick={() => alert('TODO')}
        />
      </section>
    </header>
  )
}

InfoHeader.fragments = fragments

export default InfoHeader
