import React from "react";
import MailchimpSubscribe from "react-mailchimp-subscribe";
import { Form, Input, Button, Checkbox } from "antd";

const CustomForm = React.memo(({ status, message, onValidated }) => {
  const onFinish = (value) => {
    console.log("Thành công:", value);
    value &&
      onValidated({
        EMAIL: value.email,
      });
  };

  const onFinishFailed = (errorInfo) => {
    console.log("Lỗi:", errorInfo);
  };

  return (
    <div>
      <Form
        name="basic"
        initialValues={{
          remember: true,
        }}
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
        className="footer-subcribe__form"
      >
        <Form.Item
          noStyle={true}
          name="email"
          rules={[
            {
              type: "email",
              message: "Trường E-mail là bắt buộc!",
            },
            {
              required: true,
              message: "Trường E-mail là bắt buộc!",
            },
          ]}
        >
          <Input placeholder="Địa chỉ email của bạn" />
        </Form.Item>
        <Form.Item noStyle={true}>
          <Button type="link" htmlType="submit">
            Đăng ký
          </Button>
        </Form.Item>
      </Form>
      {status === "sending" && <div style={{ color: "blue" }}>Đang gửi...</div>}
      {status === "error" && (
        <div
          style={{ color: "red" }}
          dangerouslySetInnerHTML={{ __html: message }}
        />
      )}
      {status === "success" && (
        <div
          style={{ color: "green" }}
          dangerouslySetInnerHTML={{ __html: message }}
        />
      )}
      <br />
    </div>
  );
});

export default function FooterSubcribe({ url }) {
  return (
    <MailchimpSubscribe
      url={url}
      render={({ subscribe, status, message }) => (
        <CustomForm
          status={status}
          message={message}
          onValidated={(formData) => subscribe(formData)}
        />
      )}
    />
  );
}
