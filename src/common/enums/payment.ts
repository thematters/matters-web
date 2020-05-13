export const MINIMAL_CHARGE_AMOUNT = {
  HKD: 20,
}

export const MAXIMUM_CHARGE_AMOUNT = {
  HKD: 99999,
}

export const MAXIMUM_PAYTO_AMOUNT = {
  HKD: 99999,
}

export enum PAYMENT_CURRENCY {
  HKD = 'HKD',
  LIKE = 'LIKE',
}

export const PLATFORM_FEE = {
  HKD: '3.4% + HKD 2.35',
}

/**
 * Error Messages
 *
 * @see {@url https://stripe.com/docs/error-codes}
 */
export const STRIPE_ERROR_MESSAGES = {
  zh_hant: {
    amount_too_large: '支付金額高於最大允許金額，請調低金額後重試',
    amount_too_small: '支付金額低於最小允許金額，請調高金額後重試',
    card_decline_rate_limit_exceeded:
      '銀行卡被拒絕多次，請等待24小時後重新储值，注意檢查卡片信息輸入正確',
    card_declined: '你的銀行卡已被拒絕，請輸入正確的信息後重試',
    expired_card: '銀行卡已過期，請換卡操作',
    incorrect_address: '銀行卡地址錯誤，請重新輸入',
    incorrect_cvc: '安全碼錯誤，請重新輸入',
    invalid_cvc: '無效安全碼，請重新輸入',
    incomplete_cvc: '無效安全碼，請重新輸入',
    incorrect_number: '卡號錯誤，請重新輸入',
    incorrect_zip: '郵編錯誤，請重新輸入',
    incomplete_zip: '郵編錯誤，請重新輸入',
    invalid_expiry_month: '銀行卡有效期錯誤，請重新輸入',
    invalid_expiry_month_past: '銀行卡有效期錯誤，請重新輸入',
    invalid_expiry_year: '銀行卡有效期錯誤，請重新輸入',
    invalid_expiry_year_past: '銀行卡有效期錯誤，請重新輸入',
    incomplete_expiry: '銀行卡有效期錯誤，請重新輸入',
    invalid_number: '無效卡號',
    incomplete_number: '無效卡號',
    postal_code_invalid: '無效郵政編碼',
    processing_error: '操作失敗，請稍候再試',
    rate_limit: '操作過於頻繁，請稍候再試',
  },
  zh_hans: {
    amount_too_large: '支付金额高于最大允许金额，请调低金额后重试',
    amount_too_small: '支付金额低于最小允许金额，请调高金额后重试',
    card_decline_rate_limit_exceeded:
      '银行卡被拒绝多次，请等待24小时后重新储值，注意检查卡片信息输入正确',
    card_declined: '你的银行卡已被拒绝，请输入正确的信息后重试',
    expired_card: '银行卡已过期，请换卡操作',
    incorrect_address: '银行卡地址错误，请重新输入',
    incorrect_cvc: '安全码错误，请重新输入',
    invalid_cvc: '无效安全码，请重新输入',
    incomplete_cvc: '无效安全码，请重新输入',
    incorrect_number: '卡号错误，请重新输入',
    incorrect_zip: '邮编错误，请重新输入',
    incomplete_zip: '邮编错误，请重新输入',
    invalid_expiry_month: '银行卡有效期错误，请重新输入',
    invalid_expiry_month_past: '银行卡有效期错误，请重新输入',
    invalid_expiry_year: '银行卡有效期错误，请重新输入',
    invalid_expiry_year_past: '银行卡有效期错误，请重新输入',
    incomplete_expiry: '银行卡有效期错误，请重新输入',
    invalid_number: '无效卡号',
    incomplete_number: '无效卡号',
    postal_code_invalid: '无效邮政编码',
    processing_error: '操作失败，请稍候再试',
    rate_limit: '操作过于频繁，请稍候再试',
  },
}

export const PAYMENT_PROVIDER = ['stripe', 'likecoin']
