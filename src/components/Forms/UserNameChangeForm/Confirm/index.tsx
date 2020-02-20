import { useFormik } from 'formik'
import gql from 'graphql-tag'
import _isEmpty from 'lodash/isEmpty'
import { useContext } from 'react'

import { Dialog, Form, LanguageContext, Translate } from '~/components'
import { getErrorCodes, useMutation } from '~/components/GQL'

import { TEXT } from '~/common/enums'
import {
  translate,
  validateComparedUserName,
  validateUserName
} from '~/common/utils'

import { UpdateUserInfoUserName } from './__generated__/UpdateUserInfoUserName'

interface FormProps {
  submitCallback: () => void
}

interface FormValues {
  userName: string
  comparedUserName: string
}

const UPDATE_USER_INFO = gql`
  mutation UpdateUserInfoUserName($input: UpdateUserInfoInput!) {
    updateUserInfo(input: $input) {
      id
      userName
    }
  }
`

export const UserNameChangeConfirmForm: React.FC<FormProps> = formProps => {
  const [update] = useMutation<UpdateUserInfoUserName>(UPDATE_USER_INFO)
  const { lang } = useContext(LanguageContext)
  const { submitCallback } = formProps

  const {
    values,
    errors,
    touched,
    handleBlur,
    handleChange,
    handleSubmit,
    isSubmitting
  } = useFormik<FormValues>({
    initialValues: {
      userName: '',
      comparedUserName: ''
    },
    validate: ({ userName, comparedUserName }) => {
      const isInvalidUserName = validateUserName(userName, lang)
      const isInvalidComparedUserName = validateComparedUserName(
        userName,
        comparedUserName,
        lang
      )
      return {
        ...(isInvalidUserName ? { userName: isInvalidUserName } : {}),
        ...(isInvalidComparedUserName
          ? { comparedUserName: isInvalidComparedUserName }
          : {})
      }
    },
    onSubmit: async ({ userName }, { setFieldError, setSubmitting }) => {
      try {
        await update({ variables: { input: { userName } } })

        if (submitCallback) {
          submitCallback()
        }
      } catch (error) {
        const errorCode = getErrorCodes(error)[0]
        const errorMessage = translate({
          zh_hant: TEXT.zh_hant.error[errorCode] || errorCode,
          zh_hans: TEXT.zh_hans.error[errorCode] || errorCode,
          lang
        })
        setFieldError('userName', errorMessage)
      }

      setSubmitting(false)
    }
  })

  return (
    <Form onSubmit={handleSubmit}>
      <Dialog.Content spacing={['xloose', 'xxxloose']}>
        <Form.Input
          label="Matters ID"
          type="text"
          name="userName"
          placeholder={translate({
            zh_hant: TEXT.zh_hant.enterUserName,
            zh_hans: TEXT.zh_hans.enterUserName,
            lang
          })}
          value={values.userName}
          error={touched.userName && errors.userName}
          onBlur={handleBlur}
          onChange={handleChange}
          hint={
            <Translate
              zh_hant={TEXT.zh_hant.userNameHint}
              zh_hans={TEXT.zh_hans.userNameHint}
            />
          }
        />
        <Form.Input
          type="text"
          name="comparedUserName"
          placeholder={translate({
            zh_hant: TEXT.zh_hant.enterUserNameAgign,
            zh_hans: TEXT.zh_hans.enterUserNameAgign,
            lang
          })}
          value={values.comparedUserName}
          error={touched.comparedUserName && errors.comparedUserName}
          onBlur={handleBlur}
          onChange={handleChange}
        />
      </Dialog.Content>

      <Dialog.Footer>
        <Dialog.Footer.Button
          type="submit"
          disabled={!_isEmpty(errors) || isSubmitting}
          loading={isSubmitting}
        >
          <Translate zh_hant={TEXT.zh_hant.done} zh_hans={TEXT.zh_hans.done} />
        </Dialog.Footer.Button>
      </Dialog.Footer>
    </Form>
  )
}
