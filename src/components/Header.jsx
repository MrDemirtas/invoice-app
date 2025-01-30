import { useEffect, useState } from "react";

function getSystemThemePref() {
  return window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
}

export default function Header() {
  const [theme, setTheme] = useState(localStorage.theme || getSystemThemePref());

  useEffect(() => {
    document.body.className = theme;
  }, [theme]);

  function handleChange(e) {
    const changedTheme = e.target.checked ? "dark" : "light";
    setTheme(changedTheme);
    localStorage.theme = changedTheme;
  }

  return (
    <header>
      <img src="/svg/logo.svg" alt="Logo" />
      <div className="header-right">
        <label>
          {theme === "dark" ? <img src="/svg/sun.svg" alt="Sun" /> : <img src="/svg/moon.svg" alt="Moon" />}
          <input type="checkbox" defaultChecked={theme === "dark"} onChange={handleChange} />
        </label>
        <img src="/images/avatar.png" alt="Avatar" />
      </div>
    </header>
  );
}
