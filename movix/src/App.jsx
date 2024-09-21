import { useState, useEffect } from 'react'
import './App.scss'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { fetchDataFromApi } from './utils/api'
import { getApiConfiguration, getGenres } from './store/homeSlice'
import { useSelector, useDispatch } from 'react-redux'
import Header from './components/Header.jsx'
import Footer from './components/Footer.jsx'
import PageNotFound from './pages/404/PageNotFound'
import Details from './pages/details/Details'
import Explore from './pages/explore/Explore'
import Home from './pages/home/Home'
import SearchResult from './pages/searchResult/SearchResult'

function App() {
  const dispatch = useDispatch()
  const { url } = useSelector((state) => {
    return state.home
  })


  useEffect(() => {
    apiTesting()
    genresCall()
  }, [])


  const apiTesting = () => {
    fetchDataFromApi('/configuration')
      .then((res) => {
        const url = {
          backdrop: res.images.secure_base_url + "original",
          poster: res.images.secure_base_url + "original",
          profile: res.images.secure_base_url + "original",
        }
        dispatch(getApiConfiguration(url))
      })
  }

  const genresCall = async ()=>{
    let promises = []
    let endPoints = ["tv", "movie"]
    let allGenres = {}

    endPoints.forEach((url)=>{
      promises.push(fetchDataFromApi(`/genre/${url}/list`))
    })

    const data = await Promise.all(promises)
    data.map(({genres})=>{
      return genres.map((item)=>(allGenres[item.id] = item))
    })
    dispatch(getGenres(allGenres))
  }

  return (
    <BrowserRouter>
      <Header/>
      <Routes>
        <Route path='/' element={<Home/>} />
        <Route path='/:mediaType/:id' element={<Details/>} />
        <Route path='/search/:query' element={<SearchResult/>} />
        <Route path='/explore/:mediaType' element={<Explore/>} />
        <Route path='*' element={<PageNotFound/>} />
      </Routes>
      <Footer/>
    </BrowserRouter>
  )
}

export default App
