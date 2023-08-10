import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from 'axios';
import './home.css';
import loading from '../common/loading.gif';

function Melresult(props){
  const navigate = useNavigate();

  const [mel, setMel] = useState([]);
  const [SelectedSongs, setSelectedSongs] = useState([]);  
  const [SelectedIds, setSelectedIds] = useState([]);  
  const [selectedLyrics, setSelectedLyrics] = useState(null);
  const [selectedTitle, setSelectedTitle] = useState(null);
  const [isModalVisible, setIsModalVisible] = useState(false);      


  const userId = props.userId;    

    const getResult = async() => {
        try {
          const response = await axios.get(`http://localhost:8080/api/mel/recommend-songs3/${userId}`);
            // console.log(response.data)
            setMel(response.data);
        } catch (e) {
            console.log(e)
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

      const handleLyricClick = (index) => {
        setSelectedLyrics(mel[index].lyric_Str);
        setSelectedTitle(mel[index].songName);
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
                  KNN모델을 기반으로 추천드립니다
                  </p>
                  <p style={{fontSize : '14px', marginBottom : '0px'}}>
                  소리파형으로부터 얻은 Mel-spectrogram을 장르기반 신경망 학습을 통하여 특징을 추출,
                  </p>
                  <p style={{fontSize : '14px'}}>
                  K-최근접이웃모델로 유사한 패턴을 가진 곡을 추천합니다. 
                  </p>
                </td>
              </tr>
              {mel.length > 0 ? (
              mel.map((song, index) => (
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
  
  export default Melresult;