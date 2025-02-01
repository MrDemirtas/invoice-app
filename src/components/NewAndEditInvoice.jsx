import { useContext, useEffect, useRef, useState } from "react";

import { InvoiceData } from "../App";

const newItemObj = {
  itemName: "",
  quantitiy: 1,
  price: 0,
  total: 0,
};

// Rastgele 4 rakam üretme fonksiyonu
function generateXMString() {
  const randomNumber = Math.floor(1000 + Math.random() * 9000); // 1000 ile 9999 arasında bir sayı
  return `XM${randomNumber}`;
}

let editInvoiceData = null;
export default function NewAndEditInvoice({ isDialog = false, isEdit = false, editId = 0 }) {
  const invoiceData = useContext(InvoiceData);
  if (!isDialog && !isEdit) {
    if (location.hash.substring(1).split("/").at(1) === "edit-invoice") {
      const id = location.hash.substring(1).split("/").at(-1);
      editInvoiceData = invoiceData.data.find((x) => x.id === id);
      isEdit = true;
    } else {
      editInvoiceData = null;
    }
  } else if (isDialog !== false && isEdit) {
    const id = editId;
    editInvoiceData = invoiceData.data.find((x) => x.id === id);
  }

  const formRef = useRef(null);
  const [itemData, setItemData] = useState(isEdit ? [...editInvoiceData.items] : [{ ...newItemObj }]);
  useEffect(() => {
    if (itemData.length <= 0) {
      setItemData([{ ...newItemObj }]);
    }
  }, [itemData]);

  function handleSubmit(e, status = "Pending") {
    e.preventDefault();
    const formData = new FormData(formRef.current);
    const formObj = Object.fromEntries(formData);
    const { description, address, clientEmail, clientName, invoiceDate, paymentTerms, streetAddress } = formObj;
    const date = new Date(invoiceDate);
    if (paymentTerms === "Net 1 Day") {
      date.setDate(date.getDate() + 1);
    } else if (paymentTerms === "Net 7 Days") {
      date.setDate(date.getDate() + 7);
    } else if (paymentTerms === "Net 14 Days") {
      date.setDate(date.getDate() + 14);
    } else if (paymentTerms === "Net 30 Days") {
      date.setDate(date.getDate() + 30);
    }
    const paymentDue = date.toISOString().split("T")[0];
    let grandTotal = 0;
    itemData.map((item) => {
      grandTotal += item.total;
    });

    const newInvoiceObj = {
      id: isEdit ? editInvoiceData.id : generateXMString(),
      description,
      billFrom: {
        streetAddress,
        city: formObj.cityBillFrom,
        postCode: formObj.postCodeBillFrom,
        country: formObj.countryBillFrom,
      },
      billTo: {
        clientName,
        clientEmail,
        address,
        city: formObj.cityBillTo,
        postCode: formObj.postCodeBillTo,
        country: formObj.countryBillTo,
      },
      invoiceDate,
      paymentDue,
      paymentTerms,
      items: [...itemData],
      grandTotal,
      status,
    };

    if (isEdit) {
      invoiceData.data[invoiceData.data.findIndex((x) => x.id === editInvoiceData.id)] = newInvoiceObj;
      invoiceData.setData([...invoiceData.data]);
      if (!isDialog) {
        location.href = `#/invoice/${editInvoiceData.id}`;
      } else {
        isDialog.current.close();
      }
    } else {
      invoiceData.setData([...invoiceData.data, newInvoiceObj]);
      location.href = `#/invoice/${newInvoiceObj.id}`;
    }
  }

  function handleBackBtn() {
    if (!isDialog) {
      if (isEdit) {
        location.href = `#/invoice/${editInvoiceData.id}`;
      } else {
        location.href = "#/";
      }
    } else {
      isDialog.current.close();
    }
  }

  return (
    <div className="invoice-edit">
      <button className="invoice-backBtn" onClick={handleBackBtn}>
        <img src="/svg/backarrow.svg" />
        <span>Go Back</span>
      </button>

      <div className="invoice-edit-contents">
        {isEdit ? (
          <h1>
            Edit <span className="hashtag">#</span>
            {editInvoiceData.id}
          </h1>
        ) : (
          <h1>New Invoice</h1>
        )}

        <form ref={formRef} onSubmit={handleSubmit} autoComplete="off">
          <fieldset className="billFieldset">
            <legend>Bill From</legend>
            <label className="billStreetAddress">
              <p>Street Address</p>
              <input required type="text" name="streetAddress" defaultValue={isEdit ? editInvoiceData.billFrom.streetAddress : ""} />
            </label>
            <label className="billCity">
              <p>City</p>
              <input required type="text" name="cityBillFrom" defaultValue={isEdit ? editInvoiceData.billFrom.city : ""} />
            </label>
            <label className="billPostCode">
              <p>Post Code</p>
              <input required type="text" name="postCodeBillFrom" defaultValue={isEdit ? editInvoiceData.billFrom.postCode : ""} />
            </label>
            <label className="billCountry">
              <p>Country</p>
              <input required type="text" name="countryBillFrom" defaultValue={isEdit ? editInvoiceData.billFrom.country : ""} />
            </label>
          </fieldset>
          <fieldset className="billToFieldset">
            <legend>Bill To</legend>
            <label className="billToName">
              <p>Client’s Name</p>
              <input required type="text" name="clientName" defaultValue={isEdit ? editInvoiceData.billTo.clientName : ""} />
            </label>
            <label className="billToEmail">
              <p>Client’s Email</p>
              <input required type="email" name="clientEmail" defaultValue={isEdit ? editInvoiceData.billTo.clientEmail : ""} />
            </label>
            <label className="billToAddress">
              <p>Address</p>
              <input required type="text" name="address" defaultValue={isEdit ? editInvoiceData.billTo.address : ""} />
            </label>
            <label className="billToCity">
              <p>City</p>
              <input required type="text" name="cityBillTo" defaultValue={isEdit ? editInvoiceData.billTo.city : ""} />
            </label>
            <label className="billToPostCode">
              <p>Post Code</p>
              <input required type="text" name="postCodeBillTo" defaultValue={isEdit ? editInvoiceData.billTo.postCode : ""} />
            </label>
            <label className="billToCountry">
              <p>Country</p>
              <input required type="text" name="countryBillTo" defaultValue={isEdit ? editInvoiceData.billTo.country : ""} />
            </label>
          </fieldset>
          <fieldset className="otherDatas">
            <label className="invoiceDate">
              <p>Invoice Date</p>
              <input required type="date" name="invoiceDate" defaultValue={isEdit ? editInvoiceData.invoiceDate : new Date().toISOString().split("T")[0]} />
            </label>
            <label className="paymentTerms">
              <p>Payment Terms</p>
              <select name="paymentTerms" defaultValue={isEdit ? editInvoiceData.paymentTerms : "Net 30 Days"}>
                <option>Net 1 Day</option>
                <option>Net 7 Days</option>
                <option>Net 14 Days</option>
                <option>Net 30 Days</option>
              </select>
            </label>
            <label className="projectDescription">
              <p>Project Description</p>
              <input required type="text" name="description" defaultValue={isEdit ? editInvoiceData.description : ""} />
            </label>
          </fieldset>
          <fieldset className="itemListFieldset">
            <legend>Item List</legend>
            {itemData.map((x, i) => (
              <InvoiceItem key={i} {...x} index={i} setItemData={setItemData} />
            ))}
            <button type="button" className="addNewItemBtn" onClick={() => setItemData((prev) => [...prev, { ...newItemObj }])}>
              + Add New Item
            </button>
          </fieldset>
          <div className="form-interactions">
            {/* <div className="linear-effect"></div> */}
            <div className="form-btns">
              {isEdit ? (
                <>
                  <button type="button" className="cancelBtn" onClick={handleBackBtn}>
                    Cancel
                  </button>
                  <button type="submit" className="saveBtn">
                    Save Changes
                  </button>
                </>
              ) : (
                <>
                  <button type="button" className="cancelBtn" onClick={handleBackBtn}>
                    Discard
                  </button>
                  <button type="button" className="saveDraftBtn" onClick={(e) => handleSubmit(e, "Draft")}>
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

function InvoiceItem({ itemName, quantitiy, price, total, index, setItemData }) {
  const itemQty = useRef(null);
  const itemPrice = useRef(null);
  const [totalPrice, setTotalPrice] = useState(total);

  useEffect(() => {
    setItemData((prev) => {
      prev[index].total = totalPrice;
      return [...prev];
    });
  }, [totalPrice]);

  function handleUpdate(e) {
    setItemData((prev) => {
      if (e.target.name === "price" || e.target.name === "quantitiy") {
        e.target.value = parseInt(e.target.value);
        prev[index][e.target.name] = parseInt(e.target.value);
      } else {
        prev[index][e.target.name] = e.target.value;
      }
      return [...prev];
    });
    setTotalPrice(itemPrice.current.value * itemQty.current.value);
  }

  return (
    <div className="invoiceItem">
      <label className="itemName">
        <p>Item Name</p>
        <input required type="text" name="itemName" onChange={handleUpdate} value={itemName} />
      </label>
      <label className="itemQty">
        <p>Qty.</p>
        <input ref={itemQty} required type="number" min={0} name="quantitiy" value={quantitiy} onChange={handleUpdate} />
      </label>
      <label className="itemPrice">
        <p>Price</p>
        <input ref={itemPrice} required type="number" min={0} name="price" value={price} onChange={handleUpdate} />
      </label>
      <label className="itemTotalPrice">
        <p>Total</p>
        <input disabled type="number" name="total" value={total} />
      </label>
      <button type="button" onClick={() => setItemData((prev) => prev.filter((x, i) => i !== index))}>
        <img src="/svg/trash.svg" />
      </button>
    </div>
  );
}
