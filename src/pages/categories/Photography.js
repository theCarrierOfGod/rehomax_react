import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './Category.css';
import { useCreate } from '../../auth/parts/Created';
import { Noitem } from '../../auth/parts/Noitem';
import Preloader from '../../Preloader';


const Photography = () => {
    const tryOut = useCreate()
    const [data, setData] = useState([]);
    const [more, setMore] = useState(false);
    const [isLoading, setIsLoading] = useState(true);

    const moreToggle = (event) => {
        if (more) {
            setMore(false)
        } else {
            setMore(true)
        }
    }

    useEffect(() => {
        
            const config = {
                'headers': {
                    'Content-Type': 'text/html'
                }
            }
    
            const url = `${auth.api}getcategory?api_token=aedimvoenbevcunoijinanoernoimijoinenvuinncozIjecvniuzndk&category=photography`;
            axios
                .get(url, config)
                // .then((res) => res.json())
                .then(res => {
                    setData(res.data.data)
                    setIsLoading(false)
                })
                .catch(err => {
                    console.log(err)
                    setIsLoading(false)
                })
        
    }, [])

    useEffect(() => {
        document.title = "Photography NFTs | Rehomax";
    }, [])

    

    return (
        <div>
            {isLoading ? <Preloader /> : null}
            <section className="hero Photography-hero is-medium">
                <div className="hero-body">
                </div>
            </section>
            <section className="container">
                <div style={{ width: '80%' }}>
                    <h1 className="hone text-left">
                        Explore Photography
                    </h1>
                    <p className="catPara">
                        Photographers are taking the NFT world by storm, and we've got a selection of breathtaking collections from a growing and increasingly global community of creators right here on OpenSea.
                        {more ? '' : ' ...'}
                    </p>
                    <p className={more ? 'd-block catPara' : 'd-none'}>
                        Browse creations from Justin Aversano, Brooke DiDonato, Platon, The British Journal of Photography, and more.
                    </p>
                    <button onClick={moreToggle} className="catPara btn btn-primary" style={{ display: 'flex', alignItems: 'center', fontFamily: 'monospace', textTransform: 'uppercase', fontWeight: '700', fontSize: '15px', lineHeight: '20px' }}>
                        {more ? 'See less' : 'See more'}
                        <span className="material-icons-outlined" style={{ lineHeight: '10px', fontSize: '15px' }}>
                            {more ? 'expand_less' : 'expand_more'}
                        </span>
                    </button>
                </div>
            </section>
            <section className="container">
                <div>
                    <h2 className="hthree">Trending collections</h2>
                    <div className="row">
                        {data ? tryOut.Cata(data) : <Noitem />}

                    </div>
                </div>
            </section>
        </div>
    )
}

export default Photography
