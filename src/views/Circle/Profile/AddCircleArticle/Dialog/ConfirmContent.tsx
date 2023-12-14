import { useState } from 'react'
import { FormattedMessage } from 'react-intl'

import { Dialog } from '~/components'
import SelectLicense from '~/components/Editor/ToggleAccess/SelectLicense'
import { ArticleLicenseType } from '~/gql/graphql'

interface ContentProps {
  loading: boolean
  onConfirm: (paywalled: boolean, license: ArticleLicenseType) => void
  onBack: () => void
}

const ConfirmContent: React.FC<ContentProps> = ({
  loading,
  onConfirm,
  onBack,
}) => {
  const [license, setLicense] = useState<ArticleLicenseType>(
    ArticleLicenseType.CcByNcNd_4
  )

  const ConfirmButton = () => (
    <Dialog.TextButton
      onClick={() => onConfirm(license === ArticleLicenseType.Arr, license)}
      text={<FormattedMessage defaultMessage="Confirm" id="N2IrpM" />}
      loading={loading}
    />
  )

  return (
    <>
      <Dialog.Header
        title={<FormattedMessage defaultMessage="Add Articles" id="k97/u7" />}
        leftBtn={
          <Dialog.TextButton
            text={<FormattedMessage defaultMessage="Back" id="cyR7Kh" />}
            onClick={onBack}
          />
        }
        rightBtn={<ConfirmButton />}
      />

      <Dialog.Content fixedHeight>
        <SelectLicense
          isInCircle
          license={license}
          onChange={(newLicense) => setLicense(newLicense)}
        />
      </Dialog.Content>

      <Dialog.Footer
        smUpBtns={
          <>
            <Dialog.TextButton
              color="greyDarker"
              text={<FormattedMessage defaultMessage="Back" id="cyR7Kh" />}
              onClick={onBack}
            />
            <ConfirmButton />
          </>
        }
      />
    </>
  )
}

export default ConfirmContent
