import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import './home.css';
import loading from '../common/loading.gif';

function Songresult(props){
    const navigate = useNavigate();

    const [reco, setReco] = useState([]);
    // const [data, setData] = useState([]);
    const [SelectedSongs, setSelectedSongs] = useState([]);
    const [SelectedIds, setSelectedIds] = useState([]);
    const [selectedLyrics, setSelectedLyrics] = useState(null);
    const [selectedTitle, setSelectedTitle] = useState(null);
    const [isModalVisible, setIsModalVisible] = useState(false);    


    const userId = props.userId;

    // const userId = JSON.parse(localStorage.getItem('user'))?.id;

    const getResult = async() => {
        try {
            const response = await axios.get(`http://localhost:8080/api/annoy/recommend-songs/${userId}`);
            // setReco(response.data);
            // console.log(response.data)
            const data = typeof response.data === 'string' ? JSON.parse(response.data) : response.data;
            setReco(data);
            // console.log(data);

        } catch (e) {
            console.log(e);
        }

    };

    useEffect(() => {
        getResult();
      }, []);


      const handleSongClick = (song) => {
        setSelectedSongs((prevSongs) => {
          const newSongs = new Set(prevSongs); // 이전 선택된 아이템 집합 복사
            newSongs.add(song);
          return newSongs;
        });
      };  

      const handleIdClick = (song) => {
        setSelectedIds((prevIds) => {
          const newIds = new Set(prevIds);
            newIds.add(song);
          return newIds;
        });
      };

      const handleLyricClick = (index) => {
        setSelectedLyrics(reco[index].lyric_Str);
        setSelectedTitle(reco[index].songName);
        setIsModalVisible(true);
      };      

      const closeModal = () => {
        setIsModalVisible(false);
      };      
    

  
    return (
      
        <div className="cent" style={{ margin: "20px", width: "100%" }}>
        
        <div style={{ display: "flex", justifyContent: "center" }}>
          <table className="td800">
            <tbody>
              <tr>
                <td colSpan="4" style={{ textAlign: "left" }}>
                  <p style={{ textAlign: "left" , fontSize : '18px'}} >
                    Annoy모델을 기반으로 추천드립니다
                  </p>
                  <p style={{fontSize : '14px'}}>
                  노래 가사의 단어들을 이용해 빈도수를 확인하고 '많이 등장하는 단어'가 유사한 노래를 추천해 드립니다.
                  </p>

                  {/* 노래 가사를 이용한 tfidf 벡터의 코사인 유사도를 계산하는 annoy 모델을 활용하여 노래를 추천합니다. */}
                </td>
              </tr>
              {reco.length > 0 ? (
              reco.map((song, index) => (
                <tr key={index} style={{ fontSize: "16px", textAlign: "left" }}>
                  <td className="td400">
                    <div style={{ display: "flex", flexDirection: "row" }}>
                      <img
                        onClick={() => handleSongClick(song.songName)}
                        alt="song"
                        src={song.url}
                        width="50"
                        height="50"
                      />
                      <div style={{ marginLeft: "10px" }}>
                        <span onClick={() => handleSongClick(song.songName)}>
                          {song.songName}
                        </span>
                        <p
                          onClick={() => handleSongClick(song.songName)}
                          style={{ fontSize: "10px", textAlign: "left" }}
                        >
                          {song.artistName}
                        </p>
                      </div>
                    </div>
                  </td>
                  <td>
                  <div style={{ marginLeft : "100px", display: "flex", flexDirection: "row" }}>
                    <button className = 'lyric-btn' onClick={() => handleLyricClick(index)} >
                    가사보기
                    </button>
                  </div>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                  <img style ={{ paddingLeft : '300px' }} src = {loading} alt ="loading" />
              </tr>
            )}              
            </tbody>
          </table>
        </div>

        {isModalVisible && selectedLyrics !== null && (
        <div className="lyric_modal">
          <div className="title_container">
            <h4>{selectedTitle}</h4>
          </div>
          <div className="lyric_content" dangerouslySetInnerHTML={{ __html: selectedLyrics }} />
          <button onClick={closeModal}>닫기</button>
        </div>
      )}

    </div>

    );
  };
  
  export default Songresult;