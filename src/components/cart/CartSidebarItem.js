import React, { useState } from "react";
import Link from "next/link";
import { Modal, message } from "antd";
import { useSelector, useDispatch } from "react-redux";

import { formatCurrency } from "../../common/utils";
import QuantitySelector from "../controls/QuantitySelector";
import {
  removeFromCart,
  decreaseQuantityCart,
  increaseQuantityCart,
} from "../../redux/actions/cartActions";

function CartSidebarItem({ data }) {
  const dispatch = useDispatch();
  const [visible, setVisible] = useState(false);
  const [quantity, setQuantity] = useState(data.cartQuantity);
  const globalState = useSelector((state) => state.globalReducer);
  const { currency, locales } = globalState.currency;
  const onRemoveProductFromCart = (e) => {
    e.preventDefault();
    showModal();
  };
  const showModal = () => {
    setVisible(true);
  };

  const handleOk = (e) => {
    dispatch(removeFromCart(data.cartId));
    setVisible(false);
    return message.error("Sản phẩm bị xóa khỏi giỏ hàng");
  };

  const handleCancel = (e) => {
    setVisible(false);
  };
  return (
    <>
      <div className="cart-sidebar-item">
        <div className="cart-sidebar-item__image">
          <link rel="preload" href={data.thumbImage[0]} as="image" />
          <img src={data.thumbImage[0]} alt={data.name} loading="lazy" />
        </div>
        <div className="cart-sidebar-item__content">
          <Link
            href={process.env.PUBLIC_URL + `/product/[slug]`}
            as={process.env.PUBLIC_URL + `/product/${data.slug}`}
          title={data.name}>
            <a>{data.name}</a>
          </Link>
          <h5>
            {data.discount
              ? formatCurrency(
                  (data.price - data.discount) * data.cartQuantity,
                  locales,
                  currency
                )
              : formatCurrency(
                  data.price * data.cartQuantity,
                  locales,
                  currency
                )}
          </h5>
          <QuantitySelector
            size="small"
            defaultValue={data.cartQuantity}
            min={1}
            max={data.quantity}
            onDecrease={() => dispatch(decreaseQuantityCart(data.cartId))}
            onIncrease={() => dispatch(increaseQuantityCart(data.cartId))}
          />
        </div>
        <div className="cart-sidebar-item__close">
          <a href="#" onClick={onRemoveProductFromCart}>
            <i className="icon_close" />
          </a>
        </div>
      </div>
      <Modal
        title="Xác nhận hành động này"
        visible={visible}
        onOk={handleOk}
        onCancel={handleCancel}
      >
        <p>Bạn có chắc chắn xóa sản phẩm khỏi giỏ hàng không ?</p>
      </Modal>
    </>
  );
}

export default React.memo(CartSidebarItem);
