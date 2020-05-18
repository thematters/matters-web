import { PTR_END, PTR_START } from '~/common/enums'

import { useEventListener } from './useEventListener'

export function usePullToRefresh({ onPull }: { onPull: () => any }) {
  useEventListener(PTR_START, async () => {
    if (onPull) {
      await onPull()
    }

    window.dispatchEvent(new CustomEvent(PTR_END, {}))
  })
}
