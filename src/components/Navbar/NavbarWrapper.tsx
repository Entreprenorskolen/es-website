import { getNavbarData } from "@app/hooks/server/useNavbar";
import { Navbar } from "./Navbar";

const NavbarWrapper = async () => {
  const navbarData = await getNavbarData();

  return <Navbar navbarData={navbarData} />;
};

export { NavbarWrapper };
