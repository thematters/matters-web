import { describe, expect, it } from 'vitest'

import { toLocale, toOGLanguage, toUserLanguage } from './locale'

describe('utils/locale/toUserLanguage', () => {
  it('should convert to zh_Hans', () => {
    expect(toUserLanguage('zh-cn')).toBe('zh_hans')
    expect(toUserLanguage('zh_cn')).toBe('zh_hans')
    expect(toUserLanguage('zh-hans')).toBe('zh_hans')
    expect(toUserLanguage('zh_hans')).toBe('zh_hans')
    expect(toUserLanguage('zh-CN')).toBe('zh_hans')
  })
})

describe('utils/locale/toLocale', () => {
  it('should convert to zh-Hans', () => {
    expect(toLocale('zh-cn')).toBe('zh-Hans')
    expect(toLocale('zh_cn')).toBe('zh-Hans')
    expect(toLocale('zh-hans')).toBe('zh-Hans')
    expect(toLocale('zh_hans')).toBe('zh-Hans')
    expect(toLocale('zh-CN')).toBe('zh-Hans')
  })
})

describe('utils/locale/toOGLanguage', () => {
  it('should convert to zh_CN', () => {
    expect(toOGLanguage('zh-cn')).toBe('zh_CN')
    expect(toOGLanguage('zh_cn')).toBe('zh_CN')
    expect(toOGLanguage('zh-hans')).toBe('zh_CN')
    expect(toOGLanguage('zh_hans')).toBe('zh_CN')
    expect(toOGLanguage('zh-CN')).toBe('zh_CN')
  })
})
