import axios from 'axios';
import React, { useState, useEffect } from 'react'
import { NotificationContainer, NotificationManager } from 'react-notifications';
import { Link, useParams } from 'react-router-dom'
import { useAuth } from '../../auth/Auth';
import style from './Collection.module.css';
import Preloader from '../../Preloader';


const Collection = () => {

    let { id } = useParams();

    const auth = useAuth();
    const user = auth.user;

    const [assets, setAssets] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [offer, setOffer] = useState('- - ');
    const [offerPrice, setOfferPrice] = useState("");
    const [offerSee, setOfferSee] = useState(false);
    const [priceError, setPriceError] = useState("");
    const [isError, setIsError] = useState(false);
    const [makeOffer, setMakeOffer] = useState(false);
    const [duration, setDuration] = useState(72);
    const [myOffers, setMyOffers] = useState([]);

    useEffect(() => {
        document.title = "Collection | Rehomax";
        getOffers();
    }, [])

    useEffect(() => {
        const config = {
            'headers': {
                'Content-Type': 'text/html'
            }
        }
        const url = `${auth.api}unique_asset?api_token=aedimvoenbevcunoijinanoernoimijoinenvuinncozIjecvniuzndk&uid=${id}`;
        axios
            .get(url, config)
            .then(res => {
                setAssets(res.data.data.collection[0]);
                auth.getOffers(assets.uid);
                setIsLoading(false)
            })
            .catch(err => {
                console.log(err)
                setIsLoading(false)
            })
        return console.log(" ");
    }, [id])

    const handleAddToCart = () => {
        setIsLoading(true);
        NotificationManager.info("processing...", "Add to Cart NFT");
        axios(`${auth.api}add_to_cart?api_token=aedimvoenbevcunoijinanoernoimijoinenvuinncozIjecvniuzndk&uid=${id}&username=${user}`)
            .then((res) => {
                if (res.data.code === "00") {
                    NotificationManager.success(res.data.message, "Add to Cart");
                    setIsLoading(false);
                    auth.userData();
                    auth.cartData();
                } else {
                    NotificationManager.warning(res.data.message, "Add to Cart")
                    setIsLoading(false);
                    auth.userData();
                    auth.cartData();
                }
            })
            .catch((err) => {
                NotificationManager.error(err.message)
                setIsLoading(false);
                auth.userData();
                auth.cartData();
            })
    }

    const handleOffer = () => {
        if (offerSee === false) {
            setOfferSee(true);
        } else {
            setOfferSee(false);
        }
    }

    const changeOffer = (event) => {
        if (event.target.value === "") {
            setIsError(false);
            setPriceError("");
            setMakeOffer(false)
            setOffer("- - ");
        } else {
            if (isNaN(event.target.value)) {
                setOffer('NaN');
                setIsError(true);
                setPriceError("please enter a valid amount");
                setMakeOffer(false)
            } else {
                setOffer(event.target.value);
                if (event.target.value < 0.003) {
                    setIsError(true);
                    setPriceError("offer must be at least the minimum price of 0.003 ETH");
                    setMakeOffer(false)
                } else {
                    setIsError(false);
                    setPriceError("");
                    setMakeOffer(true)
                }
            }
        }
        setOfferPrice(event.target.value);
    }

    const makeOfferNow = (event) => {
        NotificationManager.info('making offer', "Make Offer");
        event.preventDefault();
        axios(`${auth.api}make_offer?api_token=aedimvoenbevcunoijinanoernoimijoinenvuinncozIjecvniuzndk&username=${user}&uid=${assets.uid}&duration=${duration}&offer=${offerPrice}`)
            .then((res) => {
                NotificationManager.success(res.data.message, "Make Offer");
                setOfferSee(false);
                setTimeout(() => {
                    window.location.reload();
                }, 2005);
            })
            .catch((err) => {
                NotificationManager.error(err.message, "Make offer");
                setIsLoading(false)
            })
    }

    const getOffers = () => {
        fetch(`${auth.api}getoffers?api_token=aedimvoenbevcunoijinanoernoimijoinenvuinncozIjecvniuzndk&product=${id}`)
            .then((response) => response.json())
            .then((response) => {
                if (response.code === '00') {
                    setMyOffers(response.offers);
                } else {
                    setMyOffers([])
                }
            })
    }

    return (
        <>
            {isLoading ? (
                <>
                    <Preloader />
                </>
            ) : null}
            <NotificationContainer />
            <div className='container-fluid' style={{ marginTop: '15px' }}>
                {/* Display on a gid screen */}
                <div className='row justify-content-center'>
                    <div className='col-lg-6 col-md-6 col-sm-12'>
                        <h1 className='d-md-none d-block' style={{ color: 'black', fontSize: '32px', fontFamily: 'monospace', textTransform: 'uppercase', letterSpacing: '5px', fontWeight: 'bold' }}>{assets.name}</h1>
                        <p className='d-md-none d-block' style={{ fontSize: '15px' }}>Owned by: <Link to={`/account/${assets.created_by}`}>{assets.created_by}</Link></p>
                        <pre style={{ background: "transparent" }}>
                            <div className="card" style={{ width: '100%', maxHeight: '70vh', overflow: 'hidden', margin: 'auto', borderRadius: '15px' }}>
                                <img className="card-img-top" src={assets.image} alt={assets.name} style={{ objectFit: "contain", width: '100%' }} />
                            </div>
                        </pre>
                        <div className='card' style={{ width: '100%', minHeight: '150px', overflow: 'hidden', margin: 'auto', marginTop: '25px', borderRadius: '7px' }}>
                            <div className='card-header' style={{ textTransform: 'uppercase', fontWeight: '800', fontSize: '17px', textIndent: '7px' }}>
                                <span class="material-icons-outlined">
                                    description
                                </span>
                                Description
                            </div>
                            <div className='card-body'>
                                <p>
                                    {assets.description}
                                </p>
                            </div>
                        </div>
                    </div>
                    <div className='col-lg-6 col-md-6 col-sm-12 '>
                        <pre style={{ background: "transparent" }}>
                            <h1 className='d-none d-md-flex' style={{ color: 'black', fontSize: '32px', fontFamily: 'monospace', textTransform: 'uppercase', letterSpacing: '5px', fontWeight: 'bold' }}>
                                {assets.name}
                                {assets.sold === "yes" ? (
                                    <>
                                        <span className="material-icons-outlined" style={{ lineHeight: '38px', color: 'green' }} title="Sold">
                                            task_alt
                                        </span>
                                    </>
                                ) : null}
                            </h1>
                            <p className='d-none d-md-flex' style={{ fontSize: '15px' }}>Owned by: <Link to={`/account/${assets.created_by}`}>{assets.created_by}</Link></p>
                            <br />
                            <div className="card" style={{ width: '100%', minHeight: '150px', overflow: 'hidden', margin: 'auto', padding: '15px', borderRadius: '15px' }}>
                                <div classNAme="card-header" style={{ fontSize: '18px' }} >
                                    Current Price <br></br>
                                    <b className={style.CollectionPriceETH}>
                                        {assets.price} ETH
                                    </b>
                                </div>
                                <br /><br /><br />
                                <div className='row justify-content-evenly' style={{ marginTop: '20px' }}>
                                    {

                                        (assets.sold === "yes") ? (
                                            <span style={{ fontSize: '18px' }} >
                                                Buyer
                                                <br></br>
                                                <Link to={`/account/${assets.boughtBy}`} >{assets.boughtBy}</Link>
                                            </span>
                                        ) : (
                                            <div></div>
                                        )
                                    }
                                    {
                                        (user === assets.created_by)
                                            ?
                                            (
                                                null
                                            )
                                            :
                                            (
                                                <>
                                                    {
                                                        ((assets.gasPaid === "yes") && (assets.sold === "no")) ? (
                                                            <>
                                                                <p className="col-sm-6 mt-2">
                                                                    <button className="btn btn-primary btn-lg w-100" onClick={handleAddToCart}>
                                                                        Add to Cart
                                                                    </button>
                                                                </p>
                                                                <p className="col-sm-6 mt-2">
                                                                    <button className="btn btn-outline-primary btn-lg w-100" onClick={handleOffer}>
                                                                        <span className='material-icons-outlined' style={{ fontSize: '18px', paddingTop: '12px', lineHeight: '10px', marginRight: '10px' }}>
                                                                            sell
                                                                        </span>
                                                                        Make offer
                                                                    </button>
                                                                </p>
                                                            </>
                                                        ) : (
                                                            null
                                                        )
                                                    }
                                                </>
                                            )
                                    }
                                </div>
                                <br />
                            </div>
                            <div className='card' style={{ width: '100%', minHeight: '150px', overflow: 'hidden', margin: 'auto', marginTop: '25px', borderRadius: '7px' }}>
                                <div className='card-header' style={{ textTransform: 'uppercase', fontWeight: '900', fontSize: '19px', textIndent: '7px' }}>
                                    <span class="material-icons-outlined">
                                        toc
                                    </span>
                                    Offers
                                </div>
                                <div className='card-body'>
                                    <div className='table-responsive'>
                                        <table className="table table-striped">
                                            <thead>
                                                <tr>
                                                    <th colspan="2">
                                                        Price
                                                    </th>
                                                    <th>
                                                        Date
                                                    </th>
                                                    <th>
                                                        Made by
                                                    </th>
                                                    <th>
                                                        Status
                                                    </th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {myOffers.map((ffers) =>
                                                (
                                                    <tr>
                                                        <td colspan="2" class="table-active">
                                                            {ffers.offer}ETH
                                                        </td>
                                                        <th>
                                                            {ffers.created_at}
                                                        </th>
                                                        <td>
                                                            {ffers.user}
                                                        </td>
                                                        <td>
                                                            {ffers.status}
                                                        </td>
                                                    </tr>
                                                )
                                                )}
                                            </tbody>
                                        </table>
                                    </div>
                                </div>
                            </div>
                        </pre>
                    </div>
                </div>
            </div>

            <div className={offerSee ? "modal show d-block" : "d-none"} id="exampleModal" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true" style={{ background: 'rgba(0, 0, 0, 0.3)' }}>
                <div class="modal-dialog" role="document">
                    <div class="modal-content" style="margin: auto">
                        <div class="modal-header">
                            <h5 class="modal-title text-center w-100" style={{ fontWeight: '700', fontSize: '22px' }} id="exampleModalLabel">
                                Make an offer
                            </h5>
                            <button type="button" class="close" data-dismiss="modal" aria-label="Close" onClick={handleOffer} style={{ width: '30px', height: '30px', color: 'grey', background: 'white', fontSize: '25px', border: 'none', fontWeight: '900', borderRadius: '100%' }}>
                                <span aria-hidden="true">&times;</span>
                            </button>
                        </div>
                        <div class="modal-body">
                            <span style={{ width: '100%', marginBottom: '20px' }}>
                                <div className="row" style={{ margin: '0' }}>
                                    <div className="col-sm-3 rounded img-thumbnail" style={{ backgroundImage: `url(${assets.image})`, width: '65px', margin: '5px', height: '65px', backgroundSize: 'contain', backgroundPosition: 'top' }}>
                                    </div>
                                    <div className="col-sm-7" style={{ alignItems: 'center', marginLeft: '0', paddingLeft: '0' }}>
                                        <p className="mr-auto">
                                            <b style={{ fontFamily: 'monospace' }}>
                                                {assets.name}
                                            </b> <br />
                                            <span>
                                                {assets.created_by}
                                            </span>
                                        </p>
                                    </div>
                                    <div className='col-sm-3 d-flex justify-content-end' style={{ alignItems: 'center', textAlign: 'right' }}>
                                        <b>
                                            {offer} ETH
                                        </b>
                                    </div>
                                </div>
                            </span>
                            <div className='card' style={{ marginTop: '30px' }}>
                                <div className='card-body'>
                                    <div className='d-flex'>
                                        <p className='mr-auto'>
                                            <span className='material-icons-outlined'>
                                                account_balance_wallet
                                            </span> Balance
                                        </p>
                                        <p className='d-flex justify-content-end'>
                                            {auth.userArray['balance']} ETH
                                        </p>
                                    </div>
                                    <div className='d-flex'>
                                        <p className='mr-auto'>
                                            Floor price
                                        </p>
                                        <p className='d-flex justify-content-end'>
                                            {assets.price} ETH
                                        </p>
                                    </div>
                                    <div className='d-flex'>
                                        <p className='mr-auto'>
                                            Best offer
                                        </p>
                                        <p className='d-flex justify-content-end'>
                                            {auth.userArray['balance']} ETH
                                        </p>
                                    </div>
                                </div>
                            </div>
                            <form onSubmit={makeOfferNow}>
                                <div className='form-group'>
                                    <input type="text" placeholder='Price' className='form-control' style={{ marginTop: '30px', marginBottom: '15px' }} name='price' value={offerPrice} onChange={changeOffer} />
                                    <small style={{ color: 'red' }}>
                                        {
                                            (isError ? (
                                                <>
                                                    <span className="material-icons-outlined" style={{ fontSize: '15px' }}>
                                                        error
                                                    </span>
                                                    {priceError}
                                                </>
                                            ) : null)
                                        }
                                    </small>
                                    <label htmlFor='duration'>
                                        Duration
                                    </label>
                                    <select id="duration" className="form-select my-1 mr-sm-2" onSelect={(e) => setDuration(e.target.value)}>
                                        <option selected>Choose...</option>
                                        <option value={12}>12 hours</option>
                                        <option value={24}>1 day</option>
                                        <option value={72} selected >3 days</option>
                                        <option value={168}>7 day</option>
                                        <option value={730}>1 month</option>
                                        <option value={2190}>3 months</option>
                                    </select>
                                </div>

                                <button style={{ marginTop: '20px' }} name="submit" className={makeOffer ? "d-none" : "btn btn-primary btn-lg w-100"} disabled="disabled" >
                                    Make Offer
                                </button>
                                <button style={{ marginTop: '20px' }} name="submit" className={makeOffer ? "btn btn-primary btn-lg w-100" : "d-none"}>
                                    Make Offer
                                </button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </>

    )
}

export default Collection
