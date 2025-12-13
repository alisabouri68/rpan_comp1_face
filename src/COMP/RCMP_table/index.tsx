import { ArrowDown2, Edit2 } from "iconsax-react";

function Index(props: {
  columns: Array<{ name: string; selector: any }>;
  data: Array<any>;
  onEditClick?: any;
  onClick?: any;
}) {
  const { columns, data, onEditClick, onClick } = props;
  return (
    <div className="relative overflow-x-auto w-full">
      <table className="w-full text-sm text-left rtl:text-right text-gray-500 table-auto">
        <thead className="text-xs text-gray-700 uppercase bg-gray-5 border-b">
          <tr className="bg-[#fbfcfd]">
            {columns?.map((column: any) => (
              <th scope="col" className="px-3 py-3">
                {column?.name}
              </th>
            ))}
            <th scope="col" className="px-3 py-3">
              <ArrowDown2 size={18} color="currentColor" />
            </th>
          </tr>
        </thead>
        <tbody>
          {data.map((item: any, index: number) => {
            return (
              <tr
                onClick={() => onClick?.(item)}
                className="bg-white border-b hover:bg-white cursor-pointer"
              >
                {columns?.map((column: any) => {
                  return (
                    <td className="px-3 py-2">
                      {column?.selector(item, index)}
                    </td>
                  );
                })}
                <td className="px-3 py-2">
                  <Edit2
                    className="cursor-pointer"
                    onClick={() => onEditClick?.(item)}
                    size={18}
                    color="currentColor"
                  />
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}

export default Index;
