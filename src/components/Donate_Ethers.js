import { ethers } from "ethers"
import BigNum from "bignumber"
import { Form, Button, Row, Col } from "react-bootstrap"

const Donate_Ethers = ({ state }) => {
    const donate_ethers = async (e) => {
        e.preventDefault();
        const { contract } = state;
        const name = document.querySelector("#name").value;
        const message = document.querySelector("#message").value;
        let amount = document.querySelector("#amount").value;
        let etherAmount = ethers.utils.parseEther(amount);
        
        const donation = await contract.donate_eths(name, message, { value: etherAmount });
        await donation.wait();
        console.log("Successful donation of %s ethers ", amount);
        alert("Successful donation")
    }
    return <>
        <div>
            <Row style={{textAlign: "center"}}>
                <h3 style={{color:"white"}}>Donate Ethers</h3>
            </Row>
            <Form onSubmit={donate_ethers} style={{
                width: "80%", margin: "auto", background: "#e2bf00",
                padding: "17px",
                borderRadius: "8px"
            }}>
                <Row>
                    <Col>
                        <Form.Group className="mb-3" >
                            <Form.Label>Name </Form.Label>
                            <Form.Control type="text" id="name" placeholder="name" />
                        </Form.Group>
                    </Col>
                    <Col>
                        <Form.Group className="mb-3" >
                            <Form.Label>Amount </Form.Label>
                            <Form.Control type="text" id="amount" placeholder="amount" />
                            <Form.Text className="text-muted">
                                Enter Amount of Goerli Ethers
                            </Form.Text>
                        </Form.Group>
                    </Col>
                </Row>

                <Form.Group className="mb-3" >
                    <Form.Label>Message </Form.Label>
                    <Form.Control type="text" id="message" placeholder="Message" />
                </Form.Group>

                <Row style={{ width: "50%", margin: "auto" }}>
                    <Button variant="success" type="submit">
                        Donate
                    </Button>
                </Row>
            </Form>
        </div>
    </>
}

export default Donate_Ethers;