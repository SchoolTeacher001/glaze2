import { useEffect, useState } from "react";
import { BrowserRouter } from "react-router-dom";
import './App.scss';
import { images } from "./utils/imagesToLoad";
import $ from 'jquery';
import Page from "./components/Page/Page";

function App() {
  const [isLoading, setIsLoading] = useState(true);
  const loadImage = (image) => {
    return new Promise((resolve, reject) => {
      const newImage = new Image();
      newImage.src = image;
      newImage.onload = () => {
        resolve(image);
      }
      newImage.onerror = (err) => reject(err);
    });
  };
  useEffect(() => {
    if (isLoading) {
      $('body').addClass("ovf-hidden");
    }
    Promise
      .all(images.map((image) => loadImage(image)))
      .then(() => {
        setTimeout(() => {
          setIsLoading(false)
        }, 0)
      })
      .catch((err) => console.log("Failed to load images", err));
  }, []);
  useEffect(() => {
    if (!isLoading) {
      $('body').removeClass("ovf-hidden");
    }
  }, [isLoading]);
  return (
    <div >
      <BrowserRouter>
        <div className={`preloader ${!isLoading && 'hide'}`}>
          <span className="loader"></span>
        </div>
        <Page />
      </BrowserRouter>
    </div>
  );
}

export default App;
