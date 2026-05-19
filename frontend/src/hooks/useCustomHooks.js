/**
 * ============================================================================
 * CUSTOM REACT HOOKS
 * ============================================================================
 * Comprehensive collection of reusable React hooks for common patterns
 * including data fetching, form handling, local storage, and animations
 * ============================================================================
 */

import { useState, useEffect, useCallback, useRef, useReducer } from 'react'
import { useAppContext } from '../context/AppContext'

/**
 * USE FETCH HOOK - Data fetching with loading, error, and caching
 */
export function useFetch(url, options = {}) {
  const [data, setData] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const abortControllerRef = useRef(null)

  const fetch_ = useCallback(async () => {
    abortControllerRef.current = new AbortController()
    setLoading(true)
    setError(null)

    try {
      const response = await fetch(url, {
        ...options,
        signal: abortControllerRef.current.signal
      })

      if (!response.ok) {
        throw new Error(`HTTP ${response.status}`)
      }

      const result = await response.json()
      setData(result)
    } catch (err) {
      if (err.name !== 'AbortError') {
        setError(err.message)
      }
    } finally {
      setLoading(false)
    }
  }, [url, options])

  useEffect(() => {
    fetch_()
    return () => abortControllerRef.current?.abort()
  }, [fetch_])

  const refetch = useCallback(() => fetch_(), [fetch_])

  return { data, loading, error, refetch }
}

/**
 * USE LOCAL STORAGE HOOK - Persist state to localStorage
 */
export function useLocalStorage(key, initialValue) {
  const [storedValue, setStoredValue] = useState(() => {
    try {
      const item = window.localStorage.getItem(key)
      return item ? JSON.parse(item) : initialValue
    } catch (error) {
      console.warn(`Error reading localStorage key "${key}":`, error)
      return initialValue
    }
  })

  const setValue = useCallback((value) => {
    try {
      const valueToStore = value instanceof Function ? value(storedValue) : value
      setStoredValue(valueToStore)
      window.localStorage.setItem(key, JSON.stringify(valueToStore))
    } catch (error) {
      console.warn(`Error setting localStorage key "${key}":`, error)
    }
  }, [key, storedValue])

  return [storedValue, setValue]
}

/**
 * USE SESSION STORAGE HOOK - Persist state to sessionStorage
 */
export function useSessionStorage(key, initialValue) {
  const [storedValue, setStoredValue] = useState(() => {
    try {
      const item = window.sessionStorage.getItem(key)
      return item ? JSON.parse(item) : initialValue
    } catch (error) {
      console.warn(`Error reading sessionStorage key "${key}":`, error)
      return initialValue
    }
  })

  const setValue = useCallback((value) => {
    try {
      const valueToStore = value instanceof Function ? value(storedValue) : value
      setStoredValue(valueToStore)
      window.sessionStorage.setItem(key, JSON.stringify(valueToStore))
    } catch (error) {
      console.warn(`Error setting sessionStorage key "${key}":`, error)
    }
  }, [key, storedValue])

  return [storedValue, setValue]
}

/**
 * USE FORM HOOK - Handle form state and validation
 */
export function useForm(initialValues, onSubmit, validate) {
  const [values, setValues] = useState(initialValues)
  const [errors, setErrors] = useState({})
  const [touched, setTouched] = useState({})
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleChange = useCallback((e) => {
    const { name, value, type, checked } = e.target
    setValues(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }))
  }, [])

  const handleBlur = useCallback((e) => {
    const { name } = e.target
    setTouched(prev => ({ ...prev, [name]: true }))

    if (validate) {
      const validationErrors = validate(values)
      setErrors(validationErrors)
    }
  }, [validate, values])

  const handleSubmit = useCallback(async (e) => {
    e.preventDefault()
    setIsSubmitting(true)

    try {
      if (validate) {
        const validationErrors = validate(values)
        if (Object.keys(validationErrors).length > 0) {
          setErrors(validationErrors)
          setIsSubmitting(false)
          return
        }
      }

      await onSubmit(values)
    } finally {
      setIsSubmitting(false)
    }
  }, [values, validate, onSubmit])

  const reset = useCallback(() => {
    setValues(initialValues)
    setErrors({})
    setTouched({})
  }, [initialValues])

  return {
    values,
    errors,
    touched,
    isSubmitting,
    handleChange,
    handleBlur,
    handleSubmit,
    setValues,
    setErrors,
    reset
  }
}

/**
 * USE DEBOUNCE HOOK - Debounce value changes
 */
export function useDebounce(value, delay = 500) {
  const [debouncedValue, setDebouncedValue] = useState(value)

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(value)
    }, delay)

    return () => clearTimeout(handler)
  }, [value, delay])

  return debouncedValue
}

/**
 * USE THROTTLE HOOK - Throttle function calls
 */
export function useThrottle(callback, delay = 1000) {
  const lastRunRef = useRef(Date.now())

  return useCallback((...args) => {
    const now = Date.now()
    if (now - lastRunRef.current >= delay) {
      callback(...args)
      lastRunRef.current = now
    }
  }, [callback, delay])
}

/**
 * USE PREVIOUS HOOK - Access previous value
 */
