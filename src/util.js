import React from "react";
import numeral from "numeral";
import { Circle, Popup } from "react-leaflet";
const casesTypeColors = {
    cases: {
      col: "#CC1034",
      multiplier: 800,
    },
    recovered: {
      col: "#7dd71d",
      multiplier: 1200,
    },
    deaths: {
      col: "#fb4443",
      multiplier: 2000,
    },
  };

export const sortData = (data) => {
    const sortingData = [...data];

    return sortingData.sort((a, b) => (a.cases > b.cases ? -1 : 1))
};

export const prettyPrintStat =(stat) =>
   stat ? `+${numeral(stat).format("0.0a")}`: +0;

export const showDataMap = (data, casesType) => (

    data.map((country, index) => (
        <Circle
            key={index}
            center={[country.countryInfo.lat, country.countryInfo.long]}
            fillOpacity={0.4}
            pathOptions={{
              color: casesTypeColors[casesType].col,
              fillColor: casesTypeColors[casesType].col
            }}
            radius={
              Math.sqrt(country[casesType] / 10) * casesTypeColors[casesType].multiplier
            }
        >
            <Popup>
              <div className='Info-Container'>
                <div className='Info-flag'
                 style={{ backgroundImage: `url(${country.countryInfo.flag})`}}
                />
                <div className='Info-name'>{country.country}</div>
                <div className='Info-cases'>Cases: {numeral(country.cases).format("0,0")}</div>
                <div className='Info-recovered'>Recovered: {numeral(country.recovered).format("0,0")}</div>
                <div className='Info-deaths'>Deaths: {numeral(country.deaths).format("0,0")}</div>
              </div>
            </Popup>
        </Circle>
    ))
)

