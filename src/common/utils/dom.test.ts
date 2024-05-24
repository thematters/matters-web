import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'

import { dom, isElementInViewport } from './dom'

describe('utils/dom/getAttributes', () => {
  it('should return an empty array if no matches are found', () => {
    const result = dom.getAttributes('src', '<div></div>')
    expect(result).toEqual([])
  })

  it('should return an array of matches', () => {
    const result = dom.getAttributes(
      'src',
      '<img src="image1.jpg"><img src="image2.jpg">'
    )
    expect(result).toEqual(['image1.jpg', 'image2.jpg'])

    const result2 = dom.getAttributes(
      'data-id',
      '<img data-id="123" data-id="345">'
    )
    expect(result2).toEqual(['123', '345'])
  })

  it('should ignore empty attributes', () => {
    const result = dom.getAttributes('src', '<img src=""><img src="image.jpg">')
    expect(result).toEqual(['image.jpg'])
  })
})

describe('utils/detect/isElementInViewport', () => {
  let element: HTMLElement

  beforeEach(() => {
    element = document.createElement('div')
    document.body.appendChild(element)

    element.getBoundingClientRect = vi.fn(() => ({
      top: 0,
      left: 0,
      bottom: 0,
      right: 0,
      width: 0,
      height: 0,
      x: 0,
      y: 0,
      toJSON: () => ({}),
    }))
  })

  afterEach(() => {
    document.body.removeChild(element)
  })

  it('should return true if the element is in the viewport', () => {
    element.getBoundingClientRect = vi.fn(() => ({
      top: 100,
      left: 100,
      bottom: 200,
      right: 200,
      width: 100,
      height: 100,
      x: 100,
      y: 100,
      toJSON: () => ({}),
    }))

    const result = isElementInViewport(element)
    expect(result).toBe(true)
  })

  it('should return false if the element is not in the viewport', () => {
    element.getBoundingClientRect = vi.fn(() => ({
      top: 900,
      left: 700,
      bottom: 1000,
      right: 800,
      width: 100,
      height: 100,
      x: 700,
      y: 900,
      toJSON: () => ({}),
    }))

    const result = isElementInViewport(element)
    expect(result).toBe(false)
  })
})
