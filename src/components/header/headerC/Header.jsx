import {
  Navbar,
  Link,
  Dropdown,
  NavbarBrand,
  NavbarContent,
  DropdownItem,
  DropdownMenu,
  DropdownTrigger,
  NavbarItem,
  Avatar,
} from "@nextui-org/react";
import { useAuth } from "../../../components/auth/AuthProvider";
import { useNavigate } from "react-router-dom";
const Header = () => {
  const navigate = useNavigate();
  const auth = useAuth();
  async function handleLogout() {
    try {
      const response = await fetch(`http://localhost:4000/api/auth/logout`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${auth.getRefreshToken()}`,
        },
      });
      if (response.ok) {
        auth.signOut();
      }
    } catch (e) {
      console.log(e);
    }
  }
  return (
    <header>
      <Navbar>
        <NavbarBrand>
          <p className="font-bold text-inherit">ACME</p>
        </NavbarBrand>
        <NavbarItem isActive>
          <Link
            onPress={() => navigate("/Settings/User")}
            aria-current="page"
            color="secondary"
          >
            Usuarios
          </Link>
        </NavbarItem>
        <NavbarItem>
          <Link color="foreground" onPress={() => navigate("/")}>
            Home
          </Link>
        </NavbarItem>
        <NavbarContent justify="end">
          <NavbarItem className="hidden lg:flex">
          </NavbarItem>
          <NavbarItem>
            <Dropdown placement="bottom-end">
              <DropdownTrigger>
                <Avatar
                  isBordered
                  as="button"
                  className="transition-transform"
                  color="secondary"
                  name="Jason Hughes"
                  size="sm"
                  src="https://i.pravatar.cc/150?u=a042581f4e29026704d"
                />
              </DropdownTrigger>
              <DropdownMenu
                aria-label="Profile Actions"
                variant="flat"
                textValue=""
              >
                <DropdownItem key="profile" className="h-14 gap-2">
                  <p className="font-semibold">Signed in as</p>
                  <p className="font-semibold">
                    {auth.getUser()?.nombre + " " + auth.getUser()?.apellido ||
                      ""}
                  </p>
                </DropdownItem>
                <DropdownItem
                  key="logout"
                  color="danger"
                  onPress={handleLogout}
                >
                  Log Out
                </DropdownItem>
              </DropdownMenu>
            </Dropdown>
          </NavbarItem>
        </NavbarContent>
      </Navbar>
    </header>
  );
};

export default Header;
