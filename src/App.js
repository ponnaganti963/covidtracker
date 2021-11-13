import './App.css';
import React ,{useState, useEffect} from 'react';
import {Card, CardContent, FormControl, MenuItem, Select} from '@mui/material';
import Infobox from './Infobox';
import Map from './Map';
import Table from './Table';
import { sortData } from  './util';
import LineGraph from './LineGraph';
import "leaflet/dist/leaflet.css";
import { prettyPrintStat } from './util';




function App() {
  const [countries, setcountries] = useState([]);
  const [country, setcountry] = useState('Worldwide');
  const [CountryInfo, setCountryInfo] = useState({});
  const [tableData, settableData] = useState([]);
  const [mapCenter, setmapCenter] = useState([20,77]);
  const [mapZoom, setmapZoom] = useState(3);
  const [mapCountries, setmapCountries] = useState([]);
  const [casesType, setcasesType] = useState('cases')
  
  useEffect(()=>{
    fetch('https://disease.sh/v3/covid-19/all')
    .then(response => response.json())
    .then(data =>{
      setCountryInfo(data);
      setcountry('Worldwide');
    });
  },[]);

  const onCountryChange =async (event) => {

    const countryCode = event.target.value;
    const url = countryCode === 'Worldwide' 
      ? "https://disease.sh/v3/covid-19/all"
      : `https://disease.sh/v3/covid-19/countries/${countryCode}`;
    await fetch(url)
    .then((response) => response.json())
    .then((data) =>{
      setcountry(countryCode);
      setCountryInfo(data);
      if(countryCode === 'Worldwide'){
        setmapCenter([0, 0]);
      }else{
      setmapCenter([ data.countryInfo.lat,data.countryInfo.long]);
      }

      setmapZoom(5);
    })
  }
  useEffect(() => {
    const getcountriesData = async () => {
      await fetch("https://disease.sh/v3/covid-19/countries")
      .then((response) => response.json())
      .then((data) =>{
        const countries = data.map((country)=> (  //Returing the data in object form 
          {
            name: country.country,
            value: country.countryInfo.iso2
          }
        ));

        const sortedData = sortData(data);
        setcountries(countries);
        setmapCountries(data);
        settableData(sortedData);
      });

    };
    getcountriesData();
  }, [])
  return (
    <div className="app">
      <div className='app__left'>
        <div className='app-header'>
        <h1>Covid 19 Tracker</h1>
        <FormControl className='app_dropdown'>
          <Select  variant='outlined' onChange={onCountryChange} value={country}>
            <MenuItem value='Worldwide'>Worldwide</MenuItem>
            {
              countries.map((country,index) =>(
                <MenuItem value={country.value} key={index}>{country.name}</MenuItem>
              ))
            }

          </Select>
        </FormControl>
        </div>

        <div className='app_stats'>
            <Infobox  title='Coronavirus Cases'
             isRed
             active = {casesType === 'cases'}
             onClick = {e => setcasesType('cases')}
             cases={prettyPrintStat(CountryInfo.todayCases)} 
             total={prettyPrintStat(CountryInfo.cases)}
             />
            <Infobox  title='Recovered'
             active = {casesType === 'recovered'}
             onClick = {e => setcasesType('recovered')}
             cases={prettyPrintStat(CountryInfo.todayRecovered)}
             total={prettyPrintStat(CountryInfo.recovered)}/>
            <Infobox  title='Deaths'
             isRed
             active = {casesType === 'deaths'}
             onClick = {e => setcasesType('deaths')}
             cases={prettyPrintStat(CountryInfo.todayDeaths)}
             total={prettyPrintStat(CountryInfo.deaths)}/>
        </div>
        <Map casesType={casesType} countries={mapCountries} coord={mapCenter} zoom={mapZoom}/>
       
      </div>
      <Card className='app__right'>
        <CardContent>
          <h3>Live Covid19 Cases</h3>
          <Table countries={tableData}/>
          <h3>Worldwide New {casesType}</h3>
          <LineGraph className='app__graph' casesType={casesType}/>
        </CardContent>


      </Card>
      
    </div>
  );
}

export default App;
