// import { useGroup } from "@hooks";
// import { Button } from "antd";
// import ProductModal, { type GroupType } from "./GroupModel";
// import { useState } from "react";

// const Groups = () => {
//   const { useGroupCreate } = useGroup();
//   const { useGroupUpdate } = useGroup();
//   const { data, useGroupDelete } = useGroup();
//   const { mutate: CreateFn, isPending: isCreating } = useGroupCreate();
//   const { mutate: UpdateFn, isPending: isUpdateing } = useGroupUpdate();
//   const { mutate: DeleteFn, isPending: isDeleting } = useGroupDelete();
//   const [open, setOpen] = useState(false);
//   const [page, setPage] = useState(1);
//   const [groups, setGroups] = useState<GroupType[]>([]);
//   // const [search, setSearch] = useState("");
//   const [update, setUpdate] = useState<GroupType | null>(null);

//   const save = () => {
//     const payload = {
//       name: "Type Script",
//       course_id: 1,
//       status: "new",
//       start_date: "2025-04-05",
//       end_date: "2025-09-05",
//     };
//     CreateFn(payload, {
//       onSuccess: () => {
//         console.log("Group created successfully");
//       },
//     });
//   };

//   const updateGroup = (group: GroupType                                                                       ) => {
//     console.log(group.id);
//     const payload = {
//       name: "updateGRoup",
//       course_id: 1,
//       status: "new",
//       start_date: "2025-04-05",
//       end_date: "2025-09-05",
//     };
//     UpdateFn(payload);
//   };

//   const deleteGroup = (group: GroupType) => {
//     console.log(typeof group.id);
//     console.log(group.id);
//     DeleteFn(group.id!);
//   };
//   const nextPage = () => {
//     setPage((prev) => prev + 1);
//   };

//   const prevPage = () => {
//     setPage((prev) => prev - 1);
//   };
//   const toogle = () => {
//     setOpen(false);
//     setUpdate(null);
//   };
//   return (
//     <div>
//       <ProductModal
//         isOpen={open}
//         update={update}
//         toggle={toogle}
//         groups={data!.data.data}
//         setGroups={data!.data.data}
//       />
//       <h1>GROUPS</h1>
      // <Button type="primary" onClick={save} loading={isCreating}>
      //   save
      // </Button>
//       <br /> <br />
//       <table
//         style={{
//           borderCollapse: "collapse",
//           width: "100%",
//         }}
//       >
//         <thead>
//           <tr
//             style={{
//               backgroundColor: "#004466",
//               color: "#fff",
//             }}
//           >
//             <th style={{ padding: "8px", border: "1px solid #ddd" }}>Name</th>
//             <th style={{ padding: "8px", border: "1px solid #ddd" }}>Course</th>
//             <th style={{ padding: "8px", border: "1px solid #ddd" }}>Status</th>
//             <th style={{ padding: "8px", border: "1px solid #ddd" }}>
//               Start date
//             </th>
//             <th style={{ padding: "8px", border: "1px solid #ddd" }}>
//               End date
//             </th>
//             <th style={{ padding: "8px", border: "1px solid #ddd" }}>
//               Actions
//             </th>
//           </tr>
//         </thead>
//         <tbody>
//           {Array.isArray(data?.data?.data) &&
//             data.data.data.map((group: any, idx: number) => (
//               <tr
//                 key={group.id}
//                 style={{
//                   backgroundColor: idx % 2 === 0 ? "#e6f7ff" : "#ffffff", // turkuaz — oq
//                   transition: "background-color 0.3s",
//                 }}
//                 onMouseEnter={(e) =>
//                   (e.currentTarget.style.backgroundColor =
//                     idx % 2 === 0 ? "#b3e6ff" : "#f2f2f2")
//                 }
//                 onMouseLeave={(e) =>
//                   (e.currentTarget.style.backgroundColor =
//                     idx % 2 === 0 ? "#e6f7ff" : "#ffffff")
//                 }
//               >
//                 <td style={{ padding: "8px", border: "1px solid #ddd" }}>
//                   {group.name}
//                 </td>
//                 <td style={{ padding: "8px", border: "1px solid #ddd" }}>
//                   {group.course_id}
//                 </td>
//                 <td style={{ padding: "8px", border: "1px solid #ddd" }}>
//                   {group.status}
//                 </td>
//                 <td style={{ padding: "8px", border: "1px solid #ddd" }}>
//                   {group.start_date}
//                 </td>
//                 <td style={{ padding: "8px", border: "1px solid #ddd" }}>
//                   {group.end_date}
//                 </td>
//                 <td
//                   style={{
//                     padding: "8px",
//                     border: "1px solid #ddd",
//                     whiteSpace: "nowrap",
//                   }}
//                 >
//                   <Button
//                     type="primary"
//                     onClick={() => updateGroup(group)}
//                     loading={isUpdateing}
//                     style={{ marginRight: 8 }}
//                   >
//                     update
//                   </Button>
//                   <Button
//                     type="primary"
//                     onClick={() => deleteGroup(group)}
//                     loading={isDeleting}
//                   >
//                     delete
//                   </Button>
//                 </td>
//               </tr>
//             ))}
//         </tbody>
//       </table>
//       <div className="row mt-4 text-center">
//         <div>
//           <button
//             className="btn btn-secondary mx-1"
//             disabled={page > 0 ? false : true}
//             onClick={prevPage}
//           >
//             prev
//           </button>
//           <span>{page}</span>
//           <button
//             className="btn btn-secondary mx-1"
//             disabled={page < 4 ? false : true}
//             onClick={nextPage}
//           >
//             next
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Groups;

