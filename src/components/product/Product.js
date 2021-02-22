import React, { useState, useEffect } from "react";
import Link from "next/link";
import { Rate, Button, Tooltip, Skeleton, message, Modal, Spin } from "antd";
import { useSelector, useDispatch } from "react-redux";
import classNames from "classnames";

import { formatCurrency } from "../../common/utils";
import {
  checkProductInWishlist,
  checkAvaiableQuantityToAdd,
} from "../../common/shopUtils";
import { addToCart } from "../../redux/actions/cartActions";
import {
  addToWishlist,
  removeFromWishlist,
} from "../../redux/actions/wishlistActions";
import ShopQuickView from "../shop/ShopQuickView";

function Product({ data, productStyle }) {
  const dispatch = useDispatch();
  const [visible, setVisible] = useState(false);
  const [imageLoading, setImageLoading] = useState(true);
  const globalState = useSelector((state) => state.globalReducer);
  const cartState = useSelector((state) => state.cartReducer);
  const wishlistState = useSelector((state) => state.wishlistReducer);
  const productInWishlist = checkProductInWishlist(wishlistState, data.id);
  const avaiableQuantity = checkAvaiableQuantityToAdd(cartState, data);
  const { currency, locales } = globalState.currency;
  useEffect(() => {
    setImageLoading(true);
  }, [globalState.category]);
  const renderProductType = () => {
    if (data.discount && !data.isNew) {
      return <p className="product-type -sale">Giảm giá</p>;
    } else if (data.isNew && !data.discount) {
      return <p className="product-type -new">Hàng mới</p>;
    } else if (data.isNew && data.discount) {
      return <p className="product-type -new">Hàng mới</p>;
    } else {
      return null;
    }
  };
  console.log(avaiableQuantity);
  const onAddToCart = (data) => {
    if (avaiableQuantity === 0) {
      return;
    }
    dispatch(addToCart(data, 1, "none", "none"));
    message.success("Sản phẩm được thêm vào giỏ hàng thành công");
  };
  const onAddToWishlist = (data) => {
    if (productInWishlist) {
      dispatch(removeFromWishlist(data.id));
      return message.error("Sản phẩm bị xóa khỏi danh sách yêu thích");
    } else {
      dispatch(addToWishlist(data));
      return message.success("Sản phẩm được thêm vào danh sách yêu thích thành công");
    }
  };
  const renderStyleClass = () => {
    const avaialeStyles = ["one", "two", "three"];
    if (avaialeStyles.includes(productStyle)) {
      if (!productStyle || productStyle === "one") {
        return "-style-one";
      } else {
        return "-style-" + productStyle;
      }
    } else {
      return "-style-one";
    }
  };
  const showModal = () => {
    setVisible(true);
  };
  const handleCancel = (e) => {
    setVisible(false);
  };
  const handleImageLoaded = () => {
    setImageLoading(false);
  };
  return data ? (
    <>
      <div className={`product ${renderStyleClass()}`}>
        <div className="product-image">
          <Link
            href={process.env.PUBLIC_URL + `/product/[slug]`}
            as={process.env.PUBLIC_URL + `/product/${data.slug}`}
          >
            <a className={classNames({ loading: imageLoading })}>
              {data.thumbImage &&
                data.thumbImage.map((item, index) => (
                  <link rel="preload" href={item} as="image" />
                  <img
                    onLoad={handleImageLoaded}
                    key={index}
                    src={item}
                    alt="Ảnh sản phẩm"
                    loading="lazy"
                  />
                ))}
            </a>
          </Link>
          {imageLoading && (
            <div className="product-image-loading">
              <Spin size="large" />
            </div>
          )}
          {renderProductType()}
          {productStyle === "two" ? (
            <div className="product-button-group">
              <Tooltip title="Xem nhanh">
                <Button onClick={showModal} type="text">
                  <i className="icon_search" />
                </Button>
              </Tooltip>
              <Tooltip
                title={
                  productInWishlist ? "Xóa khỏi danh sách yêu thích" : "Thêm vào danh sách yêu thích"
                }
              >
                <Button
                  className={`product-atw ${classNames({
                    active: productInWishlist,
                  })}`}
                  type="text"
                  onClick={() => onAddToWishlist(data)}
                >
                  <i className="icon_heart_alt" />
                </Button>
              </Tooltip>
              <Tooltip title="Thêm vào giỏ hàng">
                <Button
                  disabled={avaiableQuantity === 0}
                  type="text"
                  onClick={() => onAddToCart(data)}
                >
                  <i className="icon_bag_alt" />
                </Button>
              </Tooltip>
            </div>
          ) : null}
          {!productStyle || productStyle === "one" ? (
            <>
              <Tooltip
                placement="left"
                title={
                 productInWishlist ? "Xóa khỏi danh sách yêu thích" : "Thêm vào danh sách yêu thích"
                }
              >
                <Button
                  className={`product-atw ${classNames({
                    active: productInWishlist,
                  })}`}
                  type="text"
                  shape="circle"
                  onClick={() => onAddToWishlist(data)}
                >
                  <i className="icon_heart_alt" />
                </Button>
              </Tooltip>

              <Button onClick={showModal} className="product-qv">
                Xem nhanh
              </Button>
            </>
          ) : null}
        </div>
        <div className="product-content">
          <Link
            href={process.env.PUBLIC_URL + `/product/[slug]`}
            as={process.env.PUBLIC_URL + `/product/${data.slug}`}
            title={data.name}
          >
            <a className="product-name">{data.name}</a>
          </Link>
          <div className="product-rate">
            <Rate defaultValue={data.rate} disabled />
            <span className="product-rate-quantity">(06)</span>
          </div>
          <div className="product-content__footer">
            <div className="product-content__footer-price">
              <h5 className="product-price">
                {data.discount
                  ? formatCurrency(
                      data.price - data.discount,
                      locales,
                      currency
                    )
                  : formatCurrency(data.price, locales, currency)}
              </h5>
              {data.discount && (
                <span>{formatCurrency(data.price, locales, currency)}</span>
              )}
            </div>
            {!productStyle || productStyle === "one" ? (
              <Tooltip title="Thêm vào giỏ hàng">
                <Button
                  disabled={avaiableQuantity === 0}
                  className="product-atc"
                  type="text"
                  shape="circle"
                  onClick={() => onAddToCart(data)}
                >
                  <i className="icon_bag_alt" />
                </Button>
              </Tooltip>
            ) : null}
          </div>
          {productStyle === "three" ? (
            <div className="product-button-group">
              <div className="product-button-group__wrapper">
                <Tooltip placement="top" title="Xem nhanh">
                  <Button onClick={showModal} shape="circle">
                    <i className="icon_search" />
                  </Button>
                </Tooltip>
                <Tooltip
                  placement="top"
                  title={
                    productInWishlist
                      ? "Xoá khỏi danh sách yêu thích"
                      : "Thêm vào danh sách yêu thích"
                  }
                >
                  <Button
                    shape="circle"
                    className={`product-atw ${classNames({
                      active: productInWishlist,
                    })}`}
                    onClick={() => onAddToWishlist(data)}
                  >
                    <i className="icon_heart_alt" />
                  </Button>
                </Tooltip>
                <Tooltip placement="top" title="Thêm vào giỏ hàng">
                  <Button
                    disabled={avaiableQuantity === 0}
                    shape="circle"
                    onClick={() => onAddToCart(data)}
                  >
                    <i className="icon_bag_alt" />
                  </Button>
                </Tooltip>
              </div>
            </div>
          ) : null}
        </div>
      </div>
      <Modal
        footer={null}
        afterClose={handleCancel}
        onCancel={handleCancel}
        visible={visible}
        width={850}
      >
        <ShopQuickView setModalVisible={setVisible} data={data} />
      </Modal>
    </>
  ) : (
    <Skeleton active />
  );
}

export default React.memo(Product);
