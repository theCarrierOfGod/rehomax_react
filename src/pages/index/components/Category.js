/**
    * @description      : 
    * @author           : Olaolumide
    * @group            : 
    * @created          : 19/02/2023 - 07:57:11
    * 
    * MODIFICATION LOG
    * - Version         : 1.0.0
    * - Date            : 19/02/2023
    * - Author          : Olaolumide
    * - Modification    : 
**/
import React from 'react'
import { Link } from 'react-router-dom'
import style from './Category.module.css';
import ArtImage from '../../../images/art.webp';
import Music from '../../../images/music.webp';
import Collectibles from '../../../images/collectibles.webp';
import Photography from '../../../images/photography-category.webp';
import Utility from '../../../images/utility.webp';
import Sports from '../../../images/sports.webp';
import VirtualWorlds from '../../../images/virtual-worlds.webp';
import styles from '../Index.module.css';

const Category = () => {
    return (
        <div className='container-fluid'>
            <h1 className={styles.hthree}>Browse by Category</h1>
            <div className="row justify-content-center">
                <div className="col-sm-12 col-md-6 col-lg-4" style={{ marginTop: '25px' }}>
                    <Link to="/category/art" className="card">
                        <div className="card-image">
                            <figure className="image is-4by3" style={{ height: 'auto ' }}>
                                <img src={ArtImage} alt="Placeholder" />
                            </figure>
                        </div>
                        <div className={style.cardContent}>
                            <div className="media text-center">
                                <h1 style={{ width: '100%', textAlign: 'center !important', fontWeight: 'bold', fontSize: '18px'}}>Art</h1>
                            </div>
                        </div>
                    </Link>
                </div>
                <div className="col-sm-12 col-md-6 col-lg-4" style={{ marginTop: '25px' }}>
                    <Link to="/category/music"  className="card">
                        <div className="card-image">
                            <figure className="image is-4by3" style={{ height: 'auto ' }}>
                                <img src={Music} alt="Placeholder" />
                            </figure>
                        </div>
                        <div className={style.cardContent}>
                            <div className="media text-center">
                                <h1 style={{ width: '100%', textAlign: 'center !important', fontWeight: 'bold', fontSize: '18px'}}>Music</h1>
                            </div>
                        </div>
                    </Link>
                </div>
                <div className="col-sm-12 col-md-6 col-lg-4" style={{ marginTop: '25px' }}>
                    <Link to="/category/collectibles"  className="card">
                        <div className="card-image">
                            <figure className="image is-4by3" style={{ height: 'auto ' }}>
                                <img src={Collectibles} alt="Placeholder" />
                            </figure>
                        </div>
                        <div className={style.cardContent}>
                            <div className="media text-center">
                                <h1 style={{ width: '100%', textAlign: 'center !important', fontWeight: 'bold', fontSize: '18px'}}>Collectibles</h1>
                            </div>
                        </div>
                    </Link>
                </div>
                <div className="col-sm-12 col-md-6 col-lg-4" style={{ marginTop: '25px' }}>
                    <Link to="/category/photography"  className="card">
                        <div className="card-image">
                            <figure className="image is-4by3" style={{ height: 'auto ' }}>
                                <img src={Photography} alt="Placeholder" />
                            </figure>
                        </div>
                        <div className={style.cardContent}>
                            <div className="media text-center">
                                <h1 style={{ width: '100%', textAlign: 'center !important', fontWeight: 'bold', fontSize: '18px'}}>Photography</h1>
                            </div>
                        </div>
                    </Link>
                </div>
                <div className="col-sm-12 col-md-6 col-lg-4" style={{ marginTop: '25px' }}>
                    <Link to="/category/utility"  className="card">
                        <div className="card-image">
                            <figure className="image is-4by3" style={{ height: 'auto ' }}>
                                <img src={Utility} alt="Placeholder" />
                            </figure>
                        </div>
                        <div className={style.cardContent}>
                            <div className="media text-center">
                                <h1 style={{ width: '100%', textAlign: 'center !important', fontWeight: 'bold', fontSize: '18px'}}>Utility</h1>
                            </div>
                        </div>
                    </Link>
                </div>
                <div className="col-sm-12 col-md-6 col-lg-4" style={{ marginTop: '25px' }}>
                    <Link to="/category/sports"  className="card">
                        <div className="card-image">
                            <figure className="image is-4by3" style={{ height: 'auto ' }}>
                                <img src={Sports} alt="Placeholder" />
                            </figure>
                        </div>
                        <div className={style.cardContent}>
                            <div className="media text-center">
                                <h1 style={{ width: '100%', textAlign: 'center !important', fontWeight: 'bold', fontSize: '18px'}}>Sports</h1>
                            </div>
                        </div>
                    </Link>
                </div>
                <div className="col-sm-12 col-md-6 col-lg-4" style={{ marginTop: '25px' }}>
                    <Link to="/category/virtualWorlds"  className="card">
                        <div className="card-image">
                            <figure className="image is-4by3" style={{ height: 'auto ' }}>
                                <img src={VirtualWorlds} alt="Placeholder" />
                            </figure>
                        </div>
                        <div className={style.cardContent}>
                            <div className="media text-center">
                                <h1 style={{ width: '100%', textAlign: 'center !important', fontWeight: 'bold', fontSize: '18px'}}>Virtual Worlds</h1>
                            </div>
                        </div>
                    </Link>
                </div>
            </div>
        </div>
    )
}

export default Category
