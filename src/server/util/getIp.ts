import fetch from "node-fetch";

const getIp = async (): Promise<string> => {
    return fetch('https://api.ipify.org?format=json')
        .then(result => result.json())
        .then((result: any) => result.ip)
        .catch(() => null)
}

export { getIp }