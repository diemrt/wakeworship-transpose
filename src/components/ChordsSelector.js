import React from "react";
import { MajorChordProgressions } from "../data/ChordProgressions";

export default class ChordsSelector extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            chords: [],
            progressions: MajorChordProgressions
        };
        this.renderButtons = this.renderButtons.bind(this);
        this.filterProgressionsByChord = this.filterProgressionsByChord.bind(this);
        this.setChord = this.setChord.bind(this);
        this.onChordClick = this.onChordClick.bind(this);
        this.invokeSetSelectedChords = this.invokeSetSelectedChords.bind(this);
    }

    /**
     * Handle the click event on the chord button and sets a selected chord
     * 
     * @param {*} e The elment clicked
     */
    onChordClick(e){
        this.setChord(e.target.textContent);
    }

    /**
     * Sets the chord state by adding a new chord or removing an exisitng one. It also triggers the filter process when the chord has been set
     * 
     * @param {string} chord The given chord to set
     */
    setChord(chord){
        let array = [...this.state.chords];
        let index = array.indexOf(chord);
        if(index > -1){
            array.splice(index, 1);
            this.setState({
                chords: array
            }, this.filterProgressionsByChord)
        } else {
            array.push(chord)
            this.setState({
                chords: array
            }, this.filterProgressionsByChord)
        }
    }

    /**
     * Sets the progression state filtering every chord progression by the given chords
     */
    filterProgressionsByChord(){
        let filteredProgrssions = [];
        for (const progression of MajorChordProgressions) {
            if(this.state.chords.every(e => progression.includes(e))){
                filteredProgrssions.push(progression);
            }
        }

        this.setState({
            progressions: filteredProgrssions
        }, this.invokeSetSelectedChords);
    }

    /**
     * Sets up selected chords state when a single chord progression has been evaluated
     */
    invokeSetSelectedChords(){
        if(this.state.progressions.length === 1){
            this.props.slectedChordsCallback(this.state.progressions);
        }
    }

    /**
     * Used to render chord buttons
     * 
     * @returns JSX Chord buttons
     */
    renderButtons(){
        let buttons = [];
        for (const progression of this.state.progressions) {
            for (const chord of progression) {
                buttons.push(
                    <button className={`btn m-1 btn-outline-primary ${this.state.chords.find(e => e === chord) !== undefined ? "active" : ""}`} type="button" onClick={this.onChordClick}>{chord}</button>
                );                
            }
        }

        return buttons;
    }

    render(){
        
        return (
            <div className="container"> 
                <h2><i class="bi bi-sort-alpha-down"></i> Progressione accordi</h2>
                <p>Seleziona gli accordi per trovare la progressione</p>
                {this.renderButtons()}
            </div>
        );
    }
}