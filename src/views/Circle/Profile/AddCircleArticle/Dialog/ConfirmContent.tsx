import { useState } from 'react'
import { FormattedMessage } from 'react-intl'

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
    ArticleLicenseType.CcByNcNd_4
  )

  const ConfirmButton = () => (
    <Dialog.TextButton
      onClick={() => onConfirm(license === ArticleLicenseType.Arr, license)}
      text={<FormattedMessage defaultMessage="Confirm" />}
      loading={loading}
    />
  )

  return (
    <>
      <Dialog.Header
        title="addArticles"
        leftBtn={
          <Dialog.TextButton text={<Translate id="back" />} onClick={onBack} />
        }
        rightBtn={<ConfirmButton />}
      />

      <Dialog.Content>
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
              text={<Translate id="back" />}
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
