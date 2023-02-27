/**
    * @description      : 
    * @author           : Olaolumide
    * @group            : 
    * @created          : 19/02/2023 - 07:58:34
    * 
    * MODIFICATION LOG
    * - Version         : 1.0.0
    * - Date            : 19/02/2023
    * - Author          : Olaolumide
    * - Modification    : 
**/
/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import logo from "../../logo.svg";
import "./Nav.css";
import Art from '../../images/art-light.svg'
import Music from '../../images/music-light.svg'
import Collectibles from '../../images/collectibles-light.svg'
import Photography from '../../images/photography-category-light.svg'
import Utility from '../../images/utility-light.svg'
import Sports from '../../images/sports-light.svg'
import VirtualWorlds from '../../images/virtual-worlds-light.svg'
import { useAuth } from "../../auth/Auth";
import Eth from '../../images/eth.png';
import { NotificationContainer, NotificationManager } from 'react-notifications';
import Preloader from "../../Preloader";

const Nav = () => {
    const auth = useAuth();
    const [navbar, setNavbar] = useState(false);
    const [explore, setExplore] = useState(false);
    const [stats, setStats] = useState(false);
    const [resources, setResources] = useState(false);
    const [menuvisible, setMenuVisible] = useState(false);
    const [walletvisible, setWalletVisible] = useState(false);
    const [cartvisible, setCartVisible] = useState(false);
    const [buttonDisabled, setButtonDisabled] = useState();
    const [miniSearch, setMiniSearch] = useState(false);
    const [results, setResults] = useState('');
    const [isLoading, setIsLoading] = useState(true);

    const [username, setUsername] = useState();
    const [password, setPassword] = useState();
    const [usernameError, setUsernameError] = useState();
    const [passwordError, setPasswordError] = useState();
    const [loginError, setLoginError] = useState();
    const [query, setQuery] = useState("");
    const [searchAssets, setSearchAssets] = useState([]);
    const [searchMembers, setSearchMembers] = useState([]);

    // const [cartRes, setCartRes] = useState([]);
    const location = useLocation();

    useEffect(() => {
        return () => {
            setExplore(false);
            setMenuVisible(false);
            setWalletVisible(false);
            setCartVisible(false);
            setStats(false);
            setResources(false);
            setNavbar(false);
            setResults('');
            setQuery('');
            setSearchAssets([]);
            setSearchMembers([]);
            setMiniSearch(false);
            auth.userData();
            auth.cartData();
            // setCartRes(auth.cartArray);
            window.scrollTo(0, 0);
            setIsLoading(false);
        }
    }, [location.pathname])

    const changeBackground = () => {
        if (window.scrollY >= 50) {
            setNavbar(true);
        } else {
            if (menuvisible) {
                setNavbar(true);
            } else if (cartvisible) {
                setNavbar(true)
            } else if (walletvisible) {
                setNavbar(true)
            } else {
                setNavbar(false);
            }
        }
    }

    window.addEventListener('scroll', changeBackground);

    const showExplore = (event) => {
        if (explore) {
            setExplore(false);
        } else {
            setExplore(true);
        }
    }

    const showStats = (event) => {
        if (stats) {
            setStats(false);
        } else {
            setStats(true);
        }
    }

    const showResources = (event) => {
        if (resources) {
            setResources(false);
        } else {
            setResources(true);
        }
    }

    const handleQuery = (event) => {
        setQuery(event.target.value);
        let hotQuery = event.target.value;
        if (hotQuery.length >= 3) {
            setResults('loading');
            searchDB(hotQuery);
        } else {
            setResults('')
        }
    }

    const searchDB = (hotQuery) => {
        setIsLoading(true);
        fetch(`${auth.api}search?api_token=aedimvoenbevcunoijinanoernoimijoinenvuinncozIjecvniuzndk&q=${hotQuery}`)
            .then((res) => res.json())
            .then((res) => {
                if (res.code === "00") {
                    setResults("00")
                    setSearchAssets(res.data.assets)
                    setSearchMembers(res.data.members)
                } else {
                    setResults("empty");
                }
                setIsLoading(false);
            })
            .catch((err) => {
                setResults("error");
                setIsLoading(false);
            })
    }

    const clearQuery = (event) => {
        setQuery("");
        setResults("");
    }

    const toggleMenu = (event) => {
        event.preventDefault()
        if (menuvisible) {
            setMenuVisible(false)
            if (window.scrollY <= 50) {
                setNavbar(false);
            }
            if (walletvisible) {
                setWalletVisible(false)
            }
        } else {
            setMenuVisible(true);
            if (window.scrollY <= 50) {
                setNavbar(true);
            }
        }
    }

    const toggleWallet = (event) => {
        event.preventDefault()
        if (walletvisible) {
            setWalletVisible(false)
            if (window.scrollY <= 50) {
                setNavbar(false);
            }
        } else {
            setWalletVisible(true);
            if (window.scrollY <= 50) {
                setNavbar(true);
            }
        }
    }

    const toggleCart = (event) => {
        event.preventDefault()
        if (cartvisible) {
            setCartVisible(false)
        } else {
            setCartVisible(true);
        }
    }

    const toogleSearch = () => {
        if (miniSearch === false) {
            setMiniSearch(true);
        } else {
            setMiniSearch(false);
            setResults('');
            setQuery('')
        }
    }

    const handleLogout = () => {
        auth.logout();
    }

    const validateUsername = (username, password) => {
        if (username.includes('@')) {
            setUsernameError('invalid username');
            return false;
        }

        if (!username) {
            setUsernameError('Name cannot be blank');
            return false
        }

        setUsernameError(null);
        return true;
    }

    const validatePassword = (password) => {
        if (!password) {
            setPasswordError('Password cannot be blank');
            return false
        }

        if (password.length < 8) {
            setPasswordError('Minimum password length is 8');
            return false;
        }

        setPasswordError(null)
        return true;
    }

    const handleLogin = (event) => {
        event.preventDefault();
        setIsLoading(true);
        setButtonDisabled(true);
        const username = event.target.elements.username.value;
        const password = event.target.elements.password.value;
        setLoginError(null);

        const isUserValid = validateUsername(username);
        const isPassValid = validatePassword(password);
        if (isUserValid && isPassValid) {
            fetch(`${auth.api}welcome?api_token=aedimvoenbevcunoijinanoernoimijoinenvuinncozIjecvniuzndk&username=${username}&password=${password}`)
                .then((response) => response.json())
                .then((response) => {
                    if (response.code === '00') {
                        auth.login(username);
                        setButtonDisabled(null);
                        setIsLoading(false);
                    } else {
                        setLoginError(response.message);
                        setButtonDisabled(null);
                        setIsLoading(false);
                    }
                })
                .catch((err) => {
                    setLoginError(err.message);
                    setButtonDisabled(null);
                    setIsLoading(false);
                })
        } else {
            setButtonDisabled(null);
        }
    }

    const reduceCart = (uid) => {
        NotificationManager.info("Removing from cart", "Cart");
        setIsLoading(true)
        fetch(`${auth.api}reduce_cart?api_token=aedimvoenbevcunoijinanoernoimijoinenvuinncozIjecvniuzndk&username=${auth.user}&uid=${uid}`)
            .then((response) => response.json())
            .then((response) => {
                auth.cartData();
                NotificationManager.success("Removed from cart", "Cart")
                setIsLoading(false);
            })
            .catch((err) => {
                auth.cartData();
            })
    }

    const clearCart = () => {
        setIsLoading(true)
        fetch(`${auth.api}clear_cart?api_token=aedimvoenbevcunoijinanoernoimijoinenvuinncozIjecvniuzndk&username=${auth.user}`)
            .then((response) => response.json())
            .then((response) => {
                auth.cartData();
                auth.userData();
                setIsLoading(false);
            })
            .catch((err) => {
                auth.cartData();
            })
    }

    const validatePurchase = (cost) => {
        setIsLoading(true);
        fetch(`${auth.api}buyNow?api_token=aedimvoenbevcunoijinanoernoimijoinenvuinncozIjecvniuzndk&username=${auth.user}&cost=${cost}`)
            .then((response) => response.json())
            .then((response) => {
                if (response.code === "00") {
                    auth.cartData();
                    auth.userData();
                    setIsLoading(false);
                    NotificationManager.success("Purchase complete");
                } else {
                    setIsLoading(false);
                    NotificationManager.success(response.message);
                }
            })
            .catch((err) => {
                auth.cartData();
                setIsLoading(false);
            })
    }

    return (
        <>
            <NotificationContainer />
            {isLoading ? (
                <>
                    <Preloader />
                </>
            ) : null}
            <section>
                <div className={miniSearch ? "d-block" : "d-none"} style={{ width: '100%', height: '60px' }}></div>
                <nav className={miniSearch ? "navbar active is-fixed-top mt-0" : "d-none"}>
                    <div className="mr-4">
                        <Link className="d-block" onClick={toogleSearch}>
                            <span className="material-icons-outlined" style={{ padding: '11px' }} >
                                arrow_back_ios
                            </span>
                        </Link>
                    </div>
                    <div className="search-input" style={{ width: '85%' }}>
                        <input
                            type="text"
                            name="query"
                            placeholder="Search items, collections, and accounts"
                            onChange={handleQuery}
                            value={query}
                        />
                    </div>
                </nav>
                <div className={navbar ? "d-block" : "d-none"} style={{width: '100%', height: '75px' }}></div>
                <nav
                    className={`${miniSearch ? "is-really-hidden" : null} ${navbar ? "navbar is-fixed-top mt-0 p-0" : "navbar is-transparent mt-0 p-0"}`}
                    role="navigation"
                    aria-label="main navigation"
                >
                    <div className="navbar-brand">
                        <Link to="/" className="navbar-item">
                            <img src={logo} width="40" height="40" alt="alt" />
                            <span className="navbar-title">Rehomax</span>
                        </Link>
                    </div>

                    <div id="navbarBasicExample" className="navbar-menu show1023 is-transparent">
                        <div id="navbar-search" className="navbar- main-search show1023 hid599">
                            <div className="search-box bit-rounded bordered reho-border">
                                <div className="search-icon is-hoverable">
                                    <span className="material-icons-outlined ft-20">
                                        search
                                    </span>
                                </div>
                                <div className="search-input">
                                    <input
                                        type="text"
                                        name="query"
                                        placeholder="Search items, collections, and accounts"
                                        onChange={handleQuery}
                                        value={query}
                                    />
                                </div>
                                <div className="search-cancel is-delete is-hoverable">
                                    <span className={query ? "material-icons-outlined ft-20 text-danger" : "material-icons-outlined ft-20 boxed-close"} onClick={clearQuery}>
                                        {query ? "close" : "/"}
                                    </span>
                                </div>
                            </div>
                        </div>
                        <div className="navbar-end">
                            <div className="navbar-item has-dropdown is-hoverable hid1200">
                                <Link className="navbar-link is-arrowless">
                                    Explore
                                </Link>

                                <div className="navbar-dropdown">
                                    <Link to="/category/art" className="navbar-item">
                                        <span className="navbarDropImage" style={{ backgroundImage: `url(${Art})` }}></span>Art
                                    </Link>
                                    <Link to="/category/collectibles" className="navbar-item">
                                        <span className="navbarDropImage" style={{ backgroundImage: `url(${Collectibles})` }}></span>Collectibles
                                    </Link>
                                    <Link to="/category/music" className="navbar-item">
                                        <span className="navbarDropImage" style={{ backgroundImage: `url(${Music})` }}></span>Music
                                    </Link>
                                    <Link to="/category/photography" className="navbar-item">
                                        <span className="navbarDropImage" style={{ backgroundImage: `url(${Photography})` }}></span>Photography
                                    </Link>
                                    <Link to="/category/sports" className="navbar-item">
                                        <span className="navbarDropImage" style={{ backgroundImage: `url(${Sports})` }}></span>Sports
                                    </Link>
                                    <Link to="/category/utility" className="navbar-item">
                                        <span className="navbarDropImage" style={{ backgroundImage: `url(${Utility})` }}></span>Utility
                                    </Link>
                                    <Link to="/category/virtualWorlds" className="navbar-item">
                                        <span className="navbarDropImage" style={{ backgroundImage: `url(${VirtualWorlds})` }}></span>Virtual Worlds
                                    </Link>
                                </div>
                            </div>

                            <Link to="" className="d-none navbar-item hid1200">
                                Drops
                            </Link>

                            <div className=" d-none navbar-item has-dropdown is-hoverable hid1200">
                                <Link to="/rankings" className="navbar-link is-arrowless">
                                    Stats
                                </Link>
                                <div className="navbar-dropdown">
                                    <Link to="/rankings" className="navbar-item">
                                        Rankings
                                    </Link>
                                    <Link to="/activity" className="navbar-item">
                                        Activity
                                    </Link>
                                </div>
                            </div>

                            <div className="d-none navbar-item has-dropdown is-hoverable hid1200">
                                <Link to="" className="navbar-link is-arrowless">
                                    Resources
                                </Link>

                                <div className="navbar-dropdown">
                                    <Link to="/assets" className="navbar-item">
                                        Learn
                                    </Link>
                                    <Link to="/category/art" className="navbar-item">
                                        Help Center
                                    </Link>
                                    <Link to="/category/collectibles" className="navbar-item">
                                        Platform status
                                    </Link>
                                    <Link to="/category/domainNames" className="navbar-item">
                                        Partners
                                    </Link>
                                    <Link to="/category/music" className="navbar-item">
                                        Taxes
                                    </Link>
                                    <Link to="/category/photography" className="navbar-item">
                                        Blog
                                    </Link>
                                    <Link to="/category/sports" className="navbar-item">
                                        Docs
                                    </Link>
                                    <Link to="/category/tradingCards" className="navbar-item">
                                        Newsletter
                                    </Link>
                                </div>
                            </div>

                            <div className="navbar-item navbar-icon has-dropdown is-hoverable hid1023">
                                <Link to="/account" className="navbar-link navbar-icon is-arrowless" title="Account">
                                    {!auth.isLoggedIn ? (
                                        <span className="material-icons-outlined">
                                            account_circle
                                        </span>
                                    ) : (
                                        <img src={auth.userArray['profile_image']} alt="P" className="navPro" />
                                    )}
                                </Link>

                                <div className="navbar-dropdown">
                                    <Link to="/account" className="navbar-item">
                                        <span className="material-icons-outlined" style={{ color: 'lightblue' }}>
                                            person
                                        </span>Profile
                                    </Link>
                                    <Link to="/account?tab=collected" className="navbar-item">
                                        <span className="material-icons-outlined" style={{ color: 'darkslateblue' }}>
                                            grid_on
                                        </span>My Collections
                                    </Link>
                                    <Link to="/asset/create" className="navbar-item">
                                        <span className="navbarDropImage material-icons-outlined" style={{ color: 'darkslategrey' }}>
                                            edit
                                        </span>
                                        Create
                                    </Link>
                                    <Link to="/withdraw" className={auth.isLoggedIn ? "navbar-item" : "d-none"}>
                                        <span className="material-icons-outlined" style={{ color: 'green' }}>
                                            payments
                                        </span>Withdraw
                                    </Link>
                                    <Link onClick={handleLogout} className={auth.isLoggedIn ? "navbar-item" : "d-none"}>
                                        <span className="material-icons-outlined" style={{ color: 'red' }}>
                                            logout
                                        </span>Logout
                                    </Link>
                                    <Link onClick={auth.changeMode} className="navbar-item">
                                        <span className="material-icons-outlined" style={{ color: 'red' }}>
                                            dark_mode
                                        </span>
                                        Night Mode
                                    </Link>
                                </div>
                            </div>

                            <Link to="" className="navbar-item navbar-icon hid1023" title="Wallet" onClick={toggleWallet}>
                                <span className="material-icons-outlined">
                                    account_balance_wallet
                                </span>
                            </Link>

                            <Link to="" className="navbar-item navbar-icon show599" onClick={toogleSearch}>
                                <span className="material-icons-outlined">
                                    search
                                </span>
                            </Link>

                            <Link to="" className="navbar-item navbar-icon" title="Cart" onClick={toggleCart}>
                                <span className={(auth.cartLength === 0) ? "d-none" : ("actBadge badge badge-primary")}>
                                    {auth.cartLength}
                                </span>
                                <span className="material-icons-outlined">
                                    shopping_cart
                                </span>
                            </Link>

                            <Link
                                onClick={toggleMenu}
                                className="nav-burger navbar-item">
                                <span className="material-icons-outlined">
                                    {menuvisible ? "close" : "menu"}
                                </span>
                            </Link>
                        </div>
                    </div>
                </nav>
                <div className={(results !== '') ? "searchResults" : "d-none"}>
                    {(results === '') ? "" : (
                        <>
                            {(results === 'loading') ? (
                                <>
                                    <div className="w-100 text-center">
                                        <i className="fa fa-cog fa-spin fa-3x"></i>
                                    </div>
                                </>
                            ) : (
                                <>
                                    {(results === 'error') ? (
                                        <>
                                            <div className="w-100 text-center not-found">
                                                <span className="material-icons-outlined" style={{ color: 'red' }}>
                                                    feedback
                                                </span>
                                                &nbsp;&nbsp;&nbsp;
                                                Sorry, &nbsp; Query error!
                                            </div>
                                        </>
                                    ) : (
                                        <>
                                            {(results === 'empty') ? (
                                                <>
                                                    <div className="w-100 text-center not-found" >
                                                        <span className="material-icons-outlined" style={{ color: 'red' }}>
                                                            notification_important
                                                        </span>
                                                        &nbsp;&nbsp;&nbsp;
                                                        No match found!
                                                    </div>
                                                </>
                                            ) : (
                                                <ul className="nav">
                                                    {(searchAssets === []) ? null : (
                                                        <>
                                                            {
                                                                searchAssets.map((asset) => (
                                                                    <li className="menu-item" key={asset.id}>
                                                                        <Link to={`/account/${asset.uid}`} onClick={toogleSearch} className="menu-link" style={{ textTransform: 'capitalize' }}>
                                                                            <span className="material-icons-outlined rounded" style={{ backgroundImage: `url(${asset.image})`, color: 'darkseagreen', width: '40px', height: '40px', backgroundSize: 'cover', backgroundPosition: 'center', backgroundRepeat: 'no-repeat' }}></span>
                                                                            &nbsp;&nbsp;&nbsp;
                                                                            {asset.name}
                                                                        </Link>
                                                                    </li>
                                                                ))
                                                            }
                                                        </>
                                                    )}
                                                    {(searchMembers === []) ? null : (
                                                        <>
                                                            {
                                                                searchMembers.map((member) => (
                                                                    <li className="menu-item" key={member.id}>
                                                                        <Link to={`/account/${member.username}`} onClick={toogleSearch} className="menu-link" style={{ textTransform: 'capitalize' }}>
                                                                            <span className="material-icons-outlined rounded" style={{ backgroundImage: `url(${member.profile_image})`, color: 'darkseagreen', width: '40px', height: '40px', backgroundSize: 'cover', backgroundPosition: 'center', backgroundRepeat: 'no-repeat' }}></span>
                                                                            &nbsp;&nbsp;&nbsp;
                                                                            {member.username}
                                                                        </Link>
                                                                    </li>
                                                                ))
                                                            }
                                                        </>
                                                    )}
                                                </ul>
                                            )}
                                        </>
                                    )}
                                </>
                            )}
                        </>
                    )}
                </div>

                {/* Mobile menu starts */}

                <div className={menuvisible ? "topSpace" : "d-none"}></div>
                <div className={menuvisible ? "d-block tabletMenu" : "d-none"}>
                    <div className="menuContent">
                        <ul className="nav">
                            <li className={`menu-item ${stats ? 'd-none' : 'd-block'} ${resources ? 'd-none' : 'd-block'}`}>
                                <Link className="menu-link" onClick={showExplore}>
                                    <span className="material-icons-outlined">
                                        {explore ? "chevron_left" : "explore"}
                                    </span>
                                    <span className="menu-name">
                                        Explore
                                    </span>
                                    <span className="material-icons-outlined">
                                        {explore ? "" : "chevron_right"}
                                    </span>
                                </Link>
                            </li>
                            <div className={`${explore ? 'd-block topBorder' : 'd-none'}`}>
                                <Link to="/category/art" className="menu-drop-item">
                                    <span className="menuDropImage" style={{ backgroundImage: `url(${Art})` }}></span>Art
                                </Link>
                                <Link to="/category/collectibles" className="menu-drop-item">
                                    <span className="menuDropImage" style={{ backgroundImage: `url(${Collectibles})` }}></span>Collectibles
                                </Link>
                                <Link to="/category/music" className="menu-drop-item">
                                    <span className="menuDropImage" style={{ backgroundImage: `url(${Music})` }}></span>Music
                                </Link>
                                <Link to="/category/photography" className="menu-drop-item">
                                    <span className="menuDropImage" style={{ backgroundImage: `url(${Photography})` }}></span>Photography
                                </Link>
                                <Link to="/category/sports" className="menu-drop-item">
                                    <span className="menuDropImage" style={{ backgroundImage: `url(${Sports})` }}></span>Sports
                                </Link>
                                <Link to="/category/utility" className="menu-drop-item">
                                    <span className="menuDropImage" style={{ backgroundImage: `url(${Utility})` }}></span>Utility
                                </Link>
                                <Link to="/category/virtualWorlds" className="menu-drop-item">
                                    <span className="menuDropImage" style={{ backgroundImage: `url(${VirtualWorlds})` }}></span>Virtual Worlds
                                </Link>
                            </div>
                            <li className={`menu-item ${explore ? 'd-none' : 'd-none'} ${stats ? 'd-none' : 'd-block'} ${resources ? 'd-none' : 'd-block'}`}>
                                <Link to="/drops" className="menu-link active">
                                    <span className="material-icons-outlined">
                                        calendar_month
                                    </span>
                                    <span className="menu-name">
                                        Drops
                                    </span>
                                </Link>
                            </li>
                            <li className={`d-none menu-item ${explore ? 'd-none' : 'd-block'} ${resources ? 'd-none' : 'd-block'} ${stats ? 'd-block' : 'd-block'}`}>
                                <Link className="menu-link active" onClick={showStats}>
                                    <span className="material-icons-outlined">
                                        {stats ? "chevron_left" : "bar_chart"}
                                    </span>
                                    <span className="menu-name">
                                        Stats
                                    </span>
                                    <span className="material-icons-outlined">
                                        {stats ? "" : "chevron_right"}
                                    </span>
                                </Link>
                            </li>
                            <div className={`${stats ? 'd-block topBorder' : 'd-none'}`}>
                                <Link to="/ranking" className="menu-drop-item">
                                    Rankings
                                </Link>
                                <Link to="/activity" className="menu-drop-item">
                                    Activity
                                </Link>
                            </div>
                            <li className={`d-none menu-item ${explore ? 'd-none' : 'd-block'} ${stats ? 'd-none' : 'd-block'}`} onClick={showResources}>
                                <Link className="menu-link active">
                                    <span className="material-icons-outlined">
                                        {resources ? "chevron_left" : "library_books"}
                                    </span>
                                    <span className="menu-name">
                                        Resources
                                    </span>
                                    <span className="material-icons-outlined">
                                        {resources ? "" : "chevron_right"}
                                    </span>
                                </Link>
                            </li>

                            <div className={`${resources ? 'd-block topBorder' : 'd-none'}`}>
                                <Link to="/assets" className="menu-drop-item">
                                    Learn
                                </Link>
                                <Link to="/category/art" className="menu-drop-item">
                                    Help Center
                                </Link>
                                <Link to="/category/collectibles" className="menu-drop-item">
                                    Platform status
                                </Link>
                                <Link to="/category/domainNames" className="menu-drop-item">
                                    Patners
                                </Link>
                                <Link to="/category/music" className="menu-drop-item">
                                    Taxes
                                </Link>
                                <Link to="/category/photography" className="menu-drop-item">
                                    Blog
                                </Link>
                                <Link to="/category/sports" className="menu-drop-item">
                                    Docs
                                </Link>
                                <Link to="/category/tradingCards" className="menu-drop-item">
                                    Newsletter
                                </Link>
                            </div>
                            <li className={`menu-item ${explore ? 'd-none' : 'd-block'} ${stats ? 'd-none' : 'd-block'} ${resources ? 'd-none' : 'd-block'}`}>
                                <Link to="/asset/create" className="menu-link active">
                                    <span className="material-icons-outlined" style={{ color: 'darkslategrey' }}>
                                        edit
                                    </span>
                                    <span className="menu-name">
                                        Create
                                    </span>
                                </Link>
                            </li>
                            <li className={`menu-item ${auth.isLoggedIn ? 'd-none' : null} ${explore ? 'd-none' : 'd-block'} ${stats ? 'd-none' : 'd-block'} ${resources ? 'd-none' : 'd-block'}`}>
                                <Link to="/register" className="menu-link active">
                                    <span className="material-icons-outlined">
                                        person_add
                                    </span>
                                    <span className="menu-name">
                                        Register
                                    </span>
                                </Link>
                            </li>
                            <li className={`menu-item ${!auth.isLoggedIn ? 'd-none' : null} ${explore ? 'd-none' : 'd-block'} ${stats ? 'd-none' : 'd-block'} ${resources ? 'd-none' : 'd-block'}`}>
                                <Link to="/account" className="menu-link active">
                                    <span className="material-icons-outlined" style={{ color: 'lightblue' }}>
                                        person
                                    </span>
                                    <span className="menu-name">
                                        Profile
                                    </span>
                                </Link>
                            </li>
                            <li className={`menu-item ${explore ? 'd-none' : 'd-block'} ${auth.isLoggedIn ? "d-block" : "d-none"} ${stats ? 'd-none' : 'd-block'} ${resources ? 'd-none' : 'd-block'}`}>
                                <Link className="menu-link active" onClick={toggleWallet}>
                                    <span className="material-icons-outlined" style={{ color: 'green' }}>
                                        wallet
                                    </span>
                                    Fund Wallet
                                </Link>
                            </li>
                            <li className={auth.isLoggedIn ? "menu-item link" : "d-none"}>
                                <Link to="/withdraw" className="menu-link active" >
                                    <span className="material-icons-outlined" style={{ color: 'green' }}>
                                        payments
                                    </span>
                                    Withdraw
                                </Link>
                            </li>
                            <li onClick={handleLogout} className={auth.isLoggedIn ? "menu-item link" : "d-none"}>
                                <div className="menu-link active" >
                                    <span className="material-icons-outlined" style={{ color: 'red' }}>
                                        logout
                                    </span>Logout
                                </div>
                            </li>
                            <li onClick={toggleWallet} className={!auth.isLoggedIn ? "menu-item link" : "d-none"}>
                                <div className="menu-link active" >
                                    <span className="material-icons-outlined" style={{ color: 'green' }}>
                                        login
                                    </span>Login
                                </div>
                            </li>
                        </ul>
                    </div>
                </div>
                <div className={walletvisible ? "d-block tabletMenu" : "d-none"}>
                    <div className="menuContent">
                        <ul className="nav" >
                            <li className='menu-item'>
                                <Link className={!auth.isLoggedIn ? "menu-link" : "d-none"} style={{ position: 'relative' }}>
                                    <span className="material-icons-outlined">
                                        login
                                    </span>
                                    <span className="menu-name d-flex" style={{ alignItems: 'center', fontFamily: 'monospace', fontSize: '20px' }}>
                                        L O G I N
                                    </span>
                                </Link>
                                <Link className={auth.isLoggedIn ? "menu-link" : "d-none"} onClick={handleLogout} style={{ position: 'relative' }}>
                                    <span className="material-icons-outlined">
                                        logout
                                    </span>
                                    <span className="menu-name d-flex" style={{ alignItems: 'center', fontFamily: 'monospace', fontSize: '20px' }}>
                                        L O G O U T
                                    </span>
                                </Link>
                            </li>
                            <div className={auth.isLoggedIn ? "d-none" : "topBorder walletBody"}>
                                <p style={{ alignItems: 'center', fontFamily: 'monospace', fontSize: '14px', textAlign: 'center' }}>
                                    If you don't have an account, <Link to="/register">create one now.</Link>
                                </p>
                                <br></br>
                                {loginError ? (
                                    <small className="error">
                                        {loginError} <br />
                                    </small>
                                ) : null}
                                <form onSubmit={handleLogin} className="walletList" style={{ padding: '10px' }}>
                                    <div style={{ marginBottom: '20px' }}>
                                        <input className="form-control input" type="text" name="username" value={username} onChange=
                                            {
                                                (e) => {
                                                    setUsername(e.target.value)
                                                    setUsernameError(null)
                                                }
                                            }
                                            placeholder="Username"
                                        />
                                        {usernameError ? (
                                            <small>
                                                {usernameError}
                                            </small>
                                        ) : null}
                                    </div>
                                    <div style={{ marginBottom: '20px' }}>
                                        <input className="form-control input" type="password" name="password" value={password} onChange=
                                            {
                                                (e) => {
                                                    setPassword(e.target.value)
                                                    setPasswordError(null)
                                                }
                                            }
                                            placeholder="Password"
                                        />
                                        {passwordError ? (
                                            <small>
                                                {passwordError}
                                            </small>
                                        ) : null}
                                    </div>
                                    <div style={{ marginBottom: '20px' }}>
                                        <button className="btn btn-primary" disabled={buttonDisabled ? "disabled" : null} style={{ width: '100%' }} type="submit">
                                            {buttonDisabled ? (
                                                <span><span className="fa fa-spinner fa-spin"></span> L O A D I N G</span>
                                            ) : "L O G I N"}
                                        </button>
                                    </div>
                                </form>
                            </div>
                            <div className={!auth.isLoggedIn ? "d-none" : "topBorder walletBody"}>
                                <p style={{ alignItems: 'center', fontFamily: 'monospace', textTransform: 'uppercase', fontSize: '14px', textAlign: 'center' }}>
                                    {auth.user}
                                </p>
                                <br></br>
                                {loginError ? (
                                    <small className="error">
                                        {loginError} <br />
                                    </small>
                                ) : null}
                                <form onSubmit={handleLogin} className="walletList" style={{ padding: '10px' }}>
                                    <div style={{ marginBottom: '20px', textAlign: 'center', fontWeight: '700', fontSize: '20px' }}>
                                        <span style={{ fontWeight: 'normal', fontSize: '12px' }}>Total balance</span><br />
                                        <img src={Eth} alt="ETH" width="30px" height="30px" /> {auth.isLoggedIn ? auth.userArray['balance'] : null}
                                    </div>
                                    <div style={{ marginBottom: '20px' }}>
                                        <Link to="/fund_wallet" className="btn btn-primary" style={{ width: '100%' }} type="button">
                                            A D D  F U N D S
                                        </Link>
                                    </div>
                                </form>
                            </div>
                        </ul>
                    </div>
                </div>
                <div className={cartvisible ? "d-block tabletMenu cart" : "d-none"}>
                    <div className="menuContent">
                        <ul className="cart-nav" style={{ padding: '5px' }}>
                            <li className={`menu-item ${explore ? 'd-none' : 'd-block'} ${resources ? 'd-none' : 'd-block'}`}>
                                <Link className="menu-link active">
                                    <span className="menu-name d-flex" style={{ alignItems: 'center', fontSize: '20px', marginLeft: '25px' }}>
                                        Your cart
                                        <span className="material-icons-outlined" style={{ marginLeft: '10px' }}>
                                            info
                                        </span>
                                    </span>
                                    <span className="material-icons-outlined" style={{ fontSize: '20px' }} onClick={toggleCart}>
                                        close
                                    </span>
                                </Link>
                            </li>
                            <div className={(auth.cartLength !== 0) ? "d-none" : ("topBorder walletBody")}>
                                <p style={{ width: '100%', textAlign: 'center' }}>
                                    Add items to get started!
                                </p>
                                <br></br>
                                <button disabled className="btn btn-primary form-control">
                                    Complete Add to Cart
                                </button>
                            </div>
                            {(auth.cartLength === 0) ? null : (
                                <>
                                    <div className="d-flex">
                                        <div className="mr-auto p-2">
                                            <b>
                                                {auth.cartLength} Item(s)
                                            </b>
                                        </div>
                                        <div className="p-2">
                                            <b onClick={clearCart} className="btn">
                                                Clear All
                                            </b>
                                        </div>
                                    </div>
                                    <ul className="">
                                        {auth.cartArray.map((cart) => (
                                            <>
                                                <li style={{ width: '100%', overflowX: 'hidden', textOverflow: 'ellipsis' }} className="is-hoverable2" key={cart.uid} >
                                                    <Link className="row" style={{ margin: '0' }}>
                                                        <div className="col-3 rounded" style={{ backgroundImage: `url(${cart.image})`, width: '65px', margin: '5px', height: '65px', backgroundSize: 'cover', backgroundPosition: 'center' }}>
                                                        </div>
                                                        <div className="col-9 d-flex" style={{ alignItems: 'center', color: 'black' }}>
                                                            <p className="mr-auto">
                                                                <b style={{ fontFamily: 'monospace' }}>
                                                                    {cart.name}
                                                                </b>
                                                                <small style={{ fontFamily: 'monospace', fontSize: '11px' }}>
                                                                    &nbsp; By {cart.created_by}
                                                                </small> <br />
                                                                Floor Price: {cart.price}ETH
                                                            </p>
                                                            <span className="material-icons-outlined" style={{ fontSize: '20px' }} onClick={(e) => reduceCart(cart.uid)}>
                                                                close
                                                            </span>
                                                        </div>
                                                    </Link>
                                                </li>
                                            </>
                                        ))}
                                        <li style={{ width: '100%', overflowX: 'hidden', textOverflow: 'ellipsis', margin: '10px', color: 'black' }}>
                                            <div class="row justify-content-center" >
                                                <div className="col-4">
                                                    <b>
                                                        TOTAL
                                                    </b>
                                                </div>
                                                <div className="col-4" style={{ textAlign: 'right' }}>
                                                    <b>
                                                        {auth.cartTotal} ETH
                                                    </b>
                                                </div>
                                            </div>
                                        </li>
                                        <li style={{ width: '100%', overflowX: 'hidden', textOverflow: 'ellipsis', fontFamily: 'monospace', margin: '5px' }}>
                                            <div class="row justify-content-center" >
                                                <div className="col-12">
                                                    <b>
                                                        Payment Method
                                                    </b>
                                                </div>
                                                <div className="col-12" style={{ marginTop: '10px', marginBottom: '15px' }}>
                                                    <div class="d-flex">
                                                        <input type="radio" checked name="paymentMethod" value="crypto" /> &nbsp;
                                                        <label for="crypto">
                                                            <img src={Eth} alt="ETH" width="25px"></img> Crypto
                                                        </label>
                                                    </div>
                                                </div>
                                            </div>
                                        </li>
                                    </ul>
                                    <button className="btn btn-primary w-100 mb-3" onClick={(e) => validatePurchase(auth.cartTotal)}>
                                        Complete Purchase
                                    </button>
                                </>
                            )}
                        </ul>
                    </div>
                </div>

                {/* Mobile menu ends */}
            </section>
        </>
    );
};

export default Nav;
