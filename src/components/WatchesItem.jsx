import React from 'react';


const loadTime = (time) => {
  // let now = new Date();
  // const secondsDeg = 180 + 360 / 60 * now.getSeconds();
  // const minutesDeg = 180 + 360 / 60 * now.getMinutes();
  // const hoursDeg = 180 + 360 / 12 * (now.getHours() % 12) + minutesDeg / 60;
  const secondsDeg = 180 + 360 / 60 * time.substring(6);
  const minutesDeg = 180 + 360 / 60 * time.substring(3, 5);
  const hoursDeg = 180 + 360 / 12 * (time.substring(0, 2) % 12) + minutesDeg / 60;
  return {hours: hoursDeg, minutes: minutesDeg, seconds: secondsDeg};
}

function WatchesItem(data, id) {
  return (
    <li id={data.id}>
      <p className='watches__area'>{data.data.area}</p>
      <button className='watches__delete-btn' type='button'>&times;</button>
      <div className='watches__clock'>
        <svg width="300" height="300" viewBox="0 0 300 300" fill="none" xmlns="http://www.w3.org/2000/svg">
          <rect x="148" y="11" width="4" height="20" fill="black"/>
          <rect width="20" height="4" transform="matrix(1 0 0 -1 11 152)" fill="black"/>
          <rect x="148" y="269" width="4" height="20" fill="black"/>
          <rect width="20" height="4" transform="matrix(1 0 0 -1 269 152)" fill="black"/>
          <circle cx="150" cy="150" r="148" stroke="black" strokeWidth="4"/>
          <circle cx="150" cy="150" r="10" fill="black"/>
          <g className='second'>
            <line x1="0" y1="0" x2="0" y2="120" stroke="black" strokeLinecap='round' strokeWidth="2" 
            transform={`translate(150, 150) rotate(${loadTime(data.data.zone).seconds} 0 0)`}/>
          </g>
          <g className='minute'>
            <line x1="0" y1="0" x2="0" y2="110" stroke="black" strokeLinecap='round' strokeWidth="6" 
            transform={`translate(150, 150) rotate(${loadTime(data.data.zone).minutes} 0 0)`}/>
          </g>
          <g className='hour'>
            <line x1="0" y1="0" x2="0" y2="80" stroke="black" strokeLinecap='round' strokeWidth="8" 
            transform={`translate(150, 150) rotate(${loadTime(data.data.zone).hours} 0 0)`}/>
          </g>
        </svg>
      </div>
    </li> 
    );
};

export default WatchesItem;
