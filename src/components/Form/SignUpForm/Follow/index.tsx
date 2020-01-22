import { useQuery } from '@apollo/react-hooks'
import classNames from 'classnames'
import gql from 'graphql-tag'

import { AuthorPicker, Button, Translate } from '~/components'
import { QueryError } from '~/components/GQL'
import { Spinner } from '~/components/Spinner'

import styles from './styles.css'

import { SignUpMeFollow } from './__generated__/SignUpMeFollow'

/**
 * This component is designed for sign up form with builtin mutation.
 *
 * Usage:
 *
 * ```jsx
 *   <SignUpFollowForm
 *     extraClass={[]}
 *     purpose="modal"
 *     submitCallback={()=> {}}
 *   />
 * ```
 *
 */

const ME_FOLLOW = gql`
  query SignUpMeFollow {
    viewer {
      id
      followees(input: { first: 0 }) {
        totalCount
      }
    }
  }
`

interface Props {
  extraClass?: string[]
  purpose: 'modal' | 'page'
  submitCallback?: () => void
}

export const SignUpFollowForm: React.FC<Props> = ({
  extraClass = [],
  purpose,
  submitCallback
}) => {
  const { loading, data, error } = useQuery<SignUpMeFollow>(ME_FOLLOW)

  const containerStyle = classNames(
    purpose === 'modal' ? 'modal-container' : 'page-container'
  )

  if (loading) {
    return <Spinner />
  }

  if (error) {
    return <QueryError error={error} />
  }

  if (!data || !data.viewer) {
    return null
  }

  const followeeCount = data.viewer.followees.totalCount || 0

  return (
    <div className={containerStyle}>
      <AuthorPicker
        title={
          <Translate
            zh_hant="請至少選擇 5 作者"
            zh_hans="请至少选择 5 位作者"
          />
        }
        titleIs="span"
      />

      <div className="buttons">
        <Button
          type="submit"
          bgColor="green"
          style={{ minWidth: '5rem' }}
          disabled={followeeCount < 5}
          onClick={submitCallback}
        >
          <Translate zh_hant="下一步" zh_hans="下一步" />
        </Button>
      </div>

      <style jsx>{styles}</style>
    </div>
  )
}
