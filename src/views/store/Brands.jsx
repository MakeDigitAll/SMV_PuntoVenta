/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from "react";
import {
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
  Input,
  Button,
  DropdownTrigger,
  Dropdown,
  DropdownMenu,
  DropdownItem,
  Pagination,
  Spacer,
  Spinner,
  Image,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  useDisclosure,
  Badge,
} from "@nextui-org/react";
import {
  TbBrandAppgallery,
  TbDotsVertical,
  TbPlus,
  TbTicket,
} from "react-icons/tb";
import { MdArrowDropDown, MdSearch } from "react-icons/md";
import ItemsHeader from "../../components/header/ItemsHeader/ItemsHeader";
import Typography from "@mui/material/Typography";
import Breadcrumbs from "@mui/material/Breadcrumbs";
import Link from "@mui/material/Link";
import { RiDashboard2Fill } from "react-icons/ri";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import { MdBook, MdSave } from "react-icons/md";
import Crop from "../../components/crop/Crop";
import http from "../../components/axios/Axios";
import Images from "../../components/images/Images";
const columns = [
  { name: "ID", uid: "ID" },
  { name: "Imagen", uid: "Imagen" },
  { name: "Marca", uid: "Marca", sortable: true },
  { name: "Catalogo", uid: "Catalogo", sortable: true },
  { name: "Productos", uid: "Productos", sortable: true },
  { name: "Acciones", uid: "Actions", sortable: true },
];

