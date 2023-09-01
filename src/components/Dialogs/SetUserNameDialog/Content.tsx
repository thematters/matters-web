import { useApolloClient } from '@apollo/react-hooks'
import _pickBy from 'lodash/pickBy'
import React, { useContext, useEffect, useState } from 'react'

import { MAX_USER_NAME_LENGTH } from '~/common/enums'
import { filterUserName } from '~/common/utils'
import { Spinner, ViewerContext } from '~/components'

import ConfirmStep from './ConfirmStep'
import { QUERY_USER_NAME } from './gql'
import InputStep from './InputStep'

interface FormProps {
  closeDialog: () => void
}

type Step = 'input' | 'confirm'

const SetUserNameDialogContent: React.FC<FormProps> = ({ closeDialog }) => {
  const viewer = useContext(ViewerContext)
  const client = useApolloClient()

  const email = viewer.info.email
  const [loading, setLoading] = useState(email !== null)

  const [index, setIndex] = useState(1)
  const pureUserName =
    email && filterUserName(email.split('@')[0].slice(0, MAX_USER_NAME_LENGTH))
  let initUserName = pureUserName
  if (initUserName && initUserName.length < 4) {
    initUserName = initUserName + String(index).padStart(3, '0')
  }

  const [userName, setUserName] = useState(email === null ? '' : initUserName)

  const [step, setStep] = useState<Step>('input')
  const isInput = step === 'input'
  const isConfirm = step === 'confirm'

  useEffect(() => {
    ;(async () => {
      if (!email) {
        return
      }
      const { data } = await client.query({
        query: QUERY_USER_NAME,
        variables: { userName: initUserName },
        fetchPolicy: 'network-only',
      })
      if (!!data.user) {
        initUserName =
          pureUserName.slice(0, MAX_USER_NAME_LENGTH - 3) +
          String(index + 1).padStart(3, '0')
        setIndex(index + 1)
      } else {
        setUserName(initUserName)
        setLoading(false)
      }
    })()
  }, [index])

  if (loading) {
    return <Spinner />
  }

  return (
    <>
      {isInput && (
        <InputStep
          userName={userName}
          gotoConfirm={(userName) => {
            setStep('confirm')
            setUserName(userName)
          }}
        />
      )}
      {isConfirm && (
        <ConfirmStep
          back={() => {
            setStep('input')
          }}
          userName={userName}
          closeDialog={closeDialog}
        />
      )}
    </>
  )
}

export default SetUserNameDialogContent
