/**
    * @description      : 
    * @author           : Olaolumide
    * @group            : 
    * @created          : 19/02/2023 - 08:13:36
    * 
    * MODIFICATION LOG
    * - Version         : 1.0.0
    * - Date            : 19/02/2023
    * - Author          : Olaolumide
    * - Modification    : 
**/
/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react';
import { useAuth } from './Auth';
import axios from 'axios';
import './account.css';
import { Link, useLocation } from 'react-router-dom';
import { Noitem } from './parts/Noitem';
import { NotificationContainer, NotificationManager } from 'react-notifications';
import 'react-notifications/lib/notifications.css';
import { useCreate } from './parts/Created';
import Preloader from '../Preloader';

const Account = () => {
  const auth = useAuth();
  const teyOut = useCreate()
  const [uploadingBanner, setUploadingBanner] = useState(false);
  const [uploadingImage, setUploadingImage] = useState(false);
  const [collected, setCollected] = useState(false)
  const [collects, setCollects] = useState('');
  const [creations, setCreations] = useState('');
  const [created, setCreated] = useState(false)
  const [isLoading, setIsLoading] = useState(true);

  const search = useLocation().search;
  const tab = new URLSearchParams(search).get("tab");
  const user = auth.user;
  const [joined, setJoined] = useState('');

  useEffect(() => {
    return () => {
      document.title = `Your profile | Rehomax`;
      fetchTabData();
      const date = new Date().toDateString();
      setJoined(date);
      getCreations();
      getCollections();
    }
  }, [tab])

  const fetchTabData = () => {
    if ((tab === "collected") || (tab === null)) {
      setCollected(true);
      getCollections();
    } else {
      setCollected(false);
    }

    if (tab === "created") {
      setCreated(true);
      getCreations();
    } else {
      setCreated(false);
    }
    auth.userData();
  }

  const getCollections = () => {
    fetch(`${auth.api}mycollected?api_token=${auth.api_token}&username=${user}`)
      .then((res) => res.json())
      .then((res) => {
        if (res.code === '00') {
          if (res.data !== '') {
            setCollects(res.data)
            setIsLoading(false)
          } else {
            setCollects('')
            setIsLoading(false)
          }
        } else {
          setCollects('')
          setIsLoading(false)
        }
      })
      .catch((err) => {
        setCollects('')
        setIsLoading(false)
      })
  }

  const getCreations = () => {
    fetch(`${auth.api}mycreations?api_token=${auth.api_token}&username=${user}`)
      .then((res) => res.json())
      .then((res) => {
        if (res.code === '00') {
          if (res.data !== '') {
            setCreations(res.data);
            setIsLoading(false)
          } else {
            setCreations('')
            setIsLoading(false)
          }
        } else {
          setCreations('')
          setIsLoading(false)
        }
      })
      .catch((err) => {
        setCreations('')
        setIsLoading(false)
      })
  }

  // Uploads
  const fileUpload = (event) => {
    setIsLoading(true)
    const formData = new FormData();
    NotificationManager.info('uploading banner', 'Banner');

    // Update the formData object
    formData.append(
      "banner",
      event.target.files[0],
      event.target.files[0].name
    );

    axios.post(`${auth.api}upload?api_token=${auth.api_token}&username=${user}`, formData)
      .then((res) => {
        setUploadingBanner(false);
        NotificationManager.success('banner uploaded');
        setIsLoading(false)
      })
      .then(auth.userData)
      .catch((err) => {
        setUploadingBanner(false);
        NotificationManager.error('unable to upload banner');
        setIsLoading(false)
      })
  }

  const dpUpload = (event) => {
    setIsLoading(true)
    const formData = new FormData();
    NotificationManager.info('uploading profile image', 'Profile Image');

    // Update the formData object
    formData.append(
      "dp",
      event.target.files[0],
      event.target.files[0].name
    );

    axios.post("https://files.rehomax.com/profile_pictures/upload_image.php?username=" + auth.user, formData)
      .then((res) => {
        setUploadingImage(false);
        NotificationManager.success('uploaded', 'Profile Image');
        setIsLoading(false)
      })
      .then(auth.userData)
      .catch((err) => {
        setUploadingImage(false);
        NotificationManager.error('unable to upload', 'Profile Image');
        setIsLoading(false)
      })
  }

  // Uploads end

  return (
    <div>
      {isLoading ? (
        <>
          <Preloader />
        </>
      ) : null}
      <NotificationContainer />
      <section className="hero has-background-grey-light is-medium " style={{ position: 'relative', backgroundImage: `url(${auth.userArray['profile_banner']})`, backgroundSize: 'cover', backgroundPosition: 'center' }}>
        <div className="hero-body link">
          <div className="container">
            <form className="title text-center" encType="">
              <label htmlFor="banner" onClick={(e) => setUploadingBanner(true)} className={uploadingBanner ? 'd-block' : "null"}>
                <span className="material-icons-outlined" style={{ padding: '30px', background: 'white', borderRadius: '100%' }}>
                  edit
                </span>
              </label>
              <input type="file" id="banner" onChange={fileUpload} value="" accept="image/*" style={{ display: 'none' }} />
            </form>
          </div>
        </div>
        <div className="floating-image" style={{ borderRadius: '25px', backgroundImage: `url(${auth.userArray['profile_image']})`, backgroundSize: 'cover', backgroundPosition: 'center' }}>
          <form className="title image-fl text-center">
            <label htmlFor="dp" onClick={(e) => setUploadingImage(true)} className={`${uploadingImage ? 'd-block' : "null"} dp`}>
              <span className="material-icons-outlined" style={{ padding: '30px', background: 'white', borderRadius: '100%' }}>
                edit
              </span>
            </label>
            <input type="file" id="dp" onChange={dpUpload} value="" accept="image/*" style={{ display: 'none' }} />
          </form>
        </div>
      </section>
      <section className="container">
        <div className="sectionMargin" ></div>
        <div className="firstLine">
          <h1 className="accountUsername">
            {auth.user}
          </h1>
          <span className="accountUsername" style={{ fontWeight: "normal", fontSize: "12px" }}>
            {auth.userArray['wallet_address'] ? (
              <>
                {auth.userArray['wallet_address']}
              </>
            ) : (
              <>
                <Link to="/wallet">Add Wallet</Link>
              </>
            )}
          </span>
          <div className="sectionMargin" ></div>
          <div className="row">
            <div className="col-sm-12 col-md-10">
              <div className="row card-columns justify-content-space-between align-items-start" style={{ justifyContent: 'space-between', textAlign: 'left', flexWrap: 'wrap' }}>
                <div className='col-6 col-sm-5 col-md-4' title="Account Balance">
                  <div style={{ marginBottom: '15px' }}>
                    <h5 style={{ textTransform: 'uppercase', fontFamily: 'monospace', color: 'black' }}>
                      <b>
                        Account Balance
                      </b>
                    </h5>
                    <p>
                      {auth.userArray['balance']}ETH
                    </p>
                  </div>
                </div>
                <div className='col-6 col-sm-5 col-md-4' title={joined}>
                  <div style={{ marginBottom: '15px' }}>
                    <h5 style={{ textTransform: 'uppercase', fontFamily: 'monospace', color: 'black' }}>
                      <b>
                        Joined
                      </b>
                    </h5>
                    <p>
                      {joined}
                    </p>
                  </div>
                </div>
                <div className='col-6 col-sm-5 col-md-4' title="Fund Wallet">
                  <div style={{ marginBottom: '15px' }}>
                    <h5 style={{ textTransform: 'uppercase', fontFamily: 'monospace', color: 'black' }}>
                      <b>
                        Fund Wallet
                      </b>
                    </h5>
                    <p>
                      <Link to="/fund_wallet" target="_blank" style={{ color: 'lightgreen' }}>
                        <span className="material-icons-outlined">
                          add_box
                        </span>
                      </Link>
                    </p>
                  </div>
                </div>
                <div className='col-6 col-sm-5 col-md-4' title="Gas Price">
                  <div style={{ marginBottom: '15px' }}>
                    <h5 style={{ textTransform: 'uppercase', fontFamily: 'monospace', color: 'black' }}>
                      <b>
                        Gas Price
                      </b>
                    </h5>
                    <p>
                      {auth.userArray['gasPrice']}ETH
                    </p>
                  </div>
                </div>
                <div className='col-6 col-sm-5 col-md-4' title="Gas Price">
                  <div style={{ marginBottom: '15px' }}>
                    <h5 style={{ textTransform: 'uppercase', fontFamily: 'monospace', color: 'black' }}>
                      <b>
                        Creations
                      </b>
                    </h5>
                    <p>
                      {creations.length}
                    </p>
                  </div>
                </div>
                <div className='col-6 col-sm-5 col-md-4' title="Floor Price">
                  <div style={{ marginBottom: '15px' }}>
                    <h5 style={{ textTransform: 'uppercase', fontFamily: 'monospace', color: 'black' }}>
                      <b>
                        Floor Price
                      </b>
                    </h5>
                    <p>
                      {auth.userArray['floorPrice']}ETH
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="sectionMargin" ></div>
      </section>
      <section className="container">
        <nav>
          <div className="nav nav-tabs" id="nav-tab" role="tablist">
            <Link to="/account?tab=collected" className={`${collected ? 'active' : "null"} nav-link`} style={{ color: 'black' }} onClick={(e) => setIsLoading(true)} id="nav-collected-tab" >Collected <b style={{ marginLeft: '5px', color: 'black' }}>{(collects.length === 0) ? null : collects.length}</b> </Link>
            <Link to="/account?tab=created" className={`${created ? 'active' : "null"} nav-link`} style={{ color: 'black' }} onClick={(e) => setIsLoading(true)} id="nav-created-tab">Created <b style={{ marginLeft: '5px', color: 'black' }}>{(creations.length === 0) ? null : creations.length}</b> </Link>
          </div>
        </nav>
        <div className="tab-content" id="nav-tabContent">
          <div className={`${collected ? 'show active' : "null"} tab-pane fade`} id="nav-collected">
            {(collects !== '') ? (teyOut.Try(collects)) : (
              <Noitem />
            )}
          </div>
          <div className={`${created ? 'show active' : "null"} tab-pane fade`} id="nav-created">
            {(creations !== '') ? (teyOut.Try(creations)) : (
              <Noitem />
            )}
          </div>
        </div>
        <div className="sectionMargin">

        </div>
      </section>
    </div>
  )
}

export default Account
