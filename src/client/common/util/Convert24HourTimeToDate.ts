const convert24HourTimeToDate = (time: string): Date => {
    const [hours, minutes] = time.split(':').map(Number);

    // Get the current date
    const currentDate = new Date();

    // Set the hours and minutes of the current date
    currentDate.setHours(hours);
    currentDate.setMinutes(minutes);
    currentDate.setMilliseconds(0)

    return currentDate;
}

export { convert24HourTimeToDate }