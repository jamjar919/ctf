const getAxisText = (date: Date): string => {
    return `${new Date(date).toLocaleTimeString("en-GB", { hour: "2-digit", minute: "2-digit" })}`
}

export { getAxisText }