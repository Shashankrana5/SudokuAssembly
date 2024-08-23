import "../../../styles/calendar.css";
import "../../../styles/modal.css";

import React, { useEffect, useState } from "react";
import HomeModal from "./HomeModal";

export default function Calendar({ allSudokus, }: { allSudokus: any }) {

  const [collectionSudoku, setCollectionSudoku] = useState<any>({});

  const [selectedMonth, setSelectedMonth] = useState<number>(new Date().getMonth());
  const [selectedYear, setSelectedYear] = useState<number>(new Date().getFullYear());

  const [greyedCalendar, setGreyedCalendar] = useState<number[]>();
  const [validCalendar, setValidCalendar] = useState<number[]>();
  const [openModal, setOpenModal] = useState<boolean>(false);
  const [modalVaulue, setModalValue] = useState<any>({})

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
  
      return "bg-purple-700 hover:bg-purple-900 !text-gray-300";
    }
    return "";
  };

  const handleValidCalendar = (day: number) => {
    if (collectionSudoku) {
      setOpenModal(!openModal);
      setModalValue(collectionSudoku[("" + selectedYear + "-" + convertToTwoDigitString(selectedMonth + 1) + "-" + convertToTwoDigitString(day))])
    }
  }

  function convertToTwoDigitString(number: number) {
    return (number < 10) ? `0${number}` : `${number}`;
  }

  return (
    <div className="main-content">
      <HomeModal openModal={openModal} modalValue={modalVaulue} setOpenModal={setOpenModal} />
      <div className="outside-container">
        <div className="calendar-container p-8">
          <header className="calendar-header mb-5">
            <p className="font-extrabold text-2xl ml-2">
              {getDate(selectedMonth) + " " + selectedYear}
            </p>
            <div className="calendar-navigation">
              <span
                id="calendar-prev"
                className="material-symbols-rounded"
                onClick={() => handleCalendarNavigation(true)}
              >
                <svg className="w-10 h-10 text-gray-800 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
                  <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m14 8-4 4 4 4" />
                </svg>
              </span>
              <span
                id="calendar-next"
                className="material-symbols-rounded"
                onClick={() => handleCalendarNavigation(false)}
              >
<svg className="w-10 h-10 text-gray-800 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
  <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m10 16 4-4-4-4"/>
</svg>

              </span>
            </div>
          </header>
          <div className="grid grid-cols-7 gap-2">
            <div className="flex justify-center font-bold text-xl">Sun</div>
            <div className="flex justify-center font-bold text-xl">Mon</div>
            <div className="flex justify-center font-bold text-xl">Tue</div>
            <div className="flex justify-center font-bold text-xl">Wed</div>
            <div className="flex justify-center font-bold text-xl">Thu</div>
            <div className="flex justify-center font-bold text-xl">Fri</div>
            <div className="flex justify-center font-bold text-xl">Sat</div>

            {greyedCalendar && greyedCalendar.toReversed().map(val =>
              <div className="flex justify-center items-center" key={val}>
                <div className="2xl:h-28 2xl:w-28 h-20 w-20 rounded-full cursor-not-allowed flex justify-center items-center hover:bg-gray-100 text-gray-400 font-medium text-lg">
                  {val}
                </div>
              </div>
            )}
            {validCalendar && validCalendar.map((validDate) => {
              if (("" + selectedYear + "-" + convertToTwoDigitString(selectedMonth + 1) + "-" + convertToTwoDigitString(validDate)) in collectionSudoku) {
                return <div className="flex justify-center items-center" key={validDate}>
                  <button className={`relative 2xl:h-28 2xl:w-28 h-20 w-20 rounded-full cursor-pointer flex justify-center items-center hover:bg-gray-100 hover:text-slate-400 text-slate-700 font-medium text-lg ${isToday(validDate)}`}
                  
                    onClick={() => handleValidCalendar(validDate)}
                    data-bs-toggle="modal"
                    data-bs-target="#exampleModal">

                    {validDate}
                    <div className="hidden sm:block absolute bottom-1 2xl:bottom-3">
                      <span className="inline-block bg-green-500 w-2 h-2 rounded-full"></span>
                      <span className="inline-block bg-orange-500  w-2 h-2 rounded-full"></span>
                      <span className="inline-block bg-red-500  w-2 h-2 rounded-full"></span>
                    </div>
                  </button>
                </div>
              } else {

                return <div className="flex justify-center items-center" key={validDate}>
                  <div className={`2xl:h-28 2xl:w-28 h-20 w-20 rounded-full cursor-not-allowed flex justify-center items-center hover:bg-gray-100 text-gray-400 font-medium text-lg ${isToday(validDate)}`}>
                    {validDate}
                  </div>
                </div>
              }

            })
            }
          </div>
        </div>
      </div>

    </div>
  );
}
