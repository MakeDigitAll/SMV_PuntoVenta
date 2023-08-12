import { Button } from "@nextui-org/react";
import { useAuth } from "../../components/auth/AuthProvider";
import Header from "../../components/header/headerC/Header";
import ItemsHeader from "../../components/header/ItemsHeader/ItemsHeader";

const Home = () => {
  const auth = useAuth();
  return (
    <>
      <Header />
      <ItemsHeader />
      <div>
        Dashboard de{" "}
        {auth.getUser()?.nombre +
          " " +
          auth.getUser()?.apellido +
          " Su correo es" +
          auth.getUser()?.email}{" "}
      </div>
      <div className="flex flex-wrap gap-4 items-center">
        <Button color="default">Default</Button>
        <Button color="primary">Primary</Button>
        <Button color="secondary">Secondary</Button>
        <Button color="success">Success</Button>
        <Button color="warning">Warning</Button>
        <Button color="danger">Danger</Button>
      </div>
    </>
  );
};

export default Home;
