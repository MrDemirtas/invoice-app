import Header from "./components/Header";
import HomePage from "./components/HomePage";
import InvoiceDetails from "./components/IvoiceDetails";
import NewAndEditInvoice from "./components/NewAndEditInvoice";

const routers = [
  {
    url: "/",
    component: <HomePage />
  },
  {
    url: "/invoice",
    component: <InvoiceDetails />
  },
  {
    url: "/edit-invoice",
    component: <NewAndEditInvoice isEdit={true} />
  },
  {
    url: "/new-invoice",
    component: <NewAndEditInvoice />
  },
]

export function getPage(url) {
  return routers.findLast(x => url.startsWith(x.url)).component;
}