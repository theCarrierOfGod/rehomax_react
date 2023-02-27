import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { NotificationContainer, NotificationManager } from 'react-notifications';
import { useAuth } from '../../auth/Auth';

const Withdraw = () => {
    const auth = useAuth();
    const user = auth.user;

    const [amount, setAmount] = useState(null);
    const [funds, setFunds] = useState([]);
    const [fundl, setFundl] = useState(0);
    useEffect(() => {
        document.title = "Withdraw | Rehomax";
        getFunds();
        return console.log("'_'");
    })

    const withDraw = (event) => {
        event.preventDefault();
        let wallet = auth.userData['wallet_address'];
        if (amount === null || amount === 0) {
            NotificationManager.error("specify amount", 'Withdrawal');
        } else {
            axios(`${auth.api}withdraw?api_token=aedimvoenbevcunoijinanoernoimijoinenvuinncozIjecvniuzndk&username=${user}&amount=${amount}&wallet=${wallet}`)
                .then((res) => {
                    if (res.data.code === '00') {
                        NotificationManager.success(res.data.message, 'Withdrawal');
                    } else {
                        NotificationManager.error(res.data.message, 'Withdrawal');
                    }

                })
                .then(auth.userData)
                .catch((err) => {
                    NotificationManager.error(err.message, 'Withdrawal');
                })
        }
    }

    const getFunds = () => {
        axios(`${auth.api}get_withdrawal?api_token=aedimvoenbevcunoijinanoernoimijoinenvuinncozIjecvniuzndk&username=${user}`)
            .then((res) => {
                if (res.data.code === '00') {
                    setFunds(res.data.withdrawals)
                    setFundl(res.data.thelength);
                }
            })
    }
    return (
        <div className="container">
            <NotificationContainer />
            <div className="row justify-content-center">
                <div className="card col-11 col-sm-9 col-md-8" style={{ marginTop: "25px" }}>
                    <div className="card-body" style={{ margin: '10px' }}>
                        <h5 className="card-title" style={{ fontSize: '20px', fontWeight: 'bold', textAlign: "center", fontFamily: "monospace" }}>
                            Withdraw Fundz
                        </h5>
                        <form onSubmit={withDraw}>
                            <div class="form-group">
                                <label for="wallet">Amount</label>
                                <input type="text" class="form-control" value={amount} name="wallet" onChange={(e) => setAmount(e.target.value)} id="wallet" placeholder="Withdrawal Amount" style={{ fontSize: "11px" }} />
                            </div>
                            <button type="submit" class="btn btn-outline-primary form-control">Withdraw</button>
                        </form>
                    </div>
                </div>
                <div className="card col-11 col-sm-9 col-md-8 " style={{ marginTop: "25px" }}>
                    <div className="card-body table-responsive" style={{ margin: '10px' }}>
                        <h5 className="card-title" style={{ fontSize: '18px', fontWeight: 'bold', textAlign: "center", fontFamily: "monospace" }}>
                            Recent Withdrawal
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
                                        <tr key={fund.id} style={{ textTransform: 'uppercase', fontFamily: 'monospace' }}>
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
    )
}

export default Withdraw