// eslint-disable-next-line react/prop-types
function Card({url , prayer , time}) {
    return ( 
        <div className = 'w-[22%] h-auto mx-1 bg-[#1a1a1a] rounded-lg shadow-xl pb-5 flex flex-col justify-center items-center'>
            <img src={url} alt="" className = 'h-[120px] w-full' />
            <p className = 'text-green-700 text-xl font-bold my-7'>{prayer}</p>
            <p className = 'text-7xl font-light text-white'>{time === "" ? "-- : --" : time}</p>
        </div>
     );
}

export default Card;