//===============================================================================

import { useGroup } from "@hooks";
import { Button } from "antd";
import type { Group } from "@types";
import GroupModal from "./GroupModel";
import { useState } from "react";
import type { GroupID } from "../../types/groupID";
interface GroupType {
  id: number;
  name: string;
  course_id: number;
  status: string;
  start_date: string;
  end_date: string;
}

const Groups = () => {
  const { useGroupCreate } = useGroup();
  const { useGroupUpdate } = useGroup();
  const { data, useGroupDelete } = useGroup();
  const { mutate: CreateFn, isPending: isCreating } = useGroupCreate();
  const { mutate: UpdateFn, isPending: isUpdateing } = useGroupUpdate();
  const { mutate: DeleteFn, isPending: isDeleting } = useGroupDelete();
  const [open, setOpen] = useState(false);
  const [update, setUpdate] = useState<GroupType | null>(null);

  const save = () => {
    const payload = {
      name: "Type Scriptppq",
      course_id: 1,
      status: "new",
      start_date: "2025-04-05",
      end_date: "2025-09-05",
    };
    CreateFn(payload, {
      onSuccess: () => {
        console.log("Group created successfully");
      },
    });
  };

  const updateGroup = (group: GroupID) => {
    console.log(group);
    setUpdate(group);
    UpdateFn(group);
    setOpen(true);
  };

  const deleteGroup = (group:Group) => {
    // console.log(typeof group.id);
    // console.log(group.id);
    DeleteFn(group.id!);
  };
  const toogle = () => {
    setOpen(false);
    setUpdate(null);
  };
  return (
    <div>
      <GroupModal
        isOpen={open}
        update={update}
        toggle={toogle}
        groups={[]}
        setGroups={() => {}}
      />
      <h1>GROUPS</h1>
      <Button type="primary" onClick={() => {setOpen(true);()=>{save}}} loading={isCreating}>
        save
      </Button>
      <br /> <br />
      <ul>
        {data?.data?.data?.map((group: any) => (
          <li key={group.id}>
            {group.name}-{group.status}
            <Button
              type="primary"
              onClick={() => updateGroup(group)}
              loading={isUpdateing}
            >
              update
            </Button>
            <Button
              type="primary"
              onClick={() => deleteGroup(group)}
              loading={isDeleting}
            >
              delete
            </Button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Groups;
