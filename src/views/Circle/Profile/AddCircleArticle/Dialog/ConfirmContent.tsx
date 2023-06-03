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

  return (
    <>
      <Dialog.Header
        title="addArticles"
        leftButton={<Dialog.Header.BackButton onClick={onBack} />}
        rightButton={
          <Dialog.Header.RightButton
            onClick={() =>
              onConfirm(license === ArticleLicenseType.Arr, license)
            }
            text={<FormattedMessage defaultMessage="Confirm" description="" />}
            loading={loading}
          />
        }
      />

      <Dialog.Content hasFixed>
        <SelectLicense
          isInCircle
          license={license}
          onChange={(newLicense) => setLicense(newLicense)}
        />
      </Dialog.Content>
    </>
  )
}

export default ConfirmContent
