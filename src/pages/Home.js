import { Container } from "react-bootstrap";
import React, { useState, useEffect, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getOptions } from "../store/options/actions";
import Navigation from "../components/Navigation";
import { getLargestStrikeByKey } from "../helpers/options/options_helper";
import DenseTable from "../components/options/table/TableContainer";

const optionIndexs = [
  { label: "NIFTY", value: "NIFTY", price: 50 },
  { label: "FINNIFTY", value: "FINNIFTY", price: 50 },
  { label: "BANKNIFTY", value: "BANKNIFTY", price: 100 },
];

export default function Home() {
  const dispatch = useDispatch();
  const { options, loading, error } = useSelector((state) => ({
    options: state.OptionReducer.options,
    loading: state.OptionReducer.loading,
    error: state.OptionReducer.error,

  }));
  const { records: { expiryDates, underlyingValue, strikePrices, timestamp, data } } = options || {};
  const [selectedExpiryDate, setSelectedExpiryDate] = useState(null);
  const [selectedStrikePrice, setSelectedStrikePrice] = useState(null);
  const [selectedOptionIndex, setSelectedOptionIndex] = useState(optionIndexs[2]);

  const expiryDateOptions = useMemo(() => {
    if (!expiryDates) {
      return [];
    }
    const expiry_date_options = expiryDates.map((item) => ({ label: item, value: item }));
    setSelectedExpiryDate((preExDate) => {
      if (!preExDate?.value) {
        return expiry_date_options[0];
      } else {
        return preExDate;
      }
    });
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

  const { filteredOptions, largestOpenInteres, largestChangeOpenInterest, largestTradedVolume } = useMemo(() => {
    if (!options?.filtered) {
      return [];
    }
    const filtered_data = selectedExpiryDate?.value !== null ? (options?.records?.data || []).filter((item) => item.expiryDate === selectedExpiryDate?.value) : (options?.filtered?.data || []);
    const largest_open_interes = getLargestStrikeByKey(filtered_data, underlyingValue, selectedOptionIndex?.price, 'openInterest')
    const largest_change_open_interest = getLargestStrikeByKey(filtered_data, underlyingValue, selectedOptionIndex?.price, 'changeinOpenInterest')
    const largest_traded_volume = getLargestStrikeByKey(filtered_data, underlyingValue, selectedOptionIndex?.price, 'totalTradedVolume')
    return {
      filteredOptions: filtered_data,
      largestOpenInteres: largest_open_interes,
      largestChangeOpenInterest: largest_change_open_interest,
      largestTradedVolume: largest_traded_volume
    };

  }, [selectedExpiryDate, selectedStrikePrice]);

  console.log("LARGEST_OPEN_INTERES:", largestOpenInteres);

  const config = {}

  useEffect(() => {
    config['symbol'] = selectedOptionIndex?.value || "NIFTY"
    dispatch(getOptions(config));

    const intervalId = setInterval(() => {
      dispatch(getOptions(config));
    }, 30000);

    return () => {
      clearInterval(intervalId);
    };
  }, [selectedOptionIndex]);

  return (
    <React.Fragment>
      <Navigation
        options={expiryDateOptions}
        expiryDate={selectedExpiryDate}
        updateExpiryDate={setSelectedExpiryDate}
        optionIndexs={optionIndexs}
        optionIndex={selectedOptionIndex}
        updateOptionIndex={setSelectedOptionIndex}
      />
      <Container className="home">
        <div className="my-3">
          <DenseTable
            filteredOptions={filteredOptions}
            underlyingValue={underlyingValue}
            largestOpenInteres={largestOpenInteres}
            largestChangeOpenInterest={largestChangeOpenInterest}
            largestTradedVolume={largestTradedVolume}
          />
        </div>
      </Container>
    </React.Fragment>
  );
}