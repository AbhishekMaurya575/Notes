import React from 'react'
import { useCallback, useEffect, useRef, useState } from "react";
import { FaCheck } from "react-icons/fa";
import { FaCircle } from "react-icons/fa";
import { FaTrash } from "react-icons/fa";
import { FaCopy } from "react-icons/fa";
import { FaCamera } from "react-icons/fa";
import { FaPlus } from "react-icons/fa";
import html2canvas from "html2canvas";

const Home = () => {
    const [maintextarea, setMaintextarea] = useState([]);
  const [backgroundColor, setBackgroundColor] = useState("royalblue");
  const [sunColor, setSunColor] = useState("yellow");
  const [bodycolor, setBodycolor] = useState("#cfead9");
  const [image, setImage] = useState("src\\assets\\sunimage.png");
  const [sunplace, setSunplace] = useState("0px");

  const newtask = useCallback(() => {
    let boxnumber = Math.floor(Math.random() * 9999999);
    setMaintextarea((prev) => [
      ...prev,
      {
        id: boxnumber,
        content: "",
        bold: false,
        italic: false,
        underline: false,
        color: "gray",
        display: "none",
      },
    ]);
  }, []);

  const handleTextareaChange = (id, value) => {
    setMaintextarea((prev) =>
      prev.map((textarea) =>
        textarea.id === id ? { ...textarea, content: value } : textarea
      )
    );
  };

  const toggleBold = (id) => {
    setMaintextarea((prev) =>
      prev.map((textarea) =>
        textarea.id === id ? { ...textarea, bold: !textarea.bold } : textarea
      )
    );
  };

  const toggleItalic = (id) => {
    setMaintextarea((prev) =>
      prev.map((textarea) =>
        textarea.id === id
          ? { ...textarea, italic: !textarea.italic }
          : textarea
      )
    );
  };

  const toggleUnderline = (id) => {
    setMaintextarea((prev) =>
      prev.map((textarea) =>
        textarea.id === id
          ? { ...textarea, underline: !textarea.underline }
          : textarea
      )
    );
  };
  const changecolor = (id, newColor) => {
    setMaintextarea((prev) =>
      prev.map((textarea) =>
        textarea.id === id ? { ...textarea, color: newColor } : textarea
      )
    );
  };

  const copy = (id) => {
    const textarea = maintextarea.find((textarea) => textarea.id === id);

    if (textarea) {
      navigator.clipboard.writeText(textarea.content);
    }
  };

  const clearid = (id) => {
    // setMaintextarea((prev) =>
    //   prev.map((textarea) =>
    //     textarea.id === id ? { ...textarea, content: "" } : textarea
    //   )
    // );
    // window.location.reload();

    const updatedArray = maintextarea.filter((note) => note.id !== id);
    setMaintextarea(updatedArray);
    localStorage.setItem(`textarea${id}`, JSON.stringify(updatedArray));

  };

  const showoptions = (id) => {
    setMaintextarea((prev) =>
      prev.map((textarea) =>
        textarea.id === id
          ? {
              ...textarea,
              display: textarea.display === "block" ? "none" : "block",
            }
          : textarea
      )
    );
  };

  const saveToLocalStorage = (id) => {
    const textarea = maintextarea.find((textarea) => textarea.id === id);
    if (textarea) {
      if (textarea.content.trim() === "") {
        localStorage.removeItem(`textarea${id}`);
      } else {
        localStorage.setItem(`textarea${id}`, JSON.stringify(textarea));
      }
    }
  };

  useEffect(() => {
    const savedTextareas = Object.keys(localStorage)
      .filter((key) => key.startsWith("textarea"))
      .map((key) => JSON.parse(localStorage.getItem(key)));
    setMaintextarea(savedTextareas);
  }, []);
  useEffect(() => {
    maintextarea.forEach((textarea) => {
      saveToLocalStorage(textarea.id);
    });
  }, [
    changecolor,
    toggleBold,
    toggleItalic,
    toggleUnderline,
    saveToLocalStorage,
    clearid,
  ]);
  const captureRef = useRef(null);
  const handleScreenshot = () => {
    html2canvas(captureRef.current).then((canvas) => {
      const imgData = canvas.toDataURL("image/png");
      const link = document.createElement("a");
      link.href = imgData;
      link.download = "screenshot.png";
      link.click();
      console.log("hi");
    });
  };
  return (
    <>
    <div ref={captureRef} className="bg-none  w-full h-screen">
      <nav
        className=" fixed px-2 py-4 sm:px-4 mt-0 sm:py-4 gap-2 flex text-white w-full h-[13vh] z-10"
        style={{ backgroundColor: backgroundColor }}
      >
        <button
          className="rounded-xl border-gray-300 border-2 bg-gray-500 flex justify-center items-center text-center w-[49vw] p-2 sm:p-4"
          onClick={newtask}
        >
          <FaPlus className="mr-1 h-[20px]" />
          Note
        </button>
        <button
          className="rounded-xl border-gray-300 border-2 bg-gray-500 flex justify-center items-center text-center w-[49vw] p-2 sm:p-4"
          onClick={handleScreenshot}
        >
          <FaCamera className="mr-2" />
          Screenshot
        </button>
      </nav>
      <div
        className=" pt-[14vh] justify-around p-[2vw] sm:px-[2vw] gap-2 grid sm:grid-cols-1 lg:grid-cols-3 overflow-y-scroll overflow-x-hidden h-screen"
        style={{ backgroundColor: bodycolor }}
      >
        {maintextarea.map((textarea) => (
          <div
            key={textarea.id}
            className={`h-[380px] sm:h-[300px] rounded-lg w-[96vw] sm:w-full bg-pink-100 pt-2 pb-0 text-xl`}
          >
            <div
              className="h-full rounded-b-md relative bg-pink-300"
              style={{ backgroundColor: textarea.color }}
            >
              <div className=" mt-[5px] absolute w-full ">
                <div className="bg-none float-right flex mr-[20px] gap-1">
                  <button
                    className="flex gap-1 "
                    onClick={() => showoptions(textarea.id)}
                  >
                    <FaCircle size={7} color="black" />
                    <FaCircle size={7} color="black" />
                    <FaCircle size={7} color="black" />
                  </button>
                </div>
                <div
                  style={{ display: textarea.display }}
                  onMouseLeave={() => showoptions(textarea.id)}
                >
                  <div className="mt-2 flex">
                    <button
                      className="h-[30px] w-full"
                      style={{ backgroundColor: "red" }}
                      onClick={() => changecolor(textarea.id, "red")}
                    ></button>
                    <button
                      className="h-[30px] w-full"
                      style={{ backgroundColor: "yellow" }}
                      onClick={() => changecolor(textarea.id, "yellow")}
                    ></button>
                    <button
                      className="h-[30px] w-full"
                      style={{ backgroundColor: "aqua" }}
                      onClick={() => changecolor(textarea.id, "aqua")}
                    ></button>
                    <button
                      className="h-[30px] w-full"
                      style={{ backgroundColor: "pink" }}
                      onClick={() => changecolor(textarea.id, "pink")}
                    ></button>
                    <button
                      className="h-[30px] w-full"
                      style={{ backgroundColor: "gray" }}
                      onClick={() => changecolor(textarea.id, "gray")}
                    ></button>
                    <button
                      className="h-[30px] w-full"
                      style={{ backgroundColor: "purple" }}
                      onClick={() => changecolor(textarea.id, "purple")}
                    ></button>
                  </div>
                  <div className="bg-gray-800 flex ">
                    <button
                      className="w-1/2 "
                      onClick={() => clearid(textarea.id)}
                    >
                      <FaTrash
                        size={20}
                        color="gray"
                        className="mx-[40%] m-2"
                      />
                    </button>
                    <button
                      className="w-1/2"
                      onClick={() => copy(textarea.id)}
                    >
                      <FaCopy
                        size={20}
                        color="gray"
                        className="mx-[40%] m-2"
                      />
                    </button>
                  </div>
                </div>
              </div>
              <textarea
                className="box bg-none w-full h-[82.3%] mb-0 outline-none p-2 resize-none"
                style={{
                  backgroundColor: textarea.color,
                  fontWeight: textarea.bold ? "bold" : "normal",
                  fontStyle: textarea.italic ? "italic" : "normal",
                  textDecorationLine: textarea.underline
                    ? "underline"
                    : "none",
                }}
                value={textarea.content}
                onChange={(e) =>
                  handleTextareaChange(textarea.id, e.target.value)
                }
              />
              <div className="bg-none mt-0 text-xl px-2 rounded-b-md w-full p-1 flexbox">
                <button
                  className="rounded-lg w-[20px] sm:w-[2.5vw] p-1 font-bold hover:bg-red-500"
                  onClick={() => toggleBold(textarea.id)}
                >
                  B
                </button>
                <button
                  className="rounded-lg w-[20px] sm:w-[2.5vw] p-1 italic hover:bg-red-500"
                  onClick={() => toggleItalic(textarea.id)}
                >
                  I
                </button>
                <button
                  className="rounded-lg w-[20px] sm:w-[2.5vw] p-1 underline hover:bg-red-500"
                  onClick={() => toggleUnderline(textarea.id)}
                >
                  U
                </button>
                <button
                  className="rounded-lg w-[30px] sm:w-[2.5vw] p-1 float-end hover:bg-red-500"
                  onClick={() => saveToLocalStorage(textarea.id)}
                >
                  <FaCheck size={25} color="green" />
                </button>
              </div>
            </div>
          </div>
        ))}
        <div className="bg-red-500 flexbox h-[22px] w-[40px] items-center rounded-full absolute bottom-6">
          <img
            src={image}
            className="h-[22px] w-[40px] items-center rounded-full absolute"
          ></img>
          <div className=" w-[20px] absolute h-[20px] justify-center items-center flex rounded-full">
            <input
              type="checkbox"
              onChange={() => {
                setBackgroundColor(
                  backgroundColor === "royalblue" ? "black" : "royalblue"
                );
                setBodycolor(bodycolor === "#cfead9" ? "#282828" : "#cfead9");
                setImage(
                  image === "src\\assets\\sunimage.png"
                    ? "src\\assets\\moonimage.png"
                    : "src\\assets\\sunimage.png"
                );
                setSunColor(sunColor === "yellow" ? "white" : "yellow");
                setSunplace(sunplace === "0px" ? "30px" : "0px");
              }}
              className="h-[20px] w-[20px]"
              style={{ opacity: "0%", marginLeft: sunplace }}
            />
          </div>
        </div>
      </div>
    </div>
  </>
  )
}

export default Home
