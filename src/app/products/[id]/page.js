import React from 'react'

const productDetails = ({ params }) => {
    return (
        <div>
            <h2>Details of selected product</h2>
            {params?.id}
        </div>
    )
}

export default productDetails
