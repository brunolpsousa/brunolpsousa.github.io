import getLang from '@utils/getLang'

export default () => {
  const isEN = getLang()
  const en = (
    <>
      Programmer and Analysis and Systems Development student. Looking for
      challenges and continuous learning.
    </>
  )
  const pt = (
    <>
      Programador e estudante de Análise e Desenvolvimento de Sistemas. Em busca
      de desafios e aprendizado contínuo.
    </>
  )
  return (
    <div className='flex flex-col items-center justify-center text-center md:w-7/12'>
      <h1 className='text-6xl pb-3 font-semibold'>Bruno Sousa</h1>
      <p className='text-2xl pb-3 font-medium'>Software Developer</p>
      <p className='text-sm max-w-xl pb-6 font-semibold'>{isEN ? en : pt}</p>
    </div>
  )
}
