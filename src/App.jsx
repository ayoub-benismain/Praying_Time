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
  const [city, setCity] = useState("");
  const [time, setTime] = useState({
    Asr: "",
    Dhuhr: "",
    Fajr: "",
    Firstthird: "",
    Imsak: "",
    Isha: "",
    Lastthird: "",
    Maghrib: "",
    Midnight: "",
    Sunrise: "",
    Sunset: ""
  });

  const [nextPrayer, setNextPrayer] = useState("");
  const [timeLeft, setTimeLeft] = useState("");

  const fetchingData = async () => {
    const apiData = await axios.get(
      `https://api.aladhan.com/v1/timingsByCity/24-01-2025?country=TN&city=${city}`
    );
    setTime(apiData.data.data.timings);
  };

  const calculateNextPrayer = () => {
    const currentTime = new Date();
    const currentMinutes = currentTime.getHours() * 60 + currentTime.getMinutes();
  
    const prayerTimes = [
      { name: "Fajr", time: time.Fajr },
      { name: "Dhuhr", time: time.Dhuhr },
      { name: "Asr", time: time.Asr },
      { name: "Maghrib", time: time.Maghrib },
      { name: "Isha", time: time.Isha }
    ].map((prayer) => {
      if (prayer.time) {
        const [hours, minutes] = prayer.time.split(":").map(Number);
        const prayerMinutes = hours * 60 + minutes;
        return { ...prayer, prayerMinutes };
      }
      return null;
    }).filter(Boolean);
  
    let nextPrayer = null;
    let minDiff = Infinity;
  
    prayerTimes.forEach((prayer) => {
      const diff = prayer.prayerMinutes - currentMinutes;
  
      if (diff > 0 && diff < minDiff) {
        minDiff = diff;
        nextPrayer = prayer;
      }
    });
  
    if (nextPrayer) {
      const hoursLeft = Math.floor(minDiff / 60);
      const minutesLeft = minDiff % 60;
  
      setNextPrayer(nextPrayer.name);
      setTimeLeft(`${hoursLeft} hours and ${minutesLeft} minutes`);
    } else {
      // Handle case when next prayer is Fajr the next day
      const fajrTime = prayerTimes.find((p) => p.name === "Fajr");
      if (fajrTime) {
        const totalMinutesInDay = 24 * 60;
        const diffToFajr = totalMinutesInDay - currentMinutes + fajrTime.prayerMinutes;
  
        const hoursLeft = Math.floor(diffToFajr / 60);
        const minutesLeft = diffToFajr % 60;
  
        setNextPrayer("Fajr");
        setTimeLeft(`${hoursLeft} hours and ${minutesLeft} minutes`);
      }
    }
  };
  

  useEffect(() => {
    if (city !== "") {
      fetchingData();
    }
  }, [city]);

  useEffect(() => {
    if (Object.values(time).some((t) => t !== "")) {
      calculateNextPrayer();
    }
  }, [time]);

  return (
    <div className="w-screen h-screen flex items-center flex-col py-5 bg-[#1a1a1a] bg-cover">
      <Logo />

      <div className="flex justify-between items-center w-[60%] mt-24">
        <div className="flex-col">
          <p className="text-xl uppercase py-5 font-bold tracking-[1px] text-white">
            Tunisia - <span className="text-green-700">{city}</span>
          </p>
          <Time />
        </div>

        <div>
          <DropdownMenu setCity={setCity} />
        </div>
      </div>

      <div className="w-[60%] flex flex-row justify-center">
        <Card url={fajr} prayer={"Fajr"} alt="Fajr prayer image" time={time.Fajr} />
        <Card url={dhuhr} prayer={"Dhuhr"} alt="Dhuhr prayer image" time={time.Dhuhr} />
        <Card url={asr} prayer={"Asr"} alt="Asr prayer image" time={time.Asr} />
        <Card url={meghreb} prayer={"Maghrib"} alt="Maghrib prayer image" time={time.Maghrib} />
        <Card url={icha} prayer={"Isha"} alt="Isha prayer image" time={time.Isha} />
      </div>

      {city && nextPrayer && timeLeft && (
        <div className="w-[60%] h-auto mx-auto flex justify-center items-center my-20">
          <p className="text-white text-2xl font-bold">
            In <span className="text-green-700">{city}</span>, the next prayer is
            <span className="text-green-700"> {nextPrayer}</span> in
            <span className="text-green-700"> {timeLeft}</span>.
          </p>
        </div>
      )}
    </div>
  );
}

export default App;
