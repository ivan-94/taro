import { getSystemInfo, getSystemInfoSync } from './info'
import { getNetworkType, onNetworkStatusChange } from './network'
import { processOpenapi } from '../utils'

export const scanCode = processOpenapi('scanQRCode', { needResult: 1 }, res => {
  const raw = res.resultStr
  let result = raw
  let scanType = 'QR_CODE'
  let commaIdx = result.indexOf(',')
  if (commaIdx !== -1) {
    scanType = result.slice(0, commaIdx)
    result = result.slice(commaIdx + 1)
  }

  return ({
    errMsg: res.errMsg === 'scanQRCode:ok' ? 'scanCode:ok' : res.errMsg,
    result: result,
    scanType,
    raw
  })
})
export { getSystemInfo, getSystemInfoSync, getNetworkType, onNetworkStatusChange }
