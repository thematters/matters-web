/**
 * Wraps a lib-defined event handler and a user-defined event handler, returning
 * a single handler that allows a user to prevent lib-defined handlers from
 * firing.
 *
 * @param theirHandler User-supplied event handler
 * @param ourHandler Library-supplied event handler
 */
export function composeEventHandlers<
  EventType extends React.SyntheticEvent | Event,
>(
  theirHandler: ((event: EventType) => void) | undefined,
  ourHandler: (event: EventType) => void
): (event: EventType) => void {
  return (event) => {
    theirHandler && theirHandler(event)
    if (!event.defaultPrevented) {
      return ourHandler(event)
    }
  }
}
