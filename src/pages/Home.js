import { Container } from "react-bootstrap";
import React, { useState, useEffect, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getOptions } from "../store/options/actions";
import Select from "react-select";
import Navigation from "../components/Navigation";

function toLocaleString(value) {
  if (!value) {
    return "-";
  }

  return value.toLocaleString();
}



export default function Home() {
  const dispatch = useDispatch();
  const { options, loading, error } = useSelector((state) => {
    return {
      options: state.OptionReducer.options,
      loading: state.OptionReducer.loading,
      error: state.OptionReducer.error,
    };
  });
  const { records: { expiryDates, underlyingValue, strikePrices, timestamp, data } } = options;
  console.log({ expiryDates, underlyingValue, strikePrices, timestamp });
  const [selectedExpiryDate, setSelectedExpiryDate] = useState(null);
  const [selectedStrikePrice, setSelectedStrikePrice] = useState(null);

  const expiryDateOptions = useMemo(() => {
    if (!expiryDates) {
      return [];
    }
    const expiry_date_options = expiryDates.map((item) => ({ label: item, value: item }));
    setSelectedExpiryDate(expiry_date_options[0]);
    return expiry_date_options;
  }, [expiryDates]);

  const strikePriceOptions = useMemo(() => {
    if (!strikePrices) {
      return [];
    }
    const strike_price_options = strikePrices.map((item) => ({ label: item, value: item }));
    setSelectedStrikePrice(strike_price_options[0]);
    return strike_price_options;
  }, [strikePrices]);

  const { filteredOptions, loICall, loIPut, lVolCall, lVolPut } = useMemo(() => {
    if (!options?.filtered) {
      return [];
    }
    const filtered_data = selectedExpiryDate?.value !== null ? (options?.records?.data || []).filter((item) => item.expiryDate === selectedExpiryDate?.value) : (options?.filtered?.data || []);
    // open interess
    const call_largest_open_interes = filtered_data.filter((item) => underlyingValue <= item.strikePrice).map((item) => ({ openInterest: item.CE.openInterest, strikePrice: item.strikePrice }));
    const put_largest_open_interes = filtered_data.filter((item) => underlyingValue >= item.strikePrice).map((item) => ({ openInterest: item.PE.openInterest, strikePrice: item.strikePrice }));
    const sorted_call_largest_open_interes = call_largest_open_interes.sort((a, b) => b.openInterest - a.openInterest).slice(0, 4);
    const sorted_put_largest_open_interes = put_largest_open_interes.sort((a, b) => b.openInterest - a.openInterest).slice(0, 4);

    // valume
    const call_largest_valume_interes = filtered_data.filter((item) => underlyingValue <= item.strikePrice).map((item) => ({ totalTradedVolume: item.CE.totalTradedVolume, strikePrice: item.strikePrice }));
    const put_largest_valume_interes = filtered_data.filter((item) => underlyingValue >= item.strikePrice).map((item) => ({ totalTradedVolume: item.PE.totalTradedVolume, strikePrice: item.strikePrice }));
    const sorted_call_largest_valume_interes = call_largest_valume_interes.sort((a, b) => b.totalTradedVolume - a.totalTradedVolume).slice(0, 4);
    const sorted_put_largest_valume_interes = put_largest_valume_interes.sort((a, b) => b.totalTradedVolume - a.totalTradedVolume).slice(0, 4);

    return { filteredOptions: filtered_data, loICall: sorted_call_largest_open_interes, loIPut: sorted_put_largest_open_interes, lVolCall: sorted_call_largest_valume_interes, lVolPut: sorted_put_largest_valume_interes };

  }, [selectedExpiryDate, selectedStrikePrice]);

  console.log({ filteredOptions, loICall, loIPut, lVolCall, lVolPut });

  useEffect(() => {
    dispatch(getOptions());

    const intervalId = setInterval(() => {
      dispatch(getOptions());
    }, 30000);

    return () => {
      clearInterval(intervalId);
    };
  }, [dispatch]);

  return (
    <React.Fragment>
      <Navigation options={expiryDateOptions} expiryDate={selectedExpiryDate} updateExpiryDate={setSelectedExpiryDate} />
      <Container className="home">
        <div className="my-3">
          {/* <Posts /> */}
          <table className="table table-bordered">
            <thead>
              <tr>
                <th className="table-small-view" scope="col">OI</th>
                <th className="table-small-view" scope="col">CHNG IN OI</th>
                <th className="table-small-view" scope="col">VOLUME</th>
                <th className="table-small-view" scope="col">STRIKE</th>
                <th className="table-small-view" scope="col">VOLUME</th>
                <th className="table-small-view" scope="col">CHNG IN OI</th>
                <th className="table-small-view" scope="col">OI</th>
              </tr>
            </thead>
            <tbody>
              {
                (filteredOptions || []).map((item, index) => {
                  return (
                    <tr>
                      <td className={`table-small-view ${underlyingValue >= item.strikePrice ? "table-in-the-price" : loICall[0].strikePrice === item.strikePrice ? "table-forth-view" : loICall[1].strikePrice === item.strikePrice ? "table-third-view" : loICall[2].strikePrice === item.strikePrice ? "table-second-view" : loICall[3].strikePrice === item.strikePrice ? "table-first-view" : ""}`}>{toLocaleString(item.CE.openInterest)}</td>
                      <td className={`table-small-view ${underlyingValue >= item.strikePrice ? "table-in-the-price" : ""}`}>{toLocaleString(item.CE.changeinOpenInterest)}</td>
                      <td className={`table-small-view ${underlyingValue >= item.strikePrice ? "table-in-the-price" : lVolCall[0].strikePrice === item.strikePrice ? "table-vol-forth-view" : lVolCall[1].strikePrice === item.strikePrice ? "table-vol-third-view" : lVolCall[2].strikePrice === item.strikePrice ? "table-vol-second-view" : loICall[3].strikePrice === item.strikePrice ? "table-vol-first-view" : ""}`}>{toLocaleString(item.CE.totalTradedVolume)}</td>
                      <td className={`table-small-view strike-price`}>{toLocaleString(item.strikePrice)}</td>
                      <td className={`table-small-view ${underlyingValue <= item.strikePrice ? "table-in-the-price" : lVolPut[0].strikePrice === item.strikePrice ? "table-vol-forth-view" : lVolPut[1].strikePrice === item.strikePrice ? "table-vol-third-view" : lVolPut[2].strikePrice === item.strikePrice ? "table-vol-second-view" : loIPut[3].strikePrice === item.strikePrice ? "table-vol-first-view" : ""}`}>{toLocaleString(item.PE.totalTradedVolume)}</td>
                      <td className={`table-small-view ${underlyingValue <= item.strikePrice ? "table-in-the-price" : ""}`}>{toLocaleString(item.PE.changeinOpenInterest)}</td>
                      <td className={`table-small-view ${underlyingValue <= item.strikePrice ? "table-in-the-price" : loIPut[0].strikePrice === item.strikePrice ? "table-forth-view" : loIPut[1].strikePrice === item.strikePrice ? "table-third-view" : loIPut[2].strikePrice === item.strikePrice ? "table-second-view" : loIPut[3].strikePrice === item.strikePrice ? "table-first-view" : ""}`}>{toLocaleString(item.PE.openInterest)}</td>
                    </tr>
                  )
                })
              }
            </tbody>
          </table>
        </div>
      </Container>
    </React.Fragment>
  );
}