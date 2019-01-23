import * as React from "react";
import {
  Grid,
  Row,
  Col,
  Form,
  FormGroup,
  FormControl,
  ControlLabel,
  Button
} from "react-bootstrap";
import "./App.css";
import BlockForm from "./components/BlockForm";

class App extends React.Component<any, any> {
  constructor(props: any) {
    super(props);
    this.state = {
      chainDifficulty: null,
      dataVars: "",
      continueFurther: false
    };
  }
  getValidationState = (param: string) => {
    const { chainDifficulty, dataVars } = this.state;
    if (param === "chainDifficulty") {
      return chainDifficulty && chainDifficulty > 0 ? "success" : "error";
    }
    if (param === "dataVars") {
      return dataVars.length > 0 ? "success" : "error";
    }
  };
  getStarted = () => {
    if (
      this.getValidationState("chainDifficulty") == "success" &&
      this.getValidationState("dataVars") == "success"
    ) {
      this.setState({ continueFurther: true });
    } else {
      this.setState({ continueFurther: false }, () => {
        alert("Please fill the options correctly");
      });
    }
  };
  render() {
    const { chainDifficulty, dataVars, continueFurther } = this.state;
    return (
      <Grid className="App">
        <Row>
          <Col md={12} sm={12}>
            <Form>
              <FormGroup
                validationState={this.getValidationState("chainDifficulty")}
              >
                <ControlLabel>Enter Chain Difficulty</ControlLabel>
                <FormControl
                  type="number"
                  value={chainDifficulty}
                  placeholder="Enter chain Difficulty"
                  onChange={(e: React.FormEvent<any>) => {
                    let target = e.currentTarget;
                    this.setState({
                      chainDifficulty: target.value
                    });
                  }}
                  disabled={continueFurther}
                />
              </FormGroup>
              <FormGroup validationState={this.getValidationState("dataVars")}>
                <ControlLabel>
                  Enter comma separated Data Variables
                </ControlLabel>
                <FormControl
                  type="text"
                  value={dataVars}
                  placeholder="Enter chain variables"
                  onChange={(e: React.FormEvent<any>) => {
                    let target = e.currentTarget;
                    this.setState({
                      dataVars: target.value
                    });
                  }}
                  disabled={continueFurther}
                />
              </FormGroup>
              <Button onClick={this.getStarted}>Get Started</Button>
              {continueFurther && (
                <BlockForm
                  dataVars={dataVars}
                  chainDifficulty={chainDifficulty}
                />
              )}
            </Form>
          </Col>
        </Row>
      </Grid>
    );
  }
}

export default App;
