import React from 'react';
import "../../styles/loading.css"

const Loading = () => {
  return (
    <div className='Container'>
      <div className='lds-hourglass'>
      </div>
    </div>
  );
};

export default Loading;