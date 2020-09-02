import Taro from '@tarojs/taro-h5'
import Nerv from 'nervjs'
import { tryToCall } from '../utils'
import * as Types from '../utils/types'
import PageContext from './PageContext'

const createWrappedComponent = (WrapperComponent: Types.PageComponent) => {
  class RouteComponent extends Taro.Component<{ getRef: (ref: any) => void }> {
    get config() {
      return this.wrappedInstance && this.wrappedInstance.config
    }

    wrappedInstance?: Taro.Component<any, any>

    wrappedInstanceRef = ref => {
      if (this.props.getRef) {
        this.props.getRef(ref)
      }
      this.wrappedInstance = ref
    }

    listeners: { [type: string]: Function[] } = {}

    on = (event: 'show' | 'hide', listener: () => void) => {
      if (event in this.listeners) {
        this.listeners[event].push(listener)
      } else {
        this.listeners[event] = [listener]
      }

      return () => {
        const idx = this.listeners[event].indexOf(listener)
        if (idx !== -1) {
          this.listeners[event].splice(idx, 1)
        }
      }
    }

    constructor(props, context) {
      super(props, context)

      const newComponentDidShow = () => {
        const { navigationBarTitleText } = this.config || {
          navigationBarTitleText: null
        }
        if (navigationBarTitleText) {
          document.title = navigationBarTitleText
        }

        tryToCall(
          this.wrappedInstance && this.wrappedInstance.componentDidShow,
          this
        )
        if (this.listeners['show']) {
          this.listeners['show'].forEach(f => f())
        }
      }

      const newComponentDidHide = () => {
        tryToCall(
          this.wrappedInstance && this.wrappedInstance.componentDidHide,
          this
        )
        if (this.listeners['hide']) {
          this.listeners['hide'].forEach(f => f())
        }
      }
      this.componentDidShow = newComponentDidShow
      this.componentDidHide = newComponentDidHide
    }

    componentDidMount() {
      tryToCall(this.componentDidShow, this)
    }

    componentWillUnmount() {
      tryToCall(this.componentDidHide, this)
    }

    render() {
      return (
        <PageContext.Provider value={this}>
          <WrapperComponent
            ref={this.wrappedInstanceRef}
            {...this.props}
          ></WrapperComponent>
        </PageContext.Provider>
      )
    }
  }

  // @ts-ignore
  RouteComponent.displayName = `RoutePage(${WrapperComponent.displayName ||
    WrapperComponent.name})`

  return RouteComponent
}

export default createWrappedComponent
