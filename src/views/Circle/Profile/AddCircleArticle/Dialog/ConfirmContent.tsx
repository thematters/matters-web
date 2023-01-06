import { useState } from 'react'

import { Dialog, Translate } from '~/components'
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
    ArticleLicenseType.CcByNcNd_2
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
            text={<Translate zh_hant="確認" zh_hans="确认" en="Confirm" />}
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
