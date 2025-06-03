import { useContext } from 'react'
import { FormattedMessage } from 'react-intl'

import IconComment from '@/public/static/icons/24px/comment.svg'
import IconEdit from '@/public/static/icons/24px/edit.svg'
import {
  ERROR_CODES,
  ERROR_MESSAGES,
  OPEN_UNIVERSAL_AUTH_DIALOG,
  PATHS,
  UNIVERSAL_AUTH_TRIGGER,
  URL_USER_PROFILE,
} from '~/common/enums'
import { analytics, toPath } from '~/common/utils'
import { toast, useRoute, ViewerContext } from '~/components'
import { Icon } from '~/components/Icon'
import { Menu } from '~/components/Menu'

interface Props {
  authed?: boolean
  forbidden?: boolean
}

const ActivityPopover = ({ authed, forbidden }: Props) => {
  const { isInPath } = useRoute()
  const isInDraftDetail = isInPath('ME_DRAFT_DETAIL')
  const viewer = useContext(ViewerContext)
  const userProfilePath = toPath({
    page: 'userProfile',
    userName: viewer.userName || '',
  })
  const openMomentFormPath =
    typeof window !== 'undefined'
      ? `${window.location.origin}${userProfilePath.href}?${URL_USER_PROFILE.OPEN_POST_MOMENT_FORM.key}=${URL_USER_PROFILE.OPEN_POST_MOMENT_FORM.value}`
      : ''

  const onClick = (type: 'article' | 'moment') => {
    if (!authed) {
      window.dispatchEvent(
        new CustomEvent(OPEN_UNIVERSAL_AUTH_DIALOG, {
          detail: { trigger: UNIVERSAL_AUTH_TRIGGER.createDraft },
        })
      )
      return
    }

    if (forbidden) {
      toast.error({
        message: (
          <FormattedMessage
            {...ERROR_MESSAGES[ERROR_CODES.FORBIDDEN_BY_STATE]}
          />
        ),
      })
    }

    analytics.trackEvent('click_button', {
      type: type === 'article' ? 'write' : 'write_moment',
    })
    return
  }
  return (
    <Menu>
      <Menu.Item
        text={<FormattedMessage defaultMessage="Moment" id="afLdf2" />}
        icon={<Icon icon={IconComment} size={20} />}
        is="link"
        href={authed && !forbidden ? openMomentFormPath : undefined}
        htmlHref={authed && !forbidden ? openMomentFormPath : undefined}
        onClick={() => {
          onClick('moment')
        }}
      />

      <Menu.Item
        text={<FormattedMessage defaultMessage="Article" id="jx7Hn3" />}
        icon={<Icon icon={IconEdit} size={20} />}
        is="link"
        href={
          authed && !forbidden && !isInDraftDetail
            ? PATHS.ME_DRAFT_NEW
            : undefined
        }
        htmlHref={
          authed && !forbidden && isInDraftDetail
            ? PATHS.ME_DRAFT_NEW
            : undefined
        }
        onClick={() => {
          onClick('article')
        }}
      />
    </Menu>
  )
}

export default ActivityPopover
