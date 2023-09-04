const getRandomInt = (min: number, max: number): number => {
    const min = Math.ceil(min);
    const max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

export { getRandomInt };