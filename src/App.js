import React, { useRef, useEffect, useState } from "react";
import InputRange from "react-input-range";

import Logo from "./Logo";
import bubbleSortVisualiser from "./sortingAlgorithms/bubbleSort.js";
import mergeSortVisualiser from "./sortingAlgorithms/mergeSort.js";
import quickSortAnimation from "./sortingAlgorithms/quickSort.js";
import selectionSortVisualiser from "./sortingAlgorithms/selectionSort";
import insertionSortVisualiser from "./sortingAlgorithms/insertionSort";

import "react-input-range/lib/css/index.css";
import "./App.scss";

const PRIMARY_COLOR = "#03c4a1";
const SECONDARY_COLOR = "#f3c623";
const BAR_COLOR = "#150485";

function App() {
  const contentRef = useRef(null);
  const buttonsRef = useRef(null);
  const panelRef = useRef(null);

  const [array, setArray] = useState([]);
  const [size, setSize] = useState(50);
  const [speed, setSpeed] = useState(5);
  const [barDimension, setBarDimension] = useState({});
  const [height, setHeight] = useState(100);
  const [width, setWidth] = useState(100);
  const [windowHeight, setWindowHeight] = useState(window.innerHeight);
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    console.log("UseEffect executed");
    setDimensition();
    resetArray();
  }, [windowHeight, windowWidth]);

  const setDimensition = () => {
    let width = Math.floor(contentRef.current.offsetWidth);
    setWidth(width);

    let height = Math.floor(contentRef.current.offsetHeight);
    setHeight(height);

    if (isLoading) {
      panel(isLoading);
    }
  };

  const barDimensionHandler = () => {
    let barHeight = 0.8 * height;
    let barWidth = 0.8 * width;
    let barMargin = 0.1 * width;

    setBarDimension({ width: barWidth, height: barHeight, margin: barMargin });
  };

  window.addEventListener("resize", () => {
    if (
      windowHeight !== window.innerHeight ||
      windowWidth !== window.innerWidth
    ) {
      setWindowHeight(window.innerHeight);
      setWindowWidth(window.innerWidth);
    }
    window.location.reload();
  });

  const resetArray = (method) => {
    barDimensionHandler();

    let updatedSize = size;

    if (method === "inc" && updatedSize < 150) {
      updatedSize = updatedSize + 10;
    }

    if (method === "dec" && updatedSize > 20) {
      updatedSize = updatedSize - 10;
    }

    let updatedArray = [];
    let barHeight = barDimension.height;

    for (let i = 0; i < updatedSize; i++) {
      updatedArray.push(rand(10, barHeight));
    }

    setSize(updatedSize);
    setArray(updatedArray);
  };

  const panel = (isSorting) => {
    const panelStyle = panelRef.current.style;
    const buttonPanelStyle = buttonsRef.current.style;

    if (isSorting) {
      panelStyle.pointerEvents = "none";
      panelStyle.opacity = "0.7";
      buttonPanelStyle.pointerEvents = "none";
      buttonPanelStyle.opacity = "0.7";
    } else {
      panelStyle.pointerEvents = "auto";
      panelStyle.opacity = "1";
      buttonPanelStyle.pointerEvents = "auto";
      buttonPanelStyle.opacity = "1";

      const blocks = document.getElementsByClassName("blocks");

      let size = array.length;

      for (let i = 0; i < size; i++) {
        setTimeout(
          () => (blocks[i].style.backgroundColor = BAR_COLOR),
          i * speed
        );
      }
    }
  };

  // Bubble Sort
  const bubbleSort = () => {
    panel(true);

    const animation = bubbleSortVisualiser(array);

    for (let i = 0; i < animation.length; i++) {
      const block = document.getElementsByClassName("blocks");
      const isColorChange = i % 4 < 2;

      if (isColorChange) {
        const [barOneIdx, barTwoIdx] = animation[i];
        const barOneStyle = block[barOneIdx].style;
        const barTwoStyle = block[barTwoIdx].style;

        const color = i % 4 === 0 ? SECONDARY_COLOR : PRIMARY_COLOR;
        setTimeout(() => {
          barOneStyle.backgroundColor = color;
          barTwoStyle.backgroundColor = color;
        }, i * speed);
      } else {
        setTimeout(() => {
          const [barOneIdx, barHeight] = animation[i];
          const barOneStyle = block[barOneIdx].style;
          barOneStyle.height = `${barHeight}px`;
        }, i * speed);
      }
    }

    const RESET_TIME = parseInt(speed * animation.length);
    setTimeout(() => panel(false), RESET_TIME);
  };

  // Selection Sort
  const selectionSort = () => {
    panel(true);

    const animation = selectionSortVisualiser(array);

    for (let i = 0; i < animation.length; i++) {
      const block = document.getElementsByClassName("blocks");
      const isColorChange = i % 4 < 2;

      if (isColorChange) {
        const [barOneIdx, barTwoIdx] = animation[i];
        const barOneStyle = block[barOneIdx].style;
        const barTwoStyle = block[barTwoIdx].style;

        const color = i % 4 === 0 ? SECONDARY_COLOR : PRIMARY_COLOR;

        setTimeout(() => {
          barOneStyle.backgroundColor = color;
          barTwoStyle.backgroundColor = color;
        }, i * speed);
      } else {
        const [barOneIdx, barHeight] = animation[i];
        const barOneStyle = block[barOneIdx].style;

        setTimeout(() => {
          barOneStyle.height = `${barHeight}px`;
        }, i * speed);
      }
    }

    const RESET_TIME = parseInt(speed * animation.length);
    setTimeout(() => panel(false), RESET_TIME);
  };

  // Insertion Sort
  const insertionSort = () => {
    panel(true);

    const animation = insertionSortVisualiser(array);
    let i;
    for (i = 0; i < animation.length; i++) {
      const block = document.getElementsByClassName("blocks");
      const isColorChange = i % 3 < 2;

      if (isColorChange) {
        const [barOneIdx, barTwoIdx] = animation[i];
        const barOneStyle = block[barOneIdx].style;
        const barTwoStyle = block[barTwoIdx].style;
        const color = i % 3 === 0 ? SECONDARY_COLOR : PRIMARY_COLOR;

        setTimeout(() => {
          barOneStyle.backgroundColor = color;
          barTwoStyle.backgroundColor = color;
        }, i * speed);
      } else {
        const [barOneIdx, barHeight] = animation[i];
        const barOneStyle = block[barOneIdx].style;

        setTimeout(() => {
          barOneStyle.height = `${barHeight}px`;
        }, i * speed);
      }
    }

    const RESET_TIME = parseInt(speed * animation.length);
    setTimeout(() => panel(false), RESET_TIME);
  };

  // Merge Sort
  const mergeSort = () => {
    panel(true);

    const animation = mergeSortVisualiser(array);
    let totalTime = 0;

    for (let i = 0; i < animation.length; i++) {
      const block = document.getElementsByClassName("blocks");
      const isColorChange = i % 3 !== 2;

      if (isColorChange) {
        const [barOneIdx, barTwoIdx] = animation[i];
        const barOneStyle = block[barOneIdx].style;
        const barTwoStyle = block[barTwoIdx].style;

        const color = i % 3 === 0 ? SECONDARY_COLOR : PRIMARY_COLOR;

        setTimeout(() => {
          barOneStyle.backgroundColor = color;
          barTwoStyle.backgroundColor = color;
        }, i * speed);
      } else {
        setTimeout(() => {
          const [barOneIdx, barHeight] = animation[i];
          const barOneStyle = block[barOneIdx].style;
          barOneStyle.height = `${barHeight}px`;
        }, i * speed);
      }
      totalTime = totalTime + i * speed;
    }

    const RESET_TIME = parseInt(speed * animation.length);
    setTimeout(() => panel(false), RESET_TIME);
  };

  // Quick Sort
  const quickSort = () => {
    panel(true);

    const animation = quickSortAnimation(array);

    for (let i = 0; i < animation.length; i++) {
      const block = document.getElementsByClassName("blocks");

      const isColorChange = i % 4 < 2;

      if (isColorChange) {
        const [barOneIdx, barTwoIdx] = animation[i];
        const barOneStyle = block[barOneIdx].style;
        const barTwoStyle = block[barTwoIdx].style;

        const color = i % 4 === 0 ? SECONDARY_COLOR : PRIMARY_COLOR;

        setTimeout(() => {
          barOneStyle.backgroundColor = color;
          barTwoStyle.backgroundColor = color;
        }, i * speed);
      } else {
        const [barOneIdx, barHeight] = animation[i];
        const barOneStyle = block[barOneIdx].style;

        setTimeout(() => {
          barOneStyle.height = `${barHeight}px`;
        }, i * speed);
      }
    }

    const RESET_TIME = parseInt(speed * animation.length);
    setTimeout(() => panel(false), RESET_TIME);
  };

  return (
    <div className="App">
      <div className="Layout">
        <div className="Top">
          <ul className="Header">
            <a href="/">
              <li className="Logo">
                <Logo />
              </li>
              <li>
                <h1 className="Title">
                  Sorting<span className="Title__part"> Visualiser</span>
                </h1>
              </li>
            </a>
          </ul>
        </div>
        <div className="Content" id="content" ref={contentRef}>
          {isLoading && (
            <span
              className="Button Button__generate"
              onClick={() => {
                setIsLoading(false);
                resetArray();
                panel(false);
              }}
            >
              Generate Array
            </span>
          )}
          {!isLoading && (
            <div className="Bars">
              {array.map((value, index) => (
                <div
                  className="blocks"
                  key={index}
                  style={{
                    width: `${barDimension.width / array.length}px`,
                    height: `${value}px`,
                    margin: `0px ${barDimension.margin / array.length}px`,
                    backgroundColor: `${BAR_COLOR}`,
                  }}
                ></div>
              ))}
            </div>
          )}
        </div>
        <div className="Left" ref={panelRef}>
          <ul className="Size">
            <li>
              <h2 className="SubHeading">Array Size</h2>
            </li>
            <li>
              <span className="SmallButton" onClick={() => resetArray("dec")}>
                -
              </span>
              <label className="Label" style={{ margin: "0 1em" }}>
                {size}
              </label>
              <span className="SmallButton" onClick={() => resetArray("inc")}>
                +
              </span>
            </li>
          </ul>
          <ul className="Speed">
            <li
              style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <h2 className="SubHeading">Speed</h2>
              <label className="Label" style={{ margin: "0 1em" }}>
                {speed} ms
              </label>
            </li>
            <li>
              <InputRange
                step={10}
                maxValue={200}
                minValue={5}
                value={speed}
                onChange={(value) => setSpeed(value)}
              />
            </li>
          </ul>
        </div>

        <div className="Buttons" ref={buttonsRef}>
          <span className="Button" onClick={() => mergeSort()}>
            Merge Sort
          </span>
          <span className="Button" onClick={() => quickSort()}>
            Quick Sort
          </span>
          <span className="Button" onClick={() => selectionSort()}>
            Selection Sort
          </span>
          <span className="Button" onClick={() => insertionSort()}>
            Insertion Sort
          </span>
          <span className="Button" onClick={() => bubbleSort()}>
            Bubble Sort
          </span>
          <span className="Button Button__reset" onClick={() => resetArray()}>
            Reset Array
          </span>
        </div>
      </div>
    </div>
  );
}

function rand(min, max) {
  let randonNum = Math.random() * (max - min) + min;

  return Math.round(randonNum);
}

export default App;
