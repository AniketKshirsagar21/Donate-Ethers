import { useState, useEffect } from "react";
import { ethers } from "ethers";
import { Button, Alert, Row, Col } from 'react-bootstrap';

import abi from "./Contract/abi.json";
import Donate_Ethers from "./components/Donate_Ethers";
import Transactions from "./components/Transactions";
import Withdraw from "./components/Withdraw_Ethers";

function App() {
  const [state, setState] = useState({
    provider: null,
    signer: null,
    contract: null,
  });
  const [account, setAccount] = useState("None");
  useEffect(() => {
    const connectWallet = async () => {
      const contractAddress = "0x73570b74222C1f4465e989959924B2bE08338809";
      const contractABI = abi.abi;
      try {
        const { ethereum } = window;
        if (ethereum) {
          const account = await ethereum.request({
            method: "eth_requestAccounts",
          });

          window.ethereum.on("chainChanged", () => {
            window.location.reload();
          });

          window.ethereum.on("accountsChanged", () => {
            window.location.reload();
          });

          const provider = new ethers.providers.Web3Provider(ethereum);
          const signer = provider.getSigner();
          const contract = new ethers.Contract(
            contractAddress,
            contractABI,
            signer
          );
          setAccount(account);
          setState({ provider, signer, contract });
        } else {
          alert("Please install metamask");
        }
      } catch (error) {
        console.log(error);
      }
    };
    connectWallet();
  }, []);

  return (
    <div style={{ background: "#3b3b3b", height: "100%" }}>
      <Row>
        {
          account === "None" ?
            <Alert style={{ width: "80%", textAlign: "center", margin: "10px auto" }} variant="danger">
              <h6>Account Not connected, please open the metamask</h6>
            </Alert>
            :
            <Alert style={{ width: "80%", textAlign: "center", margin: "10px auto" }} variant="success">
              <h6>Connected Account - {account}</h6>
            </Alert>
        }
      </Row>

      <div className="container">
        <Row style={{ margin: "30px 10px" }}>
          <Col>
            <Donate_Ethers state={state} />
          </Col>
          <Col>
            <Withdraw state={state} />
          </Col>
        </Row>
        <Row style={{ margin: "30px 10px" }}>
          <Transactions state={state} />
        </Row>
        <Row style={{ margin: "30px 10px" }}>
        </Row>
      </div>
    </div>
  );
}

export default App;
