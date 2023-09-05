const getCurrent24HourTime = () =>
    `${new Date().getHours().toString().padStart(2, "0")}:${new Date().getMinutes().toString().padStart(2, "0")}`;

export { getCurrent24HourTime }