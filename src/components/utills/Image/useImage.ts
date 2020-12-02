import { useState, useEffect, useRef } from "react"

import loadImage from "./loadImage"

const cache = new Map()

export const Status = {
    LOADING: "loading",
    LOADED: "loaded",
    FAILED: "failed",
}

export default function useImage(src: string): (string | HTMLElement)[] {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
    const cachedImg: HTMLElement = cache.get(src)
    const initialState = cachedImg ? Status.LOADED : Status.LOADING
    const [status, setStatus] = useState(initialState)
    const mounted = useRef(false)

    useEffect(() => {
        async function getImg() {
            if (!src || status === Status.LOADED) return
            mounted.current = true

            try {
                // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
                const image = await loadImage(src)
                if (!mounted.current) return

                cache.set(src, image)
                setStatus(Status.LOADED)
            } catch (error) {
                if (!mounted.current) return

                cache.delete(src)
                setStatus(Status.FAILED)
            }
            return () => {
                mounted.current = false
            }
        }
        void getImg()
    }, [src, status])

    return [status, cachedImg]
}