export function usePrevious(value) {
  const ref = useRef()

  useEffect(() => {
    ref.current = value
  }, [value])

  return ref.current
}

/**
 * USE ASYNC HOOK - Handle async operations
 */
export function useAsync(asyncFunction, immediate = true) {
  const [status, setStatus] = useState(immediate ? 'pending' : 'idle')
  const [data, setData] = useState(null)
  const [error, setError] = useState(null)

  const execute = useCallback(async () => {
    setStatus('pending')
    setData(null)
    setError(null)

    try {
      const response = await asyncFunction()
      setData(response)
      setStatus('success')
      return response
    } catch (error) {
      setError(error)
      setStatus('error')
    }
  }, [asyncFunction])

  useEffect(() => {
    if (immediate) {
      execute()
    }
  }, [execute, immediate])

  return { execute, status, data, error }
}

/**
 * USE CLICK OUTSIDE HOOK - Detect clicks outside element
 */
export function useClickOutside(ref, callback) {
  useEffect(() => {
    function handleClickOutside(event) {
      if (ref.current && !ref.current.contains(event.target)) {
        callback()
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [ref, callback])
}

/**
 * USE WINDOW SIZE HOOK - Track window dimensions
 */
export function useWindowSize() {
  const [windowSize, setWindowSize] = useState({
    width: typeof window !== 'undefined' ? window.innerWidth : 0,
    height: typeof window !== 'undefined' ? window.innerHeight : 0
  })

  useEffect(() => {
    function handleResize() {
      setWindowSize({
        width: window.innerWidth,
        height: window.innerHeight
      })
    }

    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  return windowSize
}

/**
 * USE MEDIA QUERY HOOK - Respond to media queries
 */
export function useMediaQuery(query) {
  const [matches, setMatches] = useState(false)

  useEffect(() => {
    const mediaQuery = window.matchMedia(query)
    setMatches(mediaQuery.matches)

    const handler = (e) => setMatches(e.matches)
    mediaQuery.addEventListener('change', handler)
    return () => mediaQuery.removeEventListener('change', handler)
  }, [query])

  return matches
}

/**
 * USE TIMER HOOK - Manage timer/countdown
 */
export function useTimer(initialSeconds = 0, onComplete) {
  const [seconds, setSeconds] = useState(initialSeconds)
  const [isActive, setIsActive] = useState(false)
  const intervalRef = useRef(null)

  useEffect(() => {
    if (isActive && seconds > 0) {
      intervalRef.current = setInterval(() => {
        setSeconds(s => {
          if (s <= 1) {
            setIsActive(false)
            onComplete?.()
            return 0
          }
          return s - 1
        })
      }, 1000)
    } else {
      clearInterval(intervalRef.current)
    }

    return () => clearInterval(intervalRef.current)
  }, [isActive, seconds, onComplete])

  return {
    seconds,
    isActive,
    start: () => setIsActive(true),
    pause: () => setIsActive(false),
    reset: () => { setSeconds(initialSeconds); setIsActive(false) }
  }
}

/**
 * USE TOGGLE HOOK - Toggle boolean state
 */
export function useToggle(initialState = false) {
  const [state, setState] = useState(initialState)
  const toggle = useCallback(() => setState(prev => !prev), [])
  return [state, toggle, setState]
}

/**
 * USE COPY TO CLIPBOARD HOOK
 */
export function useCopyToClipboard() {
  const [isCopied, setIsCopied] = useState(false)

  const copy = useCallback((text) => {
    navigator.clipboard.writeText(text).then(() => {
      setIsCopied(true)
      setTimeout(() => setIsCopied(false), 2000)
    })
  }, [])

  return { copy, isCopied }
}

/**
 * USE KEYBOARD HOOK - Detect keyboard events
 */
export function useKeyboard(targetKey) {
  const [pressed, setPressed] = useState(false)

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === targetKey) setPressed(true)
    }

    const handleKeyUp = (e) => {
      if (e.key === targetKey) setPressed(false)
    }

    window.addEventListener('keydown', handleKeyDown)
    window.addEventListener('keyup', handleKeyUp)

    return () => {
      window.removeEventListener('keydown', handleKeyDown)
      window.removeEventListener('keyup', handleKeyUp)
    }
  }, [targetKey])

  return pressed
}

/**
 * USE MOUNTED HOOK - Check if component is mounted
 */
export function useMounted() {
  const [isMounted, setIsMounted] = useState(false)

  useEffect(() => {
    setIsMounted(true)
  }, [])

  return isMounted
}

/**
 * USE NOTIFICATION HOOK - Simplified notification management
 */
export function useNotification() {
  const { addNotification, removeNotification, notifications } = useAppContext()
  return { addNotification, removeNotification, notifications }
}

export default {
  useFetch,
  useLocalStorage,
  useSessionStorage,
  useForm,
  useDebounce,
  useThrottle,
  usePrevious,
  useAsync,
  useClickOutside,
  useWindowSize,
  useMediaQuery,
  useTimer,
  useToggle,
  useCopyToClipboard,
  useKeyboard,
  useMounted,
  useNotification
}