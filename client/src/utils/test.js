export function fakeRequest(ms) {
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve('dummy data from server')
        }, ms);
    })
}