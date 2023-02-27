import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useCreate } from '../../auth/parts/Created';
import './Category.css';
import { Noitem } from '../../auth/parts/Noitem';
import Preloader from '../../Preloader';


const Collectibles = () => {
    const tryOut = useCreate()
    const [more, setMore] = useState(false);
    const [data, setData] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    const moreToggle = (event) => {
        if (more) {
            setMore(false)
        } else {
            setMore(true)
        }
    }
    useEffect(() => {
        document.title = "Collectibles NFTs | Rehomax";
    }, [])

    useEffect(() => {
        
            const config = {
                'headers': {
                    'Content-Type': 'text/html'
                }
            }

            const url = `${auth.api}getcategory?api_token=aedimvoenbevcunoijinanoernoimijoinenvuinncozIjecvniuzndk&category=collectibles`;
            axios
                .get(url, config)
                // .then((res) => res.json())
                .then(res => {
                    setData(res.data.data)
                    setIsLoading(false)
                })
                .catch(err => {
                    setIsLoading(false)
                    console.log(err)
                })
        
    }, [])

    return (
        <div>
            {isLoading ? <Preloader /> : null}
            <section className="hero Collectibles-hero is-medium">
                <div className="hero-body">
                </div>
            </section>
            <section className="container">
                <div style={{ width: '80%' }}>
                    <h1 className="hone text-left">
                        Explore Collectibles
                    </h1>
                    <p className="catPara">
                        The way we value internet-native items is changing with the development of blockchain technology. Kittens, punks, and memes are now trading digital wallets for cryptocurrencies, and the online collectibles market is taking shape before our eyes.
                        {more ? '' : ' ...'}
                    </p>
                    <p className={more ? 'd-block catPara' : 'd-none'}>
                        Scarce digital property is cropping up in all kinds of industries around the world, and OpenSea is on a mission to house internet goods from all corners of the ecosystem. Own, buy, and sell rare and exclusive NFTs from CryptoKitties, Axie Infinity, and beyond.
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

export default Collectibles
