import { useState } from 'react'
import { useIntl } from 'react-intl'

import { CreateCircleForm, Head, Layout, useStep } from '~/components'
import { PutCircleMutation } from '~/gql/graphql'

type Step = 'init' | 'profile'

const CreateCircle = () => {
  const intl = useIntl()
  const { currStep, forward } = useStep<Step>('init')
  const [circle, setCircle] = useState<PutCircleMutation['putCircle']>()

  return (
    <Layout.Main>
      <Head
        title={intl.formatMessage({
          defaultMessage: 'Create Circle',
          id: 'ESn43O',
        })}
      />

      {currStep === 'init' && (
        <CreateCircleForm.Init
          purpose="page"
          submitCallback={(c) => {
            setCircle(c)
            forward('profile')
          }}
        />
      )}

      {currStep === 'profile' && circle && (
        <CreateCircleForm.Profile
          circle={circle}
          type="create"
          purpose="page"
        />
      )}
    </Layout.Main>
  )
}

export default CreateCircle
