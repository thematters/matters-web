import AppreciateButton from './AppreciateButton'
import CivicLikerDialog from './CivicLikerDialog'

const CivicLikerButton = ({
  onClick,
  count,
  total,
  inFixedToolbar
}: {
  onClick: () => void
  count?: number
  total: number
  inFixedToolbar?: boolean
}) => (
  <CivicLikerDialog>
    {({ open }) => (
      <AppreciateButton
        onClick={() => {
          open()
          onClick()
        }}
        count={count}
        total={total}
        inFixedToolbar={inFixedToolbar}
      />
    )}
  </CivicLikerDialog>
)

export default CivicLikerButton
