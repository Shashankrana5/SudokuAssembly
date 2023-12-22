import "../../../styles/calendar.css";
import "../../../styles/modal.css";

import React, { useEffect, useState } from "react";
import HomeModal from "./HomeModal";

export default function Calendar({ allSudokus,  }: { allSudokus: any}) {

  const [collectionSudoku, setCollectionSudoku] = useState<any>({});

  const [selectedMonth, setSelectedMonth] = useState<number>(new Date().getMonth());
  const [selectedYear, setSelectedYear] = useState<number>(new Date().getFullYear());

  const [greyedCalendar, setGreyedCalendar] = useState<number[]>();
  const [validCalendar, setValidCalendar] = useState<number[]>();
  const [ openModal, setOpenModal ] = useState<boolean>(false);
  const [ modalVaulue, setModalValue ] = useState<any>({})

  const handleCalendarNavigation = (goLeft: boolean) => {
    let month = selectedMonth;
    let year = selectedYear;
    if (goLeft) month--;
    else month++;

    if (month < 0) {
      month = 11;
      year--;
    } else if (month > 11) {
      month = 0;
      year++;
    }

    setSelectedMonth(month);
    setSelectedYear(year);
  };

  const getDate = (monthInNumber: number) => {
    const numberToMonth: { [key: number]: string } = {
      0: "January",
      1: "February",
      2: "March",
      3: "April",
      4: "May",
      5: "June",
      6: "July",
      7: "August",
      8: "September",
      9: "October",
      10: "November",
      11: "December",
    };
    return numberToMonth[monthInNumber];
  };

  useEffect(() => {
    if (allSudokus) {
      let temp: any = {};
      for (const sudoku of allSudokus) {

        if (!(sudoku["date"] in temp)) {
          temp[sudoku["date"]] = new Object();
        }
        temp[sudoku["date"]][sudoku["level"]] = sudoku;

        setCollectionSudoku(temp);
      }
    }
  }, []);

  useEffect(() => {
    let year = selectedYear;
    let month = selectedMonth;
    let dayOne = new Date(year, month, 1).getDay();
    let lastDate = new Date(year, month + 1, 0).getDate();
    let lastMonthLast = new Date(year, month, 0).getDate();

    let temp: number[] = [];

    for (let i = dayOne; i > 0; i--) {
      temp.push(lastMonthLast--);
    }
    let temp2: number[] = [];

    for (let i = 1; i <= lastDate; i++) {
      temp2.push(i);
    }
    setGreyedCalendar(temp);
    setValidCalendar(temp2);
  }, [selectedMonth]);

  const isToday = (checkDay: number) => {
    const date = new Date();
    const day = date.getDate();
    const month = date.getMonth();
    const year = date.getFullYear();

    if (month === selectedMonth && year === selectedYear && day === checkDay) {
      return "active";
    }
    return "";
  };

  const handleValidCalendar = (day:number) => {
    if (collectionSudoku){
      setOpenModal(!openModal);
      setModalValue(collectionSudoku[""+selectedYear+"-"+(selectedMonth + 1)+"-"+day])
    }
  }

  return (
    <div className="main-content">
      <HomeModal openModal = {openModal} modalValue = {modalVaulue} setOpenModal={setOpenModal} />
      <div className="outside-container">
        <div className="calendar-container">
          <header className="calendar-header">
            <p className="calendar-current-date">
              {getDate(selectedMonth) + " " + selectedYear}
            </p>
            <div className="calendar-navigation">
              <span
                id="calendar-prev"
                className="material-symbols-rounded"
                onClick={() => handleCalendarNavigation(true)}
              >
                {/* chevron_left */}
                {"<"}
              </span>
              <span
                id="calendar-next"
                className="material-symbols-rounded"
                onClick={() => handleCalendarNavigation(false)}
              >
                {/* chevron_right */}
                {">"}
              </span>
            </div>
          </header>

          <div className="calendar-body">
            <ul className="calendar-weekdays">
              <li>Sun</li>
              <li>Mon</li>
              <li>Tue</li>
              <li>Wed</li>
              <li>Thu</li>
              <li>Fri</li>
              <li>Sat</li>
            </ul>
            <ul className="calendar-dates">
              {greyedCalendar &&
                greyedCalendar.map((val) => (
                  <li className="inactive" key={val}>
                    {val}
                  </li>
                ))}
              {validCalendar &&
                validCalendar.map(
                  (val) => {
                    if (
                      "" +
                        selectedYear +
                        "-" +
                        (selectedMonth + 1) +
                        "-" +
                        val in
                      collectionSudoku
                    ) {
                      return (
                        <li
                          className={`indivisual-date ${isToday(val)}`}
                          key={val}
                        >
                          <button
                            onClick={() => handleValidCalendar(val)}
                            type="button"
                            className="modal-opener"
                            data-bs-toggle="modal"
                            data-bs-target="#exampleModal"
                          >
                            {val}
                          </button>
                          <div className="difficulty-container">
                            <div className="easy"></div>
                            <div className="medium"></div>
                            <div className="hard"></div>
                          </div>
                        </li>
                      );
                    } else {
                      return (
                        <li
                          key={val}
                          className={`indivisual-date ${isToday(
                            val
                          )} no-puzzle-container`}
                        >
                          <button type="button" className="no-puzzle">
                            {val}
                          </button>
                          <div className="difficulty-container not-visible-difficulty-container">
                            <div className="easy"></div>
                            <div className="medium"></div>
                            <div className="hard"></div>
                          </div>
                        </li>
                      );
                    }
                  }
                )}
            </ul>
          </div>
        </div>
      </div>

    </div>
  );
}
