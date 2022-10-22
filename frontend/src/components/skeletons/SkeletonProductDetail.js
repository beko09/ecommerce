import React from 'react';
import Shimmer from './Shimmer';
import SkeletonElement from './SkeletonElement';
import {  Row, Col} from 'antd';

const SkeletonProductDetail = ({ theme }) => {
  const themeClass = theme || 'light'

  return (
    <>
    
      
        <Row >
          <Col xs={24} sm={24} md={12} lg={12} xl={12}>
            <div className={`skeleton-wrapper ${themeClass}`}>
            <div className="skeletonProductDetail">
                <SkeletonElement type="thumbnail" />
            </div>
            </div>
          </Col>
            <Col xs={24} sm={24} md={12} lg={12} xl={12}>
              <div className={`skeleton-wrapper ${themeClass}`}>
              <div className="skeletonProductDetail">
                <SkeletonElement type="title" />
                <SkeletonElement type="title" />
                <SkeletonElement type="text" />
                <SkeletonElement type="text" />
                <SkeletonElement type="text" />
                <SkeletonElement type="text" />
                <SkeletonElement type="text" />
              </div>
              </div>
            </Col>
            </Row >
      
      <Shimmer />    
        </>
  )
}

export default SkeletonProductDetail;