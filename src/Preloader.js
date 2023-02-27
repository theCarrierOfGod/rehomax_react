import React from 'react'
import Pace from 'react-pace-progress'

const Preloader = () => {
    return (
        <span style={{ position: 'fixed', top: '0', left: '0', width: '100%', zIndex: '1000' }} >
            <Pace color="rgb(32, 129, 226)" height={10} />
            <span className="d-none fa material-icons-outlined fa-spin" style={{ color: 'rgb(32, 129, 226)', position: 'fixed', fontSize: '25px', left: '10px', top: '8px' }}>
                settings
            </span>
        </span>
    )
}

export default Preloader