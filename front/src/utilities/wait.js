export default function wait({ duration = 1000 }) {
    return new Promise((resolve, reject) => {
        window.setTimeout(() => {
            resolve({})
        }, duration)
    })
}