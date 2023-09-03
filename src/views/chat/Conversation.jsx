import { toast } from "react-toastify";
import axios from "axios";
import { useState } from "react";
import { useEffect } from "react";
import { useAuth } from "../../components/auth/AuthProvider";
import UserImage from "../user/UserImage";
import { Badge } from "@nextui-org/react";

const Conversation = (data) => {
  const [userData, setuserData] = useState(null);
  const auth = useAuth();
  useEffect(() => {
    const getUser = async (userInfor) => {
      try {
        const { data } = await axios.get(
          `http://localhost:4000/api/user/${userInfor}`
        );
        setuserData(data);
      } catch (err) {
        console.log(err);
        toast.error("Error al cargar los datos", {
          position: "bottom-right",
          theme: "colored",
        });
      }
    };
    let userInfor = null;
    data.data.receptor !== auth.getUser()?.id
      ? (userInfor = data.data.receptor)
      : (userInfor = data.data.emisor);
    getUser(userInfor);
  }, [auth, data.data.emisor, data.data.receptor, data.receptor]);
  return (
    <>
      <div className="follower conversation">
        <Badge isOneChar color="success" placement="bottom-right">
          <UserImage idUsuario={userData?.id} designType="lista" />
        </Badge>
        <div className="name" style={{ fontSize: "0.8 rem" }}>
          <span>
            {userData?.nombre} {userData?.apellido}
          </span>
          <br />
          <span>Online</span>
        </div>
      </div>
      <hr />
    </>
  );
};

export default Conversation;
