import { useState } from "react";
import { Modal, ModalBody, ModalFooter, ModalHeader } from "reactstrap";
import { groupService } from "../../service/group.service";
import { useGroup } from "@hooks";
interface FormType {
  name: string;
  course_id: number;
  status: string;
  start_date: string;
  end_date: string;
}

interface GroupType {
  id: number;
  name: string;
  course_id: number;
  status: string;
  start_date: string;
  end_date: string;
}

interface ProductModalProps {
  isOpen: boolean;
  toggle: () => void;
  groups: GroupType[];
  setGroups: (products: GroupType[]) => void;
  update: GroupType | null;
}

const ProductModal: React.FC<ProductModalProps> = ({
  isOpen,
  toggle,
  groups,
  setGroups,
  update,
}) => {
  const { useGroupUpdate } = useGroup();
  const { mutate: UpdateFn } = useGroupUpdate();

  const [form, setForm] = useState<FormType>({
    name: "",
    course_id: 2,
    status: "",
    start_date: "",
    end_date: "",
  });
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: name === "course_id" ? Number(value) : value });
  };
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (update === null) {
      console.log({ ...form });
      groupService.createGroup({ ...form });
    } else {
      const updated = {
        ...form,
        id: update.id,
        name: form.name ? form.name : update.name,
        course_id: form.course_id ? form.course_id : update.course_id,
        status: form.status ? form.status : update.status,
        start_date: form.start_date ? form.start_date : update.start_date,
        end_date: form.end_date ? form.end_date : update.end_date,
      };
      UpdateFn(updated);
    }
    toggle();
  };
  return (
    <Modal isOpen={isOpen} toggle={toggle}>
      <ModalHeader>
        {update === null ? <span>Add Group</span> : <span>Update Group</span>}
      </ModalHeader>
      <ModalBody>
        <form id="group" onSubmit={handleSubmit}>
          <input
            type="text"
            defaultValue={update?.name}
            required
            name="name"
            onChange={handleChange}
            placeholder="Name..."
            className="form-control my-2"
          />
          <input
            type="number"
            defaultValue={update?.course_id}
            required
            name="course_id"
            onChange={handleChange}
            placeholder="Course id..."
            className="form-control my-2"
          />
          <input
            type="string"
            defaultValue={update?.status}
            required
            name="status"
            onChange={handleChange}
            placeholder="Status..."
            className="form-control my-2"
          />
          <input
            type="date"
            defaultValue={update?.start_date}
            required
            name="start_date"
            onChange={handleChange}
            className="form-control my-2"
          />
          <input
            type="date"
            defaultValue={update?.end_date}
            required
            name="end_date"
            onChange={handleChange}
            className="form-control my-2"
          />
        </form>
      </ModalBody>
      <ModalFooter>
        <button className="btn btn-danger" onClick={toggle}>
          cancel
        </button>
        <button className="btn btn-info" form="group">
          save
        </button>
      </ModalFooter>
    </Modal>
  );
};

export default ProductModal;
