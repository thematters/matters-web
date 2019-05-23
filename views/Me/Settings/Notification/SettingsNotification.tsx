import gql from 'graphql-tag'
import _get from 'lodash/get'
import { Mutation, Query, QueryResult } from 'react-apollo'

import { Head, PageHeader, Translate } from '~/components'
import { Switch } from '~/components/Switch'

import { TEXT } from '~/common/enums'

import { ViewerNotificationSettings } from './__generated__/ViewerNotificationSettings'
import styles from './styles.css'

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
          mention
          email
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

const settingsMap = {
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
    // {
    //   key: 'downstream',
    //   title: <Translate zh_hant="作品上游变更" zh_hans="作品上游变更" />
    // },
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
  others: [
    {
      key: 'email',
      title: <Translate zh_hant="電子信箱通知" zh_hans="邮箱通知" />
    },
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

const SettingsNotification = () => (
  <Query query={VIEWER_NOTIFICATION_SETTINGS}>
    {({ data }: QueryResult & { data: ViewerNotificationSettings }) => {
      const settings = _get(data, 'viewer.settings.notification', {})

      return (
        <Mutation mutation={UPDATE_VIEWER_NOTIFICATION}>
          {(updateNotification: any) => {
            const onChange = (type: string) =>
              updateNotification({
                variables: {
                  type,
                  enabled: !settings[type]
                },
                optimisticResponse: {
                  updateNotificationSetting: {
                    id: data.viewer.id,
                    settings: {
                      notification: {
                        [type]: !settings[type],
                        __typename: 'NotificationSetting'
                      },
                      __typename: 'UserSettings'
                    },
                    __typename: 'User'
                  }
                }
              })

            return (
              <>
                <Head
                  title={{
                    zh_hant: TEXT.zh_hant.notificationSetting,
                    zh_hans: TEXT.zh_hans.notificationSetting
                  }}
                />

                <div className="l-row first">
                  <section className="section-container l-col-4 l-col-md-4 l-lg-6">
                    <PageHeader
                      pageTitle={
                        <Translate zh_hant="與我有關" zh_hans="与我有关" />
                      }
                      is="h2"
                    />

                    {settingsMap.me.map(setting => (
                      <section className="setting-section" key={setting.key}>
                        <span className="title">{setting.title}</span>
                        <Switch
                          checked={settings[setting.key]}
                          onChange={() => onChange(setting.key)}
                        />
                      </section>
                    ))}
                  </section>

                  <section className="section-container l-col-4 l-col-md-4 l-lg-6">
                    <PageHeader
                      pageTitle={<Translate zh_hant="其他" zh_hans="其他" />}
                      is="h2"
                    />

                    {settingsMap.others.map(setting => (
                      <section className="setting-section" key={setting.key}>
                        <span className="title">{setting.title}</span>
                        <Switch
                          checked={settings[setting.key]}
                          onChange={() => onChange(setting.key)}
                        />
                      </section>
                    ))}
                  </section>
                </div>

                <div className="l-row">
                  <section className="section-container l-col-4 l-col-md-4 l-lg-6">
                    <PageHeader
                      pageTitle={<Translate zh_hant="作品" zh_hans="作品" />}
                      is="h2"
                    />

                    {settingsMap.article.map(setting => (
                      <section className="setting-section" key={setting.key}>
                        <span className="title">{setting.title}</span>
                        <Switch
                          checked={settings[setting.key]}
                          onChange={() => onChange(setting.key)}
                        />
                      </section>
                    ))}
                  </section>

                  <section className="section-container l-col-4 l-col-md-4 l-lg-6">
                    <PageHeader
                      pageTitle={<Translate zh_hant="評論" zh_hans="评论" />}
                      is="h2"
                    />

                    {settingsMap.comment.map(setting => (
                      <section className="setting-section" key={setting.key}>
                        <span className="title">{setting.title}</span>
                        <Switch
                          checked={settings[setting.key]}
                          onChange={() => onChange(setting.key)}
                        />
                      </section>
                    ))}
                  </section>
                </div>

                <style jsx>{styles}</style>
              </>
            )
          }}
        </Mutation>
      )
    }}
  </Query>
)

export default SettingsNotification
