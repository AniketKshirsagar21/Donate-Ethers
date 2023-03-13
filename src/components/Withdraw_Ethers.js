import { ethers } from "ethers"
import 'bootstrap/dist/css/bootstrap.min.css';
import { Form, Alert, Card, InputGroup, Button, Row, Col } from "react-bootstrap";
import { useState, useEffect } from "react";
/* global BigInt */

const Withdraw_Ethers = ({ state }) => {
    const [contract_balance, set_contract_balance] = useState(0);
    const [owner_balance, set_owner_balance] = useState(0);
    const { contract } = state;

    useEffect(() => {
        const balances = async () => {
            const ob = await contract.owner_balance();
            set_owner_balance(ethers.utils.formatEther(ob));
            const cb = await contract.contract_balance();
            set_contract_balance(ethers.utils.formatEther(cb));
        };
        contract && balances();
    }, [contract, contract_balance, owner_balance])

    const withdraw = async (e) => {
        e.preventDefault();
        // const { contract } = state;
        const pp = document.querySelector("#money").value;
        console.log(typeof (pp), pp);
        const amm = parseFloat(pp);
        let etherAmount = amm * 1e18;
        console.log(etherAmount);
        try {
            const withdrawal = await contract.withdraw_by_owner(BigInt(amm * 1e18));
            await withdrawal.wait();
            console.log("Successful Withdraw of %s ethers ", 10000000);
            alert("Successful Withdraw of amount ")
        }
        catch (err) {
            console.log(err)
            let p = JSON.stringify(err);
            let i = p.indexOf("You are not an owner");
            console.log("i = ", i);
            if (i != -1) {
                alert("You are not an owner");
                console.log("error :- You are not an owner");
            }
            else {
                i = p.indexOf("overflow");
                if (i != -1) {
                    alert("overflow");
                    console.log("error :- overflow");
                }
                let fault = p.slice(i + 9, i + 17);
            }
        }
    }
    return <>
        <div>
            <div className="container">
                <Alert style={{ textAlign:"center", width: "80%", margin: "10px auto" }} variant="primary">
                    <h6><a href="https://goerli.etherscan.io/address/0x73570b74222C1f4465e989959924B2bE08338809" target={"_blank"}>Contract</a> Balance = {contract_balance} ethers</h6>
                </Alert>
                <Alert style={{textAlign:"center",  width: "80%", margin: "10px auto" }} variant="secondary">
                    <h6><a href="https://goerli.etherscan.io/address/0x554ee7cf8c2e42a320a07fa60f7005eba5744004" target={"_blank"}>Owner</a> Balance = {owner_balance} ethers</h6>
                </Alert>
            </div>

            <Form onSubmit={withdraw} style={{
                width: "76%", margin: "auto",
                background: "rgb(137 229 212)",
                padding: "17px",
                borderRadius: "8px"
            }}>
                <Row>
                    <Row style={{textAlign: "center"}}>
                        <h3 style={{color:"black"}}>Withdraw Ethers</h3>
                    </Row>
                    <Form.Group className="mb-3" >
                        <Form.Control type="text" id="money" placeholder="Amount" />
                        <Form.Text className="text-muted">
                            You Should be the owner of the Contract
                        </Form.Text>
                    </Form.Group>

                </Row>
                <Row style={{ width: "50%", margin: "auto" }}>
                    <Button variant="danger" type="submit">
                        Withdraw
                    </Button>
                </Row>
            </Form>
        </div>
    </>
}

export default Withdraw_Ethers;