import React, { useState, useEffect } from "react";
import { Card, Spacer, Button, CardBody, Select, SelectItem } from "@nextui-org/react";
import { useState, useEffect } from "react";
import {
  Card,
  Spacer,
  Button,
  CardBody,
  Select,
  SelectItem,
} from "@nextui-org/react";
import ItemsHeader from "../../components/header/itemsHeader/ItemsHeader";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../components/auth/AuthProvider";
import ItemsHeader from "../../components/header/itemsHeader/ItemsHeader";
const AccesPoint = () => {
  const auth = useAuth();
  const navigate = useNavigate();
  const [selectedAlmacen, setSelectedAlmacen] = useState(null);
  const [data, setData] = useState([]);

  async function loadTask() {
    try {
      const response = await fetch(
        "https://localhost:4000/Almacenes"
      );
      const data = await response.json();
      if (response.ok) {
        setData(data);
      }
    } catch (error) {
      console.error("Error al cargar los datos:", error);
    }
  }

  useEffect(() => {
    loadTask();
  }, []);

  const handleAccess = () => {
    auth.guardarTablaID(selectedAlmacen.target.value);
    navigate(`/PointofSale`);
  };
  useEffect(() => {
    const tableId = localStorage.getItem("tableId");
    if (tableId) {
      navigate(`/PointofSale`);
    }
  }, [navigate]);

  return (
    <>
      <ItemsHeader />
      <main>
        <form>
          <div className="flex justify-center">
            <Card
              style={{
                display: "flex",
                height: "500px",
                width: "400px",
                marginTop: "100px",
              }}
            >
              <CardBody
                css={{
                  marginTop: "20px",
                  marginRight: "20px",
                }}
              >
                <br />
                <div className="flex justify-center">
                  <img src="/make-logo-light.png" alt="Make" />
                </div>

                <Spacer y={3} />
                <div
                  className="flex flex-col gap-2"
                  style={{ marginTop: "20px" }}
                >
                  <div className="flex w-full flex-wrap items-end md:flex-nowrap mb-6 md:mb-0 gap-4">
                    <Select
                      labelPlacement={"outside"}
                      label="Almacen"
                      placeholder="Selecciona el almacen"
                      size="sm"
                      onChange={(selectedValue) =>
                        setSelectedAlmacen(selectedValue)
                      }
                    >
                      {data.map((almacen) => (
                        <SelectItem key={almacen.id} value={almacen.id}>
                          {almacen.nombre}
                        </SelectItem>
                      ))}
                    </Select>
                  </div>
                </div>
                <Spacer y={6} />
                <br />
                <Button size="sm" color="primary" onClick={handleAccess}>
                  Acceder
                </Button>
              </CardBody>
            </Card>
          </div>
        </form>
      </main>
    </>
  );
};
export default AccesPoint;
