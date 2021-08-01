import { Menu } from "antd";
import { useState, useEffect, useContext } from "react";
import Link from "next/link";
import {
  AppstoreOutlined,
  LoginOutlined,
  LogoutOutlined,
  UserAddOutlined,
  CoffeeOutlined,
  CarryOutOutlined,
  TeamOutlined,
} from "@ant-design/icons";
import { Context } from "../context";
import axios from "axios";
import { useRouter } from "next/router";
import { toast } from "react-toastify";

const { Item, SubMenu, ItemGroup } = Menu; //Menu.item;

const TopNav = () => {
  const [current, setCurrent] = useState("");

  const { state, dispatch } = useContext(Context);
  const { user } = state;

  const router = useRouter();

  useEffect(() => {
    process.browser && setCurrent(window.location.pathname);
  }, [process.browser && window.location.pathname]);

  const logout = async () => {
    dispatch({ type: "LOGOUT" });
    window.localStorage.removeItem("user");
    const { data } = await axios.get("/api/logout");
    toast(data.message);
    router.push("/login");
  };

  return (
    <>
      <Menu className="mb-2" mode="horizontal" selectedKeys={[current]}>
        <Item
          key="/"
          onClick={(e) => setCurrent(e.key)}
          icon={<AppstoreOutlined />}
        >
          <Link href="/">
            <a className="typewriter">App</a>
          </Link>
        </Item>

        {user && user.role && user.role.includes("Instructor") ? (
          <Item
            key="/instructor/course/create"
            onClick={(e) => setCurrent(e.key)}
            icon={<CarryOutOutlined />}
          >
            <Link href="/instructor/course/create">
              <a className="typewriter">Create Course</a>
            </Link>
          </Item>
        ) : (
          <Item
            key="/user/become-instructor"
            onClick={(e) => setCurrent(e.key)}
            icon={<TeamOutlined />}
          >
            <Link href="/user/become-instructor">
              <a className="typewriter">Become Instructor</a>
            </Link>
          </Item>
        )}

        {user === null && (
          <>
            <Item
              key="/login"
              onClick={(e) => setCurrent(e.key)}
              icon={<LoginOutlined />}
            >
              <Link href="/login">
                <a className="typewriter">Login</a>
              </Link>
            </Item>
            <Item
              key="/register"
              onClick={(e) => setCurrent(e.key)}
              icon={<UserAddOutlined />}
            >
              <Link href="/register">
                <a className="typewriter">Register</a>
              </Link>
            </Item>
          </>
        )}
        {user && user.role && user.role.includes("Instructor") && (
          <Item
            key="/instructor"
            onClick={(e) => setCurrent(e.key)}
            icon={<TeamOutlined />}
            className="ms-auto"
          >
            <Link href="/instructor">
              <a className="typewriter">Instructor</a>
            </Link>
          </Item>
        )}
        {user !== null && (
          <SubMenu icon={<CoffeeOutlined />} title={user && user.name}>
            <ItemGroup>
              <Item key="/user">
                <Link href="/user">
                  <a>Dashboard</a>
                </Link>
              </Item>
              <Item
                onClick={logout}
                icon={<LogoutOutlined />}
                className="float-right"
              >
                Logout
              </Item>
            </ItemGroup>
          </SubMenu>
        )}
      </Menu>
    </>
  );
};

export default TopNav;
