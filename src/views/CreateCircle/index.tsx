import { useState } from 'react'

import { CreateCircleForm, Head, Layout, useStep } from '~/components'

import { PutCircle_putCircle } from '~/components/GQL/mutations/__generated__/PutCircle'

type Step = 'init' | 'profile'

const CreateCircle = () => {
  const { currStep, forward } = useStep<Step>('init')
  const [circle, setCircle] = useState<PutCircle_putCircle>()

  return (
    <Layout.Main bgColor="grey-lighter">
      <Head title={{ id: 'circleCreation' }} />

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
        <CreateCircleForm.Profile circle={circle} purpose="page" />
      )}
    </Layout.Main>
  )
}

export default CreateCircle
