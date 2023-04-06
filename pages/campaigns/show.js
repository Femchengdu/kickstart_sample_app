import React, { Component } from "react";
import { Card, Grid, Button } from "semantic-ui-react";
import Layout from "../../components/Layout";
import Campaign from "../../ethereum/campaign";
import web3 from "../../ethereum/web3";
import ContributeForm from "../../components/ContributeForm";
import { Link } from "../../routes";

class CampaignShow extends Component {
  static async getInitialProps(props) {
    const campaignAddress = props.query.address;
    const campaign = Campaign(campaignAddress);
    const summary = await campaign.methods.getSummary().call();
    return {
      address: campaignAddress,
      minimumContribution: summary[0],
      balance: summary[1],
      requestsCount: summary[2],
      approversCount: summary[3],
      manager: summary[4],
    };
  }

  rendeCards() {
    const {
      balance,
      minimumContribution,
      requestsCount,
      approversCount,
      manager,
    } = this.props;
    const items = [
      {
        header: manager,
        meta: "Address of manager",
        description: "The manager can create requests to withdraw money",
        style: { overflowWrap: "break-word" },
      },
      {
        header: minimumContribution,
        meta: "Minimum contribution (wei)",
        description: "You must contribute at least the specifed amount of wei",
        style: { overflowWrap: "break-word" },
      },
      {
        header: requestsCount,
        meta: "Number of requests",
        description:
          "A request tries to withdraw money from the campaign contract and must be approved by the approvers.",
        style: { overflowWrap: "break-word" },
      },
      {
        header: approversCount,
        meta: "Number of approvers",
        description: "The number of people who donated to this campaign",
        style: { overflowWrap: "break-word" },
      },
      {
        header: web3.utils.fromWei(balance, "ether"),
        meta: "Campaign balance (ether)",
        description: "The balannce is how much money the campaign has to spend",
        style: { overflowWrap: "break-word" },
      },
    ];

    return <Card.Group items={items} />;
  }

  render() {
    return (
      <Layout>
        <h3>Campaign Show</h3>
        <Grid>
          <Grid.Column width={10}>
            {this.rendeCards()}
            <Link route={`/campaigns/${this.props.address}/requests`}>
              <a>
                <Button primary>View requests</Button>
              </a>
            </Link>
          </Grid.Column>
          <Grid.Column width={6}>
            <ContributeForm address={this.props.address} />
          </Grid.Column>
        </Grid>
      </Layout>
    );
  }
}

export default CampaignShow;
