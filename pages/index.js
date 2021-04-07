import Head from 'next/head'
import styles from '../styles/Home.module.scss'
import CustomInput from '../components/CustomInput/CustomInput'

import { useState, useEffect, useRef } from 'react'

export default function Home() {
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

	const [subjects, setSubjects] = useState([])
	const [isClicked, setIsClicked] = useState([false])
	const [GWA, setGWA] = useState(0)

	const getEquivalentGrade = tempRawGrade => {
		switch (true) {
			case tempRawGrade >= 97.5:
				return `1.00`
			case tempRawGrade >= 94.5 && tempRawGrade < 97.5:
				return `1.25`
			case tempRawGrade >= 91.5 && tempRawGrade < 94.5:
				return `1.50`
			case tempRawGrade >= 88.5 && tempRawGrade < 91.5:
				return `1.75`
			case tempRawGrade >= 85.5 && tempRawGrade < 98.5:
				return `2.00`
			case tempRawGrade >= 82.5 && tempRawGrade < 85.5:
				return `2.25`
			case tempRawGrade >= 79.5 && tempRawGrade < 82.5:
				return `2.50`
			case tempRawGrade >= 76.5 && tempRawGrade < 79.5:
				return `2.75`
			case tempRawGrade >= 74.5 && tempRawGrade < 76.5:
				return `3.00`
			case tempRawGrade < 74.5:
				return `5.00`
		}
	}

	const handleAddSubject = e => {
		e.preventDefault()
		setIsClicked(prevState => !prevState)
		const tempRawGrade = +(
			+inputFields.qt1Grade * 0.2 +
			+inputFields.qt2Grade * 0.2 +
			+inputFields.qt3Grade * 0.2 +
			+inputFields.qt4Grade * 0.4
		).toFixed(2)

		const tempFinGrade = getEquivalentGrade(tempRawGrade)

		setInputFields({
			...inputFields,
			rawGrade: tempRawGrade,
			finalGrade: tempFinGrade,
			creditPointsPerCourse: +tempFinGrade * +inputFields.units,
		})
	}
	useEffect(() => {
		inputFields.creditPointsPerCourse &&
			setSubjects([
				...subjects,
				{
					...inputFields,
				},
			])
	}, [isClicked])

	const handleCalculateGWA = () => {
		//TCP = TOTAL CREDIT POINTS
		//TUN = TOTAL UNITS TAKEN

		const TUN = subjects.reduce((acc, subject) => {
			return subject.units + acc
		}, 0)

		const TCP = subjects.reduce((acc, subject) => {
			return +subject.creditPointsPerCourse + acc
		}, 0)

		setGWA((TCP / TUN).toFixed(2))
	}

	const handleRemoveSubject = _name => {
		setSubjects(prevState => prevState.filter(subject => subject.name !== _name))
	}

	const handleChange = (e) => {
		
		const type = e.target.type
		const value = e.target.value;
		const name = e.target.name

		setInputFields(prevState => ({
			...prevState,
			[name]: type === "number" ? parseFloat(value) : value
		}))
	}

	return (
		<div className="w-full flex flex-col min-h-screen gap-2.5 bg-[#f2f2f2] p-2  text-sm">
			<div className="flex flex-col justify-center w-full p-2">
				<h1 className="p-4 font-semibold text-center uppercase">
					Input subject details below
				</h1>
				<p className="-mt-1 text-center text-gray-500 mb-9">
					Input your raw grade (e.g. 95.50, 99.23)
				</p>
				<form className="flex flex-col gap-8">
					<CustomInput
						type="text"
						id="name"
						name="name"
						placeholder="Subject Name"
						value={inputFields.name}
						onChange={e =>
							handleChange(e)
						}
					/>
					<CustomInput
						type="number"
						id="units"
						name="units"
						placeholder="Units"
						value={inputFields.units}
						onChange={e =>
							handleChange(e)
						}
					/>
					<CustomInput
						type="number"
						id="qt1"
						name="qt1Grade"
						placeholder="Prelim Grade"
						value={inputFields.qt1Grade}
						onChange={e =>
							handleChange(e)
						}
					/>
					<CustomInput
						type="number"
						id="qt2"
						name="qt2Grade"
						placeholder="Midterm Grade"
						value={inputFields.qt2Grade}
						onChange={e =>
							handleChange(e)
						}
					/>
					<CustomInput
						type="number"
						id="qt3"
						name="qt3Grade"
						placeholder="Prefinal Grade"
						value={inputFields.qt3Grade}
						onChange={e =>
							handleChange(e)
						}
					/>
					<CustomInput
						type="number"
						id="qt4"
						name="qt4Grade"
						placeholder="Finals Grade"
						value={inputFields.qt4Grade}
						onChange={e =>
							handleChange(e)
						}
					/>
					<button
						onClick={e => handleAddSubject(e)}
						className="px-2 mx-4 rounded-md py-0.5 self-end text-sm border border-black focus:outline-none"
					>
						Add Subject
					</button>
				</form>
			</div>
			
				<div className="grid grid-cols-4 p-2 gap-y-3">
					{subjects.map((subject, idx) => {
						return (
							<div
								key={subject.name}
								onClick={e => handleRemoveSubject(subject.name)}
								className="grid w-full grid-cols-4 col-span-4 p-1 shadow bg-opacity-90 rounded-lg bg-blue-500 gap-y-2.5 cursor-pointer"
							>
								<div className="col-span-4 font-medium text-center uppercase">
									{subject.name}
								</div>
								<div className="w-full col-span-1 text-center">
									<h2 className="text-xs">Prelims</h2>
									<p>{subject.qt1Grade}</p>
								</div>
								<div className="w-full col-span-1 text-center">
									<h2 className="text-xs">Midterm</h2>
									<p>{subject.qt2Grade}</p>
								</div>
								<div className="w-full col-span-1 text-center">
									<h2 className="text-xs">Pre-finals</h2>
									<p>{subject.qt3Grade}</p>
								</div>
								<div className="w-full col-span-1 text-center">
									<h2 className="text-xs">Finals</h2>
									<p>{subject.qt4Grade}</p>
								</div>
								<div className="w-full col-span-2 text-center">
									<h2 className="text-xs">Raw Grade</h2>
									<p>{subject.rawGrade}</p>
								</div>
								<div className="w-full col-span-2 text-center">
									<h2 className="text-xs">Final Grade</h2>
									<p>{subject.finalGrade}</p>
								</div>
							</div>
						)
					})}
					{subjects.length > 0 &&
					<button
						onClick={handleCalculateGWA}
						className="px-2 mx-4 col-span-4 rounded-md py-0.5 self-end text-sm border border-black focus:outline-none"
					>
						Calculate GWA
					</button>
					}
					{`GWA: ${GWA}`}
				</div>

		</div>
	)
}
