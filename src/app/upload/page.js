"use client";

import axios from "axios";
import React, { useEffect, useState } from "react";

const cloudName = "drnrpmg88";

async function uploadToCloudinary(imageFile) {
  const cloudinaryUrl = `https://api.cloudinary.com/v1_1/${cloudName}/video/upload`; // Replace 'your_cloud_name' with your Cloudinary cloud name
  const formData = new FormData();
  formData.append("file", imageFile);
  formData.append("upload_preset", "ork1ys2n"); // Replace 'your_upload_preset' with your Cloudinary upload preset

  try {
    const response = await fetch(cloudinaryUrl, {
      method: "POST",
      body: formData,
    });
    const data = await response.json();
    return data.secure_url; // Returns the URL of the uploaded image
  } catch (error) {
    console.error("Error uploading image to Cloudinary:", error);
    return null;
  }
}

export default function Upload() {
  const [hashtags, setHashtags] = useState(["#trending", "#trend"]);
  const [newHashtag, setNewHashtag] = useState("");
  const [fileUrl, setFileUrl] = useState("");
  const [caption, setCaption] = useState("");
  const [bio, setBio] = useState("");

  const handleAddHashtag = () => {
    // newHashtag = newHashtag;
    const updatedHashtags = [...hashtags, "#" + newHashtag];
    setHashtags(updatedHashtags);
    setNewHashtag("");
  };
  const [selectedIcons, setSelectedIcons] = useState([]);

  const toggleIconSelection = (iconName) => {
    if (selectedIcons.includes(iconName)) {
      setSelectedIcons(selectedIcons.filter((icon) => icon !== iconName));
    } else {
      setSelectedIcons([...selectedIcons, iconName]);
    }
  };

  const handleNext = () => {
    // Here you can use or store the selected icons
  };

  const handleClick = async (event) => {
    const selectedFile = event.target.files[0];
    // setFile(selectedFile);
    const result = uploadToCloudinary(selectedFile);
    setFileUrl(result);

    // if (selectedFile) {
    //     const fileUrl = URL.createObjectURL(selectedFile);
    //     console.log(fileUrl)
    //     setFileUrl(fileUrl);
    //   }
  };

  const handleSubmit = async () => {
    const data = { media: fileUrl, tags: hashtags, caption,bio };

    const response = await axios.post(
      "http://localhost:4000/upload-youtube-video",
      data,
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    if(response.status === 201) {
      alert("Video uploaded successfully");
    } else {
      alert("Error uploading video");
    }
    setBio('')
    setCaption('')
    setFileUrl('')
    setHashtags([])

    
  };

  return (
    <div className="min-h-screen text-white p-16">
      <div className="upload-head text-5xl">Upload</div>
      <div className="upload-select flex justify-between">
        <div className="upload-left w-1/2">
          <div className="upload-input my-8">
            <div className="input-file text-black">
              <input
                type="file"
                className="file-input file-input-bordered rounded-3xl w-full max-w-xs"
                onChange={handleClick}
              />
            </div>
          </div>
          <div className="upload-title my-8">
            <input
              type="text"
              placeholder="Title"
              onChange={(e) => setCaption(e.target.value)}
              className="input input-bordered border border-orange-600 input-warning bg-gray-800 w-full"
            />
          </div>
          <div className="upload-title my-8">
            <textarea
              className="textarea textarea-warning border border-orange-600 bg-gray-800 w-full h-32"
              placeholder="Bio"
              onChange={(e) => setBio(e.target.value)}
            ></textarea>
          </div>
          <div className="upload-title my-8">
            <div className="upload_name_hashtag text-orange-200">Hashtags</div>
            <div class="hashtags">
              <div class="hash-add">
                <input
                  type="text"
                  value={newHashtag}
                  onChange={(e) => setNewHashtag(e.target.value)}
                  placeholder="Add new hashtag"
                  className="input input-bordered border border-orange-600 input-warning bg-gray-800 w-1/3"
                />
                <button
                  onClick={handleAddHashtag}
                  className="upload_hashtag border p-2 rounded-xl text-white my-3 border-white mx-2"
                >
                  + Add
                </button>
              </div>
              <div class="hashes">
                {hashtags.map((tag, index) => (
                  <button
                    key={index}
                    className="upload_hashtag border p-2 rounded-xl bg-slate-100 text-black my-3 border-white mx-2"
                  >
                    {tag}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
        <div className="select-social-right w-1/2 flex justify-center mt-8">
          <div className="select-social-head text-3xl">
            Select Social Platform
            <div className="select-social-body m-4">
              <div className="selected-social-icons flex justify-center gap-8 my-4">
                {/* <button className="social-icon border border-orange-600 rounded-lg">
                <svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="80" height="80" viewBox="0 0 48 48">
<radialGradient id="yOrnnhliCrdS2gy~4tD8ma_Xy10Jcu1L2Su_gr1" cx="19.38" cy="42.035" r="44.899" gradientUnits="userSpaceOnUse"><stop offset="0" stop-color="#fd5"></stop><stop offset=".328" stop-color="#ff543f"></stop><stop offset=".348" stop-color="#fc5245"></stop><stop offset=".504" stop-color="#e64771"></stop><stop offset=".643" stop-color="#d53e91"></stop><stop offset=".761" stop-color="#cc39a4"></stop><stop offset=".841" stop-color="#c837ab"></stop></radialGradient><path fill="url(#yOrnnhliCrdS2gy~4tD8ma_Xy10Jcu1L2Su_gr1)" d="M34.017,41.99l-20,0.019c-4.4,0.004-8.003-3.592-8.008-7.992l-0.019-20	c-0.004-4.4,3.592-8.003,7.992-8.008l20-0.019c4.4-0.004,8.003,3.592,8.008,7.992l0.019,20	C42.014,38.383,38.417,41.986,34.017,41.99z"></path><radialGradient id="yOrnnhliCrdS2gy~4tD8mb_Xy10Jcu1L2Su_gr2" cx="11.786" cy="5.54" r="29.813" gradientTransform="matrix(1 0 0 .6663 0 1.849)" gradientUnits="userSpaceOnUse"><stop offset="0" stop-color="#4168c9"></stop><stop offset=".999" stop-color="#4168c9" stop-opacity="0"></stop></radialGradient><path fill="url(#yOrnnhliCrdS2gy~4tD8mb_Xy10Jcu1L2Su_gr2)" d="M34.017,41.99l-20,0.019c-4.4,0.004-8.003-3.592-8.008-7.992l-0.019-20	c-0.004-4.4,3.592-8.003,7.992-8.008l20-0.019c4.4-0.004,8.003,3.592,8.008,7.992l0.019,20	C42.014,38.383,38.417,41.986,34.017,41.99z"></path><path fill="#fff" d="M24,31c-3.859,0-7-3.14-7-7s3.141-7,7-7s7,3.14,7,7S27.859,31,24,31z M24,19c-2.757,0-5,2.243-5,5	s2.243,5,5,5s5-2.243,5-5S26.757,19,24,19z"></path><circle cx="31.5" cy="16.5" r="1.5" fill="#fff"></circle><path fill="#fff" d="M30,37H18c-3.859,0-7-3.14-7-7V18c0-3.86,3.141-7,7-7h12c3.859,0,7,3.14,7,7v12	C37,33.86,33.859,37,30,37z M18,13c-2.757,0-5,2.243-5,5v12c0,2.757,2.243,5,5,5h12c2.757,0,5-2.243,5-5V18c0-2.757-2.243-5-5-5H18z"></path>
</svg>
                </button> */}
                <button
                  className={`social-icon ${
                    selectedIcons.includes("Instagram") ? "selected" : ""
                  }`}
                  onClick={() => toggleIconSelection("Instagram")}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    x="0px"
                    y="0px"
                    width="80"
                    height="80"
                    viewBox="0 0 48 48"
                  >
                    <radialGradient
                      id="yOrnnhliCrdS2gy~4tD8ma_Xy10Jcu1L2Su_gr1"
                      cx="19.38"
                      cy="42.035"
                      r="44.899"
                      gradientUnits="userSpaceOnUse"
                    >
                      <stop offset="0" stop-color="#fd5"></stop>
                      <stop offset=".328" stop-color="#ff543f"></stop>
                      <stop offset=".348" stop-color="#fc5245"></stop>
                      <stop offset=".504" stop-color="#e64771"></stop>
                      <stop offset=".643" stop-color="#d53e91"></stop>
                      <stop offset=".761" stop-color="#cc39a4"></stop>
                      <stop offset=".841" stop-color="#c837ab"></stop>
                    </radialGradient>
                    <path
                      fill="url(#yOrnnhliCrdS2gy~4tD8ma_Xy10Jcu1L2Su_gr1)"
                      d="M34.017,41.99l-20,0.019c-4.4,0.004-8.003-3.592-8.008-7.992l-0.019-20	c-0.004-4.4,3.592-8.003,7.992-8.008l20-0.019c4.4-0.004,8.003,3.592,8.008,7.992l0.019,20	C42.014,38.383,38.417,41.986,34.017,41.99z"
                    ></path>
                    <radialGradient
                      id="yOrnnhliCrdS2gy~4tD8mb_Xy10Jcu1L2Su_gr2"
                      cx="11.786"
                      cy="5.54"
                      r="29.813"
                      gradientTransform="matrix(1 0 0 .6663 0 1.849)"
                      gradientUnits="userSpaceOnUse"
                    >
                      <stop offset="0" stop-color="#4168c9"></stop>
                      <stop
                        offset=".999"
                        stop-color="#4168c9"
                        stop-opacity="0"
                      ></stop>
                    </radialGradient>
                    <path
                      fill="url(#yOrnnhliCrdS2gy~4tD8mb_Xy10Jcu1L2Su_gr2)"
                      d="M34.017,41.99l-20,0.019c-4.4,0.004-8.003-3.592-8.008-7.992l-0.019-20	c-0.004-4.4,3.592-8.003,7.992-8.008l20-0.019c4.4-0.004,8.003,3.592,8.008,7.992l0.019,20	C42.014,38.383,38.417,41.986,34.017,41.99z"
                    ></path>
                    <path
                      fill="#fff"
                      d="M24,31c-3.859,0-7-3.14-7-7s3.141-7,7-7s7,3.14,7,7S27.859,31,24,31z M24,19c-2.757,0-5,2.243-5,5	s2.243,5,5,5s5-2.243,5-5S26.757,19,24,19z"
                    ></path>
                    <circle cx="31.5" cy="16.5" r="1.5" fill="#fff"></circle>
                    <path
                      fill="#fff"
                      d="M30,37H18c-3.859,0-7-3.14-7-7V18c0-3.86,3.141-7,7-7h12c3.859,0,7,3.14,7,7v12	C37,33.86,33.859,37,30,37z M18,13c-2.757,0-5,2.243-5,5v12c0,2.757,2.243,5,5,5h12c2.757,0,5-2.243,5-5V18c0-2.757-2.243-5-5-5H18z"
                    ></path>
                  </svg>
                </button>

                {/* <button className="social-icon">
                <svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="80" height="80" viewBox="0 0 48 48">
<path fill="#039be5" d="M24 5A19 19 0 1 0 24 43A19 19 0 1 0 24 5Z"></path><path fill="#fff" d="M26.572,29.036h4.917l0.772-4.995h-5.69v-2.73c0-2.075,0.678-3.915,2.619-3.915h3.119v-4.359c-0.548-0.074-1.707-0.236-3.897-0.236c-4.573,0-7.254,2.415-7.254,7.917v3.323h-4.701v4.995h4.701v13.729C22.089,42.905,23.032,43,24,43c0.875,0,1.729-0.08,2.572-0.194V29.036z"></path>
</svg>
                </button> */}
                <button
                  className={`social-icon ${
                    selectedIcons.includes("Facebook") ? "selected" : ""
                  }`}
                  onClick={() => toggleIconSelection("Facebook")}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    x="0px"
                    y="0px"
                    width="80"
                    height="80"
                    viewBox="0 0 48 48"
                  >
                    <path
                      fill="#039be5"
                      d="M24 5A19 19 0 1 0 24 43A19 19 0 1 0 24 5Z"
                    ></path>
                    <path
                      fill="#fff"
                      d="M26.572,29.036h4.917l0.772-4.995h-5.69v-2.73c0-2.075,0.678-3.915,2.619-3.915h3.119v-4.359c-0.548-0.074-1.707-0.236-3.897-0.236c-4.573,0-7.254,2.415-7.254,7.917v3.323h-4.701v4.995h4.701v13.729C22.089,42.905,23.032,43,24,43c0.875,0,1.729-0.08,2.572-0.194V29.036z"
                    ></path>
                  </svg>
                </button>
              </div>
              <div className="social-icons flex justify-center gap-8 my-4">
                {/* <button className="social-icon">
                <svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="70" height="70" viewBox="0 0 48 48">
<path fill="#FF3D00" d="M43.2,33.9c-0.4,2.1-2.1,3.7-4.2,4c-3.3,0.5-8.8,1.1-15,1.1c-6.1,0-11.6-0.6-15-1.1c-2.1-0.3-3.8-1.9-4.2-4C4.4,31.6,4,28.2,4,24c0-4.2,0.4-7.6,0.8-9.9c0.4-2.1,2.1-3.7,4.2-4C12.3,9.6,17.8,9,24,9c6.2,0,11.6,0.6,15,1.1c2.1,0.3,3.8,1.9,4.2,4c0.4,2.3,0.9,5.7,0.9,9.9C44,28.2,43.6,31.6,43.2,33.9z"></path><path fill="#FFF" d="M20 31L20 17 32 24z"></path>
</svg>
                </button> */}
                <button
                  className={`social-icon ${
                    selectedIcons.includes("Youtube") ? "selected" : ""
                  }`}
                  onClick={() => toggleIconSelection("Youtube")}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    x="0px"
                    y="0px"
                    width="70"
                    height="70"
                    viewBox="0 0 48 48"
                  >
                    <path
                      fill="#FF3D00"
                      d="M43.2,33.9c-0.4,2.1-2.1,3.7-4.2,4c-3.3,0.5-8.8,1.1-15,1.1c-6.1,0-11.6-0.6-15-1.1c-2.1-0.3-3.8-1.9-4.2-4C4.4,31.6,4,28.2,4,24c0-4.2,0.4-7.6,0.8-9.9c0.4-2.1,2.1-3.7,4.2-4C12.3,9.6,17.8,9,24,9c6.2,0,11.6,0.6,15,1.1c2.1,0.3,3.8,1.9,4.2,4c0.4,2.3,0.9,5.7,0.9,9.9C44,28.2,43.6,31.6,43.2,33.9z"
                    ></path>
                    <path fill="#FFF" d="M20 31L20 17 32 24z"></path>
                  </svg>
                </button>

                {/* <button className="social-icon flex">
                <svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="80" height="80" viewBox="0 0 48 48">
<path fill="#212121" fill-rule="evenodd" d="M38,42H10c-2.209,0-4-1.791-4-4V10c0-2.209,1.791-4,4-4h28	c2.209,0,4,1.791,4,4v28C42,40.209,40.209,42,38,42z" clip-rule="evenodd"></path><path fill="#fff" d="M34.257,34h-6.437L13.829,14h6.437L34.257,34z M28.587,32.304h2.563L19.499,15.696h-2.563 L28.587,32.304z"></path><polygon fill="#fff" points="15.866,34 23.069,25.656 22.127,24.407 13.823,34"></polygon><polygon fill="#fff" points="24.45,21.721 25.355,23.01 33.136,14 31.136,14"></polygon>
</svg>
                </button> */}

                <button
                  className={`social-icon ${
                    selectedIcons.includes("Twitter") ? "selected" : ""
                  }`}
                  onClick={() => toggleIconSelection("Twitter")}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    x="0px"
                    y="0px"
                    width="80"
                    height="80"
                    viewBox="0 0 48 48"
                  >
                    <path
                      fill="#212121"
                      fill-rule="evenodd"
                      d="M38,42H10c-2.209,0-4-1.791-4-4V10c0-2.209,1.791-4,4-4h28	c2.209,0,4,1.791,4,4v28C42,40.209,40.209,42,38,42z"
                      clip-rule="evenodd"
                    ></path>
                    <path
                      fill="#fff"
                      d="M34.257,34h-6.437L13.829,14h6.437L34.257,34z M28.587,32.304h2.563L19.499,15.696h-2.563 L28.587,32.304z"
                    ></path>
                    <polygon
                      fill="#fff"
                      points="15.866,34 23.069,25.656 22.127,24.407 13.823,34"
                    ></polygon>
                    <polygon
                      fill="#fff"
                      points="24.45,21.721 25.355,23.01 33.136,14 31.136,14"
                    ></polygon>
                  </svg>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="upload-next flex justify-end">
        <button
          onClick={handleSubmit}
          className="next-button bg-orange-600 p-3 w-36 rounded-xl"
        >
          Upload
        </button>
      </div>
    </div>
  );
}
