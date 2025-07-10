interface ItemType {
  id: number;
  name: string;
  course_id: number;
  status: string;
  start_date: string;
  end_date: string;
}

interface CardProps {
  item: ItemType;
  setOpen: (value: boolean) => void;
  setUpdate: (item: ItemType) => void;
  deleteGroup: (id: number) => void;
}
const Card: React.FC<CardProps> = ({
  item,
  setOpen,
  setUpdate,
  deleteGroup,
}) => {
  const openModal = (item: ItemType) => {
    setOpen(true), setUpdate(item);
  };
  return (
    <tr key={item.id}>
      <td>{item.name}</td>
      <td>{item.course_id}</td>
      <td>{item.status}</td>
      <td>{item.start_date}</td>
      <td>{item.end_date}</td>
      <td>
        <button
          className="btn btn-info btn-sm me-2"
          onClick={() => openModal(item)}
        >
          update
        </button>
        <button
          className="btn btn-danger btn-sm"
          onClick={() => deleteGroup(item.id)}
        >
          delete
        </button>
      </td>
    </tr>
  );
};

export default Card;
