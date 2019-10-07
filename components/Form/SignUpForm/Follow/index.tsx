import classNames from 'classnames'
import gql from 'graphql-tag'
import _get from 'lodash/get'
import { FC, useContext } from 'react'
import { QueryResult } from 'react-apollo'

import { Button } from '~/components/Button'
import { AuthorPicker } from '~/components/Follow'
import { Query } from '~/components/GQL'
import { LanguageContext } from '~/components/Language'
import { Spinner } from '~/components/Spinner'

import { translate } from '~/common/utils'

import styles from './styles.css'

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
  query MeFollow {
    viewer {
      id
      ...FolloweeCountUser
    }
  }
  ${AuthorPicker.fragments.user}
`

interface Props {
  extraClass?: string[]
  purpose: 'modal' | 'page'
  submitCallback?: () => void
}

export const SignUpFollowForm: FC<Props> = ({
  extraClass = [],
  purpose,
  submitCallback
}) => {
  const { lang } = useContext(LanguageContext)

  const containerStyle = classNames(
    purpose === 'modal' ? 'modal-container' : 'page-container'
  )

  const titleText = translate({
    zh_hant: '請至少選擇 5 位作者',
    zh_hans: '请至少选择 5 位作者',
    lang
  })

  const nextText = translate({
    zh_hant: '下一步',
    zh_hans: '下一步',
    lang
  })

  return (
    <Query query={ME_FOLLOW}>
      {({ data, loading, error }: QueryResult & { data: any }) => {
        if (loading) {
          return <Spinner />
        }

        const followeeCount = _get(data, 'viewer.followees.totalCount', 0)
        return (
          <div className={containerStyle}>
            <AuthorPicker
              viewer={data.viewer}
              title={titleText}
              titleIs="span"
              readonly
            />
            <div className="buttons">
              <Button
                type="submit"
                bgColor="green"
                style={{ minWidth: '5rem' }}
                disabled={followeeCount < 5}
                onClick={submitCallback}
              >
                {nextText}
              </Button>
            </div>
            <style jsx>{styles}</style>
          </div>
        )
      }}
    </Query>
  )
}
