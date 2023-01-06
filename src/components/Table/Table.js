const Table = ({
    head = [],
    body = []
}) => {

    return (
        <>
            <table className="table">
                <thead>

                    <tr>
                        {
                            head.map((item, index) => {
                                return (
                                    <th key={index}>{item}</th>
                                )
                            })
                        }
                    </tr>

                </thead>
                <tbody>
                    {
                        body.map((row, index) => {
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