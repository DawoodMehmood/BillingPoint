function Table({ title, data, columns, renderButton }) {
  return (
    <div className=" flex flex-col items-center justify-center mt-2 mb-10">
      <h2 className="my-5 font-bold text-2xl italic">{title}</h2>
      <table className="min-w-[80vw] divide-y divide-seagreen">
        <thead className="bg-seagreen">
          <tr>
            {columns.map((column) => (
              <th
                key={column.key}
                className="px-4 py-3 text-left text-xs font-bold text-gray-700 uppercase tracking-wider"
              >
                {column.name}
              </th>
            ))}
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {data.map((item, index) => (
            <tr key={index}>
              {columns.map((column) => (
                <td
                  key={column.key}
                  className="px-4 py-4 whitespace-nowrap text-sm text-gray-500"
                >
                  {item[column.key]}
                </td>
              ))}
              {renderButton && (
                <td className="px-1 py-4 whitespace-nowrap text-sm text-gray-500">
                  {renderButton(item)}
                </td>
              )}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default Table;
