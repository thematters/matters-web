import { FormattedMessage } from 'react-intl'

import { ADD_TOAST } from '~/common/enums'
import { Dialog, useDialogSwitch, useMutation } from '~/components'
import UPDATE_TAG_SETTING from '~/components/GQL/mutations/updateTagSetting'
import { UpdateTagSettingMutation } from '~/gql/graphql'

interface Props {
  id: string
  children: ({ openDialog }: { openDialog: () => void }) => React.ReactNode
}

const BaseDialog = ({ id, children }: Props) => {
  const { show, openDialog, closeDialog } = useDialogSwitch(true)

  const [update, { loading }] =
    useMutation<UpdateTagSettingMutation>(UPDATE_TAG_SETTING)

  return (
    <>
      {children({ openDialog })}

      <Dialog size="sm" isOpen={show} onDismiss={closeDialog}>
        <Dialog.Header
          title={
            <FormattedMessage
              defaultMessage="Adopt Tag"
              description="src/components/Dialogs/TagAdoptionDialog/index.tsx"
            />
          }
          closeDialog={closeDialog}
          closeTextId="cancel"
        />
        <Dialog.Message>
          <p>
            <FormattedMessage
              defaultMessage="After adopting the tag, you become the maintainer of it. You can set the cover and description of the tag, and add works to selected feed. You can use it for writing collection, curation, or subcommunity and group discussions, be creative and discover new usages!"
              description="src/components/Dialogs/TagAdoptionDialog/index.tsx"
            />
          </p>
        </Dialog.Message>
        <Dialog.Footer>
          <Dialog.Footer.Button
            textColor="white"
            bgColor="green"
            loading={loading}
            onClick={async () => {
              const result = await update({
                variables: { input: { id, type: 'adopt' } },
              })

              if (!result) {
                throw new Error('tag adoption failed')
              }

              window.dispatchEvent(
                new CustomEvent(ADD_TOAST, {
                  detail: {
                    color: 'green',
                    content: (
                      <FormattedMessage
                        defaultMessage="Adopt successfully"
                        description="src/components/Dialogs/TagAdoptionDialog/index.tsx"
                      />
                    ),
                    duration: 2000,
                  },
                })
              )
            }}
          >
            <FormattedMessage
              defaultMessage="Maintain immediately"
              description="src/components/Dialogs/TagAdoptionDialog/index.tsx"
            />
          </Dialog.Footer.Button>

          <Dialog.Footer.Button
            textColor="black"
            bgColor="grey-lighter"
            onClick={closeDialog}
          >
            <FormattedMessage
              defaultMessage="Let me think about it"
              description="src/components/Dialogs/TagAdoptionDialog/index.tsx"
            />
          </Dialog.Footer.Button>
        </Dialog.Footer>
      </Dialog>
    </>
  )
}

export const TagAdoptionDialog = (props: Props) => (
  <Dialog.Lazy mounted={<BaseDialog {...props} />}>
    {({ openDialog }) => <>{props.children({ openDialog })}</>}
  </Dialog.Lazy>
)
