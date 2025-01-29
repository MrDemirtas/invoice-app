export default function Header() {
  return (
    <header>
      <img src="/svg/logo.svg" alt="Logo" />
      <div className="header-right">
        <label>
          <img src="/svg/moon.svg" alt="Moon" />
          <input type="checkbox" />
        </label>
        <img src="/images/avatar.png" alt="Avatar" />
      </div>
    </header>
  );
}