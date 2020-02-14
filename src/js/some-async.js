async function start() {
    return await Promise.resolve('async is working')
}

export default function () {
    start().then(console.log)
}