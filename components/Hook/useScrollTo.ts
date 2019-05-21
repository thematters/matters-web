import jump from 'jump.js'
import { useEffect } from 'react'

import { dom } from '~/common/utils'

export const useScrollTo = ({
  enable,
  selector,
  offset,
  trigger
}: {
  enable: boolean
  selector: string
  offset: number
  trigger: any
}) => {
  useEffect(() => {
    if (process.browser && enable) {
      const element = dom.$(selector)
      if (element) {
        jump(selector, { offset })
      }
    }
  }, trigger)
}
