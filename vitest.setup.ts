import '@testing-library/jest-dom/vitest'

import { Globals } from '@react-spring/web'
import { cleanup, configure } from '@testing-library/react'
import mockRouter from 'next-router-mock'
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
  mockRouter.push('/')
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

document.createRange = () => {
  const range = new Range()

  range.getBoundingClientRect = vi.fn(() => ({
    x: 851.671875,
    y: 200.046875,
    width: 8.34375,
    height: 17,
    top: 967.046875,
    right: 860.015625,
    bottom: 984.046875,
    left: 851.671875,
    toJSON: vi.fn(),
  }))

  // @ts-ignore
  range.getClientRects = vi.fn(() => ({
    item: () => null,
    length: 0,
  }))

  return range
}

document.elementFromPoint = vi.fn(() => null)

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
