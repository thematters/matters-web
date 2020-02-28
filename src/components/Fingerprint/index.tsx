import gql from 'graphql-tag'

import { Button, Icon, TextIcon, Translate } from '~/components'

import FingerprintDialog from './FingerprintDialog'

import { FingerprintArticle } from './__generated__/FingerprintArticle'

const Fingerprint = ({ article }: { article: FingerprintArticle }) => {
  if (!article.dataHash) {
    return null
  }

  return (
    <FingerprintDialog dataHash={article.dataHash}>
      {({ open }) => (
        <Button
          size={[null, '1.25rem']}
          spacing={[0, 'xtight']}
          bgHoverColor="grey-lighter"
          aria-haspopup="true"
          onClick={open}
        >
          <TextIcon
            icon={<Icon.IPFSMedium size="xs" />}
            size="xs"
            color="grey"
            weight="md"
          >
            <Translate id="IPFSEntrance" />
          </TextIcon>
        </Button>
      )}
    </FingerprintDialog>
  )
}

Fingerprint.fragments = {
  article: gql`
    fragment FingerprintArticle on Article {
      id
      dataHash
    }
  `
}

export { Fingerprint }
