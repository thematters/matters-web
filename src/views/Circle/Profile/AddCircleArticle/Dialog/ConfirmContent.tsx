import { useState } from 'react'

import { Dialog, Translate } from '~/components'
import SelectLicense from '~/components/Editor/SettingsDialog/List/ToggleAccess/SelectLicense'

import { ArticleLicenseType } from '@/__generated__/globalTypes'

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
    ArticleLicenseType.cc_by_nc_nd_2
  )

  return (
    <>
      <Dialog.Header
        title="addArticles"
        leftButton={<Dialog.Header.BackButton onClick={onBack} />}
        rightButton={
          <Dialog.Header.RightButton
            onClick={() =>
              onConfirm(license === ArticleLicenseType.arr, license)
            }
            text={<Translate zh_hant="確認" zh_hans="确认" en="Confirm" />}
            loading={loading}
          />
        }
      />

      <Dialog.Content spacing={['base', 'base']} hasFixed>
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
