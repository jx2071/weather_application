import React, { useState, useEffect } from "react";
import Table from "react-bootstrap/Table";
import Button from "react-bootstrap/Button";

function Selection(props) {
  const { data, onDelete } = props;
  const [total, setTotal] = useState(0);

  const [, updateState] = React.useState();
  const forceUpdate = React.useCallback(() => updateState({}), []);

  useEffect(() => {
    let total = 0;
    for (let i = 0; i < data.length; i++) {
      let item = data[i];
      if (item[2]) {
        total += item[2] * item[3];
      }
    }
    setTotal((Math.round(total * 100) / 100).toFixed(2));
  });

  return (
    <>
      <Table
        className="text-wrap"
        size="sm"
        style={{ width: "100%", maxWidth: "100%" }}
      >
        <thead>
          <tr>
            <th>Item Name</th>
            <th>Unit Price</th>
            <th>Quantity</th>
          </tr>
        </thead>
        <tbody>
          {data
            ? data.map((item) => {
                if (item[0]) {
                  return (
                    <tr key={item[0]}>
                      <td>{item[1]}</td>
                      <td>{"$" + item[2]}</td>
                      <td>
                        {item[3]}
                        <Button
                          variant="link"
                          onClick={() => {
                            onDelete(item[0]);
                            forceUpdate();
                          }}
                        >
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="16"
                            height="16"
                            fill="currentColor"
                            class="bi bi-file-minus"
                            viewBox="0 0 16 16"
                          >
                            <path d="M5.5 8a.5.5 0 0 1 .5-.5h4a.5.5 0 0 1 0 1H6a.5.5 0 0 1-.5-.5z" />
                            <path d="M4 0a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h8a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2H4zm0 1h8a1 1 0 0 1 1 1v12a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1z" />
                          </svg>
                        </Button>
                      </td>
                    </tr>
                  );
                } else {
                  return;
                }
              })
            : null}
          <tr>
            <td></td>
            <td>
              <b>Total</b>
            </td>
            <td>
              <b>{"$" + total}</b>
            </td>
          </tr>
        </tbody>
      </Table>
    </>
  );
}

export default Selection;
