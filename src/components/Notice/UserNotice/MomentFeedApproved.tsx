import gql from 'graphql-tag'
import Link from 'next/link'
import { FormattedMessage } from 'react-intl'

import { PATHS } from '~/common/enums'
import { MomentFeedApprovedFragment } from '~/gql/graphql'

import NoticeCard from '../NoticeCard'
import NoticeDate from '../NoticeDate'
import officialStyles from '../OfficialNotice/styles.module.css'

const MomentFeedApproved = ({
  notice,
}: {
  notice: MomentFeedApprovedFragment
}) => {
  const Message = () => (
    <p className={officialStyles.text}>
      <FormattedMessage
        defaultMessage="You have joined the Moments channel. The moments you post will now appear in this channel."
        id="VDclc3"
      />
    </p>
  )

  return (
    <NoticeCard
      notice={notice}
      type="system"
      content={
        <Link href={PATHS.HOTTEST_MOMENTS}>
          <Message />
        </Link>
      }
    />
  )
}

MomentFeedApproved.fragments = {
  notice: gql`
    fragment MomentFeedApproved on UserNotice {
      id
      ...NoticeDate
    }
    ${NoticeDate.fragments.notice}
  `,
}

export default MomentFeedApproved
