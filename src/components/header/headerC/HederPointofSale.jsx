import { RiSearch2Line } from "react-icons/ri";

const HeaderPointofSale = () => {
  const currentURL = window.location.href;

  let titleText = "MakeDigitAll"; // Texto predeterminado

  if (currentURL.endsWith("/PointofSale/Products")) {
    titleText = "Productos";
  } else if (currentURL.endsWith("/PointofSale/Customers")) {
    titleText = "Clientes";
  } else if (currentURL.endsWith("/PointofSale/Sales")) {
    titleText = "Ventas";
  } else if (currentURL.endsWith("/PointofSale/Reports")) {
    titleText = "Reportes";
  } else if (currentURL.endsWith("/PointofSale/Reports/ListofCashCuts")) {
    titleText = "Listado de cortes de caja";
  } else if (currentURL.endsWith("/PointofSale/NewSale")) {
    titleText = "Nueva venta";
  } else if (currentURL.endsWith("/PointofSale")) {
    titleText = "Inicio";
  }


  return (
    <header>
      {/* Title and search */}
      <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-4 mb-6">
        <div>
          <h1 className="text-2xl text-gray-300">{titleText}</h1>
        </div>
        <form>
          {/* Agrega tu formulario de búsqueda aquí */}
        </form>
      </div>
      {/* Tabs */}
      <nav className="text-gray-300 flex items-center justify-between md:justify-start md:gap-8 border-b mb-6">
        {/* Agrega tus pestañas de navegación aquí */}
      </nav>
    </header>
  );
};

export default HeaderPointofSale;
