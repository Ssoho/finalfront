import React from 'react';
import { useState, useEffect } from 'react';
import { Doughnut } from "react-chartjs-2";
import {Chart, ArcElement, Tooltip, Legend} from 'chart.js';
import { Swiper, SwiperSlide } from 'swiper/react';
import axios from 'axios';
import 'swiper/css';
import 'swiper/css/autoplay';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

Chart.register(ArcElement, Tooltip, Legend);

function Info(){

  // const showurl = [
  //   'https://i.scdn.co/image/ab67616d0000b273bfd46639322b597331d9ecef',
  //   'https://i.scdn.co/image/ab67616d0000b2731111b7562b4b46870d27f98b',
  //   'https://i.scdn.co/image/ab67616d0000b2739d3b5d695233802eafb6e012',
  //   'https://i.scdn.co/image/ab67616d0000b2734ed058b71650a6ca2c04adff',
  //   'https://i.scdn.co/image/ab67616d0000b2739d28fd01859073a3ae6ea209',
  //   'https://i.scdn.co/image/ab67616d0000b273e50cf3bed0fade43e96daa3d',
  //   'https://i.scdn.co/image/ab67616d0000b273e4915763c3c7f7a05cc93885',
    
  // ];

  const [chartdata, setChartdata] = useState([]);

  const getData = async() => {
    try {
      const response = await axios.get('http://localhost:8080/api/genre/all');
        console.log(response.data)
        setChartdata(response.data);
    } catch (e) {
        console.log(e)
    }
  };  

  useEffect(() => {
    getData();
  }, []);

  const extractData = (data) => {
    const genre = data.map((item) => item.genre);
    const count = data.map((item) => item.count);
    return { genre, count };
  };

  
  const [chartConfig, setChartConfig] = useState({
    labels: [],
    datasets: [
      {
        data: [],
        backgroundColor: [
          '#FF6384',
          '#36A2EB',
          '#FFCE56',
          '#CC65FE',
          '#FF4D4D',
          '#FFA500',
          '#00CED1',
          '#9932CC',
          '#3CB371',
          '#8B008B',
          '#FF69B4',
          '#FFA07A',
          '#7FFF00',
          '#ADFF2F',
          '#DC143C',
          '#00BFFF',
          '#1E90FF',
          '#20B2AA',
          '#F08080',
          '#DDA0DD',
          '#808000',
          '#D2B48C',
          '#4682B4',
          '#FFD700',
        ],
        hoverBackgroundColor: [
          '#FF6384',
          '#36A2EB',
          '#FFCE56',
          '#CC65FE',
          '#FF4D4D',
          '#FFA500',
          '#00CED1',
          '#9932CC',
          '#3CB371',
          '#8B008B',
          '#FF69B4',
          '#FFA07A',
          '#7FFF00',
          '#ADFF2F',
          '#DC143C',
          '#00BFFF',
          '#1E90FF',
          '#20B2AA',
          '#F08080',
          '#DDA0DD',
          '#808000',
          '#D2B48C',
          '#4682B4',
          '#FFD700',
        ],
      },
    ],
  });

  useEffect(() => {
    const { genre, count } = extractData(chartdata);
    setChartConfig((prevChartConfig) => ({
      ...prevChartConfig,
      labels: genre,
      datasets: [
        {
          ...prevChartConfig.datasets[0],
          data: count,
        },
      ],
    }));
  }, [chartdata]);



  const handleSlideChange = (swiper) => {
    console.log('slide change:', swiper.activeIndex);
  };

  const handleSwiperLoad = (swiper) => {
    console.log('Swiper loaded:', swiper);
  };


return <>
<div style={{ display: 'flex', justifyContent: 'center', marginTop : '40px', fontSize : '18px' }}>
  <table>
  <tr>
  음악 추천 서비스를 제공하는 Watermelon 홈페이지 입니다.
  </tr>
  <tr>
  저희는 4000여곡의 데이터를 가지고 회원분들이 평소에 좋아하시는
  </tr>   
  <tr>
  노래의 가사, 사용패턴, 소리파형 등을 이용해 노래를 추천드리는 서비스를 제공하고 있습니다.
  </tr>
  <tr>
  로그인/회원가입을 하시면 추천 결과를 받아보실 수 있습니다.
  </tr>  
  </table>
</div>


<div style={{ display: 'flex', marginLeft : 'auto', marginRight : 'auto', justifyContent: 'center', marginTop: '40px', maxWidth: '600px', maxHeight: '800px' }}>
        <Doughnut style={{ display: 'flex', justifyContent: 'center' }} data={chartConfig}
    options={{
      plugins: {
        legend: {
          labels: {
            color: '#fff', // Set legend label color to 
          },
        },
      },
    }}        
        />        
</div>



{/* <div style={{ display: 'flex', justifyContent: 'center', marginTop : '40px', fontSize : '18px' }}>
  <Swiper
      style={{ maxWidth: '800px', maxHeight: '200px' }}
      // modules={[Autoplay]}
      effect={"slide"}
      autoplay={{
        delay: 1000,
        disableOnInteraction: false,
      }}
      loop={true}
      spaceBetween={10}
      slidesPerView={3}
      slidesPerGroup={1}
      onSlideChange={handleSlideChange}
      onSwiper= {handleSwiperLoad} 
    >
  {showurl.map((url, index) => (
            <SwiperSlide key={index}>
              <img src={url} alt={`Slide ${index + 1}`} style={{ maxWidth: '200px', maxHeight: '200px' }} />
            </SwiperSlide>
          ))}
    </Swiper>
</div> */}

</>
}

export default Info;