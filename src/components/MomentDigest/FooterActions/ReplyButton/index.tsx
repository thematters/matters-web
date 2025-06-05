import gql from 'graphql-tag'

import IconComment from '@/public/static/icons/24px/comment.svg'
import { TEST_ID } from '~/common/enums'
import { numAbbr } from '~/common/utils'
import { Button } from '~/components'
import { Icon } from '~/components/Icon'
import { TextIcon } from '~/components/TextIcon'
import { MomentDigestFooterActionsReplyButtonMomentFragment } from '~/gql/graphql'

const fragments = {
  moment: gql`
    fragment MomentDigestFooterActionsReplyButtonMoment on Moment {
      id
      commentCount
    }
  `,
}

interface ReplyButtonProps {
  moment: MomentDigestFooterActionsReplyButtonMomentFragment
  onClick?: () => void
}

const ReplyButton = ({ moment, onClick }: ReplyButtonProps) => {
  const { commentCount } = moment

  return (
    <Button
      spacing={[8, 8]}
      textColor="black"
      textActiveColor="greyDarker"
      testId={TEST_ID.MOMENT_DIGEST_FOOTER_ACTIONS_REPLY_BUTTON}
      onClick={onClick}
    >
      <TextIcon icon={<Icon icon={IconComment} size={20} />} size={14}>
        {commentCount > 0 ? numAbbr(commentCount) : undefined}
      </TextIcon>
    </Button>
  )
}

ReplyButton.fragments = fragments

export default ReplyButton
