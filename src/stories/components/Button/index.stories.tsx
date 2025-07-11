import { MockedProvider } from '@apollo/client/testing'
import { Meta } from '@storybook/react'
import React from 'react'

import IconMore from '@/public/static/icons/24px/more.svg'
import {
  Button,
  Icon,
  LoginButton as LoginButtonComponent,
  ViewMoreButton as ViewMoreButtonComponent,
  WriteButton as WriteButtonComponent,
} from '~/components'

export default {
  title: 'Components/Button',
  component: Button,
} satisfies Meta<typeof Button>

export const MoreButton = () => (
  <MockedProvider>
    <Button
      spacing={[8, 8]}
      bgActiveColor="greyLighterActive"
      aria-haspopup="dialog"
    >
      <Icon icon={IconMore} color="grey" />
    </Button>
  </MockedProvider>
)

export const LoginButton = () => (
  <MockedProvider>
    <LoginButtonComponent size={[null, '2rem']} />
  </MockedProvider>
)

export const GreenLoginButton = () => (
  <MockedProvider>
    <LoginButtonComponent bgColor="green" />
  </MockedProvider>
)

export const WriteButton = () => (
  <MockedProvider>
    <WriteButtonComponent />
  </MockedProvider>
)

export const ViewMoreButton = () => (
  <MockedProvider>
    <ViewMoreButtonComponent />
  </MockedProvider>
)
