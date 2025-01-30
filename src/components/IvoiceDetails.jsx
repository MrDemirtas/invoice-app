import { useRef } from "react";

export default function InvoiceDetails() {
  const deleteDialog = useRef(null);

  return (
    <>
      <div className="invoice-details">
        <button className="invoice-backBtn">
          <img src="/svg/backarrow.svg" />
          <span>Go Back</span>
        </button>

        <div className="invoice-details-contents">
          <div className="invoice-details-status">
            <h4>Status</h4>
            <div className="invoice-status pending">
              <svg width="8" height="8" viewBox="0 0 8 8" xmlns="http://www.w3.org/2000/svg">
                <circle cx="4" cy="4" r="4" />
              </svg>
              Pending
            </div>
          </div>

          <div className="invoice-details-body">
            <div className="invoice-details-titles">
              <h3>
                <span className="hashtag">#</span>
                XM9141
              </h3>
              <h4>Graphic Design</h4>
            </div>

            <div className="invoice-details-address">
              <span>19 Union Terrace</span>
              <span>London</span>
              <span>E1 3EZ</span>
              <span>United Kingdom</span>
            </div>

            <div className="invoice-details-payment">
              <div className="invoice-details-payment-invoiceDate">
                <h4>Invoice Date</h4>
                <span>21 Aug 2021</span>
              </div>
              <div className="invoice-details-payment-dueDate">
                <h4>Payment Due</h4>
                <span>20 Sep 2021</span>
              </div>
              <div className="invoice-details-payment-billTo">
                <h4>Bill To</h4>
                <h3>Alex Grim</h3>
                <div className="invoice-details-payment-address">
                  <span>84 Church Way</span>
                  <span>Bradford</span>
                  <span>BD1 9PB</span>
                  <span>United Kingdom</span>
                </div>
              </div>
              <div className="invoice-details-payment-email">
                <h4>Sent to</h4>
                <strong>alexgrim@mail.com</strong>
              </div>
            </div>

            <div className="invoice-details-items-contents">
              <div className="invoice-details-items">
                {Array.from({ length: 4 }, () => (
                  <InvoiceItem />
                ))}
              </div>
              <div className="invoice-details-grandTotal">
                <span>Grand Total</span>
                <h2>£ 556.00</h2>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="invoice-details-interactionBtns">
        <button className="editBtn">Edit</button>
        <button className="removeBtn" onClick={() => deleteDialog.current.showModal()}>Delete</button>
        <button className="markBtn">Mark as Paid</button>
      </div>
      <ConfirmDeleteModal deleteDialog={deleteDialog} />
    </>
  );
}

function InvoiceItem() {
  return (
    <div className="invoice-details-item">
      <div className="invoice-details-item-data">
        <h3>Banner Design</h3>
        <h4>1 x £ 156.00</h4>
      </div>
      <h3>£ 156.00</h3>
    </div>
  );
}

function ConfirmDeleteModal({ deleteDialog }) {
  return (
    <dialog ref={deleteDialog}>
      <form method="dialog">
        <h2>Confirm Deletion</h2>
        <p>Are you sure you want to delete invoice #XM9141? This action cannot be undone.</p>
        <div className="dialog-btn-group">
          <button type="button" className="cancelBtn" onClick={() => deleteDialog.current.close()}>
            Cancel
          </button>
          <button type="submit" className="removeBtn">
            Delete
          </button>
        </div>
      </form>
    </dialog>
  );
}
