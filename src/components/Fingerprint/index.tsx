import gql from 'graphql-tag'

import { Button, Icon, TextIcon, Translate } from '~/components'

import FingerprintDialog from './FingerprintDialog'

import { FingerprintArticle } from './__generated__/FingerprintArticle'

const Fingerprint = ({
  article,
  color = 'green',
  size = 'sm'
}: {
  article: FingerprintArticle
  color?: 'grey' | 'green'
  size?: 'xs' | 'sm'
}) => {
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
            icon={<Icon.IPFSMedium size={size === 'xs' ? 'xs' : undefined} />}
            size={size}
            color={color}
            weight="md"
          >
            <Translate zh_hant="分佈式入口" zh_hans="分布式入口" />
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
