import { Contact } from "../types"
// create type of response
const getDataFromUrl = (method: string, url: string): Promise<any> => {
    return new Promise(function (resolve, reject) {
        const xhr = new XMLHttpRequest()

        xhr.open(method, url)
        xhr.responseType = "json"
        xhr.send()
        xhr.onload = function () {
            if (xhr.readyState === 4) {
                if (xhr.status === 200) {
                    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
                    const data = xhr.response;
                    return resolve(data)
                }
                alert(`Error ${xhr.status}: ${xhr.statusText}`)
            }
        }
        xhr.onerror = function () {
            console.log("Error. Request failed.")
            reject({
                status: this.status,
                statusText: xhr.statusText,
            })
        }
    })
}

export default getDataFromUrl
