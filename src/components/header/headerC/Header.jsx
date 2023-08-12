import {
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownTrigger,
  Avatar,
  Button,
  Badge,
  Switch,
  Image,
} from "@nextui-org/react";
import { useAuth } from "../../../components/auth/AuthProvider";
import { RiMoonLine, RiNotification4Fill, RiSunLine } from "react-icons/ri";
import { TbWorld } from "react-icons/tb";
import { useTranslation } from "react-i18next";
import { useTheme } from "next-themes";
import React from "react";
const lngs = {
  En: { nativeName: "English" },
  Es: { nativeName: "Español" },
};
const Header = () => {
  const { i18n } = useTranslation();
  const [selectedKeys, setSelectedKeys] = React.useState(i18n.language);
  const { theme, setTheme } = useTheme();
  const isDark = theme === "dark";
  const handleChange = () => {
    const nextTheme = isDark ? "light" : "dark";
    window.localStorage.setItem("data-theme", nextTheme); // you can use any storage
    setTheme(nextTheme);
  };
  const imgLogo = theme === "dark";
  const selectedValue = React.useMemo(
    () => Array.from(selectedKeys),
    [selectedKeys]
  );
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
      <br />
      <div
        className="flex flex-row items-center justify-between"
        style={{ marginLeft: "10px", marginRight: "20px" }}
      >
        <div className="items-start">
          {imgLogo ? (
            <Image
              isZoomed
              src="../../../public/make-logo-light.png"
              alt=""
              width={180}
              height={180}
            />
          ) : (
            <Image
              isZoomed
              src="../../../public/make-logo-dark.png"
              alt=""
              width={180}
              height={180}
            />
          )}
        </div>
        <div className="flex flex-wrap place-content-end space-1">
          <Switch
            onChange={handleChange}
            defaultSelected
            size="sm"
            color="default"
            thumbIcon={({ isSelected, className }) =>
              isSelected ? (
                <RiMoonLine className={className} />
              ) : (
                <RiSunLine className={className} />
              )
            }
          ></Switch>
          <Dropdown>
            <DropdownTrigger variant="light">
              <Button className="capitalize" size="sm" endContent={<TbWorld />}>
                {selectedValue}
              </Button>
            </DropdownTrigger>
            <DropdownMenu
              aria-label="Single selection actions"
              variant="light"
              selectionMode="single"
              selectedKeys={selectedKeys}
              onSelectionChange={setSelectedKeys}
            >
              {Object.keys(lngs).map((lng) => (
                <DropdownItem
                  key={lng}
                  value={lng}
                  onPress={() => i18n.changeLanguage(lng)}
                >
                  {lngs[lng].nativeName}
                </DropdownItem>
              ))}
            </DropdownMenu>
          </Dropdown>
          <Badge
            content="10"
            shape="circle"
            color="danger"
            style={{ marginRight: "5px", marginTop: "2px" }}
          >
            <Dropdown placement="bottom-end">
              <DropdownTrigger>
                <Button
                  radius="full"
                  isIconOnly
                  aria-label="more than 99 notifications"
                  variant="light"
                >
                  <RiNotification4Fill size={16} />
                </Button>
              </DropdownTrigger>
              <DropdownMenu
                aria-label="Profile Actions"
                variant="flat"
                textValue=""
              >
                <DropdownItem key="profile" className="h-14 gap-2">
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
          </Badge>
          <Dropdown>
            <DropdownTrigger style={{ marginLeft: "20px" }}>
              <Avatar
                isBordered
                as="button"
                className="transition-transform"
                name={auth.getUser()?.nombre + " " + auth.getUser()?.apellido}
                size="sm"
                src="../../../public/Blank-Avatar.png"
              />
            </DropdownTrigger>
            <DropdownMenu
              aria-label="Profile Actions"
              variant="flat"
              textValue=""
            >
              <DropdownItem key="profile" className="h-14 gap-2">
                <p className="font-semibold">
                  {auth.getUser()?.nombre + " " + auth.getUser()?.apellido ||
                    ""}
                </p>
              </DropdownItem>
              <DropdownItem key="logout" color="danger" onPress={handleLogout}>
                Cerrar sesión
              </DropdownItem>
            </DropdownMenu>
          </Dropdown>
        </div>
      </div>
    </header>
  );
};

export default Header;
