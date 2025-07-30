import gql from 'graphql-tag'
import { useContext } from 'react'

import { LICENSE_TEXT } from '~/common/enums/draft'
import { LanguageContext } from '~/components/Context'
import { EditorPreviewDialogLicenseDraftFragment } from '~/gql/graphql'

import { BasePreviewItem } from '../BasePreviewItem'

const fragment = gql`
  fragment EditorPreviewDialogLicenseDraft on Draft {
    license
  }
`

export const License = ({
  draft,
  closeDialog,
}: {
  draft: EditorPreviewDialogLicenseDraftFragment
  closeDialog: () => void
}) => {
  const { license } = draft
  const { lang } = useContext(LanguageContext)

  if (!license) {
    return null
  }

  const licenseData = LICENSE_TEXT[license as keyof typeof LICENSE_TEXT]
  if (!licenseData) {
    return null
  }

  const title = licenseData.title[lang]
  const subtitle = licenseData.subtitle[lang]

  return (
    <>
      <BasePreviewItem
        title={title}
        names={[subtitle]}
        eventType="license"
        closeDialog={closeDialog}
        withBackground={false}
      />
    </>
  )
}

License.fragment = fragment
