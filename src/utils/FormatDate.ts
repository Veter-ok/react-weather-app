export const formatDate = (date: Date):string => {
	const formattedDate = `${date.getUTCFullYear()}-${date.getUTCMonth() + 1 < 10 ? `0${date.getUTCMonth() + 1}` : date.getUTCMonth() + 1}-${date.getDate() < 10 ? `0${date.getDate()}` : date.getDate()}`
	const formattedTime = `${date.getHours() < 10 ? `0${date.getHours()}` : date.getHours()}:00`
	const currentlyDate = `${formattedDate}T${formattedTime}`
	return currentlyDate
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

export const convertStringToTime = (time: string):Date => {
	const formattedTime = new Date()
	const [hours, minutes, seconds] = time.split(':')
	formattedTime.setHours(Number(hours))
	formattedTime.setMinutes(Number(minutes))
	formattedTime.setSeconds(Number(seconds))
	return formattedTime
}