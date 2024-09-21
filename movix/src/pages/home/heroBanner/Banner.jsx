import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router'
import './Banner.scss'
import useFetch from '../../../hooks/useFetch'
import { useSelector } from 'react-redux'
import Img from "../../../components/Img.jsx"
import ContentWrapper from "../../../components/ContentWrapper"


const Banner = () => {
    const [background, setBackground] = useState("")
    const [query, setQuery] = useState("")
    const navigate = useNavigate()
    const { url } = useSelector((state) => state.home)
    const { data, loading } = useFetch('/movie/upcoming');
    
    useEffect(() => {
        const bg = url.backdrop + data?.results[Math.floor(Math.random() * 20)]?.backdrop_path;
        setBackground(bg)
    }, [data])


    const searchQueryHandler = (event) => {
        if (event.key === 'Enter' && query.length > 0) {
            navigate(`search/${query}`)
        }
    }


    return (
        <div className='heroBanner'>
            {!loading && <div className="backdrop-img">
                <Img src={background} alt="" />
            </div>}

            <div className="opacity-layer">

            </div>

            <ContentWrapper>
                <div className="heroBannerContent">
                    <span className='title'>Welcome.</span>
                    <span className='subTitle'>Million of Movies, TV shows and people to discover.</span>
                    <div className="searchInput">
                        <input className='input'
                            type="text"
                            placeholder='Search for a movie or TV show.......'
                            onChange={(e) => setQuery(e.target.value)}
                            onKeyUp={searchQueryHandler}
                        />
                        <button onClick={()=>navigate(`search/${query}`)}>Search</button>
                    </div>
                </div>
            </ContentWrapper>
        </div>
    )
}

export default Banner
