import Head from 'next/head'
import styles from '../styles/Home.module.scss'
import CustomInput from '../components/CustomInput/CustomInput'
import GradesContext from '../components/context/GradesContext'
import * as GradesUtility from '../components/context/GradesUtility'

import { useState, useEffect, useContext, useMemo } from 'react'

const Home = () => {
	const [inputFields, setInputFields] = useState({
		name: 'Information Assurance And Technology (Security and Data Privacy and Cybercrime Law)',
		units: '3',
		qt1Grade: '100',
		qt2Grade: '100',
		qt3Grade: '100',
		qt4Grade: '100',
		rawGrade: '',
		finalGrade: '',
		creditPointsPerCourse: '',
	})

	const [isClicked, setIsClicked] = useState([false])
	const {
		addSubject,
		calculateGWA,
		deleteSubject,
		subjects,
		GWA,
		removeAll,
	} = useContext(GradesContext)

	const handleAddSubject = e => {
		e.preventDefault()
		inputFields.name &&
			inputFields.qt1Grade &&
			inputFields.qt2Grade &&
			inputFields.qt3Grade &&
			inputFields.qt4Grade &&
			setIsClicked(prevState => !prevState)
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

	const handleChange = e => {
		const type = e.target.type
		const value = e.target.value
		const name = e.target.name

		setInputFields(prevState => ({
			...prevState,
			[name]: type === 'number' ? value.length > 0 && parseFloat(value) : value,
		}))
	}

	return (
		<div
			className={`w-full flex flex-col min-h-screen gap-2.5 p-2 text-sm ${styles.mainContainer}`}
		>
			<div className="flex flex-col justify-center w-full p-2">
				<div className="relative mb-4 bg-[#f2f2f2] rounded-md shadow-sm lg:w-[56rem] max-w-4xl lg:mx-auto ">
					<div className="w-full p-4 mb-10 font-medium text-center text-gray-400 shadow ">
						<h1 className="uppercase ">Input raw grade</h1>
						<p className="">(e.g. 95.50, 82.33)</p>
					</div>
					<form className="flex flex-col gap-8 p-4">
						<CustomInput
							type="text"
							id="name"
							name="name"
							placeholder="Subject Name"
							value={inputFields.name}
							onChange={e => handleChange(e)}
						/>
						<CustomInput
							type="number"
							id="units"
							name="units"
							placeholder="Units"
							value={inputFields.units}
							onChange={e => handleChange(e)}
						/>
						<CustomInput
							type="number"
							id="qt1"
							name="qt1Grade"
							placeholder="Prelim Grade"
							value={inputFields.qt1Grade}
							onChange={e => handleChange(e)}
						/>
						<CustomInput
							type="number"
							id="qt2"
							name="qt2Grade"
							placeholder="Midterm Grade"
							value={inputFields.qt2Grade}
							onChange={e => handleChange(e)}
						/>
						<CustomInput
							type="number"
							id="qt3"
							name="qt3Grade"
							placeholder="Prefinal Grade"
							value={inputFields.qt3Grade}
							onChange={e => handleChange(e)}
						/>
						<CustomInput
							type="number"
							id="qt4"
							name="qt4Grade"
							placeholder="Finals Grade"
							value={inputFields.qt4Grade}
							onChange={e => handleChange(e)}
						/>
						<button
							onClick={e => handleAddSubject(e)}
							className="px-2 mx-4 rounded-md bg-[#f9cb13] text-white py-1 self-end text-sm focus:outline-none"
						>
							Add Subject
						</button>
					</form>
				</div>
			</div>

			<div className="container flex flex-col-reverse p-2 mx-auto overflow-x-hidden gap-y-3 lg:w-[56rem] max-w-4xl lg:mx-auto">
				{subjects.map((subject, idx) => {
					return (
						<div
							initial={{ x: '-100%', opacity: 0 }}
							animate={{ x: 0, opacity: 1 }}
							exit={{ x: '100%', opacity: 0 }}
							transition={{ duration: 0.6 }}
							key={subject.name + idx}
							onClick={e => deleteSubject(idx)}
							className="grid w-full gap-2 md:grid-cols-8 grid-cols-4  shadow bg-opacity-90 rounded-lg text-white bg-[#08416d] gap-y-2.5 cursor-pointer transform duration-300 hover:-translate-y-0.5 hover:shadow-md focus:shadow-md focus:-translate-y-0.5"
						>
							<div className="col-span-4 p-2 mb-4 font-bold text-center text-[#f9cb13] uppercase bg-white bg-opacity-[0.15] md:col-span-8 truncate">
								{subject.name}
							</div>
							<div className="flex justify-around w-full col-span-4 px-3 pb-1 md:pb-5 md:pt-0">
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

			{subjects.length > 0 && (
				<div
					className="flex flex-col justify-end lg:w-[56rem] max-w-4xl lg:mx-auto col-start-2 gap-4 p-6"
				>
									<button
						onClick={calculateGWA}
						className="px-2 rounded-md bg-[#f9cb13] self-end py-1 font-semibold text-sm focus:outline-none border-2 border-[#08416d] text-[#08416d]"
					>
						Calculate GWA
					</button>
					<button
						onClick={removeAll}
						className="px-2 rounded-md border-2 border-[#e51d1d] self-end font-semibold py-1 text-sm focus:outline-none text-[#e51d1d]"
					>
						Remove Subjects
					</button>
				</div>
			)}

		</div>
	)
}

export default Home
