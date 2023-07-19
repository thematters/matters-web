import { MockedProvider } from '@apollo/react-testing'
import { ComponentMeta, ComponentStory } from '@storybook/react'
import React from 'react'

import {
  Button,
  FingerprintDialog,
  IconIPFS24,
  TextIcon,
  Translate,
} from '~/components'

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
            icon={<IconIPFS24 color="green" />}
            size="xs"
            spacing="xxtight"
            color="green"
          >
            <Translate id="IPFSEntrance" />
          </TextIcon>
        </Button>
      )}
    </FingerprintDialog>
  </MockedProvider>
)

export const Default = Template.bind({})
