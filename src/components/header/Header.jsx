import { RiMoonLine, RiSunLine } from "react-icons/ri";
import { TbWorld } from "react-icons/tb";
import {
  Navbar,
  Button,
  NavbarBrand,
  DropdownMenu,
  Dropdown,
  DropdownTrigger,
  DropdownItem,
  Switch,
} from "@nextui-org/react";
import { useTranslation } from "react-i18next";
import React from "react";
import { useTheme } from "next-themes";
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
  const selectedValue = React.useMemo(
    () => Array.from(selectedKeys),
    [selectedKeys]
  );
  return (
    <header>
      <Navbar shouldHideOnScroll variant="sticky">
        <NavbarBrand>
          <h4 color="inherit">MakeDigitAll</h4>
        </NavbarBrand>
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
      </Navbar>
    </header>
  );
};

export default Header;
