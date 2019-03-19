import classNames from 'classnames'
import { Formik } from 'formik'
import gql from 'graphql-tag'
import _debounce from 'lodash/debounce'
import _get from 'lodash/get'
import Link from 'next/link'
import { FC, useContext, useState } from 'react'
import { QueryResult } from 'react-apollo'

import { Button } from '~/components/Button'
import UserList from '~/components/Dropdown/UserList'
import { Form } from '~/components/Form'
import { checkFor, Mutation, Query } from '~/components/GQL'
import { Icon } from '~/components/Icon'
import IconSpinner from '~/components/Icon/Spinner'
import { LanguageContext, Translate } from '~/components/Language'
import { Dropdown, PopperInstance } from '~/components/Popper'
import { TextIcon } from '~/components/TextIcon'
import { UserDigest } from '~/components/UserDigest'
import { ViewerContext } from '~/components/Viewer'

import { ERROR_CODES } from '~/common/enums'
import { isValidEmail, toPath, translate } from '~/common/utils'
import ICON_ARROW from '~/static/icons/arrow-right-white.svg?sprite'
import ICON_CLOSE from '~/static/icons/close.svg?sprite'

import {
  SearchUsers,
  SearchUsers_search_edges_node_User
} from './__generated__/SearchUsers'
import styles from './styles.css'

interface InviteInputState {
  user: SearchUsers_search_edges_node_User | null
  email: string | null
}

interface Props {
  invitationLeft: number
  submitCallback: () => void
}

const SEARCH_USERS = gql`
  query SearchUsers($search: String!) {
    search(input: { key: $search, type: User, first: 5 }) {
      edges {
        node {
          ... on User {
            ...UserDigestBriefDescUser
          }
        }
      }
    }
  }
  ${UserDigest.BriefDesc.fragments.user}
`

const INVITE = gql`
  mutation Invite($input: InviteInput!) {
    invite(input: $input)
  }
`

const debouncedSetSearch = _debounce((value, setSearch) => {
  setSearch(value)
}, 300)

const handleInviteSubmit = async (
  { setSubmitting }: any,
  inviteInput: InviteInputState,
  invite: (input: any) => any,
  submitCallback: () => any
) => {
  const displayName = _get(inviteInput, 'user.displayName')
  const path = toPath({
    page: 'userProfile',
    userName: _get(inviteInput, 'user.userName', '')
  })
  const TEXT_INVITE_FAILED = <Translate zh_hant="邀請失敗" zh_hans="邀请失败" />
  const baseErrorToastProps = {
    color: 'red',
    duration: 1000 * 5
  }

  try {
    await invite({
      variables: {
        input: {
          id: _get(inviteInput, 'user.id'),
          email: inviteInput.email
        }
      }
    })

    submitCallback()
    setSubmitting(false)

    if (inviteInput.email) {
      return window.dispatchEvent(
        new CustomEvent('addToast', {
          detail: {
            color: 'green',
            header: <Translate zh_hant="邀請已發送" zh_hans="邀请已发送" />,
            content: (
              <Translate
                zh_hant="請提醒你的朋友檢查電子信箱，如果沒有收到郵件，請查看垃圾信件匣。"
                zh_hans="请提醒你的朋友检查邮箱，如果没有收到邮件，请查看垃圾箱。"
              />
            )
          }
        })
      )
    } else {
      return window.dispatchEvent(
        new CustomEvent('addToast', {
          detail: {
            color: 'green',
            header: <Translate zh_hant="邀請成功" zh_hans="邀请成功" />,
            content: (
              <Translate
                zh_hant={`你的好友 ${displayName} 已透過你的邀請成為 Matters 創作者，感謝你們一起搭建 Matters 社群，5MAT 獎勵已送達。`}
                zh_hans={`你的好友 ${displayName} 已通过你的邀请成为 Matters 创作者，感谢你们一起搭建 Matters 社区，5MAT 奖励已送达。`}
              />
            )
          }
        })
      )
    }
  } catch ({ graphQLErrors: error }) {
    setSubmitting(false)

    if (checkFor(ERROR_CODES.USER_INVITE_STATE_INVALID, error)) {
      return window.dispatchEvent(
        new CustomEvent('addToast', {
          detail: {
            ...baseErrorToastProps,
            header: TEXT_INVITE_FAILED,
            content: (
              <Translate
                zh_hant={`你的好友 ${displayName} 已經是創作者了，無需開啟資格。`}
                zh_hans={`你的好友 ${displayName} 已经是创作者了，无需开启资格。`}
              />
            ),
            customButton: (
              <Link {...path}>
                <a>
                  <TextIcon
                    icon={
                      <Icon
                        style={{ width: 16, hieght: 10 }}
                        id={ICON_ARROW.id}
                        viewBox={ICON_ARROW.viewBox}
                      />
                    }
                    size="sm"
                    textPlacement="left"
                  >
                    <Translate
                      zh_hant="查看他／她的主頁"
                      zh_hans="查看 ta 的主页"
                    />
                  </TextIcon>
                </a>
              </Link>
            )
          }
        })
      )
    }

    if (checkFor(ERROR_CODES.USER_EMAIL_EXISTS, error)) {
      return window.dispatchEvent(
        new CustomEvent('addToast', {
          detail: {
            ...baseErrorToastProps,
            header: TEXT_INVITE_FAILED,
            content: (
              <Translate
                zh_hant="你輸入的電子信箱的所屬用戶已註冊。請直接輸入好友站內姓名，為他／她開啟創作者資格。"
                zh_hans="你输入邮箱所属用户已经在站上。请直接输入好友站内姓名，为 ta 开启创作者资格。"
              />
            )
          }
        })
      )
    }

    if (checkFor(ERROR_CODES.USER_INVITE_EMAIL_INVITED, error)) {
      return window.dispatchEvent(
        new CustomEvent('addToast', {
          detail: {
            ...baseErrorToastProps,
            header: TEXT_INVITE_FAILED,
            content: (
              <Translate
                zh_hant={`你的好友 ${
                  inviteInput.email
                } 已經被其他人邀請了，請提醒他／她檢查電子信箱，如果沒有收到郵件，請查看垃圾信件匣。你可以幫助其他好友開啟創作者資格。`}
                zh_hans={`你的好友 ${
                  inviteInput.email
                } 已经被其他人邀请了，请提示 ta 检查邮箱，如果没有收到邮件，请查看垃圾箱。你可以继续帮助其他好友开启创作者资格。`}
              />
            )
          }
        })
      )
    }
  }
}

