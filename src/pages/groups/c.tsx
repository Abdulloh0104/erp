// import { useGroup } from "@hooks";
// import { Button } from "antd";
// import type { Group } from "@types";

// const Groups = () => {
//   const { useGroupCreate } = useGroup();
//   const { useGroupUpdate } = useGroup();
//   const { data, useGroupDelete } = useGroup();
//   const { mutate: CreateFn, isPending: isCreating } = useGroupCreate();
//   const { mutate: UpdateFn, isPending: isUpdateing } = useGroupUpdate();
//   const { mutate: DeleteFn, isPending: isDeleting } = useGroupDelete();
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

//   const updateGroup = (group: Group) => {
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

//   const deleteGroup = (group:Group) => {
//     console.log(typeof group.id);
//     console.log(group.id);
//     DeleteFn(group.id!);
//   };
//   return (
//     <div>
//       <h1>GROUPS</h1>
//       <Button type="primary" onClick={save} loading={isCreating}>
//         save
//       </Button>
//       <br /> <br />
//       <ul>
//         {data?.data?.data?.map((group: any) => (
//           <li key={group.id}>
//             {group.name}-{group.status}
//             <Button type="primary" onClick={()=>updateGroup(group)} loading={isUpdateing}>
//               update
//             </Button>
//             <Button
//               type="primary"
//               onClick={() => deleteGroup(group)}
//               loading={isDeleting}
//             >
//               delete
//             </Button>
//           </li>
//         ))}
//       </ul>
//     </div>
//   );
// };

// export default Groups;
