import React from 'react';
import Shimmer from './Shimmer';
import SkeletonElement from './SkeletonElement';

const SkeletonProduct = ({ theme }) => {
    const themeClass = theme || 'light'

    return (
        <>
            <div className={`skeleton-wrapper ${themeClass}`}>
                <div className="skeletonCard pro">
                                <SkeletonElement type="thumbnail" />
                                <SkeletonElement type="title" />
                                <SkeletonElement type="text" />
                                <SkeletonElement type="text" />
                                <SkeletonElement type="text" />
                                <SkeletonElement type="text" />
                            </div>
                <Shimmer />
            </div>
        </>
    )
}

export default SkeletonProduct;