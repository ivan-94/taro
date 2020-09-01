import { useLayoutEffect } from '../../src/compat'

// Under React Native, we know that we always want to use useLayoutEffect

export const useIsomorphicLayoutEffect = useLayoutEffect
