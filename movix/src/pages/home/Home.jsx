import React from 'react'
import Banner from './heroBanner/Banner'
import './Home.scss'
import Trending from './trending/Trending'
import Popular from './popular/Popular'
import TopRated from './topRated/TopRated'

const Home = () => {
  return (
    <div className='homePage'>
      <Banner />
      <Trending />
      <Popular />
      <TopRated />

    </div>
  )
}

export default Home
