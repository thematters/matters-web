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
      console.log(`Response body: ${body}`)
      const parsedBody = JSON.parse(body)
      const data = _get(parsedBody, path)

      if (isOK(data)) {
        return true
      }
    } catch (error) {
      console.error(`Response was not waited on ${path} for error: ${error}`)
    }

    return false
  }, { timeout: 15000 })
}
