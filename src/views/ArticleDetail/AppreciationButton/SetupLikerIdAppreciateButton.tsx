import { LikeCoinDialog } from '~/components'

import AppreciateButton from './AppreciateButton'

const SetupLikerIdAppreciateButton = ({ total }: { total: number }) => {
  return (
    <LikeCoinDialog>
      {({ open }) => <AppreciateButton onClick={open} total={total} />}
    </LikeCoinDialog>
  )
}

export default SetupLikerIdAppreciateButton
