import React, { useState } from "react"
import "./App.css"
import ContactList from "./components/ContactList/ContactList"
import Authorization from "./components/Authorization/Authorization"
import SimpleButton from "./components/ContactCard/SimpleButton"

const App = (): JSX.Element => {
    const [isAuth, setIsAuth] = useState(false)

    const handleAuthChange = (value: boolean): void => {
        setIsAuth(value)
    }

    return (
        <div className="App">
            <header className="App-header">Phone book</header>
            {isAuth &&
                <SimpleButton className="logout" handler={() => setIsAuth(!isAuth)}>Log out</SimpleButton>
            }
            {
                isAuth ?
                    <ContactList /> :
                    <Authorization handleAuthChange={handleAuthChange} />
            }
        </div>
    )
}

export default App
