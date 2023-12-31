//Promotions
import React, { useCallback, useEffect, useState, useMemo } from "react";
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
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  useDisclosure,
  Select,
  Checkbox,
  Image,
  Tooltip
} from "@nextui-org/react";
import { TbDotsVertical, TbReload } from "react-icons/tb"
import { AiOutlinePlus } from "react-icons/ai"
import { BsFillEyeFill } from "react-icons/bs"
import { MdArrowDropDown, MdBookmarkAdded, MdSearch } from "react-icons/md";
import { BsTrash3 } from "react-icons/bs";
import ItemsHeader from "../../components/header/itemsHeader/ItemsHeader";
import Typography from "@mui/material/Typography";
import Breadcrumbs from "@mui/material/Breadcrumbs";
import Link from "@mui/material/Link";
import { RiDashboard2Fill } from "react-icons/ri";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import { format, set } from "date-fns";
import { IoIosSave } from "react-icons/io"
//Columnas de la tabla
const columns = [
  { name: "ID", uid: "id", sortable: true },
  { name: "Imagen", uid: "imagen", sortable: true },
  { name: "Codigo Empresa", uid: "codigoEmpresa", sortable: true },
  { name: "Nombre", uid: "nombre", sortable: true },
  { name: "Desde", uid: "desde", sortable: true },
  { name: "Hasta", uid: "hasta", sortable: true },
  { name: "Precio base", uid: "precioBase", sortable: true },
  { name: "Descuento", uid: "descuento", sortable: true },
  { name: "Precio", uid: "precio", sortable: true },
  { name: "Activo", uid: "activo", sortable: true },
  { name: "Acciones", uid: "Actions" },
];
const columnsProductos = [
  { name: "Código", uid: "codigo", sortable: false },
  { name: "Nombre", uid: "nombre", sortable: false },
  { name: "Marca", uid: "marca", sortable: false },
  { name: "Inv.", uid: "inv", sortable: false },
  { name: "Total", uid: "total", sortable: false },
  { name: "Precio Uni.", uid: "precioUnitario", sortable: false },
  { name: "Fecha desde", uid: "fechaDesde", sortable: false },
  { name: "Fecha hasta", uid: "fechaHasta", sortable: false },
  { name: "Descuento", uid: "descuento", sortable: false },
];


const INITIAL_VISIBLE_COLUMNS = [
  "id",
  "imagen",
  "codigoEmpresa",
  "nombre",
  "desde",
  "hasta",
  "precioBase",
  "descuento",
  "precio",
  "activo",
  "Actions",
];


