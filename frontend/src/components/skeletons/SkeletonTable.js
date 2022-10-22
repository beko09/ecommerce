import React from 'react';
import Shimmer from './Shimmer';
import SkeletonElement from './SkeletonElement';

const SkeletonTable = ({ theme }) => {
    const themeClass = theme || 'light'

    return (
        <>
            <div className={`skeleton-wrapper ${themeClass}`}>
                <div className="skeletonTable">
                                <SkeletonElement type="title" />
                                <SkeletonElement type="text" />
                                <SkeletonElement type="text" />
                                <SkeletonElement type="text" />
                                <SkeletonElement type="text" />
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

export default SkeletonTable;