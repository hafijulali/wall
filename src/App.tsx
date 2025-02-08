import { Component } from "react";
import "./index.css";
import { Contact } from "./components/contact/Contact";

class App extends Component {
  render() {
    return (
      <div id="home">
        <Contact />
      </div>
    );
  }
}

export default App;
