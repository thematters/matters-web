import gql from 'graphql-tag'

import { ReactComponent as IconComment } from '@/public/static/icons/24px/comment.svg'
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
}

const ReplyButton = ({ moment }: ReplyButtonProps) => {
  const { commentCount } = moment

  return (
    <Button spacing={[8, 8]} textColor="black" textActiveColor="greyDarker">
      <TextIcon icon={<Icon icon={IconComment} size={18} />} size={15}>
        {commentCount > 0 ? numAbbr(commentCount) : undefined}
      </TextIcon>
    </Button>
  )
}

ReplyButton.fragments = fragments

export default ReplyButton
