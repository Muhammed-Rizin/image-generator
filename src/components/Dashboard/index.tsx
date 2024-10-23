"use client";

import { useState } from "react";
import Image from "next/image";

import { post } from "@/axios/helper";

import "./styles.css";

const Dashboard = () => {
  const [text, setText] = useState("");
  const [image, setImage] = useState("");

  const [generating, setGenerating] = useState(false);

  const generateImage = async () => {
    try {
      setImage("");
      setGenerating(true);

      const response = await post(`image/generate`, { text });
      setImage(`data:image/jpeg;base64,${response.data}`);
    } catch (error) {
      console.error("Error generating image:", error);
    } finally {
      setGenerating(false);
    }
  };

  const handleInput = (e: React.ChangeEvent<HTMLInputElement>) => setText(e.target.value);

  return (
    <div className="container">
      <div className="main-container">
        <div className="title-and-input">
          <div className="text-and-cat">
            <h3>Welcome! Start Generating Now!</h3>
            <Image
              className="dancing-cat"
              src="/assets/cat-dancing.gif"
              alt="Dancing Cat"
              width={60}
              height={60}
            />
          </div>

          <div id="input-field">
            <input
              type="text"
              value={text}
              onChange={handleInput}
              placeholder="e.g., a cow wearing sunglasses"
              className="input"
            />
            <button
              onClick={generateImage}
              className={`generate-button ${generating ? "opacity-50 cursor-not-allowed" : ""}`}
              disabled={generating}
            >
              {generating ? (
                <>
                  <Image
                    src="/assets/spinner.svg"
                    alt="Loading Spinner"
                    width={20}
                    height={20}
                    className="animate-spin -ml-1 mr-3"
                  />
                  Generating...
                </>
              ) : (
                "Generate"
              )}
            </button>
          </div>
        </div>

        <Image
          className="generated-image"
          alt="Generated Art"
          src={generating ? "/assets/drawing.gif" : image || "/assets/cow.png"}
          width={400}
          height={400}
        />
      </div>
    </div>
  );
};

export default Dashboard;
