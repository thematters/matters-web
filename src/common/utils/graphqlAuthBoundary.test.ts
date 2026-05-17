import { readdirSync, readFileSync, statSync } from 'fs'
import path from 'path'
import { describe, expect, it } from 'vitest'

const root = process.cwd()
const sourceRoot = path.join(root, 'src')

const allowedUserFeatureFlagFiles = new Set([
  path.join(sourceRoot, 'common/utils/graphqlAuthBoundary.test.ts'),
  path.join(
    sourceRoot,
    'views/User/UserProfile/DropdownActions/ToggleCommunityWatch/Button.tsx'
  ),
  path.join(
    sourceRoot,
    'views/User/UserProfile/DropdownActions/ToggleCommunityWatch/Dialog.tsx'
  ),
  path.join(sourceRoot, 'common/utils/types/index.ts'),
  path.join(sourceRoot, 'stories/mocks/index.ts'),
])

const ignoredDirs = new Set(['gql'])

const collectSourceFiles = (dir: string): string[] => {
  const entries = readdirSync(dir)

  return entries.flatMap((entry) => {
    const filePath = path.join(dir, entry)
    const stat = statSync(filePath)

    if (stat.isDirectory()) {
      return ignoredDirs.has(entry) ? [] : collectSourceFiles(filePath)
    }

    return filePath.match(/\.(ts|tsx)$/) ? [filePath] : []
  })
}

describe('GraphQL auth boundaries', () => {
  it('keeps UserFeatureFlagType usage inside admin-only surfaces', () => {
    const violations = collectSourceFiles(sourceRoot).filter((filePath) => {
      if (allowedUserFeatureFlagFiles.has(filePath)) {
        return false
      }

      const source = readFileSync(filePath, 'utf8')
      return source.includes('UserFeatureFlagType')
    })

    expect(violations.map((filePath) => path.relative(root, filePath))).toEqual(
      []
    )
  })
})
