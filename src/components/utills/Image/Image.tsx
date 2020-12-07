import React from "react"
import useImage, { Status } from "./useImage"

import avatar from "./avatar.svg"
import "./spinner.css"

type Image = {
    src: string,
    alt: string
}

export default function Image({ src, alt }: Image): JSX.Element {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
    const [status] = useImage(src)

    if (status === Status.LOADING) {
        return <div className="loader">Loading...</div>
    }

    let source
    if (status === Status.FAILED) {
        source = avatar
    } else {
        source = src
    }

    return (
        <div className="avatar">
            <img alt={alt} src={source} />
        </div>
    )
}
