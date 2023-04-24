import { useEffect, useState } from "react";
import { DataGrid } from "@mui/x-data-grid";
import Box from "@mui/material/Box";
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

function Bundles() {
  return (
    <>
      <Box sx={{ height: 600, width: "100%" }}>
        <DataGrid
          rows={rows}
          columns={columns}
          initialState={{
            pagination: {
              paginationModel: {
                pageSize: 10,
              },
            },
          }}
          columnVisibilityModel={{
            id: false,
          }}
          pageSizeOptions={[5]}
          checkboxSelection
          disableRowSelectionOnClick
        />
      </Box>
    </>
  );
}

export default Bundles;
