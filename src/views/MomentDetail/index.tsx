import { Dialog, Media, useRoute } from '~/components'
import Content from '~/components/Dialogs/MomentDetailDialog/Content'

const MomentDetail = () => {
  const { getQuery } = useRoute()
  const shortHash = getQuery('shortHash')
  const onClose = () => {}

  return (
    <>
      <Media lessThan="md">
        <Content shortHash={shortHash} closeDialog={onClose} />
      </Media>

      <Media greaterThanOrEqual="md">
        <Dialog
          isOpen={true}
          blurred
          onDismiss={onClose}
          fixedWidth={false}
          dismissOnClickOutside={false}
          dismissOnESC={false}
        >
          <Content shortHash={shortHash} closeDialog={onClose} />
        </Dialog>
      </Media>
    </>
  )
}

export default MomentDetail
