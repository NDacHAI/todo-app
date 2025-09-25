import Header from '@component/Header'
import './App.css'
import { Outlet } from 'react-router-dom'

function App() {



  return (
    <div className='bg-gray-200 text-neutral-900 dark:bg-neutral-900 dark:text-white'>
      <Header />
      <Outlet />
    </div>
  )
}

export default App
