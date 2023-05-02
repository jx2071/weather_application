import { useEffect, useState } from "react";
import Box from "@mui/material/Box";

import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import Table from "react-bootstrap/Table";
const columns = [
  { field: "id", headerName: "ID", width: 90 },
  {
    field: "itemName",
    headerName: "Item Name",
    flex: 6,
    editable: true,
  },
  {
    field: "price",
    headerName: "Price",
    type: "number",
    width: 110,
    editable: true,
    renderCell: (params) => <strong>${params.value}</strong>,
  },
  {
    field: "inventory",
    headerName: "Inventory",
    type: "number",
    width: 110,
    editable: true,
  },
  {
    field: "provider",
    headerName: "Provider",
    width: 150,
    editable: true,
  },
];

const rows = [
  {
    id: 1,
    itemName: "TP-Link Gigabit Multi-WAN VPN Router",
    price: 59.99,
    inventory: 99,
    provider: "Micro Center",
  },
  {
    id: 2,
    itemName: "Synology DS220j 2 Bay NAS DiskStation",
    price: 230.99,
    inventory: 99,
    provider: "Insight",
  },
  {
    id: 3,
    itemName:
      "NetAlly EXG-300-KIT EtherScope NXG Portable Network Expert Pro Kit",
    price: 11040.42,
    inventory: 1,
    provider: "Antonline.com",
  },
  {
    id: 4,
    itemName: "NetAlly LinkSprinter 300",
    price: 443.99,
    inventory: 99,
    provider: "CDW",
  },
  {
    id: 5,
    itemName: "NetAlly LinkRunner AT 2000",
    price: 5441.74,
    inventory: 99,
    provider: "AliExpress.com",
  },
  {
    id: 6,
    itemName:
      "NetAlly ALLY-SPACK Shoulder Sling Bag for Handheld Tester/Accessories",
    price: 65.0,
    inventory: 99,
    provider: "Test Equipment Depot",
  },
  {
    id: 7,
    itemName: "Fluke Networks TS30",
    price: 392.99,
    inventory: 99,
    provider: "Test Equipment Depot",
  },
  {
    id: 8,
    itemName: "Netgear 24-Port Gigabit Ethernet Unmanaged Switch",
    price: 165.99,
    inventory: 99,
    provider: "Office Depot",
  },
  {
    id: 9,
    itemName: "Hobbes Pro Network Cable Mapper and Online Network Tester",
    price: 550.99,
    inventory: 99,
    provider: "SolidSignal.com",
  },
];

function Items(props) {
  const { onAdd } = props;

  const handleAdd = (id) => {
    console.log("Add item " + id);
    let selected_items = window.sessionStorage.getItem("selected_items")
      ? JSON.parse(window.sessionStorage.getItem("selected_items"))
      : [[], [], [], [], [], [], [], [], []];
    let itemCount = selected_items[id - 1][3]
      ? selected_items[id - 1][3] + 1
      : 1;
    selected_items[id - 1] = [
      rows[id - 1].id,
      rows[id - 1].itemName,
      rows[id - 1].price,
      itemCount,
    ];
    selected_items.sort((a, b) => {
      return a[0] - b[0];
    });
    window.sessionStorage.setItem(
      "selected_items",
      JSON.stringify(selected_items)
    );
    onAdd(selected_items);
  };

  const formatItems = (temp) => {
    let result = {};
    for (let i = 0; i < temp.length; i++) {
      if (result[temp[i][0]] in result) {
        result[temp[i][0]] += 1;
      } else {
        result[temp[i][0]] = 1;
      }
    }
    return result;
  };

  return (
    <>
      <Box sx={{ height: 600, width: "100%" }}>
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
              <th>Item Name</th>
              <th>Price</th>
              <th>Inventory</th>
              <th>Provider</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {rows.map((row) => (
              <tr key={row.id}>
                <td>
                  {row.itemName}
                  <br></br>
                  <img
                    src={`./${row.id}.jpg`}
                    alt=""
                    style={{ width: "50px", height: "50px" }}
                  ></img>
                </td>
                <td>
                  <b>${row.price}</b>
                </td>
                <td>{row.inventory}</td>
                <td>{row.provider}</td>
                <td>
                  <Button variant="link" onClick={() => handleAdd(row.id)}>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="16"
                      height="16"
                      fill="currentColor"
                      class="bi bi-file-plus"
                      viewBox="0 0 16 16"
                    >
                      <path d="M8.5 6a.5.5 0 0 0-1 0v1.5H6a.5.5 0 0 0 0 1h1.5V10a.5.5 0 0 0 1 0V8.5H10a.5.5 0 0 0 0-1H8.5V6z" />
                      <path d="M2 2a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V2zm10-1H4a1 1 0 0 0-1 1v12a1 1 0 0 0 1 1h8a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1z" />
                    </svg>
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      </Box>
    </>
  );
}

export default Items;
