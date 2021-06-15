import React from "react";
import axios from "axios";
// input:
// widget: type: string, content: name of module
// element: type: string content: name of element
// children: React children prop, these are whatever elements RecordClicks
// wraps around, you dont need to pass these explicity
// output: React component that records click events of children
// side effects: makes api requests
function RecordClicks({ widget, element, children }) {
  const incrementClicks = () => {
    axios.post("/clicks", {
      element,
      widget,
      time: new Date().toString(),
    })
      .then((res) => {
        console.log("Record from server:", res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  return (
    React.Children.map(children, (child) => React.cloneElement(child, {
      onClick: (e) => {
        if (child.props.onClick) {
          child.props.onClick(e);
        }
        incrementClicks();
      },
    }))
  );
}
export default RecordClicks;
