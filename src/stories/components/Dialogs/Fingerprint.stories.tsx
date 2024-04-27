import { MockedProvider } from '@apollo/react-testing'
import { ComponentMeta, ComponentStory } from '@storybook/react'
import React from 'react'
import { FormattedMessage } from 'react-intl'

import { ReactComponent as IconIPFS } from '@/public/static/icons/24px/ipfs.svg'
import { Button, FingerprintDialog, Icon, TextIcon } from '~/components'

import { MOCK_ARTILCE } from '../../mocks'

export default {
  title: 'Components/Dialogs/Fingerprint',
  component: FingerprintDialog,
} as ComponentMeta<typeof FingerprintDialog>

const Template: ComponentStory<typeof FingerprintDialog> = (args) => (
  <MockedProvider>
    {/* @ts-ignore */}
    <FingerprintDialog article={MOCK_ARTILCE}>
      {({ openDialog }) => (
        <Button
          onClick={openDialog}
          spacing={['xxtight', 'xtight']}
          bgColor="greenLighter"
          aria-haspopup="dialog"
        >
          <TextIcon
            icon={<Icon icon={IconIPFS} color="green" />}
            size="xs"
            spacing="xxtight"
            color="green"
          >
            <FormattedMessage defaultMessage="IPFS" id="tio9Gt" />{' '}
          </TextIcon>
        </Button>
      )}
    </FingerprintDialog>
  </MockedProvider>
)

export const Default = Template.bind({})
