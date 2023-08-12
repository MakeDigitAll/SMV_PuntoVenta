import React from "react";
import { useEffect,useState } from 'react';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import {Button, Input} from "@nextui-org/react";
import {useParams, useNavigate} from 'react-router-dom';

const VerAlmacen = () => {

    const params = useParams();
    const navigate = useNavigate();

    const [task, setTask] = useState({
        nombre: '',
        tipo: '',
      })

      
      const handleChange = e => {
        setTask({ ...task, [e.target.name]: e.target.value })
      }

    const loadTask = async (id) => {
        try{
        const response = await fetch(`http://localhost:4000/Almacenes/${id}`)
        const data = await  response.json()
        setTask({nombre: data.nombre, tipo: data.tipo})
       
        } catch (error) {
          toast.error('¡Error al Cargar lo Datos!', {
            position: "bottom-right",
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            autoClose: 5000,
            theme: "colored"
          });
        }
      }
    
      useEffect(() => {
        console.log(params)
        if (params.id) {
          loadTask(params.id)
        }
      }, [params.id ])




    return(
        <>
        <h1>esto es una prueba de texto</h1>
        <form onChange={handleChange}>
        <div>
            <Input  width="100px"
            value={task.nombre}></Input>
            <br />
            <Input
            value={task.tipo}></Input>
        </div>
        </form>
        <br />
        <div>
            <Button color="danger" onPress={() => navigate("/home")}>Regresar</Button>
        </div>
        </>
    )

 } 
 
 export default VerAlmacen;
