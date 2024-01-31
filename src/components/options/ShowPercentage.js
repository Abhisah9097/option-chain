import React from 'react';
import ArrowDropUpIcon from '@mui/icons-material/ArrowDropUp';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import { toLocaleString } from '../../helpers';

const ShowPercentage = ({showPercent, textColor, value, percent }) => {
    if (value > 0) {
        return (
            <>
                <span className={`${textColor ? "text-success" : ""}`}>{toLocaleString(value)}</span>
                {showPercent && (<span className="fs-10 text-success ms-1">{`(${parseInt(percent)}%)`}</span>)}
                {showPercent && (<ArrowDropUpIcon className='fs-10 text-success' />)}
            </>
        )
    }
    return (
        <>
            <span className={`${textColor ? "text-danger" : ""}`}>{toLocaleString(value)}</span>
            {showPercent && (<span className="fs-10 text-danger ms-1">{`(${parseInt(percent)}%)`}</span>)}
            {showPercent && (<ArrowDropDownIcon className='fs-10 text-danger' />)}
        </>
    )
}

export default ShowPercentage
