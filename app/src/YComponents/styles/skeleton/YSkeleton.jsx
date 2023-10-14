import React from 'react';
import './YSkeleton.css'; // 스켈레톤 스타일 파일

function YSkeletonLoader() {
  return (
    <div className="skeleton-container">
      <div className="skeleton-avatar"></div>
      <div className="skeleton-text"></div>
      <div className="skeleton-text"></div>
      <div className="skeleton-button"></div>
    </div>
  );
}

export default YSkeletonLoader;
