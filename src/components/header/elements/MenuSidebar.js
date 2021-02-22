import React from "react";
import { Menu, Select } from "antd";
import { useSelector, useDispatch } from "react-redux";
import Link from "next/link";

import {
  setGlobalLanguage,
  setGlobalCurrency,
} from "../../../redux/actions/globalActions";

function MenuSidebar() {
  const { SubMenu } = Menu;
  const { Option } = Select;
  const dispatch = useDispatch();
  const globalState = useSelector((state) => state.globalReducer);
  const onSelectLanguage = (value) => {
    dispatch(setGlobalLanguage(value));
  };
  const onSelectCurrency = (value) => {
    dispatch(setGlobalCurrency(value));
  };
  return (
    <div className="menu-sidebar">
      <Menu mode="inline">
        <Menu.Item key="1">
          <Link href={process.env.PUBLIC_URL + "/"} title="Trang chủ">
            <a>Trang chủ</a>
          </Link>
        </Menu.Item>
        <Menu.Item key="2">
          <Link href="https://tuanducdesign.com/" title="Blog">
            <a>Blog</a>
          </Link>
        </Menu.Item>
      </Menu>
      <div className="menu-sidebar-selects">
        <Select
          defaultValue={globalState.language}
          style={{ width: 120 }}
          bordered={false}
          onChange={onSelectLanguage}
        >
          <Option value="en">English</Option>
          <Option value="vi">Vietnamese</Option>
        </Select>
        <Select
          defaultValue={globalState.currency.currency}
          style={{ width: 150 }}
          bordered={false}
          onChange={onSelectCurrency}
        >
          <Option value="USD">USD - Dollar</Option>
          <Option value="VND">VND - Vietnam dong</Option>
        </Select>
      </div>
    </div>
  );
}

export default React.memo(MenuSidebar);
