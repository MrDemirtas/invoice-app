import { useContext, useRef } from "react";

import { InvoiceData } from "../App";

export default function InvoiceDetails() {
  const deleteDialog = useRef(null);

  const invoiceData = useContext(InvoiceData);
  const id = location.hash.substring(1).split("/").at(-1);
  const currentInvoiceData = invoiceData.data.find((x) => x.id === id);
  if (!currentInvoiceData) {
    location.href = "#/";
    return;
  }
  
  function handleMarkPaid() {
    currentInvoiceData.status = "Paid";
    invoiceData.setData([...invoiceData.data]);
  }

  return (
    <>
      <div className="invoice-details">
        <button className="invoice-backBtn" onClick={() => (location.href = "#/")}>
          <img src="/svg/backarrow.svg" />
          <span>Go Back</span>
        </button>

        <div className="invoice-details-contents">
          <div className="invoice-details-status">
            <h4>Status</h4>
            <div className={"invoice-status" + ` ${currentInvoiceData.status.toLowerCase()}`}>
              <svg width="8" height="8" viewBox="0 0 8 8" xmlns="http://www.w3.org/2000/svg">
                <circle cx="4" cy="4" r="4" />
              </svg>
              {currentInvoiceData.status}
            </div>
          </div>

          <div className="invoice-details-body">
            <div className="invoice-details-titles">
              <h3>
                <span className="hashtag">#</span>
                {currentInvoiceData.id}
              </h3>
              <h4>{currentInvoiceData.description}</h4>
            </div>

            <div className="invoice-details-address">
              <span>{currentInvoiceData.billFrom.streetAddress}</span>
              <span>{currentInvoiceData.billFrom.city}</span>
              <span>{currentInvoiceData.billFrom.postCode}</span>
              <span>{currentInvoiceData.billFrom.country}</span>
            </div>

            <div className="invoice-details-payment">
              <div className="invoice-details-payment-invoiceDate">
                <h4>Invoice Date</h4>
                <span>{currentInvoiceData.invoiceDate}</span>
              </div>
              <div className="invoice-details-payment-dueDate">
                <h4>Payment Due</h4>
                <span>{currentInvoiceData.paymentDue}</span>
              </div>
              <div className="invoice-details-payment-billTo">
                <h4>Bill To</h4>
                <h3>{currentInvoiceData.billTo.clientName}</h3>
                <div className="invoice-details-payment-address">
                  <span>{currentInvoiceData.billTo.address}</span>
                  <span>{currentInvoiceData.billTo.city}</span>
                  <span>{currentInvoiceData.billTo.postCode}</span>
                  <span>{currentInvoiceData.billTo.country}</span>
                </div>
              </div>
              <div className="invoice-details-payment-email">
                <h4>Sent to</h4>
                <strong>{currentInvoiceData.billTo.clientEmail}</strong>
              </div>
            </div>

            <div className="invoice-details-items-contents">
              <div className="invoice-details-items">
                {currentInvoiceData.items.map((item, i) => (
                  <InvoiceItem key={i} {...item} />
                ))}
              </div>
              <div className="invoice-details-grandTotal">
                <span>Grand Total</span>
                <h2>£ {currentInvoiceData.grandTotal.toFixed(2)}</h2>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="invoice-details-interactionBtns">
        <button className="editBtn" onClick={() => (location.href = `#/edit-invoice/${id}`)}>
          Edit
        </button>
        <button className="removeBtn" onClick={() => deleteDialog.current.showModal()}>
          Delete
        </button>
        <button className="markBtn" onClick={handleMarkPaid}>
          Mark as Paid
        </button>
      </div>
      <ConfirmDeleteModal deleteDialog={deleteDialog} invoiceId={id} invoiceData={invoiceData} />
    </>
  );
}

function InvoiceItem({ itemName, price, quantitiy, total }) {
  return (
    <div className="invoice-details-item">
      <div className="invoice-details-item-data">
        <h3>{itemName}</h3>
        <h4>
          {quantitiy} x £ {price.toFixed(2)}
        </h4>
      </div>
      <h3>£ {total.toFixed(2)}</h3>
    </div>
  );
}

function ConfirmDeleteModal({ deleteDialog, invoiceId, invoiceData }) {
  function handleDelete() {
    location.href = "#/";
    invoiceData.setData(invoiceData.data.filter((x) => x.id !== invoiceId));
  }

  return (
    <dialog ref={deleteDialog}>
      <form method="dialog">
        <h2>Confirm Deletion</h2>
        <p>Are you sure you want to delete invoice #{invoiceId}? This action cannot be undone.</p>
        <div className="dialog-btn-group">
          <button type="button" className="cancelBtn" onClick={() => deleteDialog.current.close()}>
            Cancel
          </button>
          <button type="submit" className="removeBtn" onClick={handleDelete}>
            Delete
          </button>
        </div>
      </form>
    </dialog>
  );
}
