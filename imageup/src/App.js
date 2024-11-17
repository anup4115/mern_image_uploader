import { useState } from "react";

function App() {
  const [file, setFile] = useState();
  const [image, setImage] = useState(null);

  const handleUpload = async () => {
    const formdata = new FormData();
    formdata.append('file', file);

    const myInit = {
      method: 'POST',
      body: formdata,
    };

    try {
      const response = await fetch('http://localhost:8000/upload', myInit); 
      const result = await response.json();

      if (result.status === "success") {
        setImage(result.data); 
      } else {
        console.error('Upload failed', result.message);
      }
    } catch (error) {
      console.error('Error during upload:', error);
    }
  };

  return (
    <>
      <input
        type='file'
        onChange={e => setFile(e.target.files[0])}
      />
      <button onClick={handleUpload}>Upload</button>

      {image && (
        <div>
          <h1>Uploaded Image</h1>
          <img src={image} alt="Uploaded" style={{ width: "300px", height: "auto" }} />
        </div>
      )}
    </>
  );
}

export default App;
