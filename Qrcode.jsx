import React, { useState } from "react";

export const Qrcode = () => {
  const [img, setImg] = useState("");
  const [loading, setLoading] = useState(false);
  const [qrdata,setqrdata] = useState("https://tutorjoes.in/")
  const [qrsize,setqrsize] = useState("150")

  async function generateQr() {
    setLoading(true);
    try {   
      const url = 'https://api.qrserver.com/v1/create-qr-code/?size=${qrsize}x${qrsize}&data=${encodeURIcomponet{qrcode}}';
      setImg(url);
    } catch (error) {
      console.error("Error generating QR code:", error);
    } finally {
      setLoading(false);
    }
  }
  function downloadqr(){
    fetch(img)
    .then((Response)=>Response.blob())
    .then((blob)=>{
      const link=document.createElement('a');
      link.href= URL.createObjectURL(blob)
      link.download="qrcode.png"
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    })
  }

  return (
    <div className="app-container">
      <h1>QR CODE GENERATOR</h1>
      {loading && <p>Please wait...</p>}
      {img && <img src={img} alt="QR code" className="Qr-code-img" />}
      <div>
        <label htmlFor="dataInput" className="input-label">
          Data for QR code:
        </label>
        <input type="text"  value={qrdata} id="dataInput" placeholder="Enter data for QR code" onChange={(e)=>setqrdata(e.target.value)}/>
        <label htmlFor="sizeInput" className="input-label">
          Image size (e.g., 150):
        </label>
        <input type="text" value={qrsize} id="sizeInput" placeholder="Enter the size of QR" onChange={(e)=>setqrsize(e.target.value)} />
        <button className="Generate-button" disabled={loading} onClick={generateQr}>
          Generate QR code
        </button>
        <button className="Download-button" onClick={downloadqr}>Download QR code</button>
      </div>
      <p className="footer">Designed by Deepak</p>
    </div>
  );
};
