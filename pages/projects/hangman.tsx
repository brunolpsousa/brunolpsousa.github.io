import HangmanDraw from '../../src/components/HangmanDraw'
import HangmanWord from '../../src/components/HangmanWord'
import HangmanKeyboard from '../../src/components/HangmanKeyboard'
import Link from 'next/link'
import hangWords from '../../src/data/hangmanWords'
import { getLang } from '../../src/components/getLang'
import { useCallback, useEffect, useState } from 'react'

export default function Hangman() {
  const isEN = getLang()
  const [level, setLevel] = useState(0)
  const [wordToGuess, setWordToGuess] = useState('')
  const [wordToGuessNorm, setWordToGuessNorm] = useState('')
  const [guessed, setGuessed] = useState<string[]>([])
  const [guessedWords, setGuessedWords] = useState<string[]>([])
  const mistakes = guessed.filter((letter) => !wordToGuessNorm.includes(letter))
  const lose = mistakes.length >= 6
  const win =
    wordToGuessNorm !== '' &&
    wordToGuessNorm.split('').every((letter) => guessed.includes(letter))

  function gameTitle(): string {
    const gameSentence = isEN ? 'Hangman' : 'Jogo da Forca'
    const winSentence = isEN ? 'Congratulations!' : 'Parabéns!'
    const loseSentence = isEN ? 'You lose!' : 'Você perdeu!'
    if (wordToGuessNorm !== '' && win) {
      return winSentence
    } else if (lose) {
      return loseSentence
    } else {
      return gameSentence
    }
  }

  function refreshGame() {
    if (typeof document !== 'undefined') {
      const parts = document.querySelectorAll<HTMLElement>('.hang-parts')
      for (let i = 0; i < parts.length; i++) {
        parts[i].style.display = 'none'
      }
      guessed.forEach((element) => {
        const keys = document.getElementById(element)
        keys?.classList.remove('opacity-30')
        keys?.removeAttribute('disabled')
      })
    }

    const words = isEN ? hangWords.en : hangWords.pt
    const secret = words[Math.floor(Math.random() * words.length)].toLowerCase()
    const specialChars = ['-', '/', ' ']

    if (guessedWords.includes(secret)) {
      return refreshGame()
    }

    if (level > 0 && level <= 5 && (secret.length < 4 || secret.length > 6)) {
      return refreshGame()
    } else if (
      level > 5 &&
      level <= 10 &&
      (secret.length < 3 || secret.length > 8)
    ) {
      return refreshGame()
    }

    if (guessedWords.length < 10) {
      setGuessedWords((guessedWords) => [...guessedWords, secret])
    } else {
      setGuessedWords([])
    }

    setWordToGuess(secret)
    setWordToGuessNorm(secret.normalize('NFD').replace(/\p{Diacritic}/gu, ''))
    setGuessed([])

    specialChars.forEach((element) => {
      if (secret.includes(element)) {
        setGuessed((guessed) => [...guessed, element])
      }
    })
  }

  const addGuess = useCallback(
    (letter: string) => {
      if (guessed.includes(letter) || lose || win) return
      const button = document.getElementById(letter)
      button?.classList.add('opacity-30')
      button?.setAttribute('disabled', 'true')
      setGuessed((guessed) => [...guessed, letter])
    },
    [guessed]
  )

  function getLevel() {
    if ('hangLevel' in localStorage && level === 0) {
      setLevel(parseInt(localStorage.hangLevel))
    } else if (level === 0) {
      setLevel(1)
    }
    if (win) {
      setLevel(level + 1)
    } else if (lose) {
      level > 2 ? setLevel(level - 2) : setLevel(1)
    }
    level > 0 ? localStorage.setItem('hangLevel', level.toString()) : null
  }

  useEffect(() => {
    getLevel()
  }, [win, lose])

  useEffect(() => {
    refreshGame()
  }, [isEN])

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      const letter = e.key.toLowerCase()
      if (!letter.match(/^[a-z]$/)) return
      e.preventDefault()
      addGuess(letter)
    }
    document.addEventListener('keydown', handler)
    return () => document.removeEventListener('keydown', handler)
  }, [guessed])

  return (
    <div className='flex flex-col items-center justify-center mt-20 mb-24 mx-auto w-full h-screen'>
      <h1 className='text-4xl md:text-6xl mb-8'>{gameTitle()}</h1>
      <h3 className='text-xl md:text-2xl mb-8'>
        {isEN ? 'Level: ' : 'Nível: '}
        {level}
      </h3>
      <HangmanDraw mistakes={mistakes.length} />
      <HangmanWord reveal={lose} word={wordToGuess} guessed={guessed} />
      <HangmanKeyboard addGuess={addGuess} />
      <div className='relative w-5/6 md:w-1/2'>
        <Link href={'/projects'}>
          <button
            id='ReturnButton'
            type='button'
            className='navBtn absolute left-3 my-12'
          >
            {isEN ? 'Return' : 'Voltar'}
          </button>
        </Link>
        <button
          id='Retry'
          type='button'
          className='navBtn absolute right-3 my-12'
          onClick={() => refreshGame()}
        >
          {isEN ? 'Play' : 'Jogar'}
        </button>
      </div>
    </div>
  )
}
