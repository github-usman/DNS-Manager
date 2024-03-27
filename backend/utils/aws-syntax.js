// v3 version of AWS-SDK -----> USMAN learning purpose <-----------------
/*
.
.
.
.
.
.
.
.
.
.
.
.
.
.
.
.
.
.
.
.

.
.
.
.
.
.
.
.
.
.
.
.
.
.
.
.
.
.
.
.
.
.
.
.
.
.
.
.
.
.
.
.
.
.
.
.
.
.
.
.
.
.
.
.
.
.
.
.
.
.
.
.
.
.
.
.
.
.
.
.
.
.
.
.
.
.
.
.
.
.
.
.
.
.
.
.
.
.
.
.
.
.
.
.
.
.
.
.
.
.
.
.
.
.
.
.
.
.
.
.
.
.
.
.
.
.
.
.
.
.
.
.
.
.
.
.
.
.
.
.
.
.
.
.
.
.
.
.
.
.
.
.
.
.
.
.
.
.
.
.
.
.
.
.
.
.
.
.
.
.
.
.
.
.
.
.
.
.
.
.

import { Route53Client, ChangeResourceRecordSetsCommand } from "@aws-sdk/client-route-53"; // ES Modules import
// const { Route53Client, ChangeResourceRecordSetsCommand } = require("@aws-sdk/client-route-53"); // CommonJS import
const client = new Route53Client(config);
const input = { // ChangeResourceRecordSetsRequest
  HostedZoneId: "STRING_VALUE", // required
  ChangeBatch: { // ChangeBatch
    Comment: "STRING_VALUE",
    Changes: [ // Changes // required
      { // Change
        Action: "CREATE" || "DELETE" || "UPSERT", // required
        ResourceRecordSet: { // ResourceRecordSet
          Name: "STRING_VALUE", // required
          Type: "SOA" || "A" || "TXT" || "NS" || "CNAME" || "MX" || "NAPTR" || "PTR" || "SRV" || "SPF" || "AAAA" || "CAA" || "DS", // required
          SetIdentifier: "STRING_VALUE",
          Weight: Number("long"),
          Region: "us-east-1" || "us-east-2" || "us-west-1" || "us-west-2" || "ca-central-1" || "eu-west-1" || "eu-west-2" || "eu-west-3" || "eu-central-1" || "eu-central-2" || "ap-southeast-1" || "ap-southeast-2" || "ap-southeast-3" || "ap-northeast-1" || "ap-northeast-2" || "ap-northeast-3" || "eu-north-1" || "sa-east-1" || "cn-north-1" || "cn-northwest-1" || "ap-east-1" || "me-south-1" || "me-central-1" || "ap-south-1" || "ap-south-2" || "af-south-1" || "eu-south-1" || "eu-south-2" || "ap-southeast-4" || "il-central-1" || "ca-west-1",
          GeoLocation: { // GeoLocation
            ContinentCode: "STRING_VALUE",
            CountryCode: "STRING_VALUE",
            SubdivisionCode: "STRING_VALUE",
          },
          Failover: "PRIMARY" || "SECONDARY",
          MultiValueAnswer: true || false,
          TTL: Number("long"),
          ResourceRecords: [ // ResourceRecords
            { // ResourceRecord
              Value: "STRING_VALUE", // required
            },
          ],
          AliasTarget: { // AliasTarget
            HostedZoneId: "STRING_VALUE", // required
            DNSName: "STRING_VALUE", // required
            EvaluateTargetHealth: true || false, // required
          },
          HealthCheckId: "STRING_VALUE",
          TrafficPolicyInstanceId: "STRING_VALUE",
          CidrRoutingConfig: { // CidrRoutingConfig
            CollectionId: "STRING_VALUE", // required
            LocationName: "STRING_VALUE", // required
          },
          GeoProximityLocation: { // GeoProximityLocation
            AWSRegion: "STRING_VALUE",
            LocalZoneGroup: "STRING_VALUE",
            Coordinates: { // Coordinates
              Latitude: "STRING_VALUE", // required
              Longitude: "STRING_VALUE", // required
            },
            Bias: Number("int"),
          },
        },
      },
    ],
  },
};
const command = new ChangeResourceRecordSetsCommand(input);
const response = await client.send(command);
// { // ChangeResourceRecordSetsResponse
//   ChangeInfo: { // ChangeInfo
//     Id: "STRING_VALUE", // required
//     Status: "PENDING" || "INSYNC", // required
//     SubmittedAt: new Date("TIMESTAMP"), // required
//     Comment: "STRING_VALUE",
//   },
// };

*/
