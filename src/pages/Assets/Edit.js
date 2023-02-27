import React, { useEffect, useState } from 'react';
import axios from 'axios';
import styles from './Create.module.css';
import './Create.css';
import { NotificationContainer, NotificationManager } from 'react-notifications';
import { useAuth } from '../../auth/Auth';
import { Link, useParams } from 'react-router-dom';
import Preloader from '../../Preloader';


const Edit = () => {

    let { id } = useParams();

    const auth = useAuth();

    const [name, setName] = useState();
    const [description, setDescription] = useState(null);
    const [price, setPrice] = useState(0.00);
    const [chain, setChain] = useState('ETH');
    const [link, setLink] = useState();
    const [category, setCategory] = useState();
    const [isLoading, setIsLoading] = useState(true);
    const [assets, setAssets] = useState([]);

    const getNft = () => {
        setIsLoading(true);
        axios(`${auth.api}unique_asset?api_token=aedimvoenbevcunoijinanoernoimijoinenvuinncozIjecvniuzndk&uid=${id}`)
            .then((res) => {
                setAssets(res.data.data.collection[0]);
                setIsLoading(false)
                setName(res.data.data.collection[0].name)
                setDescription(res.data.data.collection[0].description)
                setCategory(res.data.data.collection[0].category)
                setPrice(res.data.data.collection[0].price)
            })
            .catch((err) => {
                setIsLoading(false)
            })
    }
    
    useEffect(() => {
        document.title = "Edit NFTs | Rehomax";
        setTimeout(function () {
            setIsLoading(false);
        }, 2000);
        getNft();
        return console.log("edit page loaded!");
    }, [id])

    

    const handleCreate = (event) => {
        setIsLoading(true);
        event.preventDefault();
        if ((name === null) || (price === null) || (chain === null) || (category === null)) {
            NotificationManager.error('Fill all required fields');
            setIsLoading(false)
        } else {
            let formData = new FormData();
            setIsLoading(true)

            formData.append(
                "uid",
                assets.uid
            );
            formData.append(
                "name",
                name,
            );
            formData.append(
                "link",
                link,
            );
            formData.append(
                "description",
                description,
            );
            formData.append(
                "category",
                category,
            );
            formData.append(
                "price",
                price,
            );
            formData.append(
                "blockchain",
                chain,
            );
            formData.append(
                "created_by",
                assets.created_by,
            );
            NotificationManager.info("updating asset ", "Asset", 12500)

            axios.post(`${auth.api}edit_asset?api_token=aedimvoenbevcunoijinanoernoimijoinenvuinncozIjecvniuzndk&username=${auth.user}`, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            })
                .then((res) => {
                    NotificationManager.success(res.data.message, 'Asset');
                    setTimeout(function () {
                        window.location.href = "/account?tab=created";
                    }, 5000);
                    setIsLoading(false)
                })
                .catch((err) => {
                    NotificationManager.error(err.message);
                    setIsLoading(false)
                })
        }
    }

    return (
        <>
            {isLoading ? (<Preloader />) : null}
            <div className="container">
                <NotificationContainer />
                <div className={`row justify-content-center ${(auth.userData['wallet_address'] !== null) ? null : 'd-none'}`}>
                    <div className="col-12 col-sm-10 col-md-9">
                        <div className={`${styles.p20} `}>
                            <h2 className={`${styles.headerText}`}>
                                Edit Item
                            </h2>
                        </div>
                        <div className={`${styles.p20} ${styles.formContainer}`}>
                            <span className="text-danger">*</span> <small className={`${styles.requiredSmall}`}>Required fields</small>
                            <form onSubmit={handleCreate}>
                                <div className="form-group">
                                    <label className={`${styles.requiredSmall} ${styles.label}`} style={{ lineHeight: '35px' }} htmlFor="asset">
                                        <h3 style={{ lineHeight: '35px' }}> Image </h3>
                                        <h4 style={{ lineHeight: '35px' }}>File types supported: JPG, PNG, GIF, SVG. Max size: 5 MB <span className="text-danger">*</span></h4>
                                    </label>
                                    <div className={styles.preview} style={{ textAlign: 'center', width: '250px', height: '257px', overflow: 'hidden', border: '4px dashed grey', borderRadius: '15px' }}>
                                        <div style={{ height: '100%', position: 'relative' }}>
                                            <label htmlFor="asset" style={{ height: '100%' }}>
                                                <img src={assets.image} alt="preview" style={{ inset: '0px', minHeight: '100%', minWidth: '100%' }} />
                                            </label>
                                        </div>
                                    </div>
                                </div>
                                <div className="form-group">
                                    <label htmlFor="name">Name <span className="text-danger">*</span></label>
                                    <input type="text" name="name" id="name" value={name} onChange={(e) => { setName(e.target.value) }} className="form-control" placeholder="Name" aria-describedby="helpId" />
                                    <small className="text-muted"></small>
                                </div>

                                <div className="form-group">
                                    <label htmlFor="link">External link</label> <br />
                                    <small className="text-muted">
                                        Rehomax will include a link to this URL on this item's detail page, so that users can click to learn more about it. You are welcome to link to your own webpage with more details.
                                    </small>
                                    <input type="url" name="link" id="link" value={link} onChange={(e) => setLink(e.target.value)} className="form-control" placeholder="https://yoursite.com/item/123" aria-describedby="helpId" />
                                </div>

                                <div className="form-group">
                                    <label htmlFor="description">Description</label> <br />
                                    <small className="text-muted" id="description">
                                        The description will be included on the item's detail page underneath its image.
                                    </small>
                                    <textarea className="form-control" onChange={(e) => setDescription(e.target.value)}>{description}</textarea>
                                </div>

                                <div className="form-group">
                                    <label htmlFor="category">Category <span className="text-danger">*</span></label> <br />
                                    <small className="text-muted">
                                        This is the category where your item will appear.
                                    </small>
                                    <select name="category" id="category" required className="form-control" value={category} onChange={(e) => setCategory(e.target.value)}>
                                        <option value="">Choose a category</option>
                                        <option value="art">Art</option>
                                        <option value="collectibles">Collectibles</option>
                                        <option value="domainNames">Domain Names</option>
                                        <option value="music">Music</option>
                                        <option value="photography">Photography</option>
                                        <option value="sports">Sports</option>
                                        <option value="tradingCards">Trading Cards</option>
                                        <option value="utility">Utility</option>
                                        <option value="virtualWorlds">Virtual World</option>
                                    </select>
                                </div>

                                <div className="form-group">
                                    <label htmlFor="price">price <span className="text-danger">*</span></label> <br />
                                    <input type="text" name="price" id="price" value={price} onChange={(e) => setPrice(e.target.value)} className="form-control" placeholder="0.00" aria-describedby="helpId" />
                                </div>

                                <div className="form-group">
                                    <label htmlFor="link">Blockchain <span className="text-danger">*</span></label> <br />
                                    <select className="form-control" onChange={(e) => setChain(e.target.value)} value={chain}>
                                        <option value="ETH" defaultValue={chain}> Ethereum</option>
                                    </select>
                                </div>

                                <button type="submit" className="btn btn-primary" >Update</button>
                            </form>
                        </div>
                    </div>
                </div>
                {(auth.userData['wallet_address'] !== null) ? null : (
                    <>
                        <pre>
                            <div className="container-fluid text-center">
                                Please add a valid wallet to proceed! <br /><br />
                                <Link to="/wallet" className="btn btn-secondary">Add Wallet</Link>
                            </div>
                        </pre>
                    </>
                )}
            </div>
        </>
    )
}

export default Edit