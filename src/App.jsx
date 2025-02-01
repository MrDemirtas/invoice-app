import { createContext, useEffect, useState } from "react";

import Header from "./components/Header";
import { getPage } from "./helper.jsx";

export const InvoiceData = createContext(null);
export const ScreenSize = createContext(null);

export default function App() {
  const [route, setRoute] = useState(location.hash.substring(1) || "/");
  const [data, setData] = useState(localStorage.data ? JSON.parse(localStorage.data) : []);
  const [screenSize, setScreenSize] = useState(null);
  
  useEffect(() => {
    window.addEventListener("resize", (e) => setScreenSize(e.target.innerWidth));
    window.addEventListener("hashchange", () => setRoute(location.hash.substring(1)));
  }, []);

  useEffect(() => {
    localStorage.data = JSON.stringify(data);
  }, [data]);
  
  return (
    <>
      <Header />
      <InvoiceData.Provider value={{data, setData}}>
        <ScreenSize.Provider value={screenSize}>
          {getPage(route)}
        </ScreenSize.Provider>
      </InvoiceData.Provider>
    </>
  );
}