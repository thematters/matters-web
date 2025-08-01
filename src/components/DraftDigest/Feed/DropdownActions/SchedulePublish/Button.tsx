import { useIntl } from 'react-intl'

import IconTime from '@/public/static/icons/24px/time.svg'
import { Icon, Menu } from '~/components'

type SchedulePublishButtonProps = {
  openDialog: () => void
}

const SchedulePublishButton: React.FC<SchedulePublishButtonProps> = ({
  openDialog,
}) => {
  const intl = useIntl()

  return (
    <Menu.Item
      onClick={openDialog}
      text={intl.formatMessage({
        defaultMessage: 'Schedule publish',
        id: 'CbRvzm',
      })}
      icon={<Icon icon={IconTime} size={20} />}
      ariaHasPopup="dialog"
    />
  )
}

export default SchedulePublishButton
