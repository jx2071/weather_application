import { useEffect, useState } from "react";
import axios from "axios";

import { styled } from "@mui/material/styles";
import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Unstable_Grid2";

import Box from "@mui/material/Box";
import Button from "react-bootstrap/Button";
import Table from "react-bootstrap/Table";

function Bundles() {
  const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
    ...theme.typography.body2,
    padding: theme.spacing(1),
    textAlign: "left",
    color: theme.palette.text.secondary,
  }));

  const [state, setState] = useState({
    rows: {},
    status: "pending",
  });
  const { rows, status } = state;

  useEffect(() => {
    axios
      .get(
        "https://aqttbmen16.execute-api.us-east-1.amazonaws.com/dev/inventory_app_bundles_fetch"
      )
      .then((res) => {
        let temp = formatData(res.data);
        setState({ rows: temp, status: "resolved" });
      });
  }, []);

  const handleDeleteBundle = (bundleId) => {
    console.log("Delete bundle " + bundleId);
    axios
      .post(
        "https://aqttbmen16.execute-api.us-east-1.amazonaws.com/dev/inventory_app_bundle_delete?bundleId=" +
          bundleId
      )
      .then((res) => {
        let temp = formatData(res.data);
        setState({ rows: temp, status: "resolved" });
        alert("Bundle deleted successfully!");
      });
  };

  function formatData(inputList) {
    const outputObj = {};

    inputList.forEach((item) => {
      const bundleId = item[0];
      const bundleName = item[1];
      const itemName = item[2];
      const itemQuantity = item[3];
      const itemPrice = item[4];
      const bundlePrice = item[5];

      if (!outputObj[bundleName]) {
        outputObj[bundleName] = {
          items: [],
        };
      }

      outputObj[bundleName].id = bundleId;
      outputObj[bundleName].items.push([itemName, itemQuantity, itemPrice]);
      outputObj[bundleName].bundle_price = bundlePrice;
    });

    return outputObj;
  }

  return (
    <Grid container spacing={2}>
      <Grid xs={12}>
        <Item style={{ fontSize: "2rem" }}>Bundles</Item>
        <Box sx={{ height: 600, width: "100%" }}>
          {Object.keys(rows).map((bundleName) => {
            return (
              <>
                <div>
                  <h4>
                    {bundleName}
                    <Button
                      style={{ margin: "5px" }}
                      variant="primary"
                      onClick={() => {
                        handleDeleteBundle(rows[bundleName].id);
                      }}
                    >
                      Delete
                    </Button>
                  </h4>
                </div>
                <Table
                  className="text-wrap"
                  striped
                  bordered
                  hover
                  size="sm"
                  style={{ width: "100%", maxWidth: "100%" }}
                >
                  <thead>
                    <tr>
                      <th style={{ width: "70%" }}>Item Name</th>
                      <th style={{ width: "10%" }}>Quantity</th>
                      <th style={{ width: "20%" }}>Unit Price</th>
                    </tr>
                  </thead>
                  <tbody>
                    {rows[bundleName].items.map((item) => {
                      return (
                        <tr>
                          <td>{item[0]}</td>
                          <td>{item[1]}</td>
                          <td>${item[2]}</td>
                        </tr>
                      );
                    })}
                    <tr>
                      <td></td>
                      <td>
                        <b>Total</b>
                      </td>
                      <td>
                        <b>${rows[bundleName].bundle_price}</b>
                      </td>
                    </tr>
                  </tbody>
                </Table>
              </>
            );
          })}
        </Box>
      </Grid>
    </Grid>
  );
}

export default Bundles;
