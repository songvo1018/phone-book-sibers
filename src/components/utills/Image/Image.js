import React from "react"
import useImage, { Status } from "./useImage.js"

import avatar from "./avatar.svg"
import "./spinner.css"

export default function Image({ src, alt }) {
    const [status, image] = useImage(src)

    if (status === Status.LOADING) {
        return <div className="loader">Loading...</div>
    }

    let source
    if (status === Status.FAILED) {
        source = avatar
    } else {
        source = src
    }

    return <img alt={alt} src={source} />
}
