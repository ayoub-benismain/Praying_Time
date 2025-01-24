import Logo from "./Components/Logo";
import Time from "./Components/Time";
import DropdownMenu from "./Components/DropdownMenu";
import Card from "./Components/Card";
import fajr from "./assets/fajr.jpg";
import dhuhr from "./assets/dhuhr.png";
import asr from "./assets/asr.jpg";
import meghreb from "./assets/meghreb.avif";
import icha from "./assets/icha.jpg";

import { useEffect, useState } from "react";

import axios from "axios";



function App() {

  const [city , setCity] = useState("");

  const [time , setTime] = useState({
    Asr : "",
    Dhuhr : "",
    Fajr : "",
    Firstthird : "",
    Imsak : "",
    Isha : "",
    Lastthird : "",
    Maghrib : "",
    Midnight : "",
    Sunrise : "",
    Sunset : ""

  })



  const fetchingData = async () => {
    const apiData = await axios.get(`https://api.aladhan.com/v1/timingsByCity/24-01-2025?country=TN&city=${city}`);
    setTime(apiData.data.data.timings)
  }

  useEffect(() => {
    city != "" && fetchingData()
  // eslint-disable-next-line react-hooks/exhaustive-deps
  } , [city])
  


  return (
    <div className='w-screen h-screen flex items-center flex-col py-5 bg-[#1a1a1a] bg-cover'>
        
      <Logo/>

      <div className='flex justify-between items-center w-[60%] my-28'>  {/* top side */}
        <div className='flex-col'>
          <p className='text-xl uppercase py-5 font-bold tracking-[1px] text-white'>Tunisia - <span className='text-green-700'>{city}</span></p>
          <Time/>
        </div>

        <div>
          <DropdownMenu
            setCity = {setCity}
          />
        </div>

      </div>

      <div className='w-[60%] flex flex-row justify-center'>    {/* cards */}

          <Card
            url={fajr}
            prayer={"Fajr"}
            alt="Fajr prayer image"
            time = {time.Fajr}
          />

          <Card
            url={dhuhr}
            prayer={"Dhuhr"}
            alt="Dhuhr prayer image"
            time = {time.Dhuhr}
          />

          <Card
            url={asr}
            prayer={"Asr"}
            alt="Asr prayer image"
            time = {time.Asr}
          />

          <Card
            url={meghreb}
            prayer={"Maghrib"}
            alt="Maghrib prayer image"
            time = {time.Maghrib}
          />

          <Card
            url={icha}
            prayer={"Isha"}
            alt="Isha prayer image"
            time = {time.Isha}
          />

      </div>           

    </div>
  );
}

export default App;
