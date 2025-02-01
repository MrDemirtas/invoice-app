import { InvoiceData, ScreenSize } from "../App";

import { useContext } from "react";

export default function HomePage() {
  const invoiceData = useContext(InvoiceData);
  const screenSize = useContext(ScreenSize);

  return (
    <main>
      <div className="home-page-header">
        <div className="home-page-titles">
          <h1>Invoices</h1>
          <h4>{invoiceData.data.length === 0 ? "No invoices" : `${invoiceData.data.length} invoices`}</h4>
        </div>
        <div className="home-page-interactions">
          <div className="home-page-filter">
            <button className="filter-dropdown-btn">
              <span>{screenSize > 768 ? "Filter by status" : "Filter"}</span>
              <img src="/svg/dropdownarrow.svg" />
            </button>
          </div>
          <button className="home-page-newBtn" onClick={() => (location.href = "#/new-invoice")}>
            <figure>
              <img src="/svg/new-plus.svg" />
            </figure>
            <span>{screenSize > 768 ? "New Invoice" : "New"}</span>
          </button>
        </div>
      </div>
      <Invoices invoiceData={invoiceData} />
    </main>
  );
}

function Invoices({ invoiceData }) {
  return <div className="invoices-contents">{invoiceData.data.length !== 0 ? invoiceData.data.map((invoice) => <Invoice key={invoice.id} {...invoice} />) : <NothingHere />}</div>;
}

function Invoice({ id, billTo, paymentDue, grandTotal, status }) {
  return (
    <div className="invoice-item" onClick={() => (location.href = `#/invoice/${id}`)}>
      <div className="invoice-header">
        <h3>
          <span>#</span>
          {id}
        </h3>
        <h4>{billTo.clientName}</h4>
      </div>
      <div className="invoice-info">
        <div className="invoice-data">
          <p>{paymentDue}</p>
          <h3>£ {grandTotal}</h3>
        </div>
        <span className={"invoice-status" + ` ${status.toLowerCase()}`}>
          <svg width="8" height="8" viewBox="0 0 8 8" xmlns="http://www.w3.org/2000/svg">
            <circle cx="4" cy="4" r="4" />
          </svg>
          {status}
        </span>
      </div>
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
