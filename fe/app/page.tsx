"use client";

import HomeBanner from "@/components/home/HomeBanner";
import HomeBoxContent from "@/components/home/HomeBoxContent";
import HomeHero from "@/components/home/HomeHero";
import HomeNews from "@/components/home/HomeNews";
import HomeProjects from "@/components/home/HomeProject";
import HomeProperties from "@/components/home/HomeProperties"

export default function Page() {
  return (
    <>
    <HomeBanner/>
    <HomeNews/>
    <HomeProperties/>
    <HomeProjects/>
    <HomeBoxContent/>
    <HomeHero/>
    </>
  );
}

// import Weather from "@/components/Weather";
// import News from "@/components/News";
// "use client"
// import { setWeather, setLoading, fetchWeather } from "@/stores/slices/weatherSlice";
// import { RootState } from "@/stores/store"; 
// import { useEffect } from "react";
// import { useSelector, useDispatch } from "react-redux";

// export default function Home() {
//   const dispatch = useDispatch();
//   const weather = useSelector((state: RootState) => state.weather.data);
//   const loading = useSelector((state: RootState) => state.weather.loading);
//   useEffect(() => {
//     fetchWeather(dispatch);
//   }, []);

//   if (loading) return <p>Đang tải...</p>;
  
//   return (
//     <div style={{ padding: "20px" }}>
//       <h2>Thời tiết hiện tại</h2>
//       {weather ? (
//         <>
//           <p>Nhiệt độ: {weather.temperature}°C</p>
//           <p>Tốc độ gió: {weather.windspeed} km/h</p>
//         </>
//       ) : (
//         <p>Không có dữ liệu.</p>
//       )}
//     </div>
//   );
// }

// "use client";
// import { useSelector, useDispatch } from "react-redux";
// import { setBgColor } from "@/stores/slices/themeSlice";
// import { RootState } from "@/stores/store"; 

// export default function ColorButton() {
//   const bgColor = useSelector((state: RootState) => state.theme.bgColor);
//   const dispatch = useDispatch();

//   const handleToggleColor = () => {
//     // Nếu là trắng thì đổi sang đen, ngược lại thì về trắng
//     const nextColor = bgColor === '#ffffff' ? 'black' : '#ffffff';
//     dispatch(setBgColor(nextColor));
//   };

//   return (
//     <div style={{ backgroundColor: bgColor, height: '100vh' }}>
//       <button onClick={handleToggleColor}>
//         {bgColor === '#ffffff' ? 'Đổi sang Đen' : 'Đổi về Trắng'}
//       </button>
//     </div>
//   );
// }
