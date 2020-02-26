import { useQuery } from '@apollo/react-hooks'
import gql from 'graphql-tag'

import { Head, PageHeader, Spinner, Translate } from '~/components'
import { useMutation } from '~/components/GQL'

import PushSwitch from './PushSwitch'
import SettingItem from './SettingItem'
import styles from './styles.css'

import { UpdateViewerNotification } from './__generated__/UpdateViewerNotification'
import { ViewerNotificationSettings } from './__generated__/ViewerNotificationSettings'

const VIEWER_NOTIFICATION_SETTINGS = gql`
  query ViewerNotificationSettings {
    viewer {
      id
      settings {
        language
        notification {
          enable
          email
          mention
          follow
          comment
          appreciation
          articleSubscription
          commentSubscribed
          downstream
          commentPinned
          commentVoted
          officialNotice
          reportFeedback
        }
      }
    }
  }
`

const UPDATE_VIEWER_NOTIFICATION = gql`
  mutation UpdateViewerNotification(
    $type: NotificationSettingType!
    $enabled: Boolean!
  ) {
    updateNotificationSetting(input: { type: $type, enabled: $enabled }) {
      id
      settings {
        notification {
          enable
          email
          mention
          follow
          comment
          appreciation
          articleSubscription
          commentSubscribed
          downstream
          commentPinned
          commentVoted
          officialNotice
          reportFeedback
        }
      }
    }
  }
`

type SettingItemKey =
  | 'enable'
  | 'email'
  | 'mention'
  | 'follow'
  | 'comment'
  | 'appreciation'
  | 'articleSubscription'
  | 'commentSubscribed'
  | 'downstream'
  | 'commentPinned'
  | 'commentVoted'
  | 'officialNotice'
  | 'reportFeedback'

interface SettingItem {
  key: SettingItemKey
  title: React.ReactNode
  description?: React.ReactNode
}

const settingsMap: {
  me: SettingItem[]
  article: SettingItem[]
  comment: SettingItem[]
  preference: SettingItem[]
  others: SettingItem[]
} = {
  me: [
    {
      key: 'mention',
      title: <Translate zh_hant="提及我" zh_hans="提及我" />
    },
    {
      key: 'follow',
      title: <Translate zh_hant="追蹤我" zh_hans="追踪我" />
    }
  ],
  article: [
    {
      key: 'appreciation',
      title: <Translate zh_hant="作品被贊賞" zh_hans="作品被赞赏" />
    },
    {
      key: 'articleSubscription',
      title: <Translate zh_hant="作品被收藏" zh_hans="作品被收藏" />
    },
    {
      key: 'commentSubscribed',
      title: (
        <Translate zh_hant="收藏的作品有新評論" zh_hans="收藏的作品有新评论" />
      )
    }
  ],
  comment: [
    {
      key: 'comment',
      title: <Translate zh_hant="評論和回覆" zh_hans="评论和回复" />
    },
    {
      key: 'commentPinned',
      title: <Translate zh_hant="評論被置頂" zh_hans="评论被置顶" />
    },
    {
      key: 'commentVoted',
      title: <Translate zh_hant="評論被頂踩" zh_hans="评论被顶踩" />
    }
  ],
  preference: [
    {
      key: 'email',
      title: <Translate zh_hant="電子信箱通知" zh_hans="邮箱通知" />,
      description: (
        <Translate
          zh_hant="精選過去 24 小時與你有關的消息"
          zh_hans="精选过去 24 小时与你有关的消息"
        />
      )
    }
  ],
  others: [
    {
      key: 'officialNotice',
      title: <Translate zh_hant="官方公告" zh_hans="官方公告" />
    },
    {
      key: 'reportFeedback',
      title: <Translate zh_hant="檢舉反饋" zh_hans="检举反馈" />
    }
  ]
}

const SettingsNotification = () => {
  const [updateNotification] = useMutation<UpdateViewerNotification>(
    UPDATE_VIEWER_NOTIFICATION
  )
  const { data, loading } = useQuery<ViewerNotificationSettings>(
    VIEWER_NOTIFICATION_SETTINGS
  )
  const settings = data?.viewer?.settings.notification
  const id = data?.viewer?.id

  if (loading) {
    return <Spinner />
  }

  if (!id || !settings) {
    return null
  }

  const handleOnChange = (type: SettingItemKey) => {
    updateNotification({
      variables: {
        type,
        enabled: !settings[type]
      },
      optimisticResponse: {
        updateNotificationSetting: {
          id,
          settings: {
            notification: {
              ...settings,
              [type]: !settings[type],
              __typename: 'NotificationSetting'
            },
            __typename: 'UserSettings'
          },
          __typename: 'User'
        }
      }
    })
  }

  return (
    <>
      <Head title={{ id: 'notificationSetting' }} />

      <div className="l-row first">
        <section className="section-container l-col-4 l-col-md-4 l-lg-6">
          <PageHeader
            title={<Translate zh_hant="偏好" zh_hans="偏好" />}
            is="h2"
          />

          <PushSwitch />

          {settingsMap.preference.map(setting => (
            <SettingItem
              key={setting.key}
              enabled={settings[setting.key]}
              title={setting.title}
              description={setting.description}
              onChange={() => handleOnChange(setting.key)}
            />
          ))}
        </section>

        <section className="section-container l-col-4 l-col-md-4 l-lg-6">
          <PageHeader
            title={<Translate zh_hant="與我有關" zh_hans="与我有关" />}
            is="h2"
          />

          {settingsMap.me.map(setting => (
            <SettingItem
              key={setting.key}
              enabled={settings[setting.key]}
              title={setting.title}
              description={setting.description}
              onChange={() => handleOnChange(setting.key)}
            />
          ))}
        </section>
      </div>

      <div className="l-row">
        <section className="section-container l-col-4 l-col-md-4 l-lg-6">
          <PageHeader
            title={<Translate zh_hant="作品" zh_hans="作品" />}
            is="h2"
          />

          {settingsMap.article.map(setting => (
            <SettingItem
              key={setting.key}
              enabled={settings[setting.key]}
              title={setting.title}
              description={setting.description}
              onChange={() => handleOnChange(setting.key)}
            />
          ))}
        </section>

        <section className="section-container l-col-4 l-col-md-4 l-lg-6">
          <PageHeader
            title={<Translate zh_hant="評論" zh_hans="评论" />}
            is="h2"
          />

          {settingsMap.comment.map(setting => (
            <SettingItem
              key={setting.key}
              enabled={settings[setting.key]}
              title={setting.title}
              description={setting.description}
              onChange={() => handleOnChange(setting.key)}
            />
          ))}
        </section>
      </div>

      <div className="l-row">
        <section className="section-container l-col-4 l-col-md-4 l-lg-6">
          <PageHeader
            title={<Translate zh_hant="其他" zh_hans="其他" />}
            is="h2"
          />

          {settingsMap.others.map(setting => (
            <SettingItem
              key={setting.key}
              enabled={settings[setting.key]}
              title={setting.title}
              description={setting.description}
              onChange={() => handleOnChange(setting.key)}
            />
          ))}
        </section>
      </div>

      <style jsx>{styles}</style>
    </>
  )
}
export default SettingsNotification
