import { ChangeUserNameForm, Head, Layout, useStep } from '~/components'

type Step = 'confirm' | 'complete'

const ChangePassword = () => {
  const { currStep, goForward } = useStep<Step>('confirm')

  return (
    <Layout.Main bgColor="grey-lighter">
      <Head title={{ id: 'changeUserName' }} />

      {currStep === 'confirm' && (
        <ChangeUserNameForm.Confirm
          purpose="page"
          submitCallback={() => goForward('complete')}
        />
      )}

      {currStep === 'complete' && (
        <ChangeUserNameForm.Complete purpose="page" />
      )}
    </Layout.Main>
  )
}

export default ChangePassword
