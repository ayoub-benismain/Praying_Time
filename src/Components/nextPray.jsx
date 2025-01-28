import { useEffect, useState } from "react";

function NextPray({city , time}) {

    const [currentTime , setCurrentTime] = useState(new Date());


    // eslint-disable-next-line no-unused-vars
    const [nextPray , setNextPray] = useState("");

    const [nextPrayTime , setNextPrayTime] = useState("");

    const whoAkber = (time1 , time2) => {  // na3teha zoz aw9aat t9oli chkun akber exemple 05:39 w 06:25

        if (parseInt(time1.substring(0,2) > parseInt(time2.substring(0,2) ))) {
            return time1;
        } else if (parseInt(time1.substring(0,2)) < parseInt(time2.substring(0,2))) {
            return time2;
        } else {
            if (parseInt(time1.substring(3,5)) > parseInt(time2.substring(3,5))) {
                return time1
            } else {
                return time2;
            }
        }

    }


    const nextPrayingTime = (arr , sysTime) => {
        arr.forEach((time) => {
            if (whoAkber(time , sysTime) === time) {
                setNextPrayTime(time);
                return;
            }
        })
    }


    useEffect(() => {
        const prayTimes = [time.Fajr , time.Dhuhr , time.Asr , time.Maghrib , time.Icha];


        nextPrayingTime(prayTimes , currentTime.toLocaleDateString().substring(0,4));



        
        
        const interval = setInterval(() => {
            setCurrentTime(new Date());
        }, 1000);


        
        
    
        return () => clearInterval(interval);
      }, [city]);

    return ( 
        <div className = 'w-[60%] h-auto mx-auto flex justify-center items-center my-20'>
            <h1 className = 'text-white text-3xl font-extrabold tracking-wide uppercase'>
                There are <span className = 'text-green-700'>{city === "" ? " ----" : nextPrayTime}</span> hours left until <span className = 'text-green-700'>{city === "" ? "---" : nextPray}</span> prayer
            </h1>
        </div>
     );
}

export default NextPray;