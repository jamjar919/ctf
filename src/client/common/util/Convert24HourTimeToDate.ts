const convert24HourTimeToDate = (time: string, baseDate?: Date): Date => {
    const [hours, minutes] = time.split(':').map(Number);

    // Use the base date provided as the date part - else use the current date
    const date = baseDate ?? new Date();

    // Set the hours and minutes of the current date
    date.setHours(hours);
    date.setMinutes(minutes);
    date.setMilliseconds(0)

    return date;
}

export { convert24HourTimeToDate }