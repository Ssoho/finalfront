import React from 'react';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import Recommend1 from './Recommend1';
import Recommend2 from './Recommend2';


function Signrecommend(props){
    const navigate = useNavigate();
    const [showAlert, setShowAlert] = useState(false); // 경고창 노출 여부 상태 추가  
    const closeAlert = () => {
        setShowAlert(false); // 경고창 닫기
      };
    const [reco, setReco] = useState([]);

    // const [selectedItems, setSelectedItems] = useState(new Set());
    // const selectedItemsArray = Array.from(selectedItems);

    const [selectedSongs, setSelectedSongs] = useState(new Set());
    const selectedSongsArray = Array.from(selectedSongs);

    const [selectedIds, setSelectedIds] = useState(new Set());    
    const selectedIdsArray = Array.from(selectedIds);

    const axiosConfig = {
      headers: {
        'Content-Type': 'application/json',
      },
    };

    // const handleSelectedItemsChange = (items) => {
    //   setSelectedItems(new Set(items));
    // };    

    const handleSelectedSongsChange = (songs) => {
      setSelectedSongs(new Set(songs));
    };

    const handleSelectedIdsChange = (ids) => {
      setSelectedIds(new Set(ids));
    };

    const handleRecommendSubmit = async (e) => {
        e.preventDefault();
        // 선택한 장르와 노래 목록을 서버로 전송
        // const tags = {
        //   tag: JSON.stringify(selectedItemsArray),
        // };

        const songs = {
          song_ids : JSON.stringify(selectedIdsArray),
        };

        const userId = JSON.parse(localStorage.getItem('user')).id;
        
        
        try{
          // 2023-08-01
          // await 뺏음
          // 왜 why? axios는 기본적으로 비동기형 통신장치라 await을 불필요하게 쓰면
          // 비동기형 통신장치의 이점을 살리지 못 함.
          // axios.put(`http://localhost:8080/api/tag/post/${userId}`, tags, axiosConfig);
          await axios.put(`http://localhost:8080/api/newsong/post/${userId}`, songs, axiosConfig);
          // console.log(songs)
          // console.log(tags)
          navigate('/');
          // const response = await axios.put(`http://localhost:8080/api/annoy/recommend-songs/${userId}`);
          // setReco(response.data);
          // console.log(response.data);
          // navigate("/path/to/Tagresult", { state: { reco: response.data } });

        } catch (error) {
        console.log(error);
        setShowAlert(true); // 경고창 노출 상태 변경
        }

    };



return <>
<div>

{/* <img src="watermelon_logo.jpg" alt="Watermelon" style={{ width: '250px', height: 'auto', marginLeft: '394px', marginTop : '25px'}} />     */}

{/* <Recommend1 setSelectedItems={handleSelectedItemsChange} /> */}

<Recommend2 setSelectedSongs={handleSelectedSongsChange} setSelectedIds={handleSelectedIdsChange} />

<div style={{ display: 'flex', justifyContent: 'center', marginTop : '40px' }}>
<button className = 'submit-btn' onClick={handleRecommendSubmit}>선택 완료</button>
</div>

</div>

{showAlert && (
        <div className="recommend-alert">
          <div className="recommend-alert-modal">
            <p style={{marginBottom : '20px'}}>예상치 못한 오류가 발생하였습니다.</p>
            <button onClick={closeAlert}>닫기</button>
          </div>
        </div>
      )}

</>
}

export default Signrecommend;