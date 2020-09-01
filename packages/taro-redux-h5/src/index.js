import { Provider, connect } from '../react-redux'
import { ReactReduxContext } from '../react-redux/components/Context' 
import { useDispatch } from '../react-redux/hooks/useDispatch'
import { useReduxContext } from '../react-redux/hooks/useReduxContext'
import { useSelector } from '../react-redux/hooks/useSelector'
import { useStore } from '../react-redux/hooks/useStore'

export default {
  connect,
  Provider,
  useDispatch,
  useSelector,
  useStore,
  useReduxContext,
  ReactReduxContext,
}

export {
  connect,
  Provider,
  useDispatch,
  useSelector,
  useStore,
  useReduxContext,
  ReactReduxContext,
}