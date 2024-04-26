
import './App.css'
import ServerConnector from './ServerConnector'
import Login, { userNameAtom } from './Login'
import { useAtom } from 'jotai'
import Talk from './Talk'

function App() {
  const [userName] = useAtom(userNameAtom)
  return (
    <>
    <ServerConnector />
    { !userName && <Login /> }
    {userName && <Talk/>}
    </>
  )
}

export default App
