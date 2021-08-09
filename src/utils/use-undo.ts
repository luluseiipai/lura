import { useCallback, useState } from 'react'

export const useUndo = <T>(initialPresent: T) => {
  const [state, setState] = useState<{
    past: T[]
    present: T
    future: T[]
  }>({
    past: [],
    present: initialPresent,
    future: [],
  })

  const canUndo = state.past.length !== 0
  const canRedo = state.future.length !== 0

  const undo = useCallback(() => {
    setState((curState) => {
      const { past, present, future } = curState
      if (past.length === 0) return curState

      const previous = past[past.length - 1]
      const newPast = past.slice(0, past.length - 1)

      return {
        past: newPast,
        present: previous,
        future: [present, ...future],
      }
    })
  }, [])

  const redo = useCallback(() => {
    setState((curState) => {
      const { past, present, future } = curState
      if (future.length === 0) return curState

      const next = future[0]
      const newFuture = future.slice(1)

      return {
        past: [...past, present],
        present: next,
        future: newFuture,
      }
    })
  }, [])

  const set = useCallback((newPresent: T) => {
    setState((curState) => {
      const { past, present } = curState
      if (newPresent === present) return curState

      return {
        past: [...past, present],
        present: newPresent,
        future: [],
      }
    })
  }, [])

  const reset = useCallback((newPresent: T) => {
    setState(() => {
      return {
        past: [],
        present: newPresent,
        future: [],
      }
    })
  }, [])

  return [state, { set, reset, undo, redo, canUndo, canRedo }] as const
}
