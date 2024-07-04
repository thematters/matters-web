import gql from 'graphql-tag'

import DropdownActions from '../DropdownActions'
import LikeButton from './LikeButton'
import ReplyButton from './ReplyButton'

export const fragments = {
  moment: {
    public: gql`
      fragment MomentDigestFooterActionsMomentPublic on Moment {
        id
        ...MomentDigestFooterActionsReplyButtonMoment
        ...MomentDigestFooterActionsLikeButtonMomentPublic
        ...MomentDigestDropdownActionsMoment
      }
      ${ReplyButton.fragments.moment}
      ${LikeButton.fragments.moment.public}
      ${DropdownActions.fragments.moment}
    `,
    private: gql`
      fragment MomentDigestFooterActionsMomentPrivate on Moment {
        id
        ...MomentDigestFooterActionsLikeButtonMomentPrivate
      }
      ${LikeButton.fragments.moment.private}
    `,
  },
}
