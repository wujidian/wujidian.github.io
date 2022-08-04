import { Modal, Table } from "antd";
import { detailsTable } from "types/types";
import type { ColumnsType } from "antd/lib/table";
interface tableModal {
  title: string;
  show: boolean;
  onCancel?: () => void;
  columns: ColumnsType<detailsTable>;
  data: detailsTable[];
}

const TableModal = (tableModal: tableModal) => {
  const { title,show, onCancel, data, columns } = tableModal;
  return (
    <Modal
      title={title}
      visible={show}
      onCancel={onCancel}
      footer={null}
      width={1400}
    >
      <Table columns={columns} dataSource={data} />
    </Modal>
  );
};
export default TableModal;
