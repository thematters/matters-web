// import { expect, test } from '@playwright/test'
// import _random from 'lodash/random'

// import { PATHS } from '~/common/enums'

// import { authedTest, pageGoto } from './helpers'

// test.describe('Change username', () => {
//   authedTest('input normalization', async ({ alicePage }) => {
//     // Go to change username page
//     await pageGoto(alicePage, PATHS.ME_SETTINGS_CHANGE_USERNAME)

//     // Input uppcase and non-underlined characters
//     const $userNameInput = alicePage.getByPlaceholder('Enter Matters ID', {
//       exact: true,
//     })
//     await $userNameInput.fill('UPPERcase*-_.":]}[~!?')

//     // Expect the input to be normalized
//     expect(await $userNameInput.inputValue()).toBe('uppercase_')
//   })
// })
