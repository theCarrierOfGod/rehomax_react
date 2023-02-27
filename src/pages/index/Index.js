/**
    * @description      : 
    * @author           : Olaolumide
    * @group            : 
    * @created          : 19/02/2023 - 07:55:37
    * 
    * MODIFICATION LOG
    * - Version         : 1.0.0
    * - Date            : 19/02/2023
    * - Author          : Olaolumide
    * - Modification    : 
**/
import React, { useEffect } from 'react';
import styles from './Index.module.css';
import Slide from './components/Slide';
import Notable from './components/Notable';
import Category from './components/Category';
import './featured.css';
import Featured from './Featured.js';

const Index = () => {
    useEffect(() => {
        return () => {
            window.scrollTo(0, 0);
            document.title = `Rehomax, the largest NFT marketplace`;
        }
    }, []);

    return (
        <div>
            <div className={styles.headerBackground}></div>
            <div>
                <h1 className={styles.hone}>Explore, collect, and sell NFTs</h1>
                <Slide />
                <Featured />
                <Notable />
                <Category />
            </div>
        </div >
    )
}

export default Index

