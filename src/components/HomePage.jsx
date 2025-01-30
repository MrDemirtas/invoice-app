export default function HomePage() {
  return (
    <main>
      <div className="home-page-header">
        <div className="home-page-titles">
          <h1>Invoices</h1>
          <h4>No invoices</h4>
        </div>
        <div className="home-page-interactions">
          <div className="home-page-filter">
            <button className="filter-dropdown-btn">
              <span>Filter</span>
              <img src="/svg/dropdownarrow.svg" />
            </button>
          </div>
          <button className="home-page-newBtn" onClick={() => location.href = "#/new-invoice"}>
            <figure>
              <img src="/svg/new-plus.svg" />
            </figure>
            <span>New</span>
          </button>
        </div>
      </div>
      <Invoices />
    </main>
  );
}

function Invoices() {
  return (
    <div className="invoices-contents">
      {Array.from({length: 4}, () => <Invoice />)}
    </div>
  );
}

function Invoice() {
  return (
    <div className="invoice-item" onClick={() => location.href = `#/invoice/1`}>
      <div className="invoice-header">
        <h3>
          <span>#</span>RT3080
        </h3>
        <h4>Jensen Huang</h4>
      </div>
      <div className="invoice-info">
        <div className="invoice-data">
          <p>Due 19 Aug 2021</p>
          <h3>£ 1,800.90</h3>
        </div>
        <span className="invoice-status paid">
          <svg width="8" height="8" viewBox="0 0 8 8" xmlns="http://www.w3.org/2000/svg">
            <circle cx="4" cy="4" r="4" />
          </svg>
          Pending
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