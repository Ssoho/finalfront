import ReactPlayer from 'react-player';
import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Player2 = () => {
  const [audioUrl, setAudioUrl] = useState('https://www.youtube.com/watch?v=nM0xDI5R50E');

  useEffect(() => {
    // Simulating API call to fetch audio URL from the database
    // Replace 'YOUR_API_ENDPOINT' with the actual endpoint to fetch the URL from the database
    const fetchAudioUrlFromDatabase = async () => {
      try {
        const response = await axios.get('YOUR_API_ENDPOINT');
        // Assuming the response contains the audio URL data in a property called 'url_data'
        const url_data = response.data.url_data;
        setAudioUrl(url_data);
      } catch (error) {
        console.error('Error fetching audio URL:', error);
      }
    };

    fetchAudioUrlFromDatabase();
  }, []); // The empty dependency array ensures this effect runs only once on component mount

  return (
    <div className="audio-player">
      <ReactPlayer
        url={audioUrl}
        controls
        width="100%"
        height="60px"
        config={{
            youtube: {
              playerVars: {
                modestbranding: 1, // YouTube 로고 감추기
                controls: 1, // 재생 컨트롤 표시
                fs: 0, // 전체 화면 버튼 비활성화
                disablekb: 0, // 키보드 제어 활성화
                loop: 0, // 동영상 반복 재생 비활성화
                rel: 0, // 관련 동영상 표시 비활성화
                autoplay: 1, // 자동 재생 활성화
                cc_load_policy: 0, // 1 : 사용 가능한 경우 자막 표시 
                color: 'blue', // 플레이어 비디오 진행 막대 색상 변경  
                disable_picture_in_picture: 1, // PIP(화면 내 작은 동영상) 모드 비활성화
              },
            },
          }}        
      />
    </div>
  );
};

export default Player2;