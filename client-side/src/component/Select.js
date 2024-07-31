import React from "react";

function Select(props) {
  return (
    <div className="form-group">
      <label htmlFor={props.htmlFor}>{props.label}</label>
      <select
        id={props.id}
        className="form-control"
        value={props.value}
        onChange={props.onChange}
      >
        {Object.keys(props.rates).map((currency) => (
          <option key={currency} value={currency}>
            {currency}
          </option>
        ))}
      </select>
    </div>
  );
}

export default Select;
