import * as faceapi from 'face-api.js'
import React, { useEffect, useRef, useState } from 'react'

// image default
const testImg = require('../image/loi-1.jpeg')

export default function ListVideo() {
  const imgRef = useRef()
  const canvasRef = useRef()
  const [urlImage, setUrlImage] = useState(testImg)

  useEffect(() => {
    imgRef.current &&
      Promise.all([
        faceapi.nets.tinyFaceDetector.loadFromUri('/models'),
        faceapi.nets.faceLandmark68Net.loadFromUri('/models'),
        faceapi.nets.faceRecognitionNet.loadFromUri('/models'),
        faceapi.nets.faceExpressionNet.loadFromUri('/models'),
        faceapi.nets.ssdMobilenetv1.loadFromUri('./models'),
      ]).then(() => {
        faceDetect()
      })
  }, [urlImage])

  const handleChangeImage = async (e) => {
    // const urlImage = URL.createObjectURL(e.target.files[0])
    // setUrlImage(urlImage)

    const imgElement = await faceapi.bufferToImage(e.target.files[0])
    setUrlImage(imgElement.src)
  }

  const faceDetect = async () => {
    const displaySize = {
      width: imgRef.current.width,
      height: imgRef.current.height,
    }

    const detections = await faceapi
      .detectAllFaces(imgRef.current, new faceapi.TinyFaceDetectorOptions())
      .withFaceLandmarks()
      .withFaceExpressions()

    console.log(detections)

    canvasRef.current.innerHtml = faceapi.createCanvasFromMedia(imgRef.current)

    // reset canvas
    faceapi.matchDimensions(canvasRef.current, displaySize)
    const resized = faceapi.resizeResults(detections, displaySize)

    faceapi.draw.drawDetections(canvasRef.current, resized)
    faceapi.draw.drawFaceLandmarks(canvasRef.current, resized)
    faceapi.draw.drawFaceExpressions(canvasRef.current, resized)
  }

  return (
    <div className="app-image">
      <input
        id="upload"
        type="file"
        onChange={handleChangeImage}
        accept=".jpg, .jpeg, .png"
      />

      <div>
        <img src={urlImage} alt="imageURL" ref={imgRef} />
      </div>

      <canvas ref={canvasRef} />
    </div>
  )
}
