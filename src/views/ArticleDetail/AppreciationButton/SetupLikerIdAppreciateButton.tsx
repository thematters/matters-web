import { OPEN_LIKE_COIN_DIALOG } from '~/common/enums'

import AppreciateButton from './AppreciateButton'

const SetupLikerIdAppreciateButton = ({ total }: { total: number }) => {
  return (
    <AppreciateButton
      onClick={() =>
        window.dispatchEvent(new CustomEvent(OPEN_LIKE_COIN_DIALOG, {}))
      }
      total={total}
    />
  )
}

export default SetupLikerIdAppreciateButton
