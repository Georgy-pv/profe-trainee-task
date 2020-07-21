import React, { useState } from 'react';
import classes from './Paginator.module.css';

const Paginator = ({totalItemsCount, currentPage, onPageChanged, searchInput, portionSize=10}) => {
    let pageCount = Math.ceil(totalItemsCount / 30);

    let page = [];

    for (var i = 1; i < pageCount; i++) {
        page.push(i);
    }

    let portionCount = Math.ceil(pageCount / portionSize);
    let [portionNumber, setPortionNumber] = useState(1);
    let leftPortionPageNumber = (portionNumber - 1) * portionSize + 1;
    let rightPortionPageNumber = portionNumber * portionSize;


    return (
        <div className={classes.paginator}>
            {portionNumber>1 && 
            <button className={`${classes.btn}, ${classes.btnPrev}`} onClick={()=> {setPortionNumber(portionNumber-1)}}>prev</button>}
            
            {page
                .filter(p => p >= leftPortionPageNumber && p <= rightPortionPageNumber)
                .map(p => {
                    return <span key={p} className={`${classes.page} ${currentPage === p ? classes.selectedPage : ''}`}
                        onClick={() => { onPageChanged(p) }}>{p}</span>
                })
            }

             {portionCount > portionNumber && 
            <button className={`${classes.btn} ${classes.btnNext}`} onClick={()=> {setPortionNumber(portionNumber+1)}}>next</button>}
        </div>
    );
}

export default Paginator;