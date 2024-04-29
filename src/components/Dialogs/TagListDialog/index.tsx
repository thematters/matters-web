import { FormattedMessage } from 'react-intl'

import { Dialog, Tag, useDialogSwitch } from '~/components'
import { DigestTagFragment } from '~/gql/graphql'

import styles from './styles.module.css'

export interface TagListDialogProps {
  tags: DigestTagFragment[]
  children: ({ openDialog }: { openDialog: () => void }) => React.ReactNode
}

const BaseDialog = ({ tags, children }: TagListDialogProps) => {
  const { show, openDialog, closeDialog } = useDialogSwitch(true)

  return (
    <>
      {children({ openDialog })}

      <Dialog isOpen={show} onDismiss={closeDialog}>
        <Dialog.Header
          title={
            <FormattedMessage
              defaultMessage="Topics"
              id="KgVypx"
              description="src/components/Dialogs/TagListDialog/index.tsx"
            />
          }
          leftBtn={
            <>
              <Dialog.TextButton
                text={<FormattedMessage defaultMessage="Close" id="rbrahO" />}
                color="green"
                onClick={closeDialog}
              />
            </>
          }
        />

        <Dialog.Content>
          <ul className={styles.tags}>
            {tags.map((tag) => (
              <li key={tag.id}>
                <Tag
                  tag={tag}
                  type="list"
                  hasCount={false}
                  textIconProps={{ color: 'black', weight: 'md' }}
                />
              </li>
            ))}
          </ul>
        </Dialog.Content>

        <Dialog.Footer
          smUpBtns={
            <>
              <Dialog.TextButton
                text={<FormattedMessage defaultMessage="Close" id="rbrahO" />}
                color="greyDarker"
                onClick={closeDialog}
              />
            </>
          }
        />
      </Dialog>
    </>
  )
}

export const TagListDialog = (props: TagListDialogProps) => (
  <Dialog.Lazy mounted={<BaseDialog {...props} />}>
    {({ openDialog }) => <>{props.children({ openDialog })}</>}
  </Dialog.Lazy>
)
