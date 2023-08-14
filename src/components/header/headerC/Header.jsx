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
  DropdownSection,
  User,
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
  const { i18n, t } = useTranslation();
  const [selectedKeys, setSelectedKeys] = React.useState(i18n.language);
  const { theme, setTheme } = useTheme();
  const islight = theme === "light";
  const handleChange = () => {
    const nextTheme = islight ? "dark" : "light";
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
      <div
        className="flex flex-row items-center justify-between"
        style={{ marginLeft: "80px", marginRight: "80px", marginTop:'15px' }}
      >
        <div className="items-start">
          {imgLogo ? (
            <Image
              isZoomed
              src="../../../public/make-logo-light.png"
              alt=""
              width={150}
              height={100}
            />
          ) : (
            <Image
              isZoomed
              src="../../../public/make-logo-dark.png"
              alt=""
              width={150}
              height={100}
            />
          )}
        </div>
        <div className="flex flex-wrap place-content-end space-1">
          <Badge
            content="10"
            shape="circle"
            color="danger"
            style={{ marginRight: "5px", marginTop: "2px" }}
          >
            <Dropdown placement="bottom-end">
              <DropdownTrigger>
                <Button
                  size="sm"
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
          <Dropdown
            showArrow
            radius="sm"
            classNames={{
              base: "p-0 border-small border-divider bg-background",
              arrow: "bg-default-200",
            }}
          >
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
              aria-label="Custom item styles"
              disabledKeys={["profile"]}
              className="p-3"
              itemClasses={{}}
            >
              <DropdownSection aria-label="Profile & Actions" showDivider>
                <DropdownItem isReadOnly className="h-14 gap-2">
                  <User
                    name={
                      auth.getUser()?.nombre + " " + auth.getUser()?.apellido ||
                      ""
                    }
                    description={auth.getUser()?.email || ""}
                    classNames={{
                      name: "text-default-600",
                      description: "text-default-500",
                    }}
                    avatarProps={{
                      size: "sm",
                      src: "https://avatars.githubusercontent.com/u/30373425?v=4",
                    }}
                  />
                </DropdownItem>
                <DropdownItem key="settings">
                  {t("header.Profile")}
                </DropdownItem>
              </DropdownSection>

              <DropdownSection aria-label="Preferences" showDivider>
                <DropdownItem
                  isReadOnly
                  key="language"
                  className="cursor-default"
                  endContent={
                    <Dropdown>
                      <DropdownTrigger variant="light">
                        <Button
                          className="capitalize"
                          size="sm"
                          endContent={<TbWorld />}
                        >
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
                  }
                >
                  {t("header.Language")}
                </DropdownItem>
                <DropdownItem
                  isReadOnly
                  key="theme"
                  className="cursor-default"
                  endContent={
                    <Switch
                      onChange={handleChange}
                      defaultSelected
                      size="sm"
                      color="secondary"
                      thumbIcon={({ isSelected, className }) =>
                        isSelected ? (
                          <RiMoonLine className={className} />
                        ) : (
                          <RiSunLine className={className} />
                        )
                      }
                    ></Switch>
                  }
                >
                  {t("header.Theme")}
                </DropdownItem>
              </DropdownSection>
              <DropdownSection aria-label="Logout">
                <DropdownItem
                  key="logout"
                  color="danger"
                  onPress={handleLogout}
                >
                  {t("header.Logout")}
                </DropdownItem>
              </DropdownSection>
            </DropdownMenu>
          </Dropdown>
        </div>
      </div>
    </header>
  );
};

export default Header;
