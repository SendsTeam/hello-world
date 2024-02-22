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
