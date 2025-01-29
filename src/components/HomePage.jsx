import NothingHere from "./NothingHere";

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
          <button className="home-page-newBtn">
            <figure>
              <img src="/svg/new-plus.svg" />
            </figure>
            <span>New</span>
          </button>
        </div>
      </div>
      <NothingHere />
    </main>
  );
}