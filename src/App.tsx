import Header from '@component/Header'
import './App.css'
import { Outlet } from 'react-router-dom'

function App() {
  return (
    <div className='text-neutral-900 dark:bg-neutral-900 dark:text-white select-none'>
      <Header />
      <Outlet />
    </div>
  )
}

export default App
