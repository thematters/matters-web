import { HelpDialog, IconHelp16, TextIcon, Translate } from '~/components'
import { HelpDetailProps } from '~/components/Dialogs/HelpDialog'

export const Help = (props: HelpDetailProps) => {
  return (
    <HelpDialog {...props}>
      {({ openDialog }) => (
        <button type="button" onClick={openDialog}>
          <TextIcon icon={<IconHelp16 />} color="grey">
            <Translate id="help" />
          </TextIcon>
        </button>
      )}
    </HelpDialog>
  )
}
