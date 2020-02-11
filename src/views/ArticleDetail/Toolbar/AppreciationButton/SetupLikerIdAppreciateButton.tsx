import LikeCoinDialog from '~/components/LikeCoinDialog'

import AppreciateButton from './AppreciateButton'

const SetupLikerIdAppreciateButton = ({
  total,
  inFixedToolbar
}: {
  total: number
  inFixedToolbar?: boolean
}) => {
  return (
    <LikeCoinDialog>
      {({ open }) => (
        <AppreciateButton
          onClick={open}
          total={total}
          inFixedToolbar={inFixedToolbar}
        />
      )}
    </LikeCoinDialog>
  )
}

export default SetupLikerIdAppreciateButton
