import React from 'react'
import noImage from '../../images/no-similar-items.svg'

export const Noitem = () => {
    return (
        <div className="text-center" style={{ padding: '50px' }}>
            <img src={noImage} alt="no related items" />
            <p>No items to display</p>
        </div>
    )
}
