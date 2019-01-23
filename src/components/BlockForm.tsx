import React from "react";
import { Block } from "../utils/Block";
import BlockChain from "../utils/BlockChain";
import { Form, Panel, Button } from "react-bootstrap";

interface Props {
  dataVars: string;
  chainDifficulty: number;
}

class BlockForm extends React.Component<any, any> {
  constructor(props: any) {
    super(props);
    const { dataVars, chainDifficulty } = this.props;
    let expectedInputs: any = {};
    let myInputs: any = {};
    dataVars.split(",").map((dataVar: any) => {
      expectedInputs[dataVar] = "";
      myInputs[dataVar] = "";
    });
    let genesisBlock = new Block(chainDifficulty, 0, "", myInputs);
    let newChain = new BlockChain(chainDifficulty, genesisBlock);

    this.state = {
      expectedInputs,
      MyBlockChain: newChain
    };
  }
  generatePanelBody = (data: any) => {
    let obj = [];
    for (let keys in data) {
      const el = (
        <p>
          <b>{keys}:</b>
          {data[keys]}
        </p>
      );
      obj.push(el);
    }
    console.log(obj);
    return obj;
  };
  fieldUpdater = (key: string, val: any) => {
    let { expectedInputs } = this.state;
    expectedInputs[key] = val;
    this.setState({ expectedInputs });
  };
  generateFields = (dataVars: string) => {
    let self = this;
    let obj: any = [];

    dataVars.split(",").map((dataVar: any) => {
      let item = (
        <div>
          <label>{dataVar}</label>
          <input
            type={"text"}
            value={self.state.expectedInputs[dataVar]}
            onChange={e => this.fieldUpdater(dataVar, e.target.value)}
          />
        </div>
      );
      obj.push(item);
    });
    return obj;
  };
  addBlock = () => {
    const { chainDifficulty, MyBlockChain, expectedInputs } = this.state;
    let ChainData = MyBlockChain.ChainData;
    let newBlock = new Block(
      chainDifficulty,
      ChainData.length,
      ChainData[ChainData.length - 1].currentHash,
      expectedInputs
    );
    MyBlockChain.ChainData.push(newBlock);

    let myInputs: any = {};
    this.props.dataVars.split(",").map((dataVar: any) => {
      myInputs[dataVar] = "";
    });

    this.setState({ expectedInputs: myInputs });
  };
  render() {
    const MyBlockChain = this.state.MyBlockChain;
    return (
      <>
        <Form>
          <Panel>
            <Panel.Heading>Block Adding Form</Panel.Heading>
            <Panel.Body>
              {this.generateFields(this.props.dataVars)}
              <Button onClick={this.addBlock}> Add Block </Button>
            </Panel.Body>
          </Panel>
          <br />
        </Form>
        {MyBlockChain.ChainData &&
          MyBlockChain.ChainData.map((block: any) => (
            <Panel>
              <Panel.Heading>Index: {block.index}</Panel.Heading>
              <Panel.Body>
                <p>
                  <b>Nonce:</b> {block.generator}
                </p>
                <p>
                  <b>prevHash:</b> {block.prevHash}
                </p>
                <p>
                  <b>currentHash:</b> {block.currentHash}
                </p>
                {this.generatePanelBody(block.data)}
              </Panel.Body>
            </Panel>
          ))}
      </>
    );
  }
}
export default BlockForm;
