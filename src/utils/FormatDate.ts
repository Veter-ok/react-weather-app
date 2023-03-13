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