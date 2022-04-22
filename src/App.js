import React from "react";
import ChordsSelector from "./components/ChordsSelector";
import ChordsTranspose from "./components/ChordsTranspose";

class App extends React.Component {
  constructor(){
    super();
    this.state = {
      slectedChords: []
    }

    this.setSelectedChords = this.setSelectedChords.bind(this);
  }

  setSelectedChords(chords){
    this.setState({
      slectedChords: chords
    });
  }


  render(){
    return (
      <div className="container mt-4">
        <ChordsSelector slectedChordsCallback={this.setSelectedChords} />
        <ChordsTranspose />
      </div>
    );
  }
}

export default App;
