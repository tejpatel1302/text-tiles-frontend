// import React, { useEffect, useState } from 'react'

// const TableCell = ({ getValue, row, column, table }) => {
//     const initialValue = getValue()
//     const [value, setValue] = useState(initialValue)
//     useEffect(() => {
//       setValue(initialValue)
//     }, [initialValue])
//     const onBlur = () => {
//       table.options.meta?.updateData(row.index, column.id, value)
//     }
//     return (
//       <input
//         value={value}
//         onChange={e => setValue(e.target.value)}
//         onBlur={onBlur}
//       />
//     )
//   }

// export default TableCell