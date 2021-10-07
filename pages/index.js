import Head from 'next/head'
import styles from '../styles/Home.module.scss'
import CustomInput from '../components/CustomInput/CustomInput'
import GradesContext from '../components/context/GradesContext'
import Modal from '../components/Modal'
import * as GradesUtility from '../components/context/GradesUtility'
import { useState, useEffect, useContext } from 'react'

const Home = () => {
  const [inputFields, setInputFields] = useState({
    name: '',
    units: '',
    qt1Grade: '',
    qt2Grade: '',
    qt3Grade: '',
    qt4Grade: '',
    rawGrade: '',
    finalGrade: '',
    creditPointsPerCourse: '',
  })

  const [isModalOpen, setIsModalOpen] = useState(false)

  const [isClicked, setIsClicked] = useState(false)
  const { addSubject, calculateGWA, deleteSubject, subjects, GWA, removeAll } =
    useContext(GradesContext)

  const handleAddSubject = (e) => {
    e.preventDefault()

    setIsClicked((prevState) => !prevState)
    const tempRawGrade = +(
      +inputFields.qt1Grade * 0.2 +
      +inputFields.qt2Grade * 0.2 +
      +inputFields.qt3Grade * 0.2 +
      +inputFields.qt4Grade * 0.4
    ).toFixed(2)

    const tempFinGrade = GradesUtility.getEquivalentGrade(tempRawGrade)

    setInputFields({
      ...inputFields,
      rawGrade: tempRawGrade,
      finalGrade: tempFinGrade,
      creditPointsPerCourse: +tempFinGrade * +inputFields.units,
    })
  }

  useEffect(() => {
    inputFields.creditPointsPerCourse && addSubject({ ...inputFields })
  }, [isClicked])

  const handleChange = (e) => {
    const type = e.target.type
    const value = e.target.value
    const name = e.target.name

    setInputFields((prevState) => ({
      ...prevState,
      [name]: type === 'number' ? value.length > 0 && parseFloat(value) : value,
    }))
  }

  return (
    <div className={`${styles.mainContainer}`}>
      <Head>
        <link
          rel="apple-touch-icon"
          sizes="180x180"
          href="/apple-touch-icon.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="32x32"
          href="/favicon-32x32.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="16x16"
          href="/favicon-16x16.png"
        />
        <link rel="manifest" href="/site.webmanifest" />
        <link rel="mask-icon" href="/safari-pinned-tab.svg" color="#5bbad5" />
        <meta name="msapplication-TileColor" content="#da532c" />
        <meta name="theme-color" content="#ffffff" />
        <title>STI GWA Calculator</title>
      </Head>
      <div className="grid w-full min-h-screen grid-cols-1 p-4 text-sm xl:grid-cols-3 gap-x-4">
        <div className="flex flex-col w-full col-span-1 p-2">
          <div className="relative mb-4 lg:mb-0 bg-[#f2f2f2] bg-opacity-90 backdrop-filter backdrop-blur-sm rounded-md shadow-sm lg:w-full lg:mx-auto transition-[height] duration-200">
            <div className="w-full p-4 mb-10 font-medium text-center text-gray-500 shadow ">
              <h1 className="uppercase ">Input raw grade</h1>
              <p className="">(e.g. 95.50, 82.33)</p>
              <h1
                className={`${
                  subjects.length > 0 ? 'opacity-100' : 'opacity-0'
                } transition-opacity mt-2 uppercase font-bold `}
              >
                Click on a subject to remove it from the list
              </h1>
            </div>
            <form
              onSubmit={(e) => handleAddSubject(e)}
              className="flex flex-col items-center gap-8 p-4"
            >
              <CustomInput
                type="text"
                id="name"
                name="name"
                placeholder="Subject Name"
                value={inputFields.name}
                onChange={(e) => handleChange(e)}
              />
              <CustomInput
                type="number"
                id="units"
                name="units"
                placeholder="Units"
                value={inputFields.units}
                onChange={(e) => handleChange(e)}
              />
              <CustomInput
                type="number"
                id="qt1"
                name="qt1Grade"
                placeholder="Prelim Grade"
                value={inputFields.qt1Grade}
                onChange={(e) => handleChange(e)}
              />
              <CustomInput
                type="number"
                id="qt2"
                name="qt2Grade"
                placeholder="Midterm Grade"
                value={inputFields.qt2Grade}
                onChange={(e) => handleChange(e)}
              />
              <CustomInput
                type="number"
                id="qt3"
                name="qt3Grade"
                placeholder="Prefinal Grade"
                value={inputFields.qt3Grade}
                onChange={(e) => handleChange(e)}
              />
              <CustomInput
                type="number"
                id="qt4"
                name="qt4Grade"
                placeholder="Finals Grade"
                value={inputFields.qt4Grade}
                onChange={(e) => handleChange(e)}
              />
              <div className="flex flex-col items-center justify-center w-full gap-y-4 md:flex-row gap-x-4">
                {subjects.length > 0 && (
                  <button
                    onClick={(e) => {
                      e.preventDefault()
                      calculateGWA()
                      setIsModalOpen((prevState) => !prevState)
                    }}
                    className="px-3 md:px-4 py-2 rounded-md bg-[#08416d] font-semibold text-sm focus:outline-none transition duration-300 shadow text-white hover:text-white hover:bg-[#052c4b]"
                  >
                    Calculate GWA
                  </button>
                )}
                <button className="px-3 md:px-4 rounded-md bg-[#e9c01c] text-white py-2  text-sm focus:outline-none hover:shadow-sm transition-transform hover:-translate-y-1">
                  Add Subject
                </button>
                {subjects.length > 0 && (
                  <button
                    onClick={(e) => {
                      e.preventDefault()
                      removeAll()
                    }}
                    className="px-3 md:px-4 py-2 rounded-md ring-2 ring-[#e51d1d] ring-inset font-semibold text-sm focus:outline-none hover:bg-[#e51d1d] hover:text-white transition duration-300 shadow text-[#e51d1d]"
                  >
                    Remove All Subjects
                  </button>
                )}
              </div>
            </form>
          </div>
        </div>

        <div className="grid w-full grid-cols-1 col-span-2 grid-rows-6 p-2 overflow-x-hidden gap-x-3 lg:grid-cols-2 gap-y-3 lg:w-full">
          {subjects.map((subject, idx) => {
            return (
              <div
                onClick={(e) => deleteSubject(idx)}
                className="grid w-full gap-2 md:h-32 h-44 md:grid-cols-8 grid-cols-4 overflow-hidden shadow  ring-white ring-[2px]  rounded-lg text-white bg-[#08416d] gap-y-2.5 cursor-pointer transform duration-300 hover:-translate-y-0.5 hover:shadow-md focus:shadow-md focus:-translate-y-0.5"
              >
                <div className="col-span-4 p-2 mb-4 font-bold text-center text-[#f9cb13] uppercase bg-white bg-opacity-[0.15] md:col-span-8 truncate">
                  {subject.name}
                </div>
                <div className="flex justify-around w-full col-span-4 pb-1 md:pb-5 md:pt-0">
                  <div className="text-center">
                    <h2 className="text-xs mb-0.5">Prelims</h2>
                    <p className="">{subject.qt1Grade}</p>
                  </div>
                  <div className="text-center">
                    <h2 className="text-xs mb-0.5">Midterm</h2>
                    <p className="">{subject.qt2Grade}</p>
                  </div>
                  <div className="text-center">
                    <h2 className="text-xs mb-0.5">Pre-finals</h2>
                    <p className="">{subject.qt3Grade}</p>
                  </div>
                  <div className="text-center">
                    <h2 className="text-xs mb-0.5">Finals</h2>
                    <p className="">{subject.qt4Grade}</p>
                  </div>
                </div>
                <div className="flex justify-around w-full col-span-4 p-3 text-center md:px-3 md:pb-5 md:pt-0">
                  <div className="">
                    <h2 className="text-xs mb-0.5">Raw Grade</h2>
                    <p className="">{subject.rawGrade}</p>
                  </div>
                  <div className="">
                    <h2 className="text-xs mb-0.5">Subject Grade</h2>
                    <p className="font-bold">{subject.finalGrade}</p>
                  </div>
                </div>
              </div>
            )
          })}
        </div>
      </div>

      {isModalOpen && (
        <Modal isOpen={isModalOpen} setIsOpen={setIsModalOpen}>
          <header className="flex justify-end w-full h-full p-4 mb-4 bg-gray-300">
            <button
              onClick={(e) => setIsModalOpen(false)}
              className="focus:outline-none group"
            >
              <svg
                className="w-5 h-5 text-black fill-current group-hover:text-gray-700"
                viewBox="0 0 20 20"
              >
                <path
                  fillRule="evenodd"
                  d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                  clipRule="evenodd"
                />
              </svg>
            </button>
          </header>
          <main className="flex flex-col items-center justify-center p-4 font-bold ">
            <h1 className="uppercase"> Your GWA is: </h1>
            <p className="text-2xl md:text-3xl">{GWA}</p>
          </main>
        </Modal>
      )}
    </div>
  )
}

export default Home
