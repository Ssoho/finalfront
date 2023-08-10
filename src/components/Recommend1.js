import React from 'react';
import { useState, useEffect } from 'react';
import axios from 'axios';
// import { useNavigate } from 'react-router-dom';

function Recommend1(props){
    // const navigate = useNavigate();
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [isHovering, setIsHovering] = useState(false); // 마우스 커서 상태
    const [selectedItems, setSelectedItems] = useState(new Set());
    // const [selectedItems, setSelectedItems] = useState([]);
    const [filteredData, setFilteredData] = useState([]); // 초기에 랜덤으로 n개의 아이템 선택
    const userName = JSON.parse(localStorage.getItem('user')).username;

    const fetchTags = async () => {
        try {
            setData(null);
            const response = await axios.get('http://localhost:8080/api/tag');
            setData(response.data);
            setLoading(false);
        } catch (e) {
            setError(e);
            setLoading(false);
        }
    };
    useEffect(() => {
        fetchTags();
    }, []);

    useEffect(() => {
        setFilteredData(getRandomItems(data, 8));
    }, [data]);

    useEffect(() => {
      props.setSelectedItems(selectedItems);
    }, [selectedItems]);    

    if (loading) return <div>로딩중..</div>;
    if (error) return <div>에러가 발생했습니다.</div>;
    if (!data) return null;    

    const handleRandomize = () => {
      setFilteredData(getRandomItems(data, 8)); // 새로운 랜덤 아이템으로 filteredData 업데이트
    };

    function getRandomItems(arr, count) {
        if (!arr || arr.length === 0) {
            return [];
        }
      const shuffled = arr.sort(() => 0.5 - Math.random()); // 배열을 랜덤하게 섞기
      return shuffled.slice(0, count); // 지정된 개수만큼의 아이템 선택
    };

    const handleRemoveItemClick = (item) => {
      setSelectedItems((prevItems) => {
        const newItems = new Set(prevItems);
        newItems.delete(item);
        return newItems;
      });
    };

    // const handleItemClick = (item) => {
    //   setSelectedItems((prevItems) => {
    //     if (prevItems.includes(item)) {
    //       return prevItems.filter((prevItem) => prevItem !== item);
    //     } else {
    //       if (prevItems.length >= 5) {
    //         return prevItems;
    //       }
    //       return [...prevItems, item];
    //     }
    //   });
    // };    

    function calculateFontSize(songName) {
      return songName.length > 7 ? "12px" : "15px";
    }    

    const handleItemClick = (item) => {
      setSelectedItems((prevItems) => {
        const newItems = new Set(prevItems);
  
        if (newItems.has(item)) {
          newItems.delete(item);
        } else {
          if (newItems.size >= 5) {
            return newItems;
          }
          newItems.add(item);
        }
  
        return newItems;
      });
    };    

      return <>
      
      <div style={{ display: 'flex', justifyContent: 'center' }}>
        <table className = 'recommend1-container' >
          <tbody >
          <tr>
                  <td colSpan="2" style={{ textAlign: 'left' }}>
                  <p style = {{ fontSize : '24px', textAlign: 'left', marginBottom : '1px'}}>{userName}님,</p>
                    <p style = {{ fontSize : '24px', textAlign: 'left', marginTop : '1px' }}>좋아하는 태그 5개를 선택해 주세요!</p>                    
                  </td>

                  <td>
                  <button className = 'refresh-btn1' onClick={handleRandomize}>다른 장르 보기</button>
                  </td>
            </tr>    
            <tr style={{   textAlign: "left"  }}>
              <td className="td200">
                <div>
                {filteredData[0] && (                  
                  <span className='select-item1' style={{ fontSize: calculateFontSize(filteredData[0]?.songName) }} onClick={() => handleItemClick(filteredData[0]?.songName)}>
                    {filteredData[0]?.songName}
                  </span>
                )}                  
                </div>
              </td>
              <td className="td200">
                <div>
                {filteredData[1] && (                       
                  <span className='select-item1'style={{ fontSize: calculateFontSize(filteredData[1]?.songName) }}  onClick={() => handleItemClick(filteredData[1]?.songName)}>
                    {filteredData[1]?.songName}
                  </span>
                )}                      
                </div>
              </td>
              <td className="td200"> 
                <div>
                {filteredData[2] && (      
                  <span className='select-item1'style={{ fontSize: calculateFontSize(filteredData[2]?.songName) }}  onClick={() => handleItemClick(filteredData[2]?.songName)}>
                    {filteredData[2]?.songName}
                  </span>
                )}
                </div>
              </td>
              <td className="td200">
                <div>
                {filteredData[3] && (      
                  <span className='select-item1' style={{ fontSize: calculateFontSize(filteredData[3]?.songName) }} onClick={() => handleItemClick(filteredData[3]?.songName)}>
                    {filteredData[3]?.songName}
                  </span>
                )}
                </div>
              </td>
            </tr>
            <tr style={{ fontSize : '16px', textAlign: 'left' }}>
              <td className="td200">
                <div>
                {filteredData[4] && (                     
                  <span className='select-item1' style={{ fontSize: calculateFontSize(filteredData[4]?.songName) }} onClick={() => handleItemClick(filteredData[4]?.songName)}>
                    {filteredData[4]?.songName}
                  </span>
                )}                  
                </div>
              </td>
              <td className="td200">
                <div>
                {filteredData[5] && (       
                  <span className='select-item1' style={{ fontSize: calculateFontSize(filteredData[5]?.songName) }} onClick={() => handleItemClick(filteredData[5]?.songName)}>
                    {filteredData[5]?.songName}
                  </span>
                )}
                </div>
              </td>
              <td className="td200">
                <div>
                {filteredData[6] && (       
                  <span className='select-item1' style={{ fontSize: calculateFontSize(filteredData[6]?.songName) }} onClick={() => handleItemClick(filteredData[6]?.songName)}>
                    {filteredData[6]?.songName}
                  </span>
                )}
                </div>
              </td>
              <td className="td200">
                <div>
                {filteredData[7] && (       
                  <span className='select-item1' style={{ fontSize: calculateFontSize(filteredData[7]?.songName) }} onClick={() => handleItemClick(filteredData[7]?.songName)}>
                    {filteredData[7]?.songName}
                  </span>
                )}
                </div>
              </td>
            </tr>    
            <tr>
          <td colSpan="4" style={{ textAlign: 'left' }}>
            <p style={{ fontSize: '16px', textAlign: 'left' }}>
               {Array.from(selectedItems).map((item, index) => (
                <span className="selected-item1" key={index}
                onMouseEnter={() => setIsHovering(true)}
                onMouseLeave={() => setIsHovering(false)}
                onClick={() => handleRemoveItemClick(item)}
                >{item} {isHovering && (
                  <span className="remove-icon" onClick={() => handleRemoveItemClick(item)}></span>
                )}</span>
              ))}
            </p>                   
          </td>
          </tr>               
          </tbody>
        </table>
      </div>

      </>

}

export default Recommend1;