const InviteForm: FC<Props> = ({ invitationLeft, submitCallback }) => {
  const { lang } = useContext(LanguageContext)
  const viewer = useContext(ViewerContext)

  const [inviteInput, setInviteInput] = useState<InviteInputState>({
    user: null,
    email: null
  })
  const [search, setSearch] = useState('')
  const [instance, setInstance] = useState<PopperInstance | null>(null)

  const hideDropdown = () => {
    if (instance) {
      instance.hide()
    }
  }
  const showDropdown = () => {
    if (instance) {
      setTimeout(() => {
        instance.show()
      }, 100) // unknown bug, needs set a timeout
    }
  }

  const canInvite = (viewer.isActive && invitationLeft > 0) || viewer.isAdmin
  const formClass = classNames({
    form: true,
    'u-area-disable': !canInvite
  })

  return (
    <Query
      query={SEARCH_USERS}
      variables={{ search }}
      skip={!search && !inviteInput.email}
    >
      {({ data, loading }: QueryResult & { data: SearchUsers }) => {
        const users = _get(data, 'search.edges', []).map(
          ({ node }: { node: SearchUsers_search_edges_node_User }) => node
        )

        if (users && users.length && !inviteInput.user && !inviteInput.email) {
          showDropdown()
        } else {
          hideDropdown()
        }

        return (
          <Mutation mutation={INVITE}>
            {invite => (
              <Formik
                initialValues={{ search: '' }}
                onSubmit={(values, formikActions) =>
                  handleInviteSubmit(
                    formikActions,
                    inviteInput,
                    invite,
                    submitCallback
                  )
                }
                render={({
                  values,
                  handleSubmit,
                  handleChange,
                  touched,
                  handleBlur,
                  isSubmitting
                }) => {
                  return (
                    <form className={formClass} onSubmit={handleSubmit}>
                      <Dropdown
                        maxWidth="20rem"
                        trigger="manual"
                        placement="bottom-start"
                        onCreate={setInstance}
                        content={
                          <UserList
                            users={users}
                            onClick={(
                              user: SearchUsers_search_edges_node_User
                            ) => {
                              setInviteInput({ user, email: null })
                            }}
                            hideDropdown={hideDropdown}
                          />
                        }
                      >
                        <div className="input-container">
                          <Form.Input
                            type="text"
                            field="search"
                            values={values}
                            errors={{}}
                            touched={touched}
                            handleBlur={handleBlur}
                            autoComplete="off"
                            handleChange={e => {
                              const value = e.target.value
                              handleChange(e)
                              if (isValidEmail(value)) {
                                setInviteInput({ user: null, email: value })
                              } else {
                                setInviteInput({ user: null, email: null })
                                debouncedSetSearch(value, setSearch)
                              }
                            }}
                            placeholder={translate({
                              zh_hant: '好友姓名或電子信箱',
                              zh_hans: '好友姓名或电子信箱',
                              lang
                            })}
                          />
                          {inviteInput.user && (
                            <span className="input-user">
                              <UserDigest.Mini user={inviteInput.user} />
                              <button
                                type="button"
                                onClick={() => {
                                  setInviteInput({ user: null, email: null })
                                }}
                                aira-label="刪除"
                              >
                                <Icon
                                  id={ICON_CLOSE.id}
                                  viewBox={ICON_CLOSE.viewBox}
                                />
                              </button>
                            </span>
                          )}
                        </div>
                      </Dropdown>
                      <div className="buttons">
                        <Button
                          type="submit"
                          bgColor="green"
                          disabled={
                            !canInvite ||
                            (!inviteInput.user && !inviteInput.email) ||
                            isSubmitting
                          }
                          icon={isSubmitting ? <IconSpinner /> : null}
                        >
                          <Translate zh_hant="邀請好友" zh_hans="邀请好友" />
                        </Button>
                      </div>

                      <style jsx>{styles}</style>
                    </form>
                  )
                }}
              />
            )}
          </Mutation>
        )
      }}
    </Query>
  )
}

export default InviteForm
