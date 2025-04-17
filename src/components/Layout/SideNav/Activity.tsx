import { useContext } from 'react'
import { FormattedMessage } from 'react-intl'

import { ReactComponent as IconComment } from '@/public/static/icons/24px/comment.svg'
import { ReactComponent as IconEdit } from '@/public/static/icons/24px/edit.svg'
import {
  BREAKPOINTS,
  ERROR_CODES,
  ERROR_MESSAGES,
  OPEN_UNIVERSAL_AUTH_DIALOG,
  PATHS,
  UNIVERSAL_AUTH_TRIGGER,
  URL_USER_PROFILE,
} from '~/common/enums'
import { analytics, toPath } from '~/common/utils'
import { toast, useMediaQuery, useRoute, ViewerContext } from '~/components'
import { Icon } from '~/components/Icon'
import { Menu } from '~/components/Menu'

interface Props {
  authed?: boolean
  forbidden?: boolean
}

type ItemType = 'article' | 'moment'

const ActivityPopover = ({ authed, forbidden }: Props) => {
  const { isInPath } = useRoute()
  const isSmUp = useMediaQuery(`(min-width: ${BREAKPOINTS.MD}px)`)
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

  const onClick = (type: ItemType) => {
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

  const getItemProps = (type: ItemType) => {
    const config = {
      moment: {
        text: <FormattedMessage defaultMessage="Moment" id="afLdf2" />,
        icon: <Icon icon={IconComment} size={20} />,
        href:
          authed && !forbidden
            ? isSmUp
              ? openMomentFormPath
              : PATHS.MOMENT_DETAIL_EDIT
            : undefined,
        htmlHref:
          authed && !forbidden
            ? isSmUp
              ? openMomentFormPath
              : PATHS.MOMENT_DETAIL_EDIT
            : undefined,
      },
      article: {
        text: <FormattedMessage defaultMessage="Article" id="jx7Hn3" />,
        icon: <Icon icon={IconEdit} size={20} />,
        href:
          authed && !forbidden && !isInDraftDetail
            ? PATHS.ME_DRAFT_NEW
            : undefined,
        htmlHref:
          authed && !forbidden && isInDraftDetail
            ? PATHS.ME_DRAFT_NEW
            : undefined,
      },
    }

    return {
      text: config[type].text,
      icon: config[type].icon,
      is: 'link' as const,
      href: config[type].href,
      htmlHref: config[type].htmlHref,
      onClick: () => onClick(type),
    }
  }

  return (
    <Menu>
      <Menu.Item {...getItemProps('moment')} />
      <Menu.Item {...getItemProps('article')} />
    </Menu>
  )
}

export default ActivityPopover
