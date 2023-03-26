import { Link } from 'react-router-dom'

export default function ThankYou() {
  const returnToIndex: Function = () => {
    let sec = 5
    let timer = setInterval(function () {
      sec--
      if (sec <= 0) {
        clearInterval(timer)
        let returnButton = document.getElementById(
          'ReturnButton'
        ) as HTMLElement
        returnButton.click()
      }
    }, 1000)
  }

  return (
    <div
      className='flex flex-col items-center justify-center h-screen m-auto'
      onLoad={returnToIndex()}
    >
      <h1 className='text-2xl md:text-4xl text-stone-600 dark:text-stone-100 mb-3 font-medium'>
        Mensagem enviada com sucesso
      </h1>
      <p className='text-base md:text-xl text-stone-500 dark:text-stone-200 mb-3'>
        Obrigado!
      </p>
      <Link to={'/'}>
        <button
          id='ReturnButton'
          type='button'
          className='text-center inline-block my-12 px-8 py-3 w-max text-base font-medium rounded-md text-white dark:text-stone-900 bg-gradient-to-r from-green-500 to-green-300 drop-shadow-md hover:stroke-gray-100'
        >
          Voltar
        </button>
      </Link>
    </div>
  )
}