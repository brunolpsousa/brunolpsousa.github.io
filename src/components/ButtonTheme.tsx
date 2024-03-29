import { useState, useEffect } from 'react'
import usePersistedState from '@utils/usePersistedState'
import Router from 'next/router'

const sun = (
  <svg
    xmlns='http://www.w3.org/2000/svg'
    fill='none'
    viewBox='0 0 24 24'
    strokeWidth={1.5}
    stroke='currentColor'
    className='w-6 h-6'
  >
    <path
      strokeLinecap='round'
      strokeLinejoin='round'
      d='M12 3v2.25m6.364.386l-1.591 1.591M21 12h-2.25m-.386 6.364l-1.591-1.591M12 18.75V21m-4.773-4.227l-1.591 1.591M5.25 12H3m4.227-4.773L5.636 5.636M15.75 12a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0z'
    />
  </svg>
)

const moon = (
  <svg
    xmlns='http://www.w3.org/2000/svg'
    fill='none'
    viewBox='0 0 24 24'
    strokeWidth={1.5}
    stroke='currentColor'
    className='w-6 h-6'
  >
    <path
      strokeLinecap='round'
      strokeLinejoin='round'
      d='M21.752 15.002A9.718 9.718 0 0118 15.75c-5.385 0-9.75-4.365-9.75-9.75 0-1.33.266-2.597.748-3.752A9.753 9.753 0 003 11.25C3 16.635 7.365 21 12.75 21a9.753 9.753 0 009.002-5.998z'
    />
  </svg>
)

const auto = (
  <svg
    xmlns='http://www.w3.org/2000/svg'
    width='24'
    height='24'
    viewBox='0 0 24 24'
    fill='none'
    stroke='currentColor'
    strokeWidth='2'
    strokeLinecap='round'
    strokeLinejoin='round'
  >
    <rect x='2' y='3' width='20' height='14' rx='2' ry='2'></rect>
    <line x1='8' y1='21' x2='16' y2='21'></line>
    <line x1='12' y1='17' x2='12' y2='21'></line>
  </svg>
)

export default () => {
  const [theme, setTheme] = usePersistedState<string>('theme', 'auto')
  const [colors, setColors] = usePersistedState<string>('colors', 'light')
  const [icon, setIcon] = useState<JSX.Element>(auto)

  const setLight = () => {
    document.documentElement.classList.remove('dark')
    setColors('light')
  }
  const setDark = () => {
    document.documentElement.classList.add('dark')
    setColors('dark')
  }

  const toggleTheme = () => {
    setTheme(
      theme === 'light' || theme === 'dark'
        ? 'auto'
        : theme === 'auto' && colors === 'dark'
          ? 'light'
          : 'dark',
    )
    Router.replace(Router.asPath, undefined, { scroll: false })
  }

  useEffect(() => {
    const mMedia = window.matchMedia('(prefers-color-scheme: dark)').matches
    ;(mMedia && theme === 'auto') || theme === 'dark' ? setDark() : setLight()
    setIcon(theme === 'light' ? sun : theme === 'dark' ? moon : auto)
  }, [theme])

  useEffect(() => {
    const mMedia = window.matchMedia('(prefers-color-scheme: dark)')
    mMedia.onchange = () => {
      if (JSON.parse(localStorage.theme) === 'auto') {
        mMedia.matches ? setDark() : setLight()
      }
    }
  }, [])

  return (
    <button
      onClick={toggleTheme}
      className='p-2 bg-violet-300 dark:bg-yellow-200 text-lg text-white dark:text-zinc-700 rounded-md'
    >
      {icon}
    </button>
  )
}
