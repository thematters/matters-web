import { useContext } from 'react'

import { Button, IconShare32, LanguageContext, ShareDialog } from '~/components'

import { translate } from '~/common/utils'

export const ShareButton: React.FC = () => {
  const { lang } = useContext(LanguageContext)

  return (
    <ShareDialog>
      {({ openDialog: openShareDialog }) => (
        <Button
          aria-label={translate({ id: 'back', lang })}
          bgColor="half-black"
          onClick={openShareDialog}
        >
          <IconShare32 size="lg" color="white" />
        </Button>
      )}
    </ShareDialog>
  )
}

export default ShareButton
