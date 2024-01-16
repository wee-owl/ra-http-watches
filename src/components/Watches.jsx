import React, { useEffect } from 'react';
import moment from 'moment';
import momentTimezone from 'moment-timezone';
import { API_URL, API_KEY, cityError, timezoneError } from './const';
import WatchesItem from './WatchesItem';


const CityCheck = async (value) => {
  try {
    const response = await fetch(`${API_URL}${value}`, {
      method: 'GET',
      mode: 'cors',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        'Authorization': `Bearer ${API_KEY}`,
      },
    });
    if (response.ok) {
      const data = await response.text();
      const result = await JSON.parse(data);
      if (!result.length) {
        return cityError;
      } else {
        return result[0].timezone;
      }
    } else {
      throw new Error();
    }
  } catch (error) {
    return cityError;
  }
}

const GetTimezone = async (city, zone) => {
  if (!city && !zone) return;

  const now = moment();
  const cityTimezone = await CityCheck(city);

  if (cityTimezone && !cityTimezone.includes('Error')) {
    const time = momentTimezone(now).tz(cityTimezone);
    const cityUTC = time.format().substring(19);

    if (cityUTC.includes(zone) && cityUTC.substring(0,3) === zone || (cityUTC === 'Z' && zone === '0')) {
      const cityTime = new Date().toLocaleTimeString('ru-RU', {timeZone: cityTimezone});
      return {area: city, zone: cityTime};
    } else {
      return timezoneError;
    }

  } else {
    return cityTimezone;
  }
}

let rowArray = [];

function Watches(state) {
  const [data, setData] = React.useState(state);

  useEffect(() => {
    async function getResult() {
      const result = await GetTimezone(state.state.area, state.state.zone);
      if (!result) return;
      if (typeof(result) !== 'string') {
        setData(result);
        if (rowArray.length === 0) rowArray.push(result);
        if (rowArray.length !== 0 && rowArray.every(item => item.area != result.area)) {
          rowArray.push(result);
        }
      } else {
        alert(result);
      }
    }
    getResult();
  }, [state]);

  function deleteWatches(e) {
    if (e.target.closest('button.watches__delete-btn')) {
      rowArray.splice(e.target.closest('li').id, 1);
    }
    setData((prevState) => ({...prevState}));
  };

  return (
    <div className='watches'>
      <ul className='watches__list' onClick={deleteWatches}>
        { rowArray.length === 0 ? 'Добавьте часы'
          : rowArray.map((item, i) => <WatchesItem data={item} key={i} id={i}/>) }
      </ul>
    </div>
  );
};

export default Watches;
