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
  Tabs,
  Tab,
  User,
} from "@nextui-org/react";
import { useAuth } from "../../../components/auth/AuthProvider";
import { RiMoonLine, RiNotification4Fill, RiSunLine } from "react-icons/ri";
import { TbWorld } from "react-icons/tb";
import { useTranslation } from "react-i18next";
import { useTheme } from "next-themes";
import React, { useEffect, useState } from "react";
import db from "../../axios/Database";
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
    window.localStorage.setItem("data-theme", nextTheme);
    setTheme(nextTheme);
  };
  const imgLogo = theme === "dark";
  const selectedValue = React.useMemo(
    () => Array.from(selectedKeys),
    [selectedKeys]
  );
  const auth = useAuth();
  async function getImage() {
    if (useUrlImagen == "") {
      const response = await db.getProfileImage(auth.getUser().id);
      const urlImagen = URL.createObjectURL(response.data);
      setuseUrlImagen(urlImagen);
    }
  }
  const [useUrlImagen, setuseUrlImagen] = useState("");
  useEffect(() => {
    auth.isAuthenticated ? getImage() : null;
  });

  async function handleLogout() {
    try {
      const response = await fetch(`https://localhost:4000/api/auth/logout`, {
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

  // async function openNotifications() {}
  return (
    <>
      <header>
        <div
          className="flex flex-row items-center justify-between"
          style={{ marginLeft: "40px", marginRight: "40px", marginTop: "10px" }}
        >
          <div className="items-start">
            {imgLogo ? (
              <Image
                isZoomed
                src="../../../public/make-logo-light.png"
                alt=""
                width={100}
                height={100}
                href={"/"}
              />
            ) : (
              <Image
                isZoomed
                src="../../../public/make-logo-dark.png"
                alt=""
                width={100}
                height={100}
                href={"/"}
              />
            )}
          </div>
          {auth.isAuthenticated ? (
            <div className="flex flex-wrap place-content-end space-1">
              {/* <Badge
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
                    <DropdownItem
                      isReadOnly
                      key="profile"
                      className="h-14 gap-2"
                      startContent={
                        <Tabs
                          key="underlined"
                          variant="underlined"
                          aria-label="Tabs variants"
                        >
                          <Tab key="Readed" title="Leídas" />
                          <Tab key="No readed" title="No leídas" />
                          <Tab key="All" title="Todas" />
                        </Tabs>
                      }
                    ></DropdownItem>
                    <DropdownItem key="profile" className="h-14 gap-2">
                      <div className="text-right">
                        <h6 className="text-default-500 text-xs">
                          Ahora mismo
                        </h6>
                      </div>
                      <User
                        name="Christian"
                        description="ha creado un nuevo producto en el listado de productos"
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
                    <DropdownItem key="profile" className="h-14 gap-2">
                      <div className="text-right">
                        <h6 className="text-default-500 text-xs">
                          Hace 5 minutos
                        </h6>
                      </div>
                      <User
                        name="David"
                        description="ha borrado un álmacen en el listado de productos"
                        avatarProps={{
                          size: "sm",
                          src: "https://avatars.githubusercontent.com/u/30373425?v=4",
                        }}
                      />
                    </DropdownItem>
                    <DropdownItem className="text-center">
                      <a href="/" onClick={handleLogout}>
                        <span className="ml-2">Ver todas</span>
                      </a>
                    </DropdownItem>
                    <DropdownItem onPress={openNotifications}>
                      Notificaciones
                    </DropdownItem>
                  </DropdownMenu>
                </Dropdown>
              </Badge> */}
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
                    name={
                      auth.getUser()?.nombre + " " + auth.getUser()?.apellido
                    }
                    size="sm"
                    src={useUrlImagen}
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
                          auth.getUser()?.nombre +
                            " " +
                            auth.getUser()?.apellido || ""
                        }
                        description={auth.getUser()?.email || ""}
                        classNames={{
                          name: "text-default-600",
                          description: "text-default-500",
                        }}
                        avatarProps={{
                          size: "md",
                          src: useUrlImagen,
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
          ) : (
            <div className="flex flex-wrap place-content-end space-1">
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
            </div>
          )}
        </div>
      </header>
    </>
  );
};

export default Header;
