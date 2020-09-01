import { createContext } from '@tarojs/taro-h5'

export default createContext<{
  on?: (event: 'show' | 'hide', listener: () => void) => void
}>({})
