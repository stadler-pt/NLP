const testing = (string) => {
    let regex = /^[a-zA-Z].{2,99}$/
    return regex.test(string)
}

export { testing }