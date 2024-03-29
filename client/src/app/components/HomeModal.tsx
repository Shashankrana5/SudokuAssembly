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
        <div id="myModal" className="modal ">
          <div className="modal-content">
            <div className="modal-header ">
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
            <div className="modal-body">
              <div className="list-group modal-body-diff-container gap-1">
                <Link
                  href={`sudoku/${modalValue["easy"]["date"]}-easy`}
                  className="list-group-item list-group-item-action list-group-item-success modal-body-diff-options modal-difficulty modal-easy rounded-lg !text-slate-500"
                >
                  Easy
                </Link>
                <Link
                  href={`sudoku/${modalValue["easy"]["date"]}-medium`}
                  className="list-group-item list-group-item list-group-item-warning modal-body-diff-options modal-difficulty modal-medium rounded-lg !text-slate-500"
                >
                  Medium
                </Link>
                <Link
                  href={`sudoku/${modalValue["easy"]["date"]}-hard`}
                  className="list-group-item list-group-item-action list-group-item-danger modal-body-diff-options modal-difficulty modal-hard rounded-lg !text-slate-500"
                >
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
