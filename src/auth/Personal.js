/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react';
import './account.css';
import { Link, useLocation, useParams } from 'react-router-dom';
import { Noitem } from './parts/Noitem';
import { NotificationContainer } from 'react-notifications';
import 'react-notifications/lib/notifications.css';
import { useCreate } from './parts/Created';

const Personal = () => {
  let { username } = useParams();

  const teyOut = useCreate()
  const [collected, setCollected] = useState(false)
  const [collects, setCollects] = useState(false);
  const [creations, setCreations] = useState(false);
  const [created, setCreated] = useState(false)
  const [userArray, setUserArray] = useState([]);

  const search = useLocation().search;
  const tab = new URLSearchParams(search).get("tab");

  useEffect(() => {
    fetchTabData();
    return console.log("account page loaded!!");
  }, [tab])

  const fetchTabData = () => {
    if ((tab === "collected") || (tab === null)) {
      setCollected(true);
    } else {
      setCollected(false);
    }

    if (tab === "created") {
      setCreated(true);
    } else {
      setCreated(false);
    }

    fetch(`${auth.api}mycollected?api_token=aedimvoenbevcunoijinanoernoimijoinenvuinncozIjecvniuzndk&username=${username}`)
      .then((res) => res.json())
      .then((res) => {
        if (res.code === '00') {
          if (res.data !== '') {
            setCollects(res.data)
          } else {
            setCollects(null)
          }
        } else {
          setCollects(null)
        }
      })
      .catch((err) => {
        setCollects(null)
      })

    fetch(`${auth.api}mycreations?api_token=aedimvoenbevcunoijinanoernoimijoinenvuinncozIjecvniuzndk&username=${username}`)
      .then((res) => res.json())
      .then((res) => {
        if (res.code === '00') {
          if (res.data !== '') {
            setCreations(res.data);
          } else {
            setCreations(null)
          }
        } else {
          setCreations(null)
        }
      })
      .catch((err) => {
        setCreations(null)
      })
  }

  useEffect(() => {
    document.title = `${username} | Rehomax`;
    fetch(`${auth.api}user_data?api_token=aedimvoenbevcunoijinanoernoimijoinenvuinncozIjecvniuzndk&username=${username}`)
      .then((response) => response.json())
      .then((response) => {
        if (response.code === '00') {
          setUserArray(response.user[0]);
        } else {
          setUserArray([])
        }
      })
    return console.log("Here");
  }, [tab]);

  return (
    <div>
      <NotificationContainer />
      <section className="hero has-background-grey-light is-medium " style={{ position: 'relative', backgroundImage: `url(${userArray['profile_banner']})`, backgroundSize: 'cover', backgroundPosition: 'center' }}>
        <div className="hero-body link">
          <div className="container">
          </div>
        </div>
        <div className="floating-image" style={{ borderRadius: '25px', backgroundImage: `url(${userArray['profile_image']})`, backgroundSize: 'cover', backgroundPosition: 'center' }}>
        </div>
      </section>
      <section className="container">
        <div className="sectionMargin" ></div>
        <div className="firstLine">
          <h1 className="accountUsername">
            {username}
          </h1>
          <div className="sectionMargin" ></div>
          <div className="row">
            <div className="col-sm-12 col-md-11">
              <div className="row card-columns justify-content-space-between align-items-start" style={{ justifyContent: 'space-between', textAlign: 'left', flexWrap: 'wrap' }}>
                <div className='col-6 col-sm-5 col-md-3' title="Floor Price">
                  <div style={{ marginBottom: '15px' }}>
                    <h5 style={{ textTransform: 'uppercase', fontFamily: 'monospace', color: 'black' }}>
                      <b>
                        Floor Price
                      </b>
                    </h5>
                    <p>
                      {userArray['floorPrice']}ETH
                    </p>
                  </div>
                </div>
                <div className='col-6 col-sm-5 col-md-3' title="Gas Price">
                  <div style={{ marginBottom: '15px' }}>
                    <h5 style={{ textTransform: 'uppercase', fontFamily: 'monospace', color: 'black' }}>
                      <b>
                        Gas Price
                      </b>
                    </h5>
                    <p>
                      {userArray['gasPrice']}ETH
                    </p>
                  </div>
                </div>
                <div className='col-6 col-sm-5 col-md-3' title="Gas Price">
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
                <div className='col-6 col-sm-5 col-md-3' title="Gas Price">
                  <div style={{ marginBottom: '15px' }}>
                    <h5 style={{ textTransform: 'uppercase', fontFamily: 'monospace', color: 'black' }}>
                      <b>
                        Collected
                      </b>
                    </h5>
                    <p>
                      {collects.length}
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
            <Link to={`/account/${username}?tab=collected`} className={`${collected ? 'active' : "null"} nav-link`} id="nav-collected-tab" >Collected</Link>
            <Link to={`/account/${username}?tab=created`} className={`${created ? 'active' : "null"} nav-link`} id="nav-created-tab">Created </Link>
          </div>
        </nav>
        <div className="tab-content" id="nav-tabContent">
          <div className={`${collected ? 'show active' : "null"} tab-pane fade`} id="nav-collected">
            {collects ? (teyOut.Visitor(collects)) : (
              <Noitem />
            )}
          </div>
          <div className={`${created ? 'show active' : "null"} tab-pane fade`} id="nav-created">
            {creations ? (teyOut.Visitor(creations)) : (
              <Noitem />
            )}
          </div>
        </div>
        <div className="sectionMargin"></div>
        <div className="sectionMargin" style={{ height: '100px' }}></div>
      </section>
    </div>
  )
}

export default Personal
