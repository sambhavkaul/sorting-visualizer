import React, { Component } from "react";
import getBubbleSortAnimations from "./algorithms/BubbleSort";
import getSelectionSortAnimations from "./algorithms/SelectionSort";

const ANIMATION_SPEED = 0.7;
const NUMBER_OF_BARS = 180;

class SortingVisual extends Component {
  state = {
    array: []
  };

  componentDidMount() {
    this.resetArray();
  }

  resetArray = () => {
    const array = [];
    for (let i = 0; i < NUMBER_OF_BARS; i++) {
      array.push(randomIntFromInterval(5, 800));
    }
    this.setState({ array });
  };

  bubbleSort = () => {
    const [animations, sortArray] = getBubbleSortAnimations(this.state.array);
    for (let i = 0; i < animations.length; i++) {
      const arrayBars = document.getElementsByClassName("array-bar");
      const isColorChange = i % 4 === 0 || i % 4 === 1;
      if (isColorChange) {
        const [barOneIdx, barTwoIdx] = animations[i];
        const barOneStyle = arrayBars[barOneIdx].style;
        const barTwoStyle = arrayBars[barTwoIdx].style;
        const color = i % 4 === 0 ? "red" : "cyan";
        setTimeout(() => {
          barOneStyle.backgroundColor = color;
          barTwoStyle.backgroundColor = color;
        }, i * ANIMATION_SPEED);
      } else {
        const [barIndex, newHeight] = animations[i];
        if (barIndex === -1) {
          continue;
        }
        const barStyle = arrayBars[barIndex].style;
        setTimeout(() => {
          barStyle.height = `${newHeight}px`;
        }, i * ANIMATION_SPEED);
      }
    }
  };

  selectionSort = () => {
    const [animations, sortArray] = getSelectionSortAnimations(
      this.state.array
    );
    for (let i = 0; i < animations.length; i++) {
      const isColorChange =
        animations[i][0] === "comparision1" ||
        animations[i][0] === "comparision2";
      const arrayBars = document.getElementsByClassName("array-bar");
      if (isColorChange === true) {
        const color = animations[i][0] === "comparision1" ? "red" : "cyan";
        const [temp, barOneIndex, barTwoIndex] = animations[i];
        const barOneStyle = arrayBars[barOneIndex].style;
        const barTwoStyle = arrayBars[barTwoIndex].style;
        setTimeout(() => {
          barOneStyle.backgroundColor = color;
          barTwoStyle.backgroundColor = color;
        }, i * ANIMATION_SPEED);
      } else {
        const [temp, barIndex, newHeight] = animations[i];
        const barStyle = arrayBars[barIndex].style;
        setTimeout(() => {
          barStyle.height = `${newHeight}px`;
        }, i * ANIMATION_SPEED);
      }
    }
  };

  render() {
    const { array } = this.state;

    return (
      <>
        <div className="nav-bar">
          <span>Sorting Visualizer</span>
          <button className="button" onClick={() => this.resetArray()}>
            {" "}
            Generate New Array
          </button>
          <button className="button" onClick={() => this.bubbleSort()}>
            {" "}
            Bubble Sort
          </button>
          <button className="button" onClick={() => this.selectionSort()}>
            {" "}
            Selection Sort
          </button>{" "}
          <button className="button" onClick={() => this.selectionSort()}>
            {" "}
            Insertion Sort
          </button>
          <button className="button" onClick={() => this.selectionSort()}>
            {" "}
            Merge Sort
          </button>{" "}
          <button className="button" onClick={() => this.selectionSort()}>
            {" "}
            Quick Sort
          </button>{" "}
          <button className="button" onClick={() => this.selectionSort()}>
            {" "}
            Heap Sort
          </button>
        </div>

        <div className="array-container">
          {array.map((value, idx) => (
            <div
              className="array-bar"
              key={idx}
              style={{ height: `${value}px` }}
            ></div>
          ))}
        </div>
      </>
    );
  }
}

function randomIntFromInterval(min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min);
}

export default SortingVisual;
