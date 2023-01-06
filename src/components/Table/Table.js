import { BsFillCaretUpFill, BsFillCaretDownFill } from "react-icons/bs";
import useSortableData from "~/hooks/useSortableData";

const Table = ({
    head = [],
    body = []
}) => {

    const { items, requestSort, sortConfig } = useSortableData(body);
    const getClassNamesFor = (name) => {
        if (!sortConfig) {
            return;
        }
        return sortConfig.key === name ? sortConfig.direction : undefined;
    };
    return (
        <>
            <table className="table">
                <thead>

                    <tr>
                        {
                            head.map((item, index) => {
                                return (
                                    <th key={index}>

                                        {item.title}
                                        {
                                            item.sortable && (
                                                <button
                                                    type="button"
                                                    onClick={() => requestSort(item.valueOf)}
                                                    className={getClassNamesFor(item.valueOf)}
                                                >
                                                    <BsFillCaretUpFill />
                                                </button>
                                            )
                                        }

                                    </th>
                                )
                            })
                        }
                    </tr>

                </thead>
                <tbody>
                    {
                        items.map((row, index) => {
                            return (
                                <tr key={index}>
                                    {
                                        Object.keys(row).map((key, index) => {
                                            return (
                                                <td key={index}>{row[key]}</td>
                                            )
                                        })
                                    }
                                </tr>
                            )
                        })
                    }
                </tbody>
            </table>
        </>
    );
};

export default Table;