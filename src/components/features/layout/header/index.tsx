import TopHeader from "./TopHeader";
import MainHeader from "./MainHeader";
import Navigation from "./Navigation";

export default function Header() {
  return (
    <header className="font-sans">
      <TopHeader />
      <MainHeader />
      <Navigation />
    </header>
  );
}
