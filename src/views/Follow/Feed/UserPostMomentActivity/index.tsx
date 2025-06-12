import { useState } from 'react'
import { FormattedMessage } from 'react-intl'

import IconDown from '@/public/static/icons/24px/down.svg'
import { toPath } from '~/common/utils'
import {
  Button,
  CardExposureTracker,
  Icon,
  List,
  MomentDigestFeed,
  TextIcon,
  useRoute,
} from '~/components'
import { UserPostMomentActivityFragment } from '~/gql/graphql'

import { fragments } from './gql'
import styles from './styles.module.css'

const UserPostMomentActivity = ({
  nodeMoment: node,
  location,
  more,
  __typename,
}: UserPostMomentActivityFragment & { location: number }) => {
  const mores = more.slice(0, 2)
  const [showMore, setShowMore] = useState(false)
  const hasMoreThanTwo = more.length > 2
  const { router } = useRoute()

  const userProfilePath = toPath({
    page: 'userProfile',
    userName: node.author.userName || '',
  })

  const gotoUserProfile = () => {
    router.push(userProfilePath.href)
  }

  return (
    <>
      <MomentDigestFeed
        moment={node}
        hasAuthor
        hasCommentedFollowees
        // TODO: add onClick Tracker
      />
      {more.length > 0 && !showMore && (
        <Button
          onClick={() => setShowMore(true)}
          textColor="greyDarker"
          textActiveColor="black"
          className={styles.showMoreButton}
        >
          <TextIcon
            size={14}
            icon={<Icon icon={IconDown} size={12} />}
            placement="left"
          >
            <FormattedMessage
              defaultMessage="More moments"
              id="JpAsUV"
              description="src/views/Follow/Feed/UserPostMomentActivity"
            />
          </TextIcon>
        </Button>
      )}
      {showMore && (
        <>
          <List borderPosition="top">
            {mores.map((moment, index) => (
              <List.Item key={moment.id}>
                <MomentDigestFeed
                  key={index}
                  moment={moment}
                  hasAuthor
                  hasCommentedFollowees
                />
              </List.Item>
            ))}
          </List>
          {hasMoreThanTwo && (
            <Button
              onClick={gotoUserProfile}
              textColor="greyDarker"
              textActiveColor="black"
              className={styles.showMoreButton}
            >
              <TextIcon size={14}>
                <FormattedMessage
                  defaultMessage="More moments"
                  id="JpAsUV"
                  description="src/views/Follow/Feed/UserPostMomentActivity"
                />
              </TextIcon>
            </Button>
          )}
        </>
      )}
      <CardExposureTracker
        id={node.id}
        location={location}
        feedType="following"
        contentType={__typename!}
      />
    </>
  )
}

UserPostMomentActivity.fragments = fragments

export default UserPostMomentActivity
