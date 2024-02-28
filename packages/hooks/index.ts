export function useFullscreen() {
    let fullscreened = false
    async function switcher() {
        fullscreened ? await exitfullscreen() : await fullscreen()
    }
    async function fullscreen() {
        document.fullscreenEnabled && (await document.body.requestFullscreen())
        fullscreened = true
    }
    async function exitfullscreen() {
        if (fullscreened && document.exitFullscreen) {
            await document.exitFullscreen()
            fullscreened = false
        }
    }

    return {
        switcher,
        fullscreen,
        exitfullscreen
    }
}

export function useLock<T extends () => void>(fn: T, once: boolean = false) {
    let isLocked = true
    const locked = () => {
        if (!isLocked) {
            fn()
            once && lock()
        }
    }
    const lock = () => {
        isLocked = true
    }
    const unlock = () => {
        isLocked = false
    }
    return {
        locked,
        lock,
        unlock
    }
}
