import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './Category.css';
import { useCreate } from '../../auth/parts/Created';
import { Noitem } from '../../auth/parts/Noitem';
import Preloader from '../../Preloader';


const Utility = () => {
    const tryOut = useCreate()
    const [data, setData] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        
            const config = {
                'headers': {
                    'Content-Type': 'text/html'
                }
            }

            const url = `${auth.api}getcategory?api_token=aedimvoenbevcunoijinanoernoimijoinenvuinncozIjecvniuzndk&category=utility`;
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
        document.title = "Utility NFTs | Rehomax";
    }, [])

    return (
        <div>
            {isLoading ? <Preloader /> : null}
            <section className="hero Utility-hero is-medium">
                <div className="hero-body">
                </div>
            </section>
            <section className="container">
                <div style={{ width: '80%' }}>
                    <h1 className="hone text-left">
                        Explore Utility NFTs
                    </h1>
                    <p className="catPara">
                        From redeemable rewards to membership NFTs, explore a wide range of utility items that unlock access to special and unique benefits.
                    </p>
                </div>
            </section>
            <section className="container">
                <div>
                    <h2 className="hthree">Trending collections</h2>
                    <div className="row">
                        {(data === []) ? tryOut.Cata(data) : <Noitem />}
                    </div>
                </div>
            </section>
        </div>
    )
}

export default Utility