//Obtener el listado de productos con descuentos de la base de datos
const Promotions = () => {
  const marcaOptions = [];
  function contarmarca() {
    for (let i = 0; i < data.length; i++) {
      marcaOptions.push({ name: data[i].marca, uid: data[i].id });
    }
  }
  const [data, setData] = useState([]);
  async function getPromotions() {
    try {
      const response = await fetch("https://localhost:4000/ListadoPromociones");
      const data = await response.json();
      if (response.ok) {
        setData(data);
        const dataPromotions = await Promise.all(
          data.map(async (item) => {
            const response = await fetch(`https://localhost:4000/Productos/${item.idProducto}`);
            const data = await response.json();
            if (response.ok) {
              return {
                ...item,
                nombre: data.nombre,
                codigoEmpresa: data.codigoEmpresa,
                imagen: data.imagen,
              };
            }
            return item;
          })
        );
        setData(dataPromotions);
      }
    } catch (err) {
      toast.error("Error al cargar los datos", {
        position: "bottom-right",
        theme: "colored",
      });
    }
  }

  useEffect(() => {
    getPromotions();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  function handleClickBreadCrumbs(event) {
    event.preventDefault();
  }


  const navigate = useNavigate();
  const [filterValue, setFilterValue] = React.useState("");
  const [selectedKeys, setSelectedKeys] = React.useState(new Set([]));
  const [visibleColumns, setVisibleColumns] = React.useState(
    new Set(INITIAL_VISIBLE_COLUMNS)
  );
  const [statusFilter, setStatusFilter] = React.useState("all");
  const [rowsPerPage, setRowsPerPage] = React.useState(5);
  const [sortDescriptor, setSortDescriptor] = React.useState({
    column: "age",
    direction: "ascending",
  });
  const [page, setPage] = React.useState(1);

  const hasSearchFilter = Boolean(filterValue);

  const headerColumns = React.useMemo(() => {
    if (visibleColumns === "all") return columns;

    return columns.filter((column) =>
      Array.from(visibleColumns).includes(column.uid)
    );
  }, [visibleColumns]);

  const filteredItems = React.useMemo(() => {
    let filteredPromotions = [...data];

    if (hasSearchFilter) {
      filteredPromotions = filteredPromotions.filter((data) =>
        data.nombre.toLowerCase().includes(filterValue.toLowerCase())
      );
    }
    if (
      statusFilter !== "all" &&
      Array.from(statusFilter).length !== statusOptions.length
    ) {
      filteredPromotions = filteredPromotions.filter((data) =>
        Array.from(statusFilter).includes(data.nombre)
      );
    }

    return filteredPromotions;
  }, [data, hasSearchFilter, statusFilter, filterValue]);

  const pages = Math.ceil(filteredItems.length / rowsPerPage);

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


  const handleDeletePromocion = (idPromocion) => {
    //eliminar la promocion de la base de datos por su id
    fetch(`https://localhost:4000/ListadoPromocionesDelete/${idPromocion}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    }).then((res) => {
      if (res.status === 200) {
        toast.success("Promoción eliminada correctamente", {
          position: "bottom-right",
          theme: "colored",
        });
      } else {
        toast.error("Error al eliminar la promoción", {
          position: "bottom-right",
          theme: "colored",
        });
      }
    });

  }

  const handleSeePromocion = (idProducto) => {
    navigate(`/Products/${idProducto}/ViewProduct`);

  }



  const [desdeDisplayDate, setDesdeDisplayDate] = useState("");
  const [hastaDisplayDate, setHastaDisplayDate] = useState("");

  //renderizar los datos de las columnas
  const renderCell = useCallback((data, columnKey) => {
    const cellValue = data[columnKey];

    switch (columnKey) {
      case "id":
        return (
          <div className="flex flex-col">
            <p className="text-bold text-small capitalize">{data.idPromocion}</p>
          </div>
        );
      case "imagen":
        return (
          <div className="flex flex-col">
            <Image value={data.imagen} width={50} height={50} />
          </div>
        );
      case "codigoEmpresa":
        return (
          <div className="flex flex-col">
            <p className="text-bold text-small capitalize">{data.codigoEmpresa}</p>
          </div>
        );
      case "nombre":
        return (
          <div className="flex flex-col">
            <p className="text-bold text-small capitalize">{data.nombre}</p>
          </div>
        );
      case "desde":
        return (
          <div className="flex flex-col">
            <Input
              size="sm"
              type="date"
              className="w-[120px]"
              value={desdeDisplayDate || format(new Date(data.desde), "yyyy-MM-dd")}
              onChange={(e) => handleEditInputChange(e, data.idPromocion, "fechaDesde", data)}
              placeholder=""
            />
          </div>
        );
      case "hasta":
        return (
          <div className="flex flex-col">
            <Input
              size="sm"
              type="date"
              className="w-[120px]"
              value={hastaDisplayDate || format(new Date(data.hasta), "yyyy-MM-dd")}
              onChange={(e) => handleEditInputChange(e, data.idPromocion, "fechaHasta", data)}
              placeholder=""
            />
          </div>
        );
      case "precioBase":
        return (
          <div className="flex flex-col">
            <p className="text-bold text-small capitalize">{data.precioBase}</p>
          </div>
        );
      case "descuento":
        return (
          <div className="flex flex-col">
            <Input
              size="sm"
              type="number"
              className="w-[80px]"
              value={data.descuento}
              onChange={(e) => handleEditInputChange(e, data.idPromocion, "descuento", data)}
              placeholder=""
            />
          </div>
        );
      case "precio":
        return (
          <div className="flex flex-col">
            <p className="text-bold text-small capitalize">{data.precioDescuento}</p>
          </div>
        );
      case "activo":
        return (
          <div className="flex flex-col">
            <Checkbox
              color="success"
              isSelected={data.isActive}
              onChange={(e) => handleEditInputChange(e, data.idPromocion, "checkbox", data)}


            />
          </div>
        );
      case "Actions":
        return (
          <div className="relative flex justify-center gap-5">


            <Tooltip content={("Ver")}>
              <span
                onClick={() => handleSeePromocion(data.idProducto)}
                style={{ marginLeft: "-8px" }}
                className="cursor-pointer active:opacity-50"
              >
                <BsFillEyeFill size={20} />
              </span>
            </Tooltip>


            <Tooltip content={("Eliminar")}>
              <span
                onClick={() => handleDeletePromocion(data.idPromocion)}
                style={{ marginLeft: "-8px" }}
                className="cursor-pointer active:opacity-50"
              >
                <BsTrash3 size={20} />
              </span>
            </Tooltip>
          </div>
        );
      default:
        return cellValue;
    }
  }, [desdeDisplayDate, hastaDisplayDate]);

  const renderCellProducto = useCallback((data, columnKey) => {
    switch (columnKey) {
      case "codigo":
        return (
          <div className="flex flex-col">
            <p className="text-bold text-small capitalize">{data.idproducto}</p>
          </div>
        );
      case "nombre":
        return (
          <div className="flex flex-col">
            <p className="text-bold text-small capitalize">{data.nombre}</p>
          </div>
        );
      case "marca":
        return (
          <div className="flex flex-col">
            <p className="text-bold text-small capitalize">{data.marca}</p>
          </div>
        );
      case "inv":
        return (
          <div className="flex flex-col">
            <p className="text-bold text-small capitalize">{data.existencia}</p>
          </div>
        );
      case "precioUnitario":
        return (
          <div className="flex flex-col">
            <p className="text-bold text-small capitalize">{data.precio}</p>
          </div>
        );
      case "descuento":
        return (
          <Input
            size="sm"
            type="number"
            className="w-[80px]"
            //value={descuento[index] || ""}
            //seleccionar el id del item 
            onChange={(e) => handleInputChange(e, data.idproducto, "descuento")}

            placeholder=""
          />
        );

      case "fechaDesde":
        return (
          <Input
            size="sm"
            type="date"
            className="w-[120px]"
            onChange={(e) => handleInputChange(e, data.idproducto, "fechaDesde")}
            placeholder=""
          />
        );

      case "fechaHasta":
        return (
          <Input
            size="sm"
            type="date"
            className="w-[120px]"
            onChange={(e) => handleInputChange(e, data.idproducto, "fechaHasta")}
            placeholder=""
          />
        );

      case "total":
        return (
          <div className="flex flex-col">
            <p className="text-bold text-small capitalize">{data.total}</p>
          </div>
        );

      case "agregar":
        return (
          <div className="relative flex justify-center items-center gap-2">
            <Button
              size="sm"
              onClick={() => agregarFila(data, index)}
            >
              +
            </Button>
          </div>
        );
    }
  }, []);



  const [allProductos, setAllProductos] = useState([]);

  const getAllProducts = () => {
    async function loadProducts() {
      try {
        const response = await fetch(`https://localhost:4000/Productos`);
        const data = await response.json();
        if (response.ok) {
          setAllProductos(data);
          // console.log(data[0].idproducto);
        }
      } catch (err) {
        toast.error("Error al cargar los datos", {
          position: "bottom-right",
          theme: "colored",
        });
      }
    }
    loadProducts();
  };

  useEffect(() => {
    getAllProducts();
  }, []);




  // Inicializa un arreglo vacío para almacenar los productos
  const products = [];
  // useState para los productos
  const [allProducts, setAllProducts] = useState([]);

  const handleInputChange = (e, idProducto, inputType) => {
    let producto = products.find(item => item.idProducto === idProducto);

    if (!producto) {
      producto = {
        idProducto: idProducto,
        descuento: null,
        fechaDesde: null,
        fechaHasta: null
      };
      products.push(producto);
    }

    // Condicional para asignar fechaDesde, fechaHasta o descuento
    if (inputType === 'fechaDesde') {
      producto.fechaDesde = e.target.value;
    } else if (inputType === 'fechaHasta') {
      producto.fechaHasta = e.target.value;
    } else if (inputType === 'descuento') {
      producto.descuento = e.target.value;
    }
    // Verificar si todos los campos de producto están llenos
    const allFieldsFilled = producto.fechaDesde !== null && producto.fechaHasta !== null && producto.descuento !== null;

    // Si todos los campos están llenos, actualiza el producto en allProducts
    if (allFieldsFilled) {
      setAllProducts(prevAllProducts => {
        // Actualizar el producto si ya existe en allProducts
        if (prevAllProducts.some(item => item.idProducto === idProducto)) {
          return prevAllProducts.map(item =>
            item.idProducto === idProducto ? producto : item
          );
        } else {
          return [...prevAllProducts, producto];
        }
      });
    }
  }


  const [allProductsEdited, setAllProductsEdited] = useState([]);
  const productsEdited = [];


  const handleEditInputChange = (e, idPromocion, inputType, data) => {
    let producto = productsEdited.find(item => item.idPromocion === idPromocion);



    if (!producto) {
      producto = {
        idProducto: data.idProducto,
        idPromocion: data.idPromocion,
        descuento: data.descuento,
        fechaDesde: data.desde,
        fechaHasta: data.hasta,
        isActive: data.isActive
      };
      productsEdited.push(producto);
    }


    console.log(producto);

    producto.idProducto = data.idProducto;

    // Condicional para asignar fechaDesde, fechaHasta o descuento
    if (inputType === 'fechaDesde') {
      producto.fechaDesde = e.target.value;

      let fechaActual = new Date(e.target.value);
      fechaActual.setDate(fechaActual.getDate() + 1);

      let fechaFormateada = format(fechaActual, "yyyy-MM-dd");

      setDesdeDisplayDate(fechaFormateada);


      //remplazar los datos modificados en data
      setData((prevData) => {
        return prevData.map((item) =>
          item.idPromocion === idPromocion
            ? { ...item, desde: e.target.value }
            : item
        );
      }
      )
      setHasChanges(true);

    } else if (inputType === 'fechaHasta') {
      producto.fechaHasta = e.target.value;

      let fechaActual = new Date(e.target.value);
      fechaActual.setDate(fechaActual.getDate() + 1);

      let fechaFormateada = format(fechaActual, "yyyy-MM-dd");

      setHastaDisplayDate(fechaFormateada);
      //remplazar los datos modificados en data
      setData((prevData) => {
        return prevData.map((item) =>
          item.idPromocion === idPromocion
            ? { ...item, hasta: e.target.value }
            : item
        );
      }
      )
      setHasChanges(true);

    } else if (inputType === 'descuento') {
      producto.descuento = e.target.value;

      //remplazar los datos modificados en data
      setData((prevData) => {
        return prevData.map((item) =>
          item.idPromocion === idPromocion
            ? { ...item, descuento: Number(e.target.value) }
            : item
        );
      }
      )
      setHasChanges(true);
    } else if (inputType === 'checkbox') {
      producto.isActive = e.target.checked;

      //remplazar los datos modificados en data
      setData((prevData) => {
        return prevData.map((item) =>
          item.idPromocion === data.idPromocion
            ? { ...item, isActive: !item.isActive }
            : item
        );
      })
      setHasChanges(true);
    }

    setAllProductsEdited(prevAllProducts => {
      // Actualizar el producto si ya existe en allProducts
      if (prevAllProducts.some(item => item.idPromocion === idPromocion)) {
        return prevAllProducts.map(item =>
          item.idPromocion === idPromocion ? producto : item
        );
      } else {
        return [...prevAllProducts, producto];
      }

    });

  }

  //para verificar fechas y descuento
  const handleVerificarEdit = () => {
    //para todos los allProductsEdited verificar que el descuento sea de 0 a 100 si no mostrar mensaje de error 
    for (let i = 0; i < allProductsEdited.length; i++) {
      if (allProductsEdited[i].descuento <= 0 || allProductsEdited[i].descuento > 100) {
        toast.error("Error al agregar la promoción, el descuento debe ser de 1 a 100", {
          position: "bottom-right",
          theme: "colored",
        });
        return false;
      }
    }

    //para todos los allProductsEdited verificar que la fecha desde sea menor a la fechaHasta y que no sea anterior a la fecha actual
    for (let i = 0; i < allProductsEdited.length; i++) {
      if (Date(allProductsEdited[i].fechaDesde) > Date(allProductsEdited[i].fechaHasta)) {
        toast.error("Error al agregar la promoción, la fecha desde debe ser menor a la fecha hasta", {
          position: "bottom-right",
          theme: "colored",
        });
        return false;
      }
    }

    //comprobar que la fecha desde no sea anterior a la fecha actual
    for (let i = 0; i < allProductsEdited.length; i++) {
      const fechaActual = format(new Date(), "yyyy-MM-dd");
      if (allProductsEdited[i].fechaDesde < fechaActual) {
        toast.error("Error al agregar la promoción, la fecha desde no puede ser anterior a la fecha actual", {
          position: "bottom-right",
          theme: "colored",
        });
        return false;
      }
    }

    //si no hay errores retornar llamar a la funcion handleSubmite
    handleSubmiteEdit();

  }

  const handleSubmiteEdit = () => {
    if (!allProductsEdited || allProductsEdited.length === 0) {
      return;
    }

    let showMessage = true; // Variable para controlar si se muestra el mensaje

    for (let i = 0; i < allProductsEdited.length; i++) {

      const producto = allProductos.find(item => Number(item.idproducto) == Number(allProductsEdited[i].idProducto));
      allProductsEdited[i].precio = producto.precio;
    }

    for (let i = 0; i < allProductsEdited.length; i++) {
      allProductsEdited[i].precioDescuento = Number(allProductsEdited[i].precio) - (Number(allProductsEdited[i].precio) * (Number(allProductsEdited[i].descuento) / 100));
    }

    for (let i = 0; i < allProductsEdited.length; i++) {
      const data = {
        idPromocion: allProductsEdited[i].idPromocion,
        idProducto: allProductsEdited[i].idProducto,
        desde: allProductsEdited[i].fechaDesde,
        hasta: allProductsEdited[i].fechaHasta,
        precioBase: allProductsEdited[i].precio,
        descuento: allProductsEdited[i].descuento,
        precioDescuento: allProductsEdited[i].precioDescuento,
        isActive: allProductsEdited[i].isActive
      };

      fetch(`https://localhost:4000/ListadoPromociones`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      }).then((res) => {
        if (res.status === 200 && showMessage) {
          toast.success("Promoción agregada correctamente", {
            position: "bottom-right",
            theme: "colored",
          });
          //cerrar el modal
          onClose();
          showMessage = false;
        } else if (showMessage) {
          toast.error("Error al agregar la promoción", {
            position: "bottom-right",
            theme: "colored",
          });
          showMessage = false;
        }
      });
    }
  }




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

  const onSearchChange = React.useCallback((value) => {
    if (value) {
      setFilterValue(value);
      setPage(1);
    } else {
      setFilterValue("");
    }
  }, []);

  const onClear = useCallback(() => {
    setFilterValue("");
    setPage(1);
  }, []);

  //para el modal de productos
  const [marca, setmarca] = useState([]);
  const [categorias, setCategorias] = useState([]);
  const [cantidadProducto, setcantidadProducto] = useState([]);
  const { isOpen, onOpen, onClose } = useDisclosure();


  //--------------------------------------SSSSSSS--------------------------------------------
  //obtener todos los productos de la base de datos
  const [productos, setProductos] = useState([]);
  const [productosSearched, setProductosSearched] = useState([]);
  const [nameProducto, setNameProducto] = useState("");

  const getProductos = () => {
    async function loadProducts() {
      try {
        const response = await fetch(`https://localhost:4000/ProductosSinDescuento`);
        const data = await response.json();
        if (response.ok) {
          setProductos(data);
        }
      } catch (err) {
        toast.error("Error al cargar los datos", {
          position: "bottom-right",
          theme: "colored",
        });
      }
    }
    loadProducts();
  };


  const handleSearchProducto = (e) => {
    const value = e.target.value.toLowerCase();
    setNameProducto(value);
    const result = [];
    result.push(...productos.filter((producto) => producto.nombre.toLowerCase().includes(value)));

    if (value === "") {
      setProductosSearched(productos);
    } else {
      setProductosSearched(result);
    }
  };


  //paginacion del modal
  const [pageProductos, setPageProductos] = useState(1);
  const rowsPerPageProductos = 8;

  const pagesProductos = Math.ceil(productosSearched.length / rowsPerPageProductos);

  //paginacion de la tabla de usuarios ordenados
  const itemsProductos = useMemo(() => {
    const start = (pageProductos - 1) * rowsPerPageProductos;
    const end = start + rowsPerPageProductos;
    if (productosSearched.length === 0 && !nameProducto) {
      setProductosSearched(productos);
      return productos.slice(start, end);
    }
    return productosSearched.slice(start, end);
  }, [pagesProductos, rowsPerPageProductos, productos, pageProductos, productosSearched]);

  //Ejecutar useEffect

  useEffect(() => {
    getProductos();
  }, []);




  //para verificar fechas y descuento
  const handleVerificar = () => {
    //para todos los allProducts verificar que el descuento sea de 0 a 100 si no mostrar mensaje de error 
    for (let i = 0; i < allProducts.length; i++) {
      if (allProducts[i].descuento <= 0 || allProducts[i].descuento > 100) {
        toast.error("Error al agregar la promoción, el descuento debe ser de 1 a 100", {
          position: "bottom-right",
          theme: "colored",
        });
        return false;
      }
    }

    //para todos los allProducts verificar que la fecha desde sea menor a la fechaHasta y que no sea anterior a la fecha actual
    for (let i = 0; i < allProducts.length; i++) {
      if (allProducts[i].fechaDesde > allProducts[i].fechaHasta) {
        toast.error("Error al agregar la promoción, la fecha desde debe ser menor a la fecha hasta", {
          position: "bottom-right",
          theme: "colored",
        });
        return false;
      }
    }

    //comprobar que la fecha desde no sea anterior a la fecha actual
    for (let i = 0; i < allProducts.length; i++) {
      const fechaActual = format(new Date(), "yyyy-MM-dd");
      if (allProducts[i].fechaDesde < fechaActual) {
        toast.error("Error al agregar la promoción, la fecha desde no puede ser anterior a la fecha actual", {
          position: "bottom-right",
          theme: "colored",
        });
        return false;
      }
    }


    //si no hay errores retornar llamar a la funcion handleSubmite
    handleSubmite();

  }

  const handleSubmite = () => {
    let showMessage = true; // Variable para controlar si se muestra el mensaje

    for (let i = 0; i < allProducts.length; i++) {
      const producto = productos.find(item => item.idproducto === allProducts[i].idProducto);
      allProducts[i].precio = producto.precio;
    }

    for (let i = 0; i < allProducts.length; i++) {
      allProducts[i].precioDescuento = Number(allProducts[i].precio) - (Number(allProducts[i].precio) * (Number(allProducts[i].descuento) / 100));
    }

    for (let i = 0; i < allProducts.length; i++) {
      const data = {
        idProducto: allProducts[i].idProducto,
        desde: allProducts[i].fechaDesde,
        hasta: allProducts[i].fechaHasta,
        precioBase: allProducts[i].precio,
        descuento: allProducts[i].descuento,
        precioDescuento: allProducts[i].precioDescuento,
        isActive: true
      };

      fetch(`https://localhost:4000/ListadoPromociones`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      }).then((res) => {
        if (res.status === 200 && showMessage) {
          toast.success("Promoción agregada correctamente", {
            position: "bottom-right",
            theme: "colored",
          });
          //cerrar el modal
          onClose();
          showMessage = false;
        } else if (showMessage) {
          toast.error("Error al agregar la promoción", {
            position: "bottom-right",
            theme: "colored",
          });
          showMessage = false;
        }
      });
    }
  }


  const [hasChanges, setHasChanges] = useState(false);

  const handleSaveChanges = (e) => {

    const dataModificada = data.map((item) => {
      return {
        idPromocion: item.idPromocion,
        idProducto: item.idProducto,
        desde: item.desde,
        hasta: item.hasta,
        precioBase: item.precioBase,
        descuento: item.descuento,
        precioDescuento: item.precioDescuento,
        isActive: item.isActive
      };
    });

    console.log(dataModificada[0]);

    for (let i = 0; i < dataModificada.length; i++) {

      fetch(`https://localhost:4000/ListadoPromociones`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(dataModificada[i]),
      }).then((res) => {
        if (res.status === 200) {
          toast.success("Promociones actualizadas correctamente", {
            position: "bottom-right",
            theme: "colored",
          });
          setHasChanges(false);
        } else {
          toast.error("Error al actualizar las promociones", {
            position: "bottom-right",
            theme: "colored",
          });
          setHasChanges(false);
        }
      });
    }
  }


  //-------------------------------------------------------------SSSS---------------------------------------------------------------------------------


  const topContent = (
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
            <MdBookmarkAdded sx={{ mr: 0.5 }} fontSize="inherit" />
            Promotions
          </Typography>
        </Breadcrumbs>
      </div>
      <div
        className="flex flex-col gap-4"
        style={{ marginLeft: "10px", marginRight: "10px" }}
      >
        <div className="flex flex-wrap place-content-start space-x-6 space-y-1">
          <Input
            isClearable
            size="sm"
            className="w-[450px] sm:max-w-[44%]"
            placeholder="Producto"
            startContent={<MdSearch />}
            value={filterValue}
            onClear={() => onClear()}
            onValueChange={onSearchChange}
          />

          <Button onPress={onOpen} size="sm" color="success" endContent={<AiOutlinePlus />}>
            Agregar Promocion a Producto
          </Button>

          {hasChanges ? (
            <Button onPress={handleVerificarEdit} size="sm" color="warning" endContent={<IoIosSave />}>
              Guardar Cambios
            </Button>
          ) : null}
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
        <label className="flex items-center text-default-400 text-small">
          Pedidos por Surtir por página:
          <select
            className="bg-transparent outline-none text-default-400 text-small"
            onChange={onRowsPerPageChange}
          >
            <option value="5">5</option>
            <option value="10">10</option>
            <option value="15">15</option>
          </select>
        </label>
      </div>
    </>
  );


  const bottomContent = React.useMemo(() => {
    return (
      <div className="py-2 px-2 flex justify-between items-center">
        <span className="w-[30%] text-small text-default-400">
          <span style={{ marginRight: "30px" }}>
            {data.length} Pedidos por surtir en total
          </span>
          {selectedKeys === "all"
            ? "All items selected"
            : `${selectedKeys.size} of ${data.length} selected`}
        </span>
        <Pagination
          isCompact
          showControls
          showShadow
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
              align={column.uid === "actions" ? "center" : "start"}
              allowsSorting={column.sortable}
            >
              {column.name}
            </TableColumn>
          )}
        </TableHeader>
        <TableBody
          emptyContent={"No se encuentran promociones registradas"}
          items={sortedItems}
        >
          {(item) => (
            <TableRow key={item.idPromocion}>
              {(columnKey) => (
                <TableCell>{renderCell(item, columnKey)}</TableCell>
              )}
            </TableRow>
          )}
        </TableBody>
      </Table>

      <Modal
        backdrop="blur"
        isOpen={isOpen}
        onClose={onClose}
        size="5xl"
        isDismissable={false}
      >
        <ModalContent>
          {(onClose) => (

            <>
              <ModalHeader className="flex flex-col gap-1">
                Agregar producto a la cotización
              </ModalHeader>
              <ModalBody>
                <div className="grid gap-4 gap-y-2 text-xs grid-cols-1 lg:grid-cols-3">
                  <div className="lg:col-span-4">
                    <div className="grid gap-4 gap-y-2 text-sm grid-cols-1 md:grid-cols-12 space-x-4 space-y-4 content-end">
                      <div className="md:col-span-12">
                        <div className="grid gap-4 gap-y-2 text-sm grid-cols-1 md:grid-cols-12 space-x-4 space-y-4 content-end">
                          <div className="md:col-span-12"></div>
                          <div className="md:col-span-6">
                            <Input
                              id="nombre"
                              size="sm"
                              type="text"
                              label="Nombre del producto"
                              name="nombre"
                              autoComplete="off"
                              labelPlacement="outside"
                              placeholder=" "
                              endContent={
                                <MdSearch className="text-xl text-default-400 pointer-events-none flex-shrink-0" />
                              }
                              onChange={(e) => {
                                handleSearchProducto(e);
                              }}
                            />
                          </div>
                          {/* <div className="md:col-span-3">
                            <Select
                              labelPlacement={"outside"}
                              label="Marca"
                              placeholder="Seleccione"
                              size="sm"
                            >
                              {marca.map((marca) => (
                                <SelectItem key={marca.id} value={marca.id}>
                                  {marca.marca}
                                </SelectItem>
                              ))}
                            </Select>
                          </div>
                          <div className="md:col-span-3">
                            <Select
                              labelPlacement={"outside"}
                              label="Categoría"
                              placeholder="Seleccione"
                              size="sm"
                            >
                              {categorias.map((categoria) => (
                                <SelectItem
                                  key={categoria.id}
                                  value={categoria.id}
                                >
                                  {categoria.nombre}
                                </SelectItem>
                              ))}
                            </Select>
                          </div> */}
                          <div className="md:col-span-12">
                            <Table
                              id="tablaEnModal"
                              removeWrapper
                              aria-label="Example static collection table"
                              bottomContent={
                                pagesProductos > 0 ? (
                                  <div className="flex w-full justify-center">
                                    <Pagination
                                      isCompact
                                      showControls
                                      showShadow
                                      color="primary"
                                      page={pageProductos}
                                      total={pagesProductos}
                                      onChange={(pageProductos) => setPageProductos(pageProductos)}
                                    />
                                  </div>
                                ) : null
                              }
                            >
                              <TableHeader columns={columnsProductos}>
                                {(column) => (
                                  <TableColumn
                                    key={column.uid}
                                    align={column.uid === "actions" ? "center" : "start"}
                                    allowsSorting={false}
                                  >
                                    {column.name}
                                  </TableColumn>
                                )}

                              </TableHeader>
                              <TableBody
                                emptyContent={"No se encontraron productos"}
                                items={itemsProductos}
                              >
                                {(item) => (
                                  <TableRow key={item.idproducto}>
                                    {(columnKey) => (
                                      <TableCell>
                                        {renderCellProducto(item, columnKey)}
                                      </TableCell>
                                    )}
                                  </TableRow>
                                )}
                              </TableBody>
                            </Table>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </ModalBody>
              <ModalFooter>
                <Button color="primary" onPress={handleVerificar} >
                  Aceptar
                </Button>
                <Button color="danger" onPress={onClose}>
                  Cerrar
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </div>
  );
};

export default Promotions;
