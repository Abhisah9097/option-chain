import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { OPTION_TYPES } from '../../../utils/constants';
import { toLocaleString } from '../../../helpers';
import ShowPercentage from '../ShowPercentage';


export default function DenseTable({filteredOptions, underlyingValue, largestOpenInteres, largestChangeOpenInterest, largestTradedVolume}) {
    return (
        <TableContainer component={Paper}>
            <Table sx={{ minWidth: 650 }} size="small" aria-label="a dense table">
                {/* <TableHead>
          <TableRow>
            <TableCell>Dessert (100g serving)</TableCell>
            <TableCell align="right">Calories</TableCell>
            <TableCell align="right">Fat&nbsp;(g)</TableCell>
            <TableCell align="right">Carbs&nbsp;(g)</TableCell>
            <TableCell align="right">Protein&nbsp;(g)</TableCell>
          </TableRow>
        </TableHead> */}
                <TableBody>
                    {filteredOptions.map((item) => (
                        <TableRow
                            key={item.strikePrice}
                            sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                            <TableCell className={`table-small-view ${underlyingValue >= item.strikePrice ? "table-in-the-price" : ""} ${largestOpenInteres[OPTION_TYPES.CE]?.[item.strikePrice] || ""}`}>{toLocaleString(item.CE.openInterest)}</TableCell>
                            <TableCell className={`table-small-view text-center ${underlyingValue >= item.strikePrice ? "table-in-the-price" : ""} ${largestChangeOpenInterest[OPTION_TYPES.CE]?.[item.strikePrice] || ""}`}><ShowPercentage showPercent={true} textColor={false} value={item.CE.changeinOpenInterest} percent={item.CE.pchangeinOpenInterest} /></TableCell>
                            <TableCell className={`table-small-view ${underlyingValue >= item.strikePrice ? "table-in-the-price" : ""} ${largestTradedVolume[OPTION_TYPES.CE]?.[item.strikePrice] || ""}`}>{toLocaleString(item.CE.totalTradedVolume)}</TableCell>
                            <TableCell className={`table-small-view text-muted ${underlyingValue >= item.strikePrice ? "table-in-the-price" : ""}`}>{toLocaleString(item.CE.lastPrice)}</TableCell>
                            <TableCell className={`table-small-view text-center ${underlyingValue >= item.strikePrice ? "table-in-the-price" : ""}`}><ShowPercentage showPercent={false} textColor={true} value={item.CE.change} percent={item.CE.pChange} /></TableCell>
                            <TableCell component="th" className={`table-small-view text-muted strike-price`}>{toLocaleString(item.strikePrice)}</TableCell>
                            <TableCell className={`table-small-view ${underlyingValue <= item.strikePrice ? "table-in-the-price" : ""}`}><ShowPercentage showPercent={false} textColor={true} value={item.PE.change} percent={item.PE.pChange} /></TableCell>
                            <TableCell className={`table-small-view text-muted ${underlyingValue <= item.strikePrice ? "table-in-the-price" : ""}`}>{toLocaleString(item.PE.lastPrice)}</TableCell>
                            <TableCell className={`table-small-view ${underlyingValue <= item.strikePrice ? "table-in-the-price" : ""} ${largestTradedVolume[OPTION_TYPES.PE]?.[item.strikePrice] || ""}`}>{toLocaleString(item.PE.totalTradedVolume)}</TableCell>
                            <TableCell className={`table-small-view ${underlyingValue <= item.strikePrice ? "table-in-the-price" : ""} ${largestChangeOpenInterest[OPTION_TYPES.PE]?.[item.strikePrice] || ""}`}><ShowPercentage showPercent={true} textColor={false} value={item.PE.changeinOpenInterest} percent={item.PE.pchangeinOpenInterest} /></TableCell>
                            <TableCell className={`table-small-view ${underlyingValue <= item.strikePrice ? "table-in-the-price" : ""} ${largestOpenInteres[OPTION_TYPES.PE]?.[item.strikePrice] || ""}`}>{toLocaleString(item.PE.openInterest)}</TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    );
}