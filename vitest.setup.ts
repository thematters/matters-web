import '@testing-library/jest-dom/vitest'

import { cleanup, configure } from '@testing-library/react'
import { afterEach, beforeAll, vi } from 'vitest'

// runs a setup before all test cases (e.g. setting up jsdom)
beforeAll(() => {
  configure({ testIdAttribute: 'data-test-id' })
})

// runs a cleanup after each test case (e.g. clearing jsdom)
afterEach(() => {
  cleanup()
})

// via https://github.com/vitest-dev/vitest/issues/821
Object.defineProperty(window, 'matchMedia', {
  writable: true,
  value: vi.fn().mockImplementation((query) => ({
    matches: false,
    media: query,
    onchange: null,
    addListener: vi.fn(), // deprecated
    removeListener: vi.fn(), // deprecated
    addEventListener: vi.fn(),
    removeEventListener: vi.fn(),
    dispatchEvent: vi.fn(),
  })),
})

vi.mock('next/router', () => require('next-router-mock'))

vi.mock('next/dynamic', async () => {
  const dynamicModule: any = await vi.importActual('next/dynamic')
  return {
    default: (loader: any) => {
      const dynamicActualComp = dynamicModule.default
      const RequiredComponent = dynamicActualComp(loader)

      if (RequiredComponent?.render?.displayName) {
        RequiredComponent.render.displayName = loader.toString()
      }

      RequiredComponent.preload
        ? RequiredComponent.preload()
        : RequiredComponent.render.preload()
      return RequiredComponent
    },
  }
})
