import React, { useState } from 'react'

const App = () => {
  
  const HEADER_1 = 'give feedback';
  const HEADER_2 = 'statistics';

  const BUTTON_1 = 'good';
  const BUTTON_2 = 'neutral';
  const BUTTON_3 = 'bad';

  const [val_1, setter_1] = useState(0);
  const [val_2, setter_2] = useState(0);
  const [val_3, setter_3] = useState(0);

  return (
    <div>
      <Header header={HEADER_1} />
      <Button name={BUTTON_1} value={val_1} setClick={setter_1} />
      <Button name={BUTTON_2} value={val_2} setClick={setter_2} />
      <Button name={BUTTON_3} value={val_3} setClick={setter_3} />
      <Header header={HEADER_2} />
      <Statistics val_1={val_1} val_2={val_2} val_3={val_3} />
    </div>
  );
}

const Header = (props) => {
  return (
    <div>
      <h1>{props.header}</h1>
    </div>
  );
}

const Button = (props) => {
  return (
    <button onClick={ () => props.setClick(props.value + 1) }>
      {props.name}
    </button>
  );
}

const Statistics = (props) => {

  const TOTAL = 'all';
  const AVERAGE = 'average';
  const POSITIVE = 'positive';

  const NO_FEEDBACK = 'No Feedback Given';

  let total = props.val_1 + props.val_2 + props.val_3;
  const average = (a, b, total) => (a - b) / total;
  const positive_percent = (a, total) => (a / total) * 100;

  if (total === 0) {
    return (
      <p>{NO_FEEDBACK}</p>
    );
  }
  else {
    return (
      <table>
        <tbody>
          <Statistic text={BUTTON_1} value={props.val_1} />
          <Statistic text={BUTTON_2} value={props.val_2} />
          <Statistic text={BUTTON_3} value={props.val_3} />
          <Statistic text={TOTAL} value={total} />
          <Statistic text={AVERAGE} value={average(props.val_1, props.val_3, total)} />
          <Statistic text={POSITIVE} value={positive_percent(props.val_1, total) + ' %'} />
        </tbody>
      </table>
    );
  }
}

const Statistic = (props) => {
  return (
    <tr>
      <td>{props.text}</td>
      <td>{props.value}</td>
    </tr>
  );
}

export default App