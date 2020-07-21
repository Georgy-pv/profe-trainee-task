import React from 'react';
import loaderSrc from '../../../additionalFiles/image/loader.svg';

const Preloader = () => {
    return <div style={{textAlign: 'center'}}><img src={loaderSrc} width='100px' height='100px' /></div>
}

export default Preloader;

