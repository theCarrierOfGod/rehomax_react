import React, { createContext, useContext } from "react";
import { NotificationContainer, NotificationManager } from "react-notifications";
import { Link } from 'react-router-dom';
import { useAuth } from "../Auth";
import Eth from '../../images/eth.png';
import './creator.css'
import '../../pages/categories/Category.css';
import styles from './Asset.module.css'

const CreateContext = createContext(null);

export const CreateProvider = ({ children }) => {

    const auth = useAuth();
    const user = auth.user;

    const handleDelete = (uid) => {
        NotificationManager.info("deleting...", "Delete Asset");
        fetch(`${auth.api}delete_asset?api_token=aedimvoenbevcunoijinanoernoimijoinenvuinncozIjecvniuzndk&username=${user}&uid=${uid}`)
            .then((res) => res.json())
            .then((res) => {
                if (res.code === "00") {
                    NotificationManager.success(res.message + " reloading...", "Delete Asset");
                    auth.refresh();
                    auth.userData();
                } else {
                    NotificationManager.error(res.message, "Delete Asset");
                }
            })
            .catch((err) => {
                NotificationManager.error(err, "Delete Asset");
            })
    }

    const handleGasFee = (uid, gasFee) => {
        NotificationManager.info("processing...", "Gas Fee");
        if (auth.userArray['balance'] < gasFee) {
            NotificationManager.error("Insufficient fund", "Gas Fee");
        } else {
            fetch(`${auth.api}pay_gas_fee?api_token=aedimvoenbevcunoijinanoernoimijoinenvuinncozIjecvniuzndk&username=${user}&uid=${uid}`)
                .then((res) => res.json())
                .then((res) => {
                    if (res.code === "00") {
                        NotificationManager.success(res.message + " reloading...", "Gas Fee");
                        setTimeout(function () {
                            window.location.replace("/account?tab=created");
                        }, 2500);
                        auth.userData()
                    } else {
                        NotificationManager.error(res.message, "Gas Fee");
                    }
                })
                .catch((err) => {
                    NotificationManager.error(err, "Gas Fee");
                })
        }
    }

    const Try = (sentArray) => {
        return (
            <div>
                <NotificationContainer />
                <div className="row">
                    {sentArray.map((sentArray) => (
                        <div className="col-lg-4 col-md-6 col-sm-6 col-12" style={{ padding: '10px', }} key={sentArray.id}>
                            <div className={styles.link}>
                                <div className={styles.container}>
                                    <Link to={`/collection/${sentArray.uid}`} className={styles.coverImgContainer}>
                                        <img
                                            className={styles.coverImg}
                                            src={sentArray.image}
                                            alt={sentArray.name}
                                        />
                                    </Link>
                                    <div className={styles.description}>
                                        <div className={styles.imgContainer}>
                                            <img className={styles.img} src={sentArray.image} alt={sentArray.name} />
                                        </div>
                                        <div className={styles.itemNameContainer}>
                                            <h3 className={styles.itemName}>{sentArray.name}</h3>
                                            {sentArray.sold === "yes" ?
                                                (
                                                    <>
                                                        <span className="material-icons-outlined" style={{ lineHeight: '38px', color: 'green' }} title="Sold">
                                                            task_alt
                                                        </span>
                                                    </>
                                                ) : null}
                                            {
                                                (sentArray.gasPaid === "no") ? null : (
                                                    <>
                                                        <span className="material-icons-outlined" title="verified" style={{ color: 'rgb(32, 129, 226)' }}>
                                                            verified
                                                        </span>
                                                    </>
                                                )
                                            }
                                        </div>
                                    </div>
                                    <div style={{ position: 'absolute', bottom: '0', right: '0', zIndex: '2' }}>
                                        {(sentArray.created_by !== auth.user) ? null : (
                                            <>
                                                <Link to={`/asset/edit/${sentArray.uid}`} title="Edit NFT" className="material-icons-outlined btn" style={{ color: 'green' }}>
                                                    edit
                                                </Link>
                                            </>
                                        )}
                                        {(sentArray.gasPaid === "yes") ? null : (
                                            <>
                                                <span className="material-icons-outlined btn" title="Pay Gas Fee" style={{ color: '#6790e8' }} onClick={(e) => { handleGasFee(sentArray.uid, sentArray.gasFee) }} >
                                                    local_gas_station
                                                </span>
                                            </>
                                        )}

                                        <span className="material-icons-outlined btn" onClick={(e) => { handleDelete(sentArray.uid) }} style={{ color: 'red' }}>
                                            delete_forever
                                        </span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

            </div>
        )
    }

    const Cata = (sentArray) => {
        return (
            <div>
                <NotificationContainer />
                <div className="row">
                    {sentArray.map((sentArray) => (
                        <div className="col-lg-3 col-md-6 col-sm-6 col-12" style={{ padding: '10px', }} key={sentArray.id}>
                            <div className="swiper-inner" style={{ backgroundImage: `url(${sentArray.image})`, backgroundSize: 'cover', position: 'relative', backgroundRepeat: 'no-repeat', backgroundPosition: 'center', height: '300px', borderRadius: '15px', border: '2px solid black', overflow: 'hidden' }}>
                                <Link to={`/collection/${sentArray.uid}`} style={{ width: '100%', height: '300px', display: 'flex' }} >
                                    <div className="collectionswipertag" style={{ color: 'lightslategray', fontFamily: 'monospace', fontSize: '14px', textTransform: 'uppercase', fontWeight: '600', paddingTop: '5px', paddingLeft: '7px' }}>
                                        {sentArray.name} - {sentArray.price} <img src={Eth} alt="ETH" width="20px" height="20px" /><br></br>
                                        Creator: {sentArray.created_by}
                                    </div>
                                </Link>
                            </div>
                        </div>
                    ))}
                </div>

            </div>
        )
    }

    const Visitor = (sentArray) => {
        return (
            <div>
                <NotificationContainer />
                <div className="row">
                    {sentArray.map((sentArray) => (
                        <div className="col-lg-4 col-md-6 col-sm-6 col-12" style={{ padding: '10px', }} key={sentArray.id}>
                            <div className={styles.link}>
                                <div className={styles.container}>
                                    <Link to={`/collection/${sentArray.uid}`} className={styles.coverImgContainer}>
                                        <img
                                            className={styles.coverImg}
                                            src={sentArray.image}
                                            alt={sentArray.name}
                                        />
                                    </Link>
                                    <div className={styles.description}>
                                        <div className={styles.imgContainer}>
                                            <img className={styles.img} src={sentArray.image} alt={sentArray.name} />
                                        </div>
                                        <div className={styles.itemNameContainer}>
                                            <h3 className={styles.itemName}>{sentArray.name}</h3>
                                            {(sentArray.gasPaid === "no") ? null : (
                                                <>
                                                    <span className="material-icons-outlined" style={{ color: 'rgb(32, 129, 226)' }}>
                                                        verified
                                                    </span>
                                                </>
                                            )}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

            </div>
        )
    }

    return (
        <CreateContext.Provider value={{ Try, Cata, Visitor }}>
            {children}
        </CreateContext.Provider>
    )
}

export const useCreate = () => {
    return useContext(CreateContext);
}