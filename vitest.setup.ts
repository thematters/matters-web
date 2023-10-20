import '@testing-library/jest-dom/vitest'

import { Globals } from '@react-spring/web'
import { cleanup, configure } from '@testing-library/react'
import { afterEach, beforeAll, vi } from 'vitest'

// runs a setup before all test cases (e.g. setting up jsdom)
beforeAll(() => {
  configure({ testIdAttribute: 'data-test-id' })

  // https://www.react-spring.dev/docs/guides/testing#skipping-animations
  Globals.assign({
    skipAnimation: true,
  })
})

// runs a cleanup after each test case (e.g. clearing jsdom)
afterEach(() => {
  cleanup()
})

// via https://github.com/vitest-dev/vitest/issues/821
Object.defineProperty(window, 'matchMedia', {
  writable: true,
  value: vi.fn().mockImplementation((query) => ({
    // render all <Media>
    // https://github.com/artsy/fresnel/blob/main/src/DynamicResponsive.tsx#L97C27-L97C37
    matches: true,
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
      const RequiredComponent = dynamicActualComp(() =>
        loader().then((mod: any) => mod.default || mod)
      )

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