const INITIAL_VISIBLE_COLUMNS = [
  "ID",
  "Imagen",
  "Marca",
  "Catalogo",
  "Productos",
  "Actions",
];
const Brands = () => {
  const [tipoModal, setTipoModal] = useState("Crear");
  const {
    isOpen: isOpenOuter,
    onOpen: onOpenOuter,
    onOpenChange: onOpenChangeOuter,
    onClose: onCloseOuter,
  } = useDisclosure();
  const [photoURL, setPhotoURL] = React.useState("");
  const [openCrop, setOpenCrop] = React.useState(false);
  const [file, setFile] = React.useState(null);
  const [brand, setBrand] = useState({
    nombre: "",
    catalogo: "",
    logo: "",
  });
  const handleEditChange = (e) => {
    const { name, value } = e.target;
    setBrand({ ...brand, [name]: value });
  };
  const fileInputRef = React.useRef(null);
  const handleFileButtonClick = () => {
    fileInputRef.current.click();
  };
  const handleChange = async (e) => {
    const file = e.target.files[0];
    if (file) {
      setFile(file);
      setPhotoURL(URL.createObjectURL(file));
      setOpenCrop(true);
    }
  };
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  async function loadTask() {
    try {
      const response = await fetch("https://localhost:443/MarcasProducto");
      const data = await response.json();
      if (response.ok) {
        setData(data);
        setIsLoading(false);
      }
    } catch {
      toast.error("Error al cargar los datos", {
        position: "bottom-right",
        theme: "colored",
      });
      setIsLoading(false);
    }
  }
  useEffect(() => {
    loadTask();
  }, []);
  const handleSubmit = async () => {
    const formData = new FormData();
    const document = JSON.stringify({
      marca: brand.nombre,
      catalogo: brand.catalogo,
      productos: 2,
    });
    formData.append("document", document);
    formData.append("image", file);
    try {
      const result = await http.post(
        `https://localhost:443/CreateMarcasProducto`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      if (result.status == 200) {
        setData([...data, result.data]);
        toast.success("Marca creada correctamente", { theme: "colored" });
        onCloseOuter();
        setBrand({
          nombre: "",
          catalogo: "",
          logo: "",
        });
        setPhotoURL("");
      }
    } catch (error) {
      null;
    }
  };
  const openBrand = (id) => {
    onOpenOuter();
    setTipoModal("Ver");
    async function loadBrand() {
      try {
        const response = await fetch(
          `https://localhost:443/MarcasProducto/${id}`
        );
        const data = await response.json();
        if (response.ok) {
          setBrand({
            nombre: data.marca,
            catalogo: data.catalogo,
          });
        }
      } catch {
        toast.error("Error al cargar los datos", {
          position: "bottom-right",
          theme: "colored",
        });
        setIsLoading(false);
      }
    }
    loadBrand();
  };
  function handleClickBreadCrumbs(event) {
    event.preventDefault();
  }
  const navigate = useNavigate();
  const [selectedKeys, setSelectedKeys] = React.useState(new Set([]));
  const [visibleColumns, setVisibleColumns] = React.useState(
    new Set(INITIAL_VISIBLE_COLUMNS)
  );
  const [statusFilter] = React.useState("all");
  const [rowsPerPage, setRowsPerPage] = React.useState(5);
  const [sortDescriptor, setSortDescriptor] = React.useState({
    column: "Email",
    direction: "ascending",
  });
  const [page, setPage] = React.useState(1);

  const pages = Math.ceil(data.length / rowsPerPage);

  const headerColumns = React.useMemo(() => {
    if (visibleColumns === "all") return columns;

    return columns.filter((column) =>
      Array.from(visibleColumns).includes(column.uid)
    );
  }, [visibleColumns]);

  const filteredItems = React.useMemo(() => {
    let filteredUsers = [...data];

    if (
      statusFilter !== "all" &&
      Array.from(statusFilter).length !== data.length
    ) {
      filteredUsers = filteredUsers.filter((user) =>
        Array.from(statusFilter).includes(user.email)
      );
    }

    return filteredUsers;
  }, [data, statusFilter]);

  const items = React.useMemo(() => {
    const start = (page - 1) * rowsPerPage;
    const end = start + rowsPerPage;

    return filteredItems.slice(start, end);
  }, [page, filteredItems, rowsPerPage]);

  const sortedItems = React.useMemo(() => {
    return [...items].sort((a, b) => {
      const first = a[sortDescriptor.column];
      const second = b[sortDescriptor.column];
      const cmp = first < second ? -1 : first > second ? 1 : 0;

      return sortDescriptor.direction === "descending" ? -cmp : cmp;
    });
  }, [sortDescriptor, items]);
  const renderCell = React.useCallback((data, columnKey) => {
    const cellValue = data[columnKey];
    switch (columnKey) {
      case "Imagen":
        return (
          <Images
            idImage={data.id}
            designType="tabla"
            ruta={"/api/marcasImage/"}
          />
        );
      case "ID":
        return (
          <div className="flex flex-col">
            <p className="text-bold text-small capitalize">{data.id}</p>
          </div>
        );
      case "Marca":
        return (
          <div className="flex flex-col">
            <p className="text-bold text-small capitalize">{data.marca}</p>
          </div>
        );
      case "Catalogo":
        return (
          <div className="flex flex-col">
            <p className="text-bold text-small capitalize">{data.catalogo}</p>
          </div>
        );
      case "Productos":
        return (
          <div className="flex flex-col" style={{ marginLeft: "20px" }}>
            <p
              className="text-bold text-small capitalize items-center"
              color="primary"
            >
              {" "}
              <Badge
                content={data.productos}
                size="lg"
                color="primary"
              ></Badge>{" "}
            </p>
          </div>
        );
      case "Actions":
        return (
          <div className="relative flex justify-center items-center gap-2">
            <Dropdown>
              <DropdownTrigger>
                <Button isIconOnly size="sm" variant="light">
                  <TbDotsVertical className="text-default-300" />
                </Button>
              </DropdownTrigger>
              <DropdownMenu>
                <DropdownItem onPress={() => openBrand(data.id)}>
                  Ver Marca
                </DropdownItem>
                <DropdownItem>Edit Marca</DropdownItem>
                <DropdownItem>Eliminar Marca</DropdownItem>
              </DropdownMenu>
            </Dropdown>
          </div>
        );
      default:
        return cellValue;
    }
  }, []);

  const onNextPage = React.useCallback(() => {
    if (page < pages) {
      setPage(page + 1);
    }
  }, [page, pages]);

  const onPreviousPage = React.useCallback(() => {
    if (page > 1) {
      setPage(page - 1);
    }
  }, [page]);

  const onRowsPerPageChange = React.useCallback((e) => {
    setRowsPerPage(Number(e.target.value));
    setPage(1);
  }, []);

  const topContent = React.useMemo(() => {
    return !openCrop ? (
      <>
        <ItemsHeader />
        <ToastContainer
          position="top-right"
          autoClose={5000}
          hideProgressBar={false}
          newestOnTop
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="light"
        />
        <div
          role="presentation"
          onClick={handleClickBreadCrumbs}
          className="text-foreground"
        >
          <Breadcrumbs aria-label="breadcrumb" color="foreground">
            <Link
              className="text-foreground"
              underline="hover"
              sx={{ display: "flex", alignItems: "center" }}
              color="foreground"
              href="#"
              onClick={() => navigate(`/Home`)}
            >
              <RiDashboard2Fill sx={{ mr: 0.5 }} fontSize="inherit" />
              Inicio
            </Link>
            <Typography
              sx={{ display: "flex", alignItems: "center" }}
              className="text-foreground"
            >
              <TbBrandAppgallery sx={{ mr: 0.5 }} fontSize="inherit" />
              Marcas
            </Typography>
          </Breadcrumbs>
        </div>
        <div
          className="flex flex-col gap-4"
          style={{ marginLeft: "10px", marginRight: "10px" }}
        >
          <Spacer y={8} />
          <div className="flex flex-wrap space space-x-4 ">
            <Input
              isClearable
              type="text"
              size="md"
              className="w-[450px] sm:max-w-[44%]"
              placeholder="Buscar marca"
              startContent={<MdSearch />}
              // value={nombre}
            />
          </div>
          <div className="flex flex-wrap place-content-end space-x-2">
            <Button
              onPress={onOpenOuter}
              size="sm"
              color="primary"
              endContent={<TbPlus />}
            >
              Nueva marca
            </Button>
          </div>
        </div>
        <div className="flex justify-between items-center">
          <div className="flex flex-wrap text-small space-x-3">
            <Dropdown>
              <DropdownTrigger className="hidden sm:flex">
                <Button
                  size="sm"
                  endContent={<MdArrowDropDown className="text-small" />}
                  variant="flat"
                >
                  Columnas
                </Button>
              </DropdownTrigger>
              <DropdownMenu
                disallowEmptySelection
                aria-label="Table Columns"
                closeOnSelect={false}
                selectedKeys={visibleColumns}
                selectionMode="multiple"
                onSelectionChange={setVisibleColumns}
              >
                {columns.map((column) => (
                  <DropdownItem key={column.uid} className="capitalize">
                    {column.name}
                  </DropdownItem>
                ))}
              </DropdownMenu>
            </Dropdown>
            <Dropdown>
              <DropdownTrigger className="hidden sm:flex">
                <Button
                  endContent={<MdArrowDropDown className="text-small" />}
                  variant="flat"
                  size="sm"
                >
                  Acciones
                </Button>
              </DropdownTrigger>
              <DropdownMenu
                disallowEmptySelection
                aria-label="Table Columns"
                closeOnSelect={false}
                selectedKeys={visibleColumns}
                selectionMode="multiple"
                onSelectionChange={setVisibleColumns}
              >
                {columns.map((column) => (
                  <DropdownItem key={column.uid} className="capitalize">
                    {column.name}
                  </DropdownItem>
                ))}
              </DropdownMenu>
            </Dropdown>
          </div>
          <label className="flex items-center text-small">
            Marcas por página:
            <select
              className="bg-transparent outline-none text-small"
              onChange={onRowsPerPageChange}
            >
              <option value="5">5</option>
              <option value="10">10</option>
              <option value="15">15</option>
            </select>
          </label>
        </div>
        <>
          <Modal
            isOpen={isOpenOuter}
            onOpenChange={onOpenChangeOuter}
            isDismissable={false}
            placement="top-center"
            size="3xl"
          >
            <ModalContent>
              {(onClose) => (
                <>
                  <ModalHeader>{tipoModal} marca</ModalHeader>
                  <ModalBody>
                    <div className="grid grid-cols-3 gap-4">
                      <div className="col-span-2 flex-wrap space-y-6">
                        <br />
                        <div className="md:col-span-12">
                          <Input
                            isRequired
                            label="Nombre de la Marca"
                            width="300px"
                            id="nombre"
                            name="nombre"
                            value={brand.nombre}
                            onChange={handleEditChange}
                            variant="bordered"
                            placeholder=" "
                            // disabled={isInputDisabled}
                            endContent={
                              <TbTicket className="text-2xl text-default-400 pointer-events-none flex-shrink-0" />
                            }
                          />
                        </div>
                        <div className="md:col-span-12">
                          <Input
                            endContent={
                              <MdBook className="text-2xl text-default-400 pointer-events-none flex-shrink-0" />
                            }
                            label="Catálogo"
                            isRequired
                            placeholder=" "
                            type="text"
                            variant="bordered"
                            id="catalogo"
                            name="catalogo"
                            value={brand.catalogo}
                            onChange={handleEditChange}
                          />
                        </div>
                        {tipoModal == "Ver" ? null : (
                          <div className="md:col-span-12">
                            <input
                              height={"lg"}
                              type="file"
                              id="imagen"
                              ref={fileInputRef}
                              style={{
                                display: "none",
                                borderColor: photoURL ? "" : "red",
                              }}
                              value={brand.logo}
                              onChange={handleChange}
                              name="imagen"
                            />
                            <Button
                              id="buttonfile"
                              size="md"
                              color="primary"
                              variant="flat"
                              endContent={<MdSearch />}
                              className="text-align: right justify-end"
                              onClick={handleFileButtonClick}
                            >
                              Agregar logotipo
                            </Button>
                          </div>
                        )}
                      </div>
                      <div className="col-span-1 flex-wrap space-y-3">
                        <br />
                        <div className="md:col-span-12">
                          {photoURL != "" ? (
                            <Image
                              src={photoURL}
                              alt=""
                              width={300}
                              height={300}
                            />
                          ) : (
                            <Image
                              width={200}
                              height={200}
                              src="../../../public/Blank-Avatar.png"
                              alt=""
                            />
                          )}
                        </div>
                      </div>
                    </div>
                  </ModalBody>

                  <ModalFooter>
                    <Button color="danger" variant="flat" onPress={onClose}>
                      Cerrar
                    </Button>
                    {tipoModal == "Ver" ? null : (
                      <Button
                        endContent={<MdSave />}
                        color="primary"
                        type="submit"
                        onPress={handleSubmit}
                      >
                        Guardar
                      </Button>
                    )}
                  </ModalFooter>
                </>
              )}
            </ModalContent>
          </Modal>
        </>
      </>
    ) : (
      <Crop {...{ photoURL, setOpenCrop, setPhotoURL, setFile, aspect: 1 }} />
    );
  }, [
    openCrop,
    onOpenOuter,
    visibleColumns,
    onRowsPerPageChange,
    isOpenOuter,
    onOpenChangeOuter,
    photoURL,
    navigate,
    brand.nombre,
    brand.catalogo,
    brand.logo,
    handleEditChange,
    handleSubmit,
  ]);
  const bottomContent = React.useMemo(() => {
    return (
      <div className="py-2 px-2 flex justify-between items-center">
        <span className="w-[30%] text-small">
          <span style={{ marginRight: "30px" }}>
            {data.length} Marcas en total
          </span>
          {selectedKeys === "all"
            ? "Todas las marcas seleccionadas"
            : `${selectedKeys.size} of ${data.length} seleccionadas`}
        </span>
        <Pagination
          isCompact
          showControls
          classNames={{
            cursor: "bg-foreground text-background",
          }}
          page={page}
          total={pages}
          onChange={setPage}
        />
        <div className="hidden sm:flex w-[30%] justify-end gap-2">
          <Button
            isDisabled={pages === 1}
            size="sm"
            variant="flat"
            onPress={onPreviousPage}
          >
            Previous
          </Button>
          <Button
            isDisabled={pages === 1}
            size="sm"
            variant="flat"
            onPress={onNextPage}
          >
            Next
          </Button>
        </div>
      </div>
    );
  }, [data.length, selectedKeys, page, pages, onPreviousPage, onNextPage]);

  return (
    <div style={{ marginLeft: "40px", marginRight: "40px" }}>
      <Table
        aria-label="Example table with custom cells, pagination and sorting"
        isHeaderSticky
        bottomContent={bottomContent}
        bottomContentPlacement="outside"
        classNames={{
          wrapper: "max-h-[382px]",
        }}
        selectedKeys={selectedKeys}
        sortDescriptor={sortDescriptor}
        topContent={topContent}
        topContentPlacement="outside"
        onSelectionChange={setSelectedKeys}
        onSortChange={setSortDescriptor}
      >
        <TableHeader columns={headerColumns}>
          {(column) => (
            <TableColumn
              key={column.uid}
              align={"center"}
              allowsSorting={column.sortable}
            >
              {column.name}
            </TableColumn>
          )}
        </TableHeader>
        <TableBody
          emptyContent={
            sortedItems.length === 0 && isLoading === false ? (
              "No Marcas found"
            ) : isLoading === true ? (
              <Spinner label="Cargando" />
            ) : (
              "No Marcas found"
            )
          }
          items={sortedItems}
        >
          {data.map((item) => (
            <TableRow key={item.id}>
              {(columnKey) => (
                <TableCell>{renderCell(item, columnKey)}</TableCell>
              )}
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default Brands;
