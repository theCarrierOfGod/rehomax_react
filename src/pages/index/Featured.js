/**
    * @description      : 
    * @author           : Olaolumide
    * @group            : 
    * @created          : 18/02/2023 - 15:26:51
    * 
    * MODIFICATION LOG
    * - Version         : 1.0.0
    * - Date            : 18/02/2023
    * - Author          : Olaolumide
    * - Modification    : 
**/
import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../auth/Auth';
import Preloader from '../../Preloader';
import styles from './Index.module.css';

const Featured = () => {
    const auth = useAuth();
    const navigate = useNavigate();
    const [feautured, setFeautured] = useState(null);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        return () => {
            const config = {
                'headers': {
                    'Content-Type': 'text/html'
                }
            }

            const url = `${auth.api}top_asset?api_token=${auth.api_token}`;
            axios
                .get(url, config)
                .then(res => {
                    if (res.data.status === "success") {
                        setFeautured(res.data.data)
                    }
                    setIsLoading(false)
                })
                .catch(err => {
                    setIsLoading(false)
                })
        }
    }, []);

    const goTo = (uid) => {
        navigate(`/collection/${uid}`);
    }
    return (
        <>
            {isLoading ? (
                <Preloader />
            ) : null}
            {
                (feautured !== null) ? (
                    (feautured.length < 10) ? null : (
                        <>
                            <div className="container-fluid">
                                <ul className={styles.hthree}>
                                    Trending Assets
                                </ul>
                                <div className="row justify-content-right  table-responsive">
                                    <div className="col-sm-12 col-md-6 col-lg-6 col-xl-6 d-none d-md-block">
                                        <table className="table table-borderless table-hover">
                                            <thead className=''>
                                                <tr className="feature-header">
                                                    <th>Collection</th>
                                                    <th>Floor price</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {feautured.map((each, index) => (
                                                    (index < 5) ? (
                                                        <>
                                                            <tr key={each.uid} onClick={(e) => goTo(each.uid)} style={{ width: '100%' }} >
                                                                <td className='flex-td'>
                                                                    <span style={{ paddingLeft: '5px', paddingRight: '15px', fontSize: '14px' }}>
                                                                        {index + 1}
                                                                    </span>
                                                                    <div className="rounded trend-img"
                                                                        style={{ backgroundImage: `url(${each.image})` }}></div>
                                                                    <span className="trend-title">
                                                                        {each.name}
                                                                    </span>
                                                                </td>
                                                                <td>
                                                                    {each.price}ETH
                                                                </td>
                                                            </tr>
                                                        </>
                                                    ) : (
                                                        null
                                                    )
                                                ))}
                                            </tbody>
                                        </table>
                                    </div>
                                    <div className="col-sm-12 col-md-6 col-lg-6 col-xl-6 d-none d-md-block">
                                        <table className="table table-borderless table-hover">
                                            <thead className='' >
                                                <tr className="feature-header">
                                                    <th>Collection</th>
                                                    <th>Floor price</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {feautured.map((each, index) => (
                                                    (index >= 5) ? (
                                                        <>
                                                            <tr key={each.uid} onClick={(e) => goTo(each.uid)} style={{ width: '100%' }} >
                                                                <td className='flex-td'>
                                                                    <span style={{ paddingLeft: '5px', paddingRight: '15px', fontSize: '14px' }}>
                                                                        {index + 1}
                                                                    </span>
                                                                    <div className="rounded trend-img"
                                                                        style={{ backgroundImage: `url(${each.image})` }}></div>
                                                                    <span className="trend-title">
                                                                        {each.name}
                                                                    </span>
                                                                </td>
                                                                <td>
                                                                    {each.price}ETH
                                                                </td>
                                                            </tr>
                                                        </>
                                                    ) : (
                                                        null
                                                    )
                                                ))}
                                            </tbody>
                                        </table>
                                    </div>
                                    <div className="col-sm-12 col-md-12 col-lg-6 col-xl-6 d-xs-block d-sm-block d-md-none d-lg-none d-xl-none">
                                        <table className="table table-borderless table-hover">
                                            <thead className=''>
                                                <tr className="feature-header">
                                                    <th>Collection</th>
                                                    <th>Floor price</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {feautured.map((each, index) => (
                                                    <tr key={each.uid} onClick={(e) => goTo(each.uid)} style={{ width: '100%' }} >
                                                        <td className='flex-td'>
                                                            <span style={{ paddingLeft: '5px', paddingRight: '15px', fontSize: '14px' }}>
                                                                {index + 1}
                                                            </span>
                                                            <div className="rounded trend-img"
                                                                style={{ backgroundImage: `url(${each.image})` }}></div>
                                                            <span className="trend-title">
                                                                {each.name}
                                                            </span>
                                                        </td>
                                                        <td>
                                                            {each.price}ETH
                                                        </td>
                                                    </tr>
                                                ))}
                                            </tbody>
                                        </table>
                                    </div>
                                </div>
                            </div>
                        </>
                    )
                ) : (
                    <>

                    </>
                )
            }
        </>
    )
}

export default Featured