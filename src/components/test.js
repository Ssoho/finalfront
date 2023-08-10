import React, { useState, useEffect } from "react";
import axios from 'axios';
import { useNavigate } from "react-router-dom";


function Songresult(props){
    const [data, setData] = useState([]);

    const getResult = async() => {
        try {
            const response = await axios.get('http://localhost:8080/api/newsong');
            setData(response.data);
            console.log(response)
        } catch (e) {
            console.log(e)
        }
    };

    useEffect(() => {
        getResult();
      }, []);

    return (
      
    <div className="cent" style={{ margin: "20px", width: "100%" }}>
        <div style={{ display: "flex", justifyContent: "center" }}>
          <table className="cent">
            <tbody>
              <tr>
                <td colSpan="4" style={{ textAlign: "left" }}>
                  <p>'데이식스'를 좋아하는 당신에게</p>
                </td>
              </tr>
              <tr style={{ justifyContent: "center" }}>
                <td className="tdSize">
                  <img
                    src="image5.jpg"
                    alt="Image 5"
                    style={{ maxWidth: "180px", maxHeight: "180px" }}
                  />
                </td>
                <td className="tdSize">
                  <img
                    src="image6.jpg"
                    alt="Image 6"
                    style={{ maxWidth: "180px", maxHeight: "180px" }}
                  />
                </td>
                <td className="tdSize">
                  <img
                    src="image7.jpg"
                    alt="Image 7"
                    style={{ maxWidth: "180px", maxHeight: "180px" }}
                  />
                </td>
                <td className="tdSize">
                  <img
                    src="image8.jpg"
                    alt="Image 8"
                    style={{ maxWidth: "180px", maxHeight: "180px" }}
                  />
                </td>
              </tr>
            </tbody>
          </table>
        </div>
    </div>
      
    );
  };
  
  export default Songresult;