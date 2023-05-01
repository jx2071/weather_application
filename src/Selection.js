import { useState, useEffect } from "react";
import Table from "react-bootstrap/Table";
import Button from "react-bootstrap/Button";

function Selection() {
  const [total, setTotal] = useState(0);
  const [selected_items, setSelectedItems] = useState([]);

  useEffect(() => {
    setSelectedItems(
      JSON.parse(window.sessionStorage.getItem("selected_items"))
    );
  }, [selected_items]);

  useEffect(() => {
    let total = 0;
    for (let i = 0; i < selected_items.length; i++) {
      let item = selected_items[i];
      if (item[2]) {
        total += parseInt(item[2]) * parseInt(item[3]);
      }
    }
    setTotal(total);
  }, [selected_items]);

  return (
    <>
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
            <th>Unit Price</th>
            <th>Quantity</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {selected_items
            ? selected_items.map((item) => {
                if (item[0]) {
                  return (
                    <tr key={item[0]}>
                      <td>{item[1]}</td>
                      <td>{item[2]}</td>
                      <td>{item[3]}</td>
                      <td>Button</td>
                    </tr>
                  );
                } else {
                  return;
                }
              })
            : null}
          <tr>
            <td></td>
            <td></td>
            <td></td>
            <td>{total}</td>
          </tr>
        </tbody>
      </Table>
    </>
  );
}

export default Selection;
