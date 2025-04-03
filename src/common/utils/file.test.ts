import { describe, expect, it } from 'vitest'

import { getFileId } from './file'

describe('utils/file/getFileId', () => {
  it('should return a unique id string based on file properties', () => {
    const mockFile = new File(['test'], 'test.txt', {
      type: 'text/plain',
      lastModified: 1234567890,
    })

    const result = getFileId(mockFile)
    expect(result).toBe('test.txt-4-text/plain-1234567890')
  })

  it('should return different ids for different files', () => {
    const file1 = new File(['test1'], 'file1.txt', {
      type: 'text/plain',
      lastModified: 1234567890,
    })
    const file2 = new File(['test2'], 'file2.txt', {
      type: 'text/plain',
      lastModified: 1234567890,
    })

    const id1 = getFileId(file1)
    const id2 = getFileId(file2)
    expect(id1).not.toBe(id2)
  })
})
