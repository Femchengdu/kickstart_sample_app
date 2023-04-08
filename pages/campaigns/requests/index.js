import React, { Component } from "react";
import { Table, Button } from "semantic-ui-react";
import { Link } from "../../../routes";
import Layout from "../../../components/Layout";
import Campaign from "../../../ethereum/campaign";
import RequestRow from "../../../components/RequestRow";

class RequestsIndex extends Component {
  static async getInitialProps(props) {
    const campaignAddress = props.query.address;
    const campaign = Campaign(campaignAddress);
    const requestCount = await campaign.methods.getRequestsCount().call();
    const approversCount = await campaign.methods.approversCount().call();
    const requests = await Promise.all(
      Array(parseInt(requestCount))
        .fill()
        .map((_, index) => {
          return campaign.methods.requests(index).call();
        })
    );

    return {
      address: campaignAddress,
      requests,
      requestCount,
      approversCount,
    };
  }

  renderRows() {
    return this.props.requests.map((request, index) => {
      return (
        <RequestRow
          address={this.props.address}
          key={index}
          id={index}
          request={request}
          approversCount={this.props.approversCount}
        />
      );
    });
  }

  render() {
    const { Header, Row, HeaderCell, Body } = Table;
    return (
      <Layout>
        <h3>Request index</h3>
        <Link route={`/campaigns/${this.props.address}/requests/new`}>
          <a>
            <Button primary floated="right" style={{ marginBottom: 15 }}>
              Add Request
            </Button>
          </a>
        </Link>
        <Table>
          <Header>
            <Row>
              <HeaderCell>ID</HeaderCell>
              <HeaderCell>Description</HeaderCell>
              <HeaderCell>Amount</HeaderCell>
              <HeaderCell>Recipient</HeaderCell>
              <HeaderCell>Approval</HeaderCell>
              <HeaderCell>Approve</HeaderCell>
              <HeaderCell>Finalize</HeaderCell>
            </Row>
          </Header>
          <Body>{this.renderRows()}</Body>
        </Table>

        <div>Found {this.props.requestCount} requests</div>
      </Layout>
    );
  }
}

export default RequestsIndex;
