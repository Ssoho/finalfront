import React from "react";
import {useState} from "react";
import './home.css';

const Searchresult = ( { searchResults } ) => {
  // const searchData = location.state.data;
  const { resultdata1, resultdata2, resultdata3 } = searchResults;

  const [selectedLyrics, setSelectedLyrics] = useState(null);
  const [selectedTitle, setSelectedTitle] = useState(null);
  const [isModalVisible, setIsModalVisible] = useState(false);   

  const handleLyricClick1 = (index) => {
    setSelectedLyrics(resultdata1[index].lyric);
    setSelectedTitle(resultdata1[index].songName);
    setIsModalVisible(true);
  };       

  const handleLyricClick2 = (index) => {
    setSelectedLyrics(resultdata2[index].lyric);
    setSelectedTitle(resultdata2[index].songName);
    setIsModalVisible(true);
  };      
  
  const handleLyricClick3 = (index) => {
    setSelectedLyrics(resultdata3[index].lyric);
    setSelectedTitle(resultdata3[index].songName);
    setIsModalVisible(true);
  };        

  const closeModal = () => {
    setIsModalVisible(false);
  };

  // console.log(resultdata1);
  // console.log(resultdata2);
  // console.log(resultdata3);

  if (resultdata1.length === 0 && resultdata2.length === 0 && resultdata3.length === 0) {
    return<div className="cent" style={{ margin: "20px", width: "100%" }}>
    <div style={{ fontSize : '24px', display: "flex", justifyContent: "center" }}>
      결과가 없습니다
    </div>
    </div>
  }


  return (
    <div className="cent" style={{ margin: "20px", width: "100%" }}>
      <div style={{ display: "flex", justifyContent: "center" }}>
      <table className="td800">
      <tbody>
        {resultdata1.length > 0 ? (
          <div style={{ marginBottom : '30px'}} >
              <tr>
                <td colSpan="2" style={{ textAlign: "left" }}>
                  <p style={{ textAlign: "left" , fontSize : '18px'}} >
                    노래이름으로 검색 결과
                  </p>
                </td>
              </tr>
          {resultdata1.slice(0, 5).map((song, index) => (
                <tr key={index} style={{ fontSize: "16px", textAlign: "left" }}>
                <td className="td400">
                  <div style={{ display: "flex", flexDirection: "row" }}>
                    <img
                      alt="song"
                      src={song.url}
                      width="50"
                      height="50"
                    />
                    <div style={{ marginLeft: "10px" }}>
                    <span>
                        {song.songName}
                    </span>                      
                      <p
                        style={{ fontSize: "10px", textAlign: "left" }}
                      >
                        {song.artistName}
                      </p>
                    </div>
                  </div>
                </td>
                <td>
                <div style={{ marginLeft : "100px", display: "flex", flexDirection: "row" }}>
                  <button className = 'lyric-btn' onClick={() => handleLyricClick1(index)} >
                  가사보기
                  </button>
                </div>
                </td>
              </tr>
          ))}
        </div>
        ) : (
          <div></div>
        )}

        {resultdata2.length > 0 ? (
          <div>
              <tr>
                <td colSpan="2" style={{ textAlign: "left" }}>
                  <p style={{ textAlign: "left" , fontSize : '18px'}} >
                    가수이름으로 검색 결과
                  </p>
                </td>
              </tr>
          {resultdata2.slice(0, 5).map((song, index) => (
                <tr key={index} style={{ fontSize: "16px", textAlign: "left" }}>
                <td className="td400">
                  <div style={{ display: "flex", flexDirection: "row" }}>
                    <img
                      alt="song"
                      src={song.url}
                      width="50"
                      height="50"
                    />
                    <div style={{ marginLeft: "10px" }}>
                    <span>
                        {song.songName}
                    </span>                      
                      <p
                        style={{ fontSize: "10px", textAlign: "left" }}
                      >
                        {song.artistName}
                      </p>
                    </div>
                  </div>
                </td>
                <td>
                <div style={{ marginLeft : "100px", display: "flex", justifyContent: "center", alignItems: "center", height: "100%", flexDirection: "row" }}>                  
                  <button className = 'lyric-btn' onClick={() => handleLyricClick2(index)} >
                  가사보기
                  </button>
                </div>
                </td>
              </tr>
          ))}
          </div>
        ) : (
          <div></div>
        )} 

        {resultdata3.length > 0 ? (
          <div>
              <tr>
                <td colSpan="2" style={{ textAlign: "left" }}>
                  <p style={{ textAlign: "left" , fontSize : '18px'}} >
                    가사로 검색 결과
                  </p>
                </td>
              </tr>
          {resultdata3.slice(0, 5).map((song, index) => (
                <tr key={index} style={{ fontSize: "16px", textAlign: "left" }}>
                <td className="td400">
                  <div style={{ display: "flex", flexDirection: "row" }}>
                    <img
                      alt="song"
                      src={song.url}
                      width="50"
                      height="50"
                    />
                    <div style={{ marginLeft: "10px" }}>
                    <span>
                        {song.songName}
                    </span>                      
                      <p
                        style={{ fontSize: "10px", textAlign: "left" }}
                      >
                        {song.artistName}
                      </p>
                    </div>
                  </div>
                </td>
                <td>
                <div style={{ marginLeft : "100px", display: "flex", flexDirection: "row" }}>
                  <button className = 'lyric-btn' onClick={() => handleLyricClick3(index)} >
                  가사보기
                  </button>
                </div>
                </td>
              </tr>
          ))}
          </div>
        ) : (
          <div></div>
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

export default Searchresult;  