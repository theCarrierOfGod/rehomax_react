/**
    * @description      : 
    * @author           : Olaolumide
    * @group            : 
    * @created          : 18/02/2023 - 15:24:38
    * 
    * MODIFICATION LOG
    * - Version         : 1.0.0
    * - Date            : 18/02/2023
    * - Author          : Olaolumide
    * - Modification    : 
**/
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { Navigation, A11y, Autoplay } from 'swiper';
import { Swiper, SwiperSlide } from 'swiper/react';
import styles from '../Index.module.css';
import './Slide.css';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/scrollbar';
import Preloader from '../../../Preloader';
import axios from 'axios';
import { useAuth } from '../../../auth/Auth';

const Notable = () => {

    const auth = useAuth();
    const [notables, setNotables] = useState(null);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const url = `${auth.api}notable_asset?api_token=aedimvoenbevcunoijinanoernoimijoinenvuinncozIjecvniuzndk`;
        axios(url)
            .then(res => {
                if (res.data.status === "success") {
                    setNotables(res.data.data)
                }
                setIsLoading(false)
            })
            .catch(err => {
                console.log(err)
                setIsLoading(false)
            })
    }, [])

    return (
        <>
            {isLoading ? (
                <>
                    <Preloader />
                </>
            ) : null}
            {
                (notables !== null) ? (
                    <>
                        <h1 className={styles.hthree}>Notable Collections</h1>
                        <div className="swiper-container">
                            <Swiper
                                modules={[Navigation, A11y, Autoplay]}
                                spaceBetween={10}
                                slidesPerView={0}
                                slidesPerGroupAuto={true}
                                navigation
                                loop={true}
                                parallax={true}
                                autoplay={{
                                    delay: 4500,
                                    pauseOnMouseEnter: true,
                                    disableOnInteraction: false
                                }}
                                a11y={{
                                    prevSlideMessage: 'Previous slide',
                                    nextSlideMessage: 'Next slide',
                                }}
                                breakpoints={{
                                    // when window width is >= 320px
                                    320: {
                                        slidesPerView: 1,
                                    },
                                    640: {
                                        slidesPerView: 2,
                                        initialSlide: 2,
                                    },
                                    768: {
                                        slidesPerView: 3,
                                        initialSlide: 3,
                                    },
                                    1024: {
                                        slidesPerView: 4,
                                        initialSlide: 4,
                                    },
                                }}
                            >
                                <div className="swiper-slide">
                                    {notables.map((notables) => (
                                        <SwiperSlide key={notables.uid}>
                                            <div className="swiper-inner" style={{ backgroundImage: `url(${notables.image})`, backgroundSize: 'cover', backgroundRepeat: 'no-repeat', backgroundPosition: 'center', height: '300px', }}>
                                                <Link to={`/collection/${notables.uid}`} style={{ width: '100%', height: '300px', display: 'flex' }} >
                                                    <div className="swiper-tag">
                                                        {notables.name}<br></br>
                                                        Floor: {notables.price}ETH
                                                    </div>
                                                </Link>
                                            </div>
                                        </SwiperSlide>
                                    ))}
                                </div>
                            </Swiper>
                        </div >
                    </>
                ) : (
                    null
                )
            }
        </>
    )

}

export default Notable
