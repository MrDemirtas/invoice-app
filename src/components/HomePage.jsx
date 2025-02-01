import { InvoiceData, ScreenSize } from "../App";
import { useContext, useRef, useState } from "react";

import NewAndEditInvoice from "./NewAndEditInvoice";

export default function HomePage() {
  const invoiceData = useContext(InvoiceData);
  const screenSize = useContext(ScreenSize);
  const newInvoiceDialog = useRef(null);

  const [filter, setFilter] = useState([]);
  const [dropdown, setDropdown] = useState(false);

  function handleNewClick() {
    if (screenSize < 768) {
      location.href = "#/new-invoice";
    } else {
      newInvoiceDialog.current.showModal();
    }
  }

  return (
    <>
      <main>
        <div className="home-page-header">
          <div className="home-page-titles">
            <h1>Invoices</h1>
            <h4>{invoiceData.data.length === 0 ? "No invoices" : `${invoiceData.data.length} invoices`}</h4>
          </div>
          <div className="home-page-interactions">
            <div className="home-page-filter">
              <button className="filter-dropdown-btn" onClick={() => setDropdown(!dropdown)}>
                <span>{screenSize > 768 ? "Filter by status" : "Filter"}</span>
                <img src="/svg/dropdownarrow.svg" />
              </button>
              {dropdown && (
                <div className="filter-dropdown-menu">
                  <label>
                    <input type="checkbox" onChange={(e) => (e.target.checked ? setFilter([...filter, "Draft"]) : setFilter(filter.filter((x) => x !== "Draft")))} />
                    Draft
                  </label>
                  <label>
                    <input type="checkbox" onChange={(e) => (e.target.checked ? setFilter([...filter, "Pending"]) : setFilter(filter.filter((x) => x !== "Pending")))} />
                    Pending
                  </label>
                  <label>
                    <input type="checkbox" onChange={(e) => (e.target.checked ? setFilter([...filter, "Paid"]) : setFilter(filter.filter((x) => x !== "Paid")))} />
                    Paid
                  </label>
                </div>
              )}
            </div>
            <button className="home-page-newBtn" onClick={handleNewClick}>
              <figure>
                <img src="/svg/new-plus.svg" />
              </figure>
              <span>{screenSize > 768 ? "New Invoice" : "New"}</span>
            </button>
          </div>
        </div>
        <Invoices invoiceData={invoiceData.data.filter(item => filter.includes(item.status) || filter.length === 0)} />
      </main>
      <NewInvoiceTablet newInvoiceDialog={newInvoiceDialog} />
    </>
  );
}

function Invoices({ invoiceData }) {
  return <div className="invoices-contents">{invoiceData.length !== 0 ? invoiceData.map((invoice) => <Invoice key={invoice.id} {...invoice} />) : <NothingHere />}</div>;
}

function Invoice({ id, billTo, paymentDue, grandTotal, status }) {
  return (
    <div className="invoice-item" onClick={() => (location.href = `#/invoice/${id}`)}>
      <h3 className="invoice-id">
        <span>#</span>
        {id}
      </h3>
      <h4>{billTo.clientName}</h4>
      <p>Due {paymentDue}</p>
      <h3 className="invoice-grandTotal">£ {grandTotal}</h3>
      <span className={"invoice-status" + ` ${status.toLowerCase()}`}>
        <svg width="8" height="8" viewBox="0 0 8 8" xmlns="http://www.w3.org/2000/svg">
          <circle cx="4" cy="4" r="4" />
        </svg>
        {status}
      </span>
    </div>
  );
}

function NothingHere() {
  return (
    <div className="nothing-here-contents">
      <img src="/svg/nothing-here.svg" />
      <h1>There is nothing here</h1>
      <h4>
        Create an invoice by clicking the
        <strong> New</strong> button and get started
      </h4>
    </div>
  );
}

function NewInvoiceTablet({ newInvoiceDialog }) {
  return (
    <dialog ref={newInvoiceDialog} className="newAndEditDialog">
      <NewAndEditInvoice isDialog={newInvoiceDialog} />
    </dialog>
  );
}
