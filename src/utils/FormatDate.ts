export const convertDateToTime = (date: Date):string => {
	return `${date.getHours() < 10 ? `0${date.getHours()}` : date.getHours()}:${date.getMinutes() < 10 ? `0${date.getMinutes()}` :  date.getMinutes()}`
}

export const convertDateToStringDate = (date: Date) => {
	return `${date.getDay() < 10 ? `0${date.getDay()}` : date.getDay()}.${date.getMonth() < 10 ? `0${date.getMonth()}` :  date.getMonth()}`
}

export const convertStringOWAPIToDate = (date: string):Date => {
	date = `${date.slice(6, 10)}-${date.slice(3, 5)}-${date.slice(0, 2)}T${date.slice(12, 14)}:${date.slice(15, 17)}`
	return new Date(date)
}