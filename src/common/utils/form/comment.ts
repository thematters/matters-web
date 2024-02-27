export const makeMentionElement = (
  id: string,
  userName: string,
  displayName: string
) => {
  return `<a class="mention" href="/${userName}" data-id="${id}" data-user-name="${userName}" data-display-name="${displayName}"><span>@${displayName}</span></a>&nbsp;`
}
