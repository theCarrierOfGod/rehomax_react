/**
    * @description      : 
    * @author           : Olaolumide
    * @group            : 
    * @created          : 19/02/2023 - 08:14:52
    * 
    * MODIFICATION LOG
    * - Version         : 1.0.0
    * - Date            : 19/02/2023
    * - Author          : Olaolumide
    * - Modification    : 
**/
import React, { useEffect, useState } from 'react'
import axios from 'axios';
import { Link } from 'react-router-dom'
import { Navigation, A11y } from 'swiper';
import { Swiper, SwiperSlide } from 'swiper/react';
import style from './Animated.module.css';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/scrollbar';

const Notable = () => {

    const [photos, setPhotos] = useState([]);

    useEffect(() => {
        const config = {
            'headers': {
                'Content-Type': 'text/html'
            }
        }

        const url = `https://pixabay.com/api/?key=30720812-e9822967f5399f715eabd0a4c&q=animal&image_type=image&pretty=true`;
        axios
            .get(url, config)
            .then(res => {
                if (res.data.status === "success") {
                    setPhotos(res.data.data)
                }
            })
            .catch(err => {
                console.log(err)
            })
    }, [])

    return (
        <div className={style.swipercontainer}>
            <Swiper
                modules={[Navigation, A11y]}
                spaceBetween={10}
                slidesPerView={0}
                slidesPerGroupAuto={true}
                navigation
                loop={true}
                parallax={true}
                autoplay={true}
                breakpoints={{
                    // when window width is >= 320px
                    320: {
                        slidesPerView: 1,
                    },
                    640: {
                        slidesPerView: 2
                    },
                    768: {
                        slidesPerView: 2
                    },
                    1024: {
                        slidesPerView: 3
                    }
                }}
            >
                <div className={style.swiperslide}>
                    {photos.map((photos) => (
                        <SwiperSlide key={photos.id}>
                            <div className={style.swiperinner} style={{ backgroundImage: `url(${photos.webformatURL})`, backgroundSize: 'cover', backgroundRepeat: 'no-repeat', backgroundPosition: 'center', height: '250px', }}>
                                <Link to={`collection/${photos.id}`} style={{ width: '100%', height: '250px', display: 'flex' }} >
                                    <div className={style.nameBox} style={{ backgroundImage: `url(${photos.userImageURL})` }}></div>
                                    <div className={style.collectionswipertag}>
                                        <span className={style.inBoxName}>
                                            {photos.user}
                                        </span>
                                    </div>
                                </Link>
                            </div>
                        </SwiperSlide>
                    ))}
                </div>
            </Swiper>
        </div>
    )
}

export default Notable
