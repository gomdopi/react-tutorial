import { useState } from "react";
import Alert from "./components/Alert";
import Button from "./components/Button";
import ListGroup from "./components/ListGroup";

function App() {
  const items = ["New York", "San Francisco", "Tokyo", "London", "Paris"];

  const handleOnClick = () => {
    setAlertVisibility(true);
  };
  const handleOnClose = () => {
    setAlertVisibility(false);
  };

  // const handleSelectItem = (item: string) => {
  //   console.log(item);
  // };

  const [alertVisible, setAlertVisibility] = useState(false);

  return (
    <div>
      {alertVisible && <Alert onClose={handleOnClose}>!!!ALERT!!!</Alert>}
      <Button onClick={handleOnClick}>My Button</Button>
      {/* <ListGroup items={items} heading="Cities" onSelectItem={handleSelectItem} /> */}
    </div>
  );
}

export default App;
