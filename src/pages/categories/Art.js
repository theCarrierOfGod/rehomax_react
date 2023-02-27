import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './Category.css';
import { useCreate } from '../../auth/parts/Created';
import { Noitem } from '../../auth/parts/Noitem';
import Preloader from '../../Preloader';


const Art = () => {
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
        document.title = "Art NFTs | Rehomax";
    }, [])

    useEffect(() => {
        const config = {
            'headers': {
                'Content-Type': 'text/html'
            }
        }

        const url = `${auth.api}getcategory?api_token=aedimvoenbevcunoijinanoernoimijoinenvuinncozIjecvniuzndk&category=art`;
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

    return (
        <div>
            {isLoading ? <Preloader /> : null}
            <section className="hero Art-hero is-medium">
                <div className="hero-body">
                </div>
            </section>
            <section className="container">
                <div style={{ width: '80%' }}>
                    <h1 className="hone text-left">
                        Explore Art
                    </h1>
                    <p className="catPara">
                        An online community of makers, developers, and traders is pushing the art world into new territory. It all started with CryptoPunks, a set of 10,000 randomly generated punks that proved demand for the digital ownership of non-physical items and collectibles in 2017, and the market has evolved rapidly ever since.
                        {more ? '' : ' ...'}
                    </p>
                    <p className={more ? 'd-block catPara' : 'd-none'}>
                        As the underlying technology develops, a growing pool of artists are selling verified, immutable works to art lovers and speculators, and the space as a whole is waking up to the power and potential of decentralized networks and currencies. With creators and collectors generating meaningful revenue through an entirely digital ecosystem, the tokenization of gifs, memes, and MP4s is emerging as the most exciting and relevant blockchain use case. From SuperRare to Josie to JOY, browse and trade NFTs from some of the world's top crypto artists on OpenSea.
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

export default Art
