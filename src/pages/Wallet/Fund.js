import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { NotificationContainer, NotificationManager } from 'react-notifications';
import { useAuth } from '../../auth/Auth';
import Eth from '../../images/eth.png';
import Qrcode from '../../images/qr_code.jpg';

const Fund = () => {
    const auth = useAuth();
    const user = auth.user;
    const [payone, setPayone] = useState(false);
    const [amount, setAmount] = useState('');
    const [funds, setFunds] = useState([]);
    const [fundl, setFundl] = useState(0);
    useEffect(() => {
        document.title = "Fund Wallet | Rehomax";
        getFunds();
        return console.log("'_'");
    })

    const processPayment = () => {
        NotificationManager.info("Confirming payment", "Fund Wallet")
        if (amount === '0') {
            NotificationManager.error("Amount Error", "Fund Wallet");
        } else {
            let account = auth.userArray['wallet_address'];
            axios(`${auth.api}fund_wallet?api_token=aedimvoenbevcunoijinanoernoimijoinenvuinncozIjecvniuzndk&username=${user}&amount=${amount}&account=${account}`)
                .then((res) => {
                    if (res.data.code === '00') {
                        NotificationManager.success(res.data.message, 'Fund Wallet');
                        setPayone(false);
                        getFunds();
                        setAmount('');
                    } else {
                        NotificationManager.error(res.data.message, 'Fund Wallet');
                    }

                })
                .then(auth.userData)
                .catch((err) => {
                    NotificationManager.error(err.message, 'Fund Wallet');
                })
        }
    }

    const getFunds = () => {
        axios(`${auth.api}get_funds?api_token=aedimvoenbevcunoijinanoernoimijoinenvuinncozIjecvniuzndk&username=${user}`)
            .then((res) => {
                if (res.data.code === '00') {
                    setFunds(res.data.funds)
                    setFundl(res.data.thelength)
                }
            })
    }

    return (
        <>
            <NotificationContainer />
            <div className="container">
                <div className="row justify-content-center">
                    <div className="col-11 col-sm-9 col-md-8">
                        <div className="card">
                            <div className="card-header" style={{ fontFamily: "cursive" }}>
                                Fund Wallet
                            </div>
                            <div className="card-body" style={{ fontFamily: "monospace" }}>
                                <blockquote className="blockquote mb-0">
                                    {(payone === false) ?
                                        (
                                            <div className="input-group mb-2 mr-sm-2">
                                                <div className="input-group-prepend">
                                                    <div className="input-group-text">
                                                        <img src={Eth} alt="ETH" width="30px" height="30px" />
                                                    </div>
                                                </div>
                                                <input type="number" className="form-control" value={amount} onChange={(e) => setAmount(e.target.value)} placeholder="0.00" />
                                                <button type="submit" className="btn btn-success" onClick={
                                                    () => {
                                                        setPayone(true);
                                                    }
                                                } style={{ zIndex: '0' }}>
                                                    Add Fund
                                                </button>
                                            </div>
                                        ) : (
                                            < div className="text-center">
                                                <p>
                                                    Pay {amount} ETH to
                                                </p>
                                                <img src={Qrcode} alt="ETH" width="220px" height="220px" />
                                                <p>
                                                    0x69443834FB692a1Ba712B01B24d955bc0
                                                </p>
                                                <button type="submit" className="btn btn-danger" onClick={() => setPayone(false)}>
                                                    <i class="fa fa-times" aria-hidden="true"></i> Cancel
                                                </button>
                                                &nbsp;&nbsp;
                                                <button type="submit" className="btn btn-success" onClick={processPayment}>
                                                    <i class="fa fa-forward" aria-hidden="true"></i> Confirm
                                                </button>
                                            </div>
                                        )
                                    }
                                </blockquote>
                            </div>
                        </div>
                    </div>
                    <div className="col-11 col-sm-9 col-md-8">
                        <div className="card" style={{ marginTop: "25px" }}>
                            <div className="card-body  table-responsive" style={{ margin: '10px' }}>
                                <h5 className="card-title" style={{ fontSize: '18px', fontWeight: 'bold', textAlign: "center", fontFamily: "monospace" }}>
                                    Recent activities
                                </h5>
                                <table class="table table-striped table-inverse table-responsive">
                                    <thead class="thead-inverse">
                                        <tr>
                                            <th>TRANSACTION ID</th>
                                            <th>AMOUNT</th>
                                            <th>APPROVED</th>
                                            <th>DATE UPDATED</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {(fundl === 0) ? null : funds.map((fund) => (
                                            <>
                                                <tr key={fund.id} style={{ textTransform: 'uppercase', fontFamily: 'monospace'}} >
                                                    <td>{fund.transaction_id}</td>
                                                    <td>{fund.amount} ETH</td>
                                                    <td>{fund.status}</td>
                                                    <td>{fund.created_at}</td>
                                                </tr>
                                            </>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                </div>
            </div >
        </>
    )
}

export default Fund