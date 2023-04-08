import React, { Component } from "react";
import { Message, Form, Button, Input } from "semantic-ui-react";
import { Link, Router } from "../../../routes";
import Layout from "../../../components/Layout";
import Campaign from "../../../ethereum/campaign";
import web3 from "../../../ethereum/web3";

class RequestsNew extends Component {
  state = {
    value: "",
    description: "",
    recipient: "",
    loading: false,
    errorMessage: "",
  };

  static async getInitialProps(props) {
    const campaignAddress = props.query.address;
    return {
      address: campaignAddress,
    };
  }

  onSubmit = async (event) => {
    event.preventDefault();
    this.setState({ loading: true, errorMessage: "" });
    try {
      const campaign = Campaign(this.props.address);
      const { description, value, recipient } = this.state;
      const weiValue = web3.utils.toWei(value, "ether");
      const accounts = await web3.eth.getAccounts();
      await campaign.methods
        .createRequest(description, weiValue, recipient)
        .send({
          from: accounts[0],
        });
      Router.replaceRoute(`/campaigns/${this.props.address}/requests`);
    } catch (error) {
      this.setState({ errorMessage: error.message });
    }
    this.setState({
      loading: false,
      value: "",
      description: "",
      recipient: "",
    });
  };

  onChange = (event) => {
    const { id, value } = event.target;
    if (id === "description") {
      this.setState({ description: value });
    } else if (id === "value") {
      this.setState({ value: value });
    } else if (id === "recipient") {
      this.setState({ recipient: value });
    } else {
      throw "Invalid input";
    }
  };

  render() {
    return (
      <Layout>
        <Link route={`/campaigns/${this.props.address}/requests`}>
          <a>Back</a>
        </Link>
        <h3>Create a request!</h3>
        <Form onSubmit={this.onSubmit} error={!!this.state.errorMessage}>
          <Form.Field>
            <label>Description</label>
            <Input
              id="description"
              value={this.state.description}
              labelPosition="right"
              label="ether"
              onChange={this.onChange}
            />
          </Form.Field>
          <Form.Field>
            <label>Value in Ether</label>
            <Input
              id="value"
              value={this.state.value}
              labelPosition="right"
              label="ether"
              onChange={this.onChange}
            />
          </Form.Field>
          <Form.Field>
            <label>Recipient</label>
            <Input
              id="recipient"
              value={this.state.recipient}
              labelPosition="right"
              label="ether"
              onChange={this.onChange}
            />
          </Form.Field>
          <Message error header="Oops!" content={this.state.errorMessage} />
          <Button loading={this.state.loading} primary>
            Contribute!
          </Button>
        </Form>
      </Layout>
    );
  }
}

export default RequestsNew;
