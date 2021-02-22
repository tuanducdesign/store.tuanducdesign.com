import React from "react";
import { Row, Col } from "antd";
import Link from "next/link";

import FooterSubcribe from "./elements/FooterSubcribe";
import Container from "../other/Container";
import links from "../../data/footer-links.json";

function Footer({ containerType }) {
  return (
    <div className="footer">
      <div className="footer-top">
        <Container type={containerType}>
          <Row justify="center" gutter={30}>
            <Col className="gutter-row" span="24" sm={12} lg={8}>
              <div className="footer-top-item -col-one">
                <link rel="preload" href={
                        process.env.PUBLIC_URL + "/assets/images/logo-dark.png"
                      } as="image" />
                <Link href="#">
                  <a>
                    <img
                      src={
                        process.env.PUBLIC_URL + "/assets/images/logo-dark.png"
                      }
                      alt="Logo" loading="lazy"
                    />
                  </a>
                </Link>
                <p>Liên hệ thiết kế & tối ưu website</p>
                <ul>
                  <li>mail: miumiu.official.56@gmail.com</li>
                  <li>fb: tuanduc.support</li>
                </ul>
              </div>
            </Col>
            <Col className="gutter-row" span="24" sm={12} lg={8}>
              <div className="footer-top-item -col-two">
                <Row gutter={30}>
                  <Col className="gutter-row" span={12}>
                    <h5 className="footer-title">Thông tin</h5>
                    <ul>
                      {links.information.map((item, index) => (
                        <li key={index}>
                          <Link href="#" title={item.name}>
                            <a>{item.name}</a>
                          </Link>
                        </li>
                      ))}
                    </ul>
                  </Col>
                  <Col className="gutter-row" span={12}>
                    <h5 className="footer-title">Tài khoản của tôi</h5>
                    <ul>
                      {links.account.map((item, index) => (
                        <li key={index}>
                          <Link href="#" title={item.name}>
                            <a>{item.name}</a>
                          </Link>
                        </li>
                      ))}
                    </ul>
                  </Col>
                </Row>
              </div>
            </Col>
            <Col className="gutter-row" span="24" sm={18} lg={8}>
              <div className="footer-top-item -col-three">
                <h5 className="footer-title">Đăng ký nhận sản phẩm mới</h5>
                <p>
                  Đăng ký để nhận thông báo về các sản phẩm mới
                </p>
                <FooterSubcribe url="#" />
                <img
                  src={
                    process.env.PUBLIC_URL + "/assets/images/footer/payment.png"
                  }
                  alt="Phương thức thanh toán" loading="lazy"
                />
              </div>
            </Col>
          </Row>
        </Container>
      </div>
      <div className="footer-bottom">
        <Container type={containerType}>
          <p>© Store Tuan Duc Design</p>
        </Container>
      </div>
    </div>
  );
}

export default React.memo(Footer);
