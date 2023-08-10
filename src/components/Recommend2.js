import React from 'react';
import { useState, useEffect } from 'react';
import axios from 'axios';
// import { useNavigate } from 'react-router-dom';

function Recommend2(props){
    // const navigate = useNavigate(); 
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [isHovering, setIsHovering] = useState(false); // 마우스 커서 상태    
    const [selectedSongs, setSelectedSongs] = useState(new Set()); // 선택된 아이템 집합
    const [filteredData, setFilteredData] = useState([]); // 초기에 랜덤으로 20개의 아이템 선택    
    const [selectedIds, setSelectedIds] = useState(new Set());
    const userName = JSON.parse(localStorage.getItem('user')).username;



    const fetchSongs = async() => {
        try {
            setData(null);
            const response = await axios.get('http://localhost:8080/api/newsong');
            setData(response.data); 
            setLoading(false);
        } catch (e) {
            setError(e);
            setLoading(false);
        }
    };

    useEffect(() => {
      fetchSongs();
  }, []);    


    useEffect(() => {
        setFilteredData(getRandomSongs(data, 10));
    }, [data]);

    useEffect(() => {
      props.setSelectedSongs(selectedSongs);
    }, [selectedSongs]);        

    useEffect(() => {
      props.setSelectedIds(selectedIds);
    }, [selectedIds]);           

    if (loading) return <div>로딩중..</div>;
    if (error) return <div>에러가 발생했습니다.</div>;
    if (!data) return null;

    const handleRandomize = () => {
      setFilteredData(getRandomSongs(data, 10)); // 새로운 랜덤 아이템으로 filteredData 업데이트
    };

    function getRandomSongs(arr, count) { 
        if (!arr || arr.length === 0) {
            return [];
        }
      const shuffled = arr.sort(() => 0.5 - Math.random()); // 배열을 랜덤하게 섞기
      return shuffled.slice(0, count); // 지정된 개수만큼의 아이템 선택
    } 

    const handleRemoveSongClick = (song) => {
      setSelectedSongs((prevSongs) => {
        const newSongs = new Set(prevSongs);
        newSongs.delete(song);
        return newSongs;
      });
    };        

    const handleSongClick = (song) => {
      setSelectedSongs((prevSongs) => {
        const newSongs = new Set(prevSongs); // 이전 선택된 아이템 집합 복사
  
        if (newSongs.has(song)) {
          newSongs.delete(song); // 이미 선택된 아이템이면 선택 해제
        } else {
          if (newSongs.size >= 5) {
            return newSongs;
          }
          newSongs.add(song);
        }
  
        return newSongs;
      });
    };

    const handleRemoveIdClick = (song) => {
      setSelectedIds((prevIds) => {
        const newIds = new Set(prevIds);
        newIds.delete(song);
        return newIds;
      });
    };        

    const handleIdClick = (song) => {
      setSelectedIds((prevIds) => {
        const newIds = new Set(prevIds); // 이전 선택된 아이템 집합 복사
  
        if (newIds.has(song)) {
          newIds.delete(song); // 이미 선택된 아이템이면 선택 해제
        } else {
          if (newIds.size >= 5) {
            return newIds;
          }
          newIds.add(song);
        }
  
        return newIds;
      });
    };        




    // const [filteredData, setFilteredData] = useState(() => getRandomSongs(data, 10)); // 초기에 랜덤으로 20개의 아이템 선택         

      return <>

      <div style={{ display: 'flex', justifyContent: 'center' }}>
        <table className = 'recommend2-container' >
          <tbody>
          <tr>
                  <td colSpan="1" style={{ textAlign: 'left' }}>
                    <p style = {{ fontSize : '24px', textAlign: 'left', marginBottom : '1px'}}>{userName}님,</p>
                    <p style = {{ fontSize : '24px', textAlign: 'left', marginTop : '1px' }}>좋아하는 노래 5곡을 선택해 주세요!</p>
                  </td>

                  <td>
                  <button className = 'refresh-btn2' onClick={handleRandomize}>다른 노래 보기</button>
                  </td>
                  
            </tr>    
            <tr style={{ fontSize : '16px', textAlign: 'left' }}>
              <td className="td400">
                <div style={{display : 'flex', flexDirection: 'row'}} >
                <img className='pointer' onClick={() => {handleSongClick(filteredData[0]?.songName); handleIdClick(filteredData[0]?.id);} }  alt = "song" src={filteredData[0]?.url} width="50" height="50"/>                         
                <div style = {{ marginLeft : '10px' }}>
                  <span className='pointer' onClick={() => {handleSongClick(filteredData[0]?.songName); handleIdClick(filteredData[0]?.id);}}>
                    {filteredData[0]?.songName}
                  </span>
                  <p className='pointer' onClick={() => {handleSongClick(filteredData[0]?.songName); handleIdClick(filteredData[0]?.id);}} style={{ fontSize: '10px', textAlign: 'left' }} >{filteredData[0]?.artistName}</p>                  
                </div>
                </div>                
              </td>
              <td className="td400">
                <div style={{display : 'flex', flexDirection: 'row'}} >
                  <img className='pointer' onClick={() => {handleSongClick(filteredData[1]?.songName); handleIdClick(filteredData[1]?.id);}} alt = "song" src={filteredData[1]?.url} width="50" height="50"/>                  
                  <div style = {{ marginLeft : '10px' }} >
                  <span className='pointer' onClick={() => {handleSongClick(filteredData[1]?.songName); handleIdClick(filteredData[1]?.id);}}>
                    {filteredData[1]?.songName}
                  </span>
                  <p className='pointer' onClick={() => {handleSongClick(filteredData[1]?.songName); handleIdClick(filteredData[1]?.id);}} style={{ fontSize: '10px', textAlign: 'left' }} >{filteredData[1]?.artistName}</p>
                </div>
                </div>
              </td>
              <td></td><td></td>
              </tr>
              <tr>
              <td className="td400">
              <div style={{display : 'flex', flexDirection: 'row'}} >
                <img className='pointer' onClick={() => {handleSongClick(filteredData[2]?.songName); handleIdClick(filteredData[2]?.id);}} alt = "song" src={filteredData[2]?.url} width="50" height="50"/>
                <div style = {{ marginLeft : '10px' }} >
                  <span className='pointer' onClick={() => {handleSongClick(filteredData[2]?.songName); handleIdClick(filteredData[2]?.id);}}>
                    {filteredData[2]?.songName}
                  </span>
                  <p className='pointer' onClick={() => {handleSongClick(filteredData[2]?.songName); handleIdClick(filteredData[2]?.id);}} style={{ fontSize: '10px', textAlign: 'left' }} >{filteredData[2]?.artistName}</p>                  
                </div>
                </div>
              </td>
              <td className="td400">
                <div style={{display : 'flex', flexDirection: 'row'}} >
                <img className='pointer' onClick={() => {handleSongClick(filteredData[3]?.songName); handleIdClick(filteredData[3]?.id);}} alt = "song" src={filteredData[3]?.url} width="50" height="50"/>
                <div style = {{ marginLeft : '10px' }} >
                  <span className='pointer' onClick={() => {handleSongClick(filteredData[3]?.songName); handleIdClick(filteredData[3]?.id);}}>
                    {filteredData[3]?.songName}
                  </span>
                  <p className='pointer' onClick={() => {handleSongClick(filteredData[3]?.songName); handleIdClick(filteredData[3]?.id);}} style={{ fontSize: '10px', textAlign: 'left' }} >{filteredData[3]?.artistName}</p>                  
                </div>
                </div>
              </td>
              <td></td><td></td>
            </tr>
            <tr style={{ fontSize : '16px', textAlign: 'left' }}>
              <td className="td400">
                <div style={{display : 'flex', flexDirection: 'row'}}>
                <img className='pointer' onClick={() => {handleSongClick(filteredData[4]?.songName); handleIdClick(filteredData[4]?.id);}} alt = "song" src={filteredData[4]?.url} width="50" height="50"/>
                <div style = {{ marginLeft : '10px' }} >
                  <span className='pointer' onClick={() => {handleSongClick(filteredData[4]?.songName); handleIdClick(filteredData[4]?.id);}}>
                    {filteredData[4]?.songName}
                  </span>
                  <p className='pointer' onClick={() => {handleSongClick(filteredData[4]?.songName); handleIdClick(filteredData[4]?.id);}} style={{ fontSize: '10px', textAlign: 'left' }} >{filteredData[4]?.artistName}</p>                  
                </div>
                </div>
              </td>
              <td className="td400">
                <div style={{display : 'flex', flexDirection: 'row'}} >
                <img className='pointer' onClick={() => {handleSongClick(filteredData[5]?.songName); handleIdClick(filteredData[5]?.id);}} alt = "song" src={filteredData[5]?.url} width="50" height="50"/>
                <div style = {{ marginLeft : '10px' }} >
                  <span className='pointer' onClick={() => {handleSongClick(filteredData[5]?.songName); handleIdClick(filteredData[5]?.id);}}>
                    {filteredData[5]?.songName}
                  </span>
                  <p className='pointer' onClick={() => {handleSongClick(filteredData[5]?.songName); handleIdClick(filteredData[5]?.id);}} style={{ fontSize: '10px', textAlign: 'left' }} >{filteredData[5]?.artistName}</p>                                    
                </div>
                </div>
              </td>
              <td></td><td></td>
              </tr>
              <tr>
              <td className="td400">
              <div style={{display : 'flex', flexDirection: 'row'}} >
                <img className='pointer' onClick={() => {handleSongClick(filteredData[6]?.songName); handleIdClick(filteredData[6]?.id);}} alt = "song" src={filteredData[6]?.url} width="50" height="50"/>
                <div style = {{ marginLeft : '10px' }} >
                  <span className='pointer' onClick={() => {handleSongClick(filteredData[6]?.songName); handleIdClick(filteredData[6]?.id);}}>
                    {filteredData[6]?.songName}
                  </span>
                  <p className='pointer' onClick={() => {handleSongClick(filteredData[6]?.songName); handleIdClick(filteredData[6]?.id);}} style={{ fontSize: '10px', textAlign: 'left' }} >{filteredData[6]?.artistName}</p>                  
                </div>
                </div>
              </td>
              <td className="td400">
                <div style={{display : 'flex', flexDirection: 'row'}} >
                <img className='pointer' onClick={() => {handleSongClick(filteredData[7]?.songName); handleIdClick(filteredData[7]?.id);}} alt = "song" src={filteredData[7]?.url} width="50" height="50"/>
                <div style = {{ marginLeft : '10px' }} >
                  <span className='pointer' onClick={() => {handleSongClick(filteredData[7]?.songName); handleIdClick(filteredData[7]?.id);}}>
                    {filteredData[7]?.songName}
                  </span>
                  <p className='pointer' onClick={() => {handleSongClick(filteredData[7]?.songName); handleIdClick(filteredData[7]?.id);}} style={{ fontSize: '10px', textAlign: 'left' }} >{filteredData[7]?.artistName}</p>                  
                </div>
                </div>
              </td>
              <td></td><td></td>
            </tr>
            <tr style={{ fontSize : '16px', textAlign: 'left' }}>
              <td className="td400">
                <div style={{display : 'flex', flexDirection: 'row'}}>
                <img className='pointer' onClick={() => {handleSongClick(filteredData[8]?.songName); handleIdClick(filteredData[8]?.id);}} alt = "song" src={filteredData[8]?.url} width="50" height="50"/>
                <div style = {{ marginLeft : '10px' }} >
                  <span className='pointer' onClick={() => {handleSongClick(filteredData[8]?.songName); handleIdClick(filteredData[8]?.id);}}>
                    {filteredData[8]?.songName}
                  </span>
                  <p className='pointer' onClick={() => {handleSongClick(filteredData[8]?.songName); handleIdClick(filteredData[8]?.id);}} style={{ fontSize: '10px', textAlign: 'left' }} >{filteredData[8]?.artistName}</p>                  
                </div>
                </div>
              </td>
              <td className="td400">
                <div style={{display : 'flex', flexDirection: 'row'}} >
                <img className='pointer' onClick={() => {handleSongClick(filteredData[9]?.songName); handleIdClick(filteredData[9]?.id);}} alt = "song" src={filteredData[9]?.url} width="50" height="50"/>
                <div style = {{ marginLeft : '10px' }} >
                  <span className='pointer' onClick={() => {handleSongClick(filteredData[9]?.songName); handleIdClick(filteredData[9]?.id);}}>
                    {filteredData[9]?.songName}
                  </span>
                  <p className='pointer' onClick={() => {handleSongClick(filteredData[9]?.songName); handleIdClick(filteredData[9]?.id);}} style={{ fontSize: '10px', textAlign: 'left' }} >{filteredData[9]?.artistName}</p>                                    
                </div>
                </div>
              </td>
              <td></td><td></td>
              </tr>                                      
              {/* <tr>
              <td className="td400">
              <div style={{display : 'flex', flexDirection: 'row'}} >
                <img onClick={() => handleSongClick(filteredData[6]?.song_name)} src={filteredData[6]?.url} width="50" height="50"/>
                <div style = {{ marginLeft : '10px' }} >
                  <span onClick={() => handleSongClick(filteredData[6]?.song_name)}>
                    {filteredData[6]?.song_name}
                  </span>
                  <p onClick={() => handleSongClick(filteredData[6]?.song_name)} style={{ fontSize: '10px', textAlign: 'left' }} >{filteredData[6]?.artist_name}</p>                                                      
                </div>
                </div>
              </td>
              <td className="td400">
              <div style={{display : 'flex', flexDirection: 'row'}} >
                <img onClick={() => handleSongClick(filteredData[7]?.song_name)} src={filteredData[7]?.url} width="50" height="50"/>
                <div style = {{ marginLeft : '10px' }} >
                  <span onClick={() => handleSongClick(filteredData[7]?.song_name)}>
                    {filteredData[7]?.song_name}
                  </span>
                  <p onClick={() => handleSongClick(filteredData[7]?.song_name)} style={{ fontSize: '10px', textAlign: 'left' }} >{filteredData[7]?.artist_name}</p>                                                      
                </div>
                </div>
              </td>
              <td></td><td></td>
            </tr> */}
            <tr>
            <td colSpan="4" style={{ textAlign: 'left'}}>
                  <p style={{ fontSize: '16px', textAlign: 'left' }}> 
                  {Array.from(selectedSongs).map((song, index) => (
                      <span className="selected-item2" key={index}
                      onMouseEnter={() => setIsHovering(true)}
                      onMouseLeave={() => setIsHovering(false)}
                      onClick={() => {handleRemoveSongClick(song); handleRemoveIdClick(song); }}                      
                      >{song} {isHovering && (
                        <span className="remove-icon" onClick={() => { handleRemoveSongClick(song); handleRemoveIdClick(song); }}></span>
                      )}</span>
              ))}</p>                
                  </td>            
            </tr>                  
          </tbody>
        </table>
      </div>      
      
      </>      

}

export default Recommend2;