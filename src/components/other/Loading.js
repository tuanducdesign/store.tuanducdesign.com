import { Spin } from "antd";

export default function Loading() {
  return (
    <div className="loading">
      <Spin tip="Đang tải..." size="large" />
    </div>
  );
}
