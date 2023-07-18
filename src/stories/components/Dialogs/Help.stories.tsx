import { MockedProvider } from '@apollo/react-testing'
import { ComponentMeta, ComponentStory } from '@storybook/react'
import React from 'react'

import { HelpDialog, IconHelp16, TextIcon, Translate } from '~/components'

export default {
  title: 'Components/Dialogs/Help',
  component: HelpDialog,
} as ComponentMeta<typeof HelpDialog>

const Template: ComponentStory<typeof HelpDialog> = (args) => (
  <MockedProvider>
    {/* @ts-ignore */}
    <HelpDialog hasTime>
      {({ openDialog }) => (
        <button type="button" onClick={openDialog} aria-haspopup="dialog">
          <TextIcon icon={<IconHelp16 />} color="grey">
            <Translate id="help" />
          </TextIcon>
        </button>
      )}
    </HelpDialog>
  </MockedProvider>
)

export const Default = Template.bind({})
