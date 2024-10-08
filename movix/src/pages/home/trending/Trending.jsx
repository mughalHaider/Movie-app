import React from 'react'
import { useState } from 'react'
import ContentWrapper from '../../../components/ContentWrapper'
import SwitchTabs from '../../../components/switchTab/SwitchTabs'
import useFetch from '../../../hooks/useFetch'
import Carousel from '../../../components/carousel/Carousel'

const Trending = () => {
    const [endpoint, setEndpoint] = useState("day")
    const { data, loading } = useFetch(`/trending/all/${endpoint}`)
    const onTabChange = (tab) => {
        setEndpoint(tab === "Day" ? "day" : "week")
    }
  return (
    <div className='carouselSection'>
      <ContentWrapper>
        <div className="carouselTitle">Trending</div>
        <SwitchTabs data={["Day", "Week"]} onTabChange={onTabChange}/>
      </ContentWrapper>
      <Carousel data={data?.results} loading={loading} />
    </div>
  )
}

export default Trending
