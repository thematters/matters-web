import { withFormik } from 'formik'
import gql from 'graphql-tag'
import _isEmpty from 'lodash/isEmpty'
import { FC, useContext } from 'react'

import { Button } from '~/components/Button'
import {
  ProfileAvatarUploader,
  ProfileCoverUploader
} from '~/components/FileUploader'
import { Form } from '~/components/Form'
import { Mutation } from '~/components/GQL'
import { Icon } from '~/components/Icon'
import IconSpinner from '~/components/Icon/Spinner'
import { LanguageContext, Translate } from '~/components/Language'
import { ViewerContext } from '~/components/Viewer'

import { TEXT } from '~/common/enums'
import { isValidDisplayName, translate } from '~/common/utils'
import ICON_SAVE from '~/static/icons/write.svg?sprite'

import styles from './styles.css'

interface Props {
  user: { [key: string]: any }
  setEditing: (value: boolean) => void
}

const UPDATE_USER_INFO = gql`
  mutation UpdateUserInfo($input: UpdateUserInfoInput!) {
    updateUserInfo(input: $input) {
      id
      displayName
      info {
        description
      }
    }
  }
`

export const UserProfileEditor: FC<Props> = ({ user, setEditing }) => {
  const { lang } = useContext(LanguageContext)
  const viewer = useContext(ViewerContext)

  const validateDisplayName = (value: string, language: string) => {
    let result: any
    if (!value) {
      result = {
        zh_hant: TEXT.zh_hant.required,
        zh_hans: TEXT.zh_hans.required
      }
    } else if (!isValidDisplayName(value) && !viewer.isAdmin) {
      result = {
        zh_hant: TEXT.zh_hant.displayNameHint,
        zh_hans: TEXT.zh_hans.displayNameHint
      }
    }
    if (result) {
      return translate({ ...result, lang: language })
    }
  }

  const validateDescription = (value: string, language: Language) => {
    let result: any
    if (value && value.length > 200) {
      result = {
        zh_hant: `已超過 200 字，目前 ${value.length} 字`,
        zh_hans: `已超过 200 字，目前 ${value.length} 字`
      }
    }
    if (result) {
      return translate({ ...result, lang: language })
    }
  }

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
    const displayNamePlaceholder = translate({
      zh_hant: '輸入姓名',
      zh_hans: '输入姓名',
      lang
    })
    const descriptionPlaceholder = translate({
      zh_hant: '輸入個人簡介',
      zh_hans: '输入个人简介',
      lang
    })
    const displayNameHint = translate({
      zh_hant: TEXT.zh_hant.displayNameHint,
      zh_hans: TEXT.zh_hans.displayNameHint,
      lang
    })
    const descriptionHint = translate({
      zh_hant: TEXT.zh_hant.descriptionHint,
      zh_hans: TEXT.zh_hans.descriptionHint,
      lang
    })
    const save = translate({
      zh_hant: TEXT.zh_hant.save,
      zh_hans: TEXT.zh_hans.save,
      lang
    })

    return (
      <>
        <form className="form" onSubmit={handleSubmit}>
          <Form.Input
            type="text"
            field="displayName"
            className={['name']}
            values={values}
            errors={errors}
            touched={touched}
            handleBlur={handleBlur}
            handleChange={handleChange}
            placeholder={displayNamePlaceholder}
            hint={displayNameHint}
          />
          <Form.Textarea
            field="description"
            placeholder={descriptionPlaceholder}
            values={values}
            errors={errors}
            touched={touched}
            hint={descriptionHint}
            handleBlur={handleBlur}
            handleChange={handleChange}
            style={{ height: '7rem', resize: 'none' }}
          />
          <div className="buttons">
            <Button
              type="submit"
              bgColor="green"
              style={{ minWidth: '5rem' }}
              disabled={!_isEmpty(errors) || isSubmitting}
              icon={
                isSubmitting ? (
                  <IconSpinner />
                ) : (
                  <Icon id={ICON_SAVE.id} viewBox={ICON_SAVE.viewBox} />
                )
              }
            >
              {save}
            </Button>
            <Button
              type="button"
              bgColor="transparent"
              textColor="grey"
              textWeight="normal"
              spacing="default"
              disabled={isSubmitting}
              onClick={() => setEditing(false)}
            >
              <Translate
                zh_hant={TEXT.zh_hant.cancel}
                zh_hans={TEXT.zh_hans.cancel}
              />
            </Button>
          </div>
        </form>
        <style jsx>{styles}</style>
      </>
    )
  }

  const MainForm: any = withFormik({
    mapPropsToValues: () => ({
      displayName: user.displayName,
      description: user.info.description
    }),

    validate: ({ displayName, description }) => {
      const inInvalidDisplayName = validateDisplayName(displayName, lang)
      const isInvalidDescription = validateDescription(description, lang)
      const errors = {
        ...(inInvalidDisplayName ? { displayName: inInvalidDisplayName } : {}),
        ...(isInvalidDescription ? { description: isInvalidDescription } : {})
      }
      return errors
    },

    handleSubmit: (values, { props, setSubmitting }: any) => {
      const { displayName, description } = values
      const { submitAction } = props
      if (!submitAction) {
        return undefined
      }

      submitAction({ variables: { input: { displayName, description } } })
        .then(({ data }: any) => {
          if (setEditing) {
            setEditing(false)
          }
        })
        .catch((result: any) => {
          // TODO: Handle error
        })
        .finally(() => {
          setSubmitting(false)
        })
    }
  })(BaseForm)

  return (
    <>
      <div className="cover-container l-row">
        <section className="l-col-4 l-col-md-8 l-col-lg-12">
          <ProfileCoverUploader user={user} />
        </section>
      </div>
      <div className="content-container l-row">
        <section className="l-col-4 l-col-md-6 l-offset-md-1 l-col-lg-8 l-offset-lg-2">
          <section className="content">
            <ProfileAvatarUploader user={user} />
            <section className="info">
              <Mutation mutation={UPDATE_USER_INFO}>
                {update => <MainForm submitAction={update} />}
              </Mutation>
            </section>
          </section>
        </section>
      </div>
      <style jsx>{styles}</style>
    </>
  )
}
