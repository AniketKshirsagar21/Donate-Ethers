import { ethers } from "ethers";
import { useEffect, useState } from "react";
import { Table, Row } from "react-bootstrap"

const Transactions = ({ state }) => {
    const [data, setData] = useState([]);
    const { contract } = state;

    useEffect(() => {
        const getData = async () => {
            const received_data = await contract.getTrans();
            setData(received_data);
        };
        contract && getData();
    }, [contract])

    const getLink = (p) => {
        return `https://goerli.etherscan.io/address/${p}`
    }

    return (

        <div className="container">
            <Row style={{ textAlign: "center" }}>
                <h3 style={{ color: "white" }}>All Transactions</h3>
            </Row>

            <Table responsive bordered hover variant="light" striped="columns">
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Message</th>
                        <th>Amount</th>
                        <th>Time Stamp</th>
                        <th>Address</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        data.map((t) => {
                            return (
                                <tr>
                                    <td key={t.name} >{t.name}</td>
                                    <td key={t.message} >{t.message}</td>
                                    <td key={t.val} >{ethers.utils.formatEther(t.val)}</td>
                                    <td key={t.timestamp} >{new Date(t.timestamp * 1000).toLocaleString()}</td>
                                    <td key={t.from} >
                                        <a href={getLink(t.from)} target="_blank" >{t.from} </a>
                                    </td>
                                </tr>
                            )
                        })
                    }
                </tbody>
            </Table>
        </div>
    )
}

export default Transactions;