import express from "express";

const getCookies = (req: express.Request): Record<string, string> => {
    const { headers: { cookie } } = req;

    if (!cookie) {
        return {};
    }

    return cookie
        .split(';')
        .reduce((res, item) => {
            const data = item.trim().split('=');
            return {
                ...res,
                [data[0]]: data[1]
            };
        }, {});
}

export { getCookies }