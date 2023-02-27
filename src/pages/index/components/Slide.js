/**
    * @description      : 
    * @author           : Olaolumide
    * @group            : 
    * @created          : 18/02/2023 - 15:25:00
    * 
    * MODIFICATION LOG
    * - Version         : 1.0.0
    * - Date            : 18/02/2023
    * - Author          : Olaolumide
    * - Modification    : 
**/
import React, { useEffect, useState } from 'react'
import axios from 'axios';
import { Link } from 'react-router-dom'
import { Navigation, A11y, Autoplay } from 'swiper';
import { Swiper, SwiperSlide } from 'swiper/react';
import './Slide.css';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/scrollbar';
import 'swiper/css/autoplay';
import Eth from '../../../images/eth.png';
import Preloader from '../../../Preloader';
import { useAuth } from '../../../auth/Auth';

const Slide = () => {

    const auth = useAuth();
    const [sliders, setSliders] = useState([])
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        return () => {
            const config = {
                'headers': {
                    'Content-Type': 'text/html',
                    'api_token': auth.api_token,
                }
            }
            setIsLoading(true);

            const url = `${auth.api}latest?api_token=${auth.api_token}`;
            axios
                .get(url, config)
                .then(res => {
                    if(res.data.status === "success") {
                        setSliders(res.data.data)
                    } else {
                        setSliders([]);
                    }
                    setIsLoading(false)
                })
                .catch(err => {
                    console.log(err)
                    setIsLoading(false)
                })
        }
    }, [])

    return (
        <>
            {isLoading ? (
                <>
                    <Preloader />
                </>
            ) : null}
            {
                (sliders !== []) ? (
                    <>
                        <div className="swiper-container container-fluid">
                            <Swiper
                                modules={[Navigation, A11y, Autoplay]}
                                spaceBetween={10}
                                slidesPerView={0}
                                slidesPerGroupAuto={true}
                                navigation={true}
                                loop={true}
                                parallax={true}
                                autoplay={{
                                    delay: 5000,
                                    pauseOnMouseEnter: true,
                                    disableOnInteraction: false
                                }}
                                breakpoints={{
                                    // when window width is >= 320px
                                    320: {
                                        slidesPerView: 1,
                                        slidesPerGroup: 1,
                                    },
                                    640: {
                                        slidesPerView: 2,
                                        initialSlide: 2,
                                        slidesPerGroup: 2,
                                    },
                                    768: {
                                        slidesPerView: 3,
                                        initialSlide: 3,
                                        slidesPerGroup: 3,
                                    },
                                    1024: {
                                        slidesPerView: 4,
                                        initialSlide: 4,
                                        slidesPerGroup: 4,
                                    },
                                }}
                            >
                                <div className="swiper-slide">
                                    {sliders.map((sliders) => (
                                        <SwiperSlide key={sliders.id}>
                                            <div className="swiper-inner" style={{ backgroundImage: `url(${sliders.image})`, border: "2px solid grey", backgroundSize: 'cover', backgroundRepeat: 'no-repeat', position: 'relative', backgroundPosition: 'center', height: '300px', overflow: 'hidden' }}>
                                                <Link to={`/collection/${sliders.uid}`} style={{ width: '100%', height: '300px', display: 'block', overflow: 'hidden', position: 'relative' }} >
                                                    <div className="collectionswipertag" style={{ color: 'black', fontFamily: 'monospace', fontSize: '14px', lineHeight: '25px', textTransform: 'uppercase', background: '', fontWeight: '600', paddingLeft: '7px' }}>
                                                        {sliders.name}<br></br>
                                                        Floor: {sliders.price}<img src={Eth} alt="ETH" width="15px" height="15px" />
                                                    </div>
                                                </Link>
                                            </div>
                                        </SwiperSlide>
                                    ))}
                                </div>
                            </Swiper>
                        </div>
                    </>
                ) : (
                    null
                )
            }
        </>
    )
}

export default Slide
