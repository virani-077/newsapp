import React from 'react'
import Navbar from '../Component/Navbar'
import News from '../Component/News'

const Home = () => {
  return (
    <>
        <Navbar/>
        <News pagesize={9}/>
    </>
  )
}

export default Home