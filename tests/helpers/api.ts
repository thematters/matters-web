import { Page, Response } from '@playwright/test'
import _get from 'lodash/get'

export const waitForAPIResponse = async ({
  page,
  path,
  isOK = (data) => !!data,
}: {
  page: Page
  path: string
  isOK?: (data: any) => boolean
}) => {
  await page.waitForResponse(async (res: Response) => {
    try {
      const body = (await res.body()).toString()
      const parsedBody = JSON.parse(body)
      const data = _get(parsedBody, path)

      if (isOK(data)) {
        return true
      }
    } catch (error) {
      // console.error(error)
    }

    return false
  })
}
