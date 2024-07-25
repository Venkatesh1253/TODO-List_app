
import './App.css'
import React from 'react'
import { Toaster } from 'react-hot-toast'
import Todo from './components/Todo'


function App() {
  return (
    <>
      <Todo/>
      <Toaster
        position="top-right"
        toastOptions={{
          style: {
            fontSize: '1rem',
          },
        }}
      />
    </>
  )
}

export default App
