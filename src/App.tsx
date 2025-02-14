import { Component } from "react";
import "./index.css";
import { Contact } from "./components/contact/Contact";
import About from "./about/About";

class App extends Component {
  render() {
    return (
      <div id="home">
        <About />
        <Contact />
      </div>
    );
  }
}

export default App;
