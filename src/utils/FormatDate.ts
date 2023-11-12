export const convertDateToTime = (date: Date):string => {
	const stringDate = `${date.getHours() < 10 ? `0${date.getHours()}` : date.getHours()}:${date.getMinutes() < 10 ? `0${date.getMinutes()}` :  date.getMinutes()}`
	return stringDate
}

export const convertStringToDate = (date: string):Date => {
	const FormatedDate = new Date(date)
	return FormatedDate
}

export const convertStringOWAPIToDate = (date: string):Date => {
	date = `${date.slice(6, 10)}-${date.slice(3, 5)}-${date.slice(0, 2)}T${date.slice(12, 14)}:${date.slice(15, 17)}`
	const FormatedDate = new Date(date)
	return FormatedDate
}