import { useState } from "react";
import { useAuth } from "../../components/auth/AuthProvider";
import { Navigate, useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Header from "../../components/header/Header";
import {
  Card,
  Input,
  Spacer,
  Button,
  CardBody,
} from "@nextui-org/react";
import { useTranslation } from "react-i18next";
import { useTheme } from "next-themes";
import { MdLock, MdMail } from "react-icons/md";

const Login = () => {
  const goTo = useNavigate();
  const auth = useAuth();
  const { t } = useTranslation();
  const [user, setUser] = useState({ email: "", password: "" });
  const handleChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };
  async function handleSubmit(e) {
    e.preventDefault();
    try {
      const response = await fetch("http://ec2-18-118-164-218.us-east-2.compute.amazonaws.com:4000/api/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: user.email,
          password: user.password,
        }),
      });
      if (response.ok) {
        const json = await response.json();
        if (json.body.accessToken && json.body.refreshToken) {
          auth.saveUser(json);
          goTo("/home");
        }
        toast.success(json.body.message, { theme: "colored" });
      } else {
        const json = await response.json();
        toast.error(json.body.error, { theme: "colored" });
      }
    } catch (error) {
      toast.warning(error.message);
    }
  }
  const { theme } = useTheme();
  const imgLogo = theme === "dark";
  if (auth.isAuthenticated) return <Navigate to="/home" />;
  return (
    <>
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
      <Header />
      <main>
        <form onChange={handleChange} onSubmit={handleSubmit}>
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
                  <h4>{t("login.Login")}</h4>
                </div>
                {/* <div
                  className="flex justify-center"
                  style={{ marginTop: "20px" }}
                >
                  {imgLogo ? (
                    <Image
                      isZoomed
                      src="../../../public/make-dark.png"
                      alt=""
                      width={100}
                      height={100}
                    />
                  ) : (
                    <Image
                      isZoomed
                      src="../../../public/make-light.png"
                      alt=""
                      width={100}
                      height={100}
                    />
                  )}
                </div> */}

                <Spacer y={10} />
                <div
                  className="flex flex-col gap-2"
                  style={{ marginTop: "20px" }}
                >
                  <div className="flex w-full flex-wrap items-end md:flex-nowrap mb-6 md:mb-0 gap-4">
                    <Input
                      autoFocus
                      endContent={
                        <MdMail className="text-2xl text-default-400 pointer-events-none flex-shrink-0" />
                      }
                      label="Email"
                      variant="bordered"
                      value={user.email}
                      onChange={handleChange}
                      id="email"
                      size={"md"}
                      type="email"
                      name="email"
                      placeholder=" "
                      labelPlacement={"outside"}
                    />
                  </div>
                </div>
                <Spacer y={6} />
                <div
                  className="flex flex-col gap-2"
                  style={{ marginTop: "20px" }}
                >
                  <div className="flex w-full flex-wrap items-end md:flex-nowrap mb-6 md:mb-0 gap-4">
                    <Input
                      endContent={
                        <MdLock className="text-2xl text-default-400 pointer-events-none flex-shrink-0" />
                      }
                      id="password"
                      value={user.password}
                      onChange={handleChange}
                      size={"md"}
                      type="password"
                      label="password"
                      name="password"
                      variant="bordered"
                      labelPlacement={"outside"}
                      placeholder=" "
                    />
                  </div>
                </div>
                <br />
                <div
                  className="flex justify-start"
                  style={{ marginTop: "20px" }}
                ></div>
                <div
                  className="flex justify-center"
                  style={{ marginTop: "20px" }}
                >
                  <Button size={"md"} color="primary" type="submit" className="w-[200px]">
                    {t("login.Login")}
                  </Button>
                </div>
              </CardBody>
            </Card>
          </div>
        </form>
      </main>
    </>
  );
};

export default Login;
