import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from 'axios';
import './home.css';
import loading from '../common/loading.gif';

function DCNresult(props){
  const navigate = useNavigate();

  const [dcn, setDcn] = useState([]);
  const [SelectedSongs, setSelectedSongs] = useState([]);  
  const [SelectedIds, setSelectedIds] = useState([]);  
  const [selectedLyrics, setSelectedLyrics] = useState(null);
  const [selectedTitle, setSelectedTitle] = useState(null);
  const [isModalVisible, setIsModalVisible] = useState(false);      


  const userId = props.userId;    

    const getResult = async() => {
        try {
          const response = await axios.get(`http://localhost:8080/api/dcn/recommend-songs2/${userId}`);
            // console.log(response.data)
            setDcn(response.data);
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
        setSelectedLyrics(dcn[index].lyric_Str);
        setSelectedTitle(dcn[index].songName);
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
                  DCN모델을 기반으로 추천드립니다
                </p>
                <p style={{fontSize : '14px'}}>
                회원님의 사이트 이용 패턴을 분석하여 딥러닝을 사용해 노래를 추천드립니다.
                </p>
                {/* <p style={{fontSize : '14px', marginBottom : '0px'}}>
                유저와 노래에 대한 특징을 임베딩하여 유저가 노래에 남긴 평점을 DCN(Deep & Cross Network)을 이용하여 학습시키고 
                </p>
                <p style={{fontSize : '14px'}}>
                선택한 노래에 대해서 평점을 기반으로 학습한 결과를 이용해 추천합니다. 
                </p>                 */}
                </td>
              </tr>
              {dcn.length > 0 ? (
              dcn.map((song, index) => (
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
  
  export default DCNresult;