// tslint:disable-next-line:no-implicit-dependencies
import { Meta, Story } from '@storybook/react/types-6-0'

import { Button } from '~/components/Button'
import { IconAdd } from '~/components/Icon'

export default {
  title: 'Example/Icons',
  component: Button,
} as Meta

const Template: Story<any> = (args: any) => <Button {...args} />

export const Add = Template.bind({})
Add.args = {
  spacing: ['tight', 'base'],
  borderColor: 'gold',
  children: (
    <>
      <IconAdd />
      Add
    </>
  ),
}
