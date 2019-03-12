import { setConfig } from 'next/config'

// Make sure you can use "publicRuntimeConfig" within tests.
// https://github.com/zeit/next.js/issues/4024#issuecomment-390260351
setConfig({ publicRuntimeConfig: {} })
