import React, { Component } from "react";
import { Form, Button, Input } from "semantic-ui-react";
import Layout from "../../components/Layout";
import factory from "../../ethereum/factory";
import web3 from "../../ethereum/web3";

class CampaignNew extends Component {
  state = {
    minimumContribution: "",
  };
  onSubmit = async (event) => {
    event.preventDefault();
    const accounts = await web3.eth.getAccounts();
    console.log("the first account is :", accounts[0]);
    await factory.methods.createCampaign(this.state.minimumContribution).send({
      from: accounts[0],
    });
  };
  onChange = (event) =>
    this.setState({ minimumContribution: event.target.value });
  render() {
    return (
      <Layout>
        <h3>Create a campaign!</h3>
        <Form onSubmit={this.onSubmit}>
          <Form.Field>
            <label>Minimum Contribution</label>
            <Input
              value={this.state.minimumContribution}
              labelPosition="right"
              label="wei"
              onChange={this.onChange}
            />
          </Form.Field>
          <Button primary>Create!</Button>
        </Form>
      </Layout>
    );
  }
}

export default CampaignNew;
