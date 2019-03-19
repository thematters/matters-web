import classNames from 'classnames'
import { withFormik } from 'formik'
import gql from 'graphql-tag'
import _debounce from 'lodash/debounce'
import _get from 'lodash/get'
import { FC, useContext, useState } from 'react'
import { QueryResult } from 'react-apollo'

import { Button } from '~/components/Button'
import UserList from '~/components/Dropdown/UserList'
import { Form } from '~/components/Form'
import { checkFormError } from '~/components/Form/Error'
import { Mutation, Query } from '~/components/GQL'
import { Icon } from '~/components/Icon'
import IconSpinner from '~/components/Icon/Spinner'
import { LanguageContext, Translate } from '~/components/Language'
import { Dropdown, PopperInstance } from '~/components/Popper'
import { UserDigest } from '~/components/UserDigest'

import { ERROR_CODES } from '~/common/enums'
import { translate } from '~/common/utils'
import ICON_CLOSE from '~/static/icons/close.svg?sprite'

import {
  SearchUsers,
  SearchUsers_search_edges_node_User
} from './__generated__/SearchUsers'
import styles from './styles.css'

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

interface Props {
  defaultDisabled: boolean
  submitCallback?: (params: any) => void
}

const INVITE = gql`
  mutation Invite($input: InviteInput!) {
    invite(input: $input)
  }
`

const debouncedSetSearch = _debounce((value, setSearch) => {
  setSearch(value)
}, 300)

const InviteForm: FC<Props> = ({ defaultDisabled, submitCallback }) => {
  const { lang } = useContext(LanguageContext)
  const [inviteInput, setInviteInput] = useState<{
    user: SearchUsers_search_edges_node_User | null
    email: string | null
  }>({ user: null, email: null })

  const BaseForm = ({
    values,
    errors,
    touched,
    isSubmitting,
    handleBlur,
    handleChange,
    handleSubmit
  }: {
    [key: string]: any
  }) => {
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
    const formClass = classNames({
      form: true
      // 'u-area-disable': defaultDisabled
    })

    return (
      <Query query={SEARCH_USERS} variables={{ search }} skip={!search}>
        {({ data, loading }: QueryResult & { data: SearchUsers }) => {
          const users = _get(data, 'search.edges', []).map(
            ({ node }: { node: SearchUsers_search_edges_node_User }) => node
          )

          if (users && users.length && !inviteInput.user) {
            showDropdown()
          } else {
            hideDropdown()
          }

          return (
            <form className={formClass} onSubmit={handleSubmit}>
              <Dropdown
                maxWidth="20rem"
                trigger="manual"
                placement="bottom-start"
                onCreate={i => setInstance(i)}
                content={
                  <UserList
                    users={users}
                    onClick={(user: SearchUsers_search_edges_node_User) => {
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
                    handleChange={e => {
                      handleChange(e)
                      debouncedSetSearch(e.target.value, setSearch)
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
                        <Icon id={ICON_CLOSE.id} viewBox={ICON_CLOSE.viewBox} />
                      </button>
                    </span>
                  )}
                </div>
              </Dropdown>
              <div className="buttons">
                <Button
                  type="submit"
                  bgColor="green"
                  disabled={defaultDisabled || isSubmitting}
                  icon={isSubmitting ? <IconSpinner /> : null}
                >
                  <Translate zh_hant="邀請好友" zh_hans="邀请好友" />
                </Button>
              </div>

              <style jsx>{styles}</style>
            </form>
          )
        }}
      </Query>
    )
  }

  const MainForm: any = withFormik({
    // mapPropsToValues: () => ({
    //   invite: ''
    // }),

    handleSubmit: (values, { props, setFieldError, setSubmitting }: any) => {
      const { submitAction } = props

      // TODO

      submitAction({
        variables: {
          input: { id: _get(inviteInput, 'user.id'), email: inviteInput.email }
        }
      })
        .then(({ data }: any) => {
          const { confirmVerificationCode } = data
          if (submitCallback && confirmVerificationCode) {
            submitCallback({ codeId: confirmVerificationCode })
          }
        })
        .catch(({ graphQLErrors: error }: any) => {
          const { CODE_INVALID } = ERROR_CODES
          const codeInvalidHint = checkFormError(CODE_INVALID, error, lang)
          if (codeInvalidHint) {
            setFieldError('code', codeInvalidHint)
          }
        })
        .finally(() => {
          setSubmitting(false)
        })
    }
  })(BaseForm)

  return (
    <>
      <Mutation mutation={INVITE}>
        {confirmCode => <MainForm submitAction={confirmCode} />}
      </Mutation>
      <style jsx>{styles}</style>
    </>
  )
}

export default InviteForm
