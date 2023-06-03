import { useId, useState } from 'react'
import { FormattedMessage, useIntl } from 'react-intl'

import { Avatar, Form, IconChecked } from '~/components'
import { EditProfileDialogUserPrivateFragment } from '~/gql/graphql'

import styles from './styles.module.css'

type EditProfileDialogUserPrivateInfoCryptoWalletNft = NonNullable<
  NonNullable<
    EditProfileDialogUserPrivateFragment['info']['cryptoWallet']
  >['nfts']
>[0]

type NFTCollectionProps = {
  nfts: EditProfileDialogUserPrivateInfoCryptoWalletNft[]
  setField: (url: string) => void
}

const NFTCollectionItem = ({
  index,
  selectedIndex,
  nft: { name, description, imagePreviewUrl },
  onClick,
}: {
  index: number
  selectedIndex: number
  nft: EditProfileDialogUserPrivateInfoCryptoWalletNft
  onClick: (event?: React.MouseEvent<HTMLElement>) => any
}) => {
  return (
    <button
      type="button"
      className="nftCollectionItem"
      onClick={onClick}
      title={`${name}\n- ${description}`}
    >
      <Avatar size="xxxl" src={imagePreviewUrl} />

      {index === selectedIndex && (
        <span className="checked">
          <IconChecked size="md-s" color="green" />
        </span>
      )}
    </button>
  )
}

const NFTCollection: React.FC<NFTCollectionProps> = ({ nfts, setField }) => {
  const [selectedNFTIndex, setSelectedNFTIndex] = useState<number>(-1)
  const fieldId = useId()
  const fieldMsgId = `${fieldId}-msg`

  const intl = useIntl()
  return (
    <Form.Field>
      <Form.Field.Header
        label={
          <FormattedMessage
            defaultMessage="My NFT Collections"
            description="src/components/UserProfile/DropdownActions/EditProfileDialog/NFTCollection/index.tsx"
          />
        }
        htmlFor={fieldId}
      />

      <Form.Field.Content>
        <ul className="nftCollection" id={fieldId}>
          {nfts.map((nft, index) => (
            <li key={nft.id}>
              <NFTCollectionItem
                index={index}
                selectedIndex={selectedNFTIndex}
                nft={nft}
                onClick={() => {
                  setSelectedNFTIndex(index)
                  setField(nft.imagePreviewUrl || '')
                }}
              />
            </li>
          ))}
        </ul>
      </Form.Field.Content>

      <Form.Field.Footer
        fieldMsgId={fieldMsgId}
        hint={intl.formatMessage({
          defaultMessage: 'Select NFT as your avatar',
          description:
            'src/components/UserProfile/DropdownActions/EditProfileDialog/NFTCollection/index.tsx',
        })}
      />
    </Form.Field>
  )
}

export default NFTCollection
