import "./App.css";
import React, { useState } from "react";
import "react-dropdown/style.css";
import Intro from './components/intro';
import Button from './components/button';
import MultiValueSelectColours from "./components/colourComponent";
import CustomDropdown from "./components/dropdownComponent";

function App() {
  const [useTheseColours, setUseTheseColours] = useState(true);
  const [selectedColours, setSelectedColours] = useState([]);
  const [speedType, setSpeedType] = useState([]);
  const [speedAmount, setSpeedAmount] = useState([]);
  const [dateType, setDateType] = useState([]);
  const [date, setSelectedDate] = useState("");
  const [hasLaser, setHasLaser] = useState(false);

  const handleChangeLaser = () => {
    setHasLaser(!hasLaser);
  };

  const handleChangeColours = () => {
    setUseTheseColours(!useTheseColours);
  };

  const submitOnClick = async () => {
    const queryInfo = {
      colours: selectedColours.map((colour) => colour.value),
      useTheseColours: useTheseColours,
      speedType: speedType.value,
      speedAmount: speedAmount,
      dateType: dateType.value,
      date: date,
      hasPulseLaser: hasLaser,
    };
    const response = await fetch("/send-query", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(queryInfo),
    });
    if (response.ok) {
      console.log("it worked");
    }
  };

  return (
<div className="App">
      <header className="App-header">
      < Intro />

        <form>
        <h3>Enter your choice of colours</h3>

          <div className="selectcolours">
            <div className="colour-check">
            <label>
            <input type="checkbox" onChange={handleChangeColours} />
            <span>
              Not these colours
            </span>
          </label>
          </div>
          <MultiValueSelectColours

        setSelectedColours={setSelectedColours}
        ></MultiValueSelectColours>
            </div>
          <h3>Enter your choice of speed</h3>
          <CustomDropdown
            dropdownOnChange={setSpeedType}
            setInputValue={setSpeedAmount}
            inputType="number"
            inputPlaceholder="Speed amount"
            options={["Less than", "More than", "Exactly"]}
            min="50"
            max="200"
          ></CustomDropdown>
          <h3>Enter your choice of production date</h3>

          <CustomDropdown
            dropdownOnChange={setDateType}
            setInputValue={setSelectedDate}
            inputType="date"
            inputPlaceholder="Date of production"
            options={["After", "Before", "On the exact date"]}
            min="1980-01-01"
            max="2021-01-01"
          ></CustomDropdown>
          <label>
            <input type="checkbox" onChange={handleChangeLaser} />
            <span>
              Has pulse laser
            </span>
          </label>
          <div className="sub-btn">

          <div type="submit" value="Send Query" onClick={submitOnClick}>
          <Button/>
          </div>
          </div>
          {/* <button type="submit" value="Send Query" onClick={submitOnClick}>
            Send Query
          </button> */}
        </form>
      </header>
    </div>
  );
}

export default App;
