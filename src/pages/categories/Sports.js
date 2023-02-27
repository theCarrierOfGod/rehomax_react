import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './Category.css';
import { useCreate } from '../../auth/parts/Created';
import { Noitem } from '../../auth/parts/Noitem';
import Preloader from '../../Preloader';


const Sports = () => {
    const tryOut = useCreate()
    const [data, setData] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        
            const config = {
                'headers': {
                    'Content-Type': 'text/html'
                }
            }

            const url = `${auth.api}getcategory?api_token=aedimvoenbevcunoijinanoernoimijoinenvuinncozIjecvniuzndk&category=sports`;
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
        document.title = "Sports NFTs | Rehomax";
    }, [])



    return (
        <div>
            {isLoading ? <Preloader /> : null}
            <section className="hero Sport-hero is-medium">
                <div className="hero-body">
                </div>
            </section>
            <section className="container">
                <div style={{ width: '80%' }}>
                    <h1 className="hone text-left">
                        Explore Sport NFTs
                    </h1>
                    <p className="catPara">
                        Explore and own collectibles from some of the biggest sports teams and brands in the world.
                    </p>
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

export default Sports
