import React, { useEffect } from "react";
import "../../../styles/modal.css";
import Link from "next/link";

interface props {
  openModal: boolean;
  modalValue: any;
  setOpenModal: React.Dispatch<boolean>
}

export default function HomeModal({ openModal, modalValue, setOpenModal }: props) {
  return (
    <div>
      {openModal && (
        <div id="myModal" className="modal overflow-y-auto overflow-x-hidden fixed top-0 right-0 left-0 z-50 justify-center items-center w-full md:inset-0 h-[calc(100%-1rem)] max-h-full">
          <div id="modal-main-content" className="w-full max-w-2xl max-h-full rounded-xl">
            <div className="modal-header">
              <h1 id="selectedDate" className="modal-title">
                Pick Difficulty To Solve:
              </h1>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div className="h-32 bg-white flex justify-center items-center">
                <div className="flex gap-2 justify-center">
                  <Link
                    href={`sudoku/${modalValue["easy"]["date"]}-easy`}
                    className="list-group-item list-group-item-action list-group-item-success modal-body-diff-options modal-difficulty bg-green-100 border-2 border-green-200 !text-green-800 hover:bg-green-300 rounded-lg flex items-center justify-center">
                    Easy
                  </Link>
                  <Link
                    href={`sudoku/${modalValue["easy"]["date"]}-medium`}
                    className="list-group-item list-group-item list-group-item-warning modal-body-diff-options modal-difficulty bg-orange-100 border-2 border-orange-200 !text-orange-800 hover:bg-orange-300 rounded-lg flex items-center justify-center">
                    Medium
                  </Link>
                  <Link
                    href={`sudoku/${modalValue["easy"]["date"]}-hard`}
                    className="list-group-item list-group-item-action list-group-item-danger modal-body-diff-options modal-difficulty bg-red-100 border-2 border-red-200 !text-red-800 hover:bg-red-300 rounded-lg flex items-center justify-center">
                    Hard
                  </Link>
                </div>
            </div>
            <div className="modal-footer !p-4">
              <button
                type="button"
                className="btn btn-secondary"
                data-bs-dismiss="modal"
                onClick={() => setOpenModal(!openModal)}
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
