import { describe, expect, it } from 'vitest'

import { dom } from './dom'

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
