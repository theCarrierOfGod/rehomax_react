/**
    * @description      : 
    * @author           : Olaolumide
    * @group            : 
    * @created          : 18/02/2023 - 15:17:31
    * 
    * MODIFICATION LOG
    * - Version         : 1.0.0
    * - Date            : 18/02/2023
    * - Author          : Olaolumide
    * - Modification    : 
**/
/* eslint-disable react-hooks/exhaustive-deps */
import React, { createContext, useContext, useEffect, useState } from "react";

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
    const userLoggedIn = window.localStorage.getItem("username");
    const api = "http://localhost/api/v1/";
    const weblink = 'http://localhost:3000';
    const api_token = 'aedimvoenbevcunoijinanoernoimijoinenvuinncozIjecvniuzndk';
    const [user, setUser] = useState(userLoggedIn);
    const [userArray, setUserArray] = useState([]);
    const [cartArray, setCartArray] = useState();
    const [cartLength, setCartLength] = useState(0);
    const [cartTotal, setCartTotal] = useState(0);
    const [nightMode, setNightMode] = useState(false);
    const [balance, setBalance] = useState(0);
    const [myOffers, setMyOffers] = useState([]);

    const checkLogin = () => {
        if (!userLoggedIn) {
            return false;
        } else {
            return true;
        }
    }

    const [isLoggedIn, setIsLoggedIn] = useState(checkLogin);

    useEffect(() => {
        return () => {
            let span = new Date().getTime();
            let time = window.localStorage.getItem('time');

            if ((span - time) > 86400000) {
                logout()
            }
        }
    }, [])

    const refresh = () => {
        setTimeout(function () {
            window.location.reload();
        }, 5000);
    }

    const redirect = (location) => {
        setTimeout(function (location) {
            window.location.replace(location);
        }, 5000);
    }

    const login = (username) => {
        setUser(username)
        setIsLoggedIn(true);
        window.localStorage.setItem('time', new Date().getTime());
        window.localStorage.setItem('username', username);
        window.location.href = "/account";
    }

    const logout = () => {
        setUser(null);
        setIsLoggedIn(false);
        setUserArray([])
        window.localStorage.removeItem('username');
        window.localStorage.removeItem('time');
    }

    const userData = () => {
        fetch(`${api}user_data?api_token=aedimvoenbevcunoijinanoernoimijoinenvuinncozIjecvniuzndk&username=${user}`)
            .then((response) => response.json())
            .then((response) => {
                if (response.code === '00') {
                    setUserArray(response.user[0]);
                    setBalance(response.user[0].balance)
                } else {
                    setUserArray([])
                }
            })
    }

    const cartData = () => {
        fetch(`${api}cart_data?api_token=aedimvoenbevcunoijinanoernoimijoinenvuinncozIjecvniuzndk&username=${user}`)
            .then((response) => response.json())
            .then((response) => {
                if (response.code === '00') {
                    setCartArray(response.cart);
                    setCartLength(response.thelength);
                    setCartTotal(response.total);
                } else {
                    setCartArray([])
                }
            })
    }

    const changeMode = () => {
        if (nightMode === true) {
            setNightMode(false);
            console.log(nightMode);
        } else {
            setNightMode(true);
            console.log(nightMode);
        }
    }

    const getOffers = (product) => {
        fetch(`${api}getoffers?api_token=aedimvoenbevcunoijinanoernoimijoinenvuinncozIjecvniuzndk&product=${product}`)
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
        <AuthContext.Provider value={{ user, isLoggedIn, api, api_token, weblink, myOffers, getOffers, cartTotal, balance, userArray, changeMode, nightMode, cartArray, refresh, redirect, login, logout, userData, cartData, cartLength }}>
            {children}
        </AuthContext.Provider>
    )
}

export const useAuth = () => {
    return useContext(AuthContext);
}