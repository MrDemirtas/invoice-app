export default function NewAndEditInvoice({ isEdit = false }) {
  return (
    <div className="invoice-edit">
      <button className="invoice-backBtn" onClick={() => location.href = "#/"}>
        <img src="/svg/backarrow.svg" />
        <span>Go Back</span>
      </button>

      <div className="invoice-edit-contents">
        {isEdit ? (
          <h1>
            Edit <span className="hashtag">#</span>XM9141
          </h1>
        ) : (
          <h1>New Invoice</h1>
        )}

        <form>
          <fieldset className="billFieldset">
            <legend>Bill From</legend>
            <label className="billStreetAddress">
              <p>Street Address</p>
              <input required type="text" name="billStreetAddress" />
            </label>
            <label className="billCity">
              <p>City</p>
              <input required type="text" name="billCity" />
            </label>
            <label className="billPostCode">
              <p>Post Code</p>
              <input required type="text" name="billPostCode" />
            </label>
            <label className="billCountry">
              <p>Country</p>
              <input required type="text" name="billCountry" />
            </label>
          </fieldset>
          <fieldset className="billToFieldset">
            <legend>Bill To</legend>
            <label className="billToName">
              <p>Client’s Name</p>
              <input required type="text" name="billToName" />
            </label>
            <label className="billToEmail">
              <p>Client’s Email</p>
              <input required type="email" name="billToEmail" />
            </label>
            <label className="billToAddress">
              <p>Address</p>
              <input required type="text" name="billToAddress" />
            </label>
            <label className="billToCity">
              <p>City</p>
              <input required type="text" name="billToCity" />
            </label>
            <label className="billToPostCode">
              <p>Post Code</p>
              <input required type="text" name="billToPostCode" />
            </label>
            <label className="billToCountry">
              <p>Country</p>
              <input required type="text" name="billToCountry" />
            </label>
          </fieldset>
          <fieldset className="otherDatas">
            <label className="invoiceDate">
              <p>Invoice Date</p>
              <input required type="date" name="invoiceDate" />
            </label>
            <label className="paymentTerms">
              <p>Invoice Date</p>
              <select name="paymentTerms">
                <option>Net 30 Days</option>
                <option>Net 3 Month</option>
                <option>Net 6 Month</option>
                <option>Net 1 Year</option>
              </select>
            </label>
            <label className="projectDescription">
              <p>Project Description</p>
              <input required type="text" name="projectDescription" />
            </label>
          </fieldset>
          <fieldset className="itemListFieldset">
            <legend>Item List</legend>
            <InvoiceItem />
            <button type="button" className="addNewItemBtn">
              + Add New Item
            </button>
          </fieldset>
          <div className="form-interactions">
            <div className="linear-effect"></div>
            <div className="form-btns">
              {isEdit ? (
                <>
                  <button type="button" className="cancelBtn" onClick={() => location.href = `#/invoice/1`}>
                    Cancel
                  </button>
                  <button type="submit" className="saveBtn">
                    Save Changes
                  </button>
                </>
              ) : (
                <>
                  <button type="button" className="cancelBtn" onClick={() => location.href = `#/`}>
                    Discard
                  </button>
                  <button type="button" className="saveDraftBtn">
                    Save as Draft
                  </button>
                  <button type="submit" className="saveBtn">
                    Save & Send
                  </button>
                </>
              )}
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}

function InvoiceItem() {
  return (
    <div className="invoiceItem">
      <label className="itemName">
        <p>Item Name</p>
        <input required type="text" name="itemName" />
      </label>
      <label className="itemQty">
        <p>Qty.</p>
        <input required type="number" name="itemQty" />
      </label>
      <label className="itemPrice">
        <p>Price</p>
        <input required type="number" name="itemPrice" />
      </label>
      <label className="itemTotalPrice">
        <p>Total</p>
        <h4>156.00</h4>
      </label>
      <button type="button">
        <img src="/svg/trash.svg" />
      </button>
    </div>
  );
}
