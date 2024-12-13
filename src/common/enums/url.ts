export const URL_FRAGMENT = {
  COMMENTS: 'comments',
}

export const URL_USER_PROFILE = {
  OPEN_NOMAD_BADGE_DIALOG: { key: 'dialog', value: 'nomad-badge' },
  OPEN_GRAND_BADGE_DIALOG: { key: 'dialog', value: 'grand-badge' },
  GRAND_BADGE_DIALOG_STEP: {
    key: 'step',
    value: 'congrats',
  },
  OPEN_POST_MOMENT_FORM: { key: 'form', value: 'write-moment' },
}

export const URL_ME_SETTINGS = {
  OPEN_SET_EMAIL_DIALOG: { key: 'dialog', value: 'set-email' },
}

export const URL_ME_WALLET = {
  OPEN_WITHDRAW_VAULT_USDT_DIALOG: {
    key: 'dialog',
    value: 'withdraw-vault-usdt',
  },
}

export const URL_COLLECTION_DETAIL = {
  // ?sort=seq:asc,date:dsc
  SORTER_KEY: 'sort',
  SORTER_SEPARATOR: ',',
  SORTER_TYPE_SEPARATOR: ':',
  SORTER_SEQUENCE: {
    key: 'seq',
    value: { ASC: 'asc', DSC: 'dsc' },
  },
}
