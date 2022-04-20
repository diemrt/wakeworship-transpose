import React from "react";
import { MajorChordProgressions } from "../data/ChordProgressions";

export default class KeySelector extends React.Component{
    constructor(){
        super();
        this.state = {
            chords: [],
            progression: []
        };
        this.renderButtons = this.renderButtons.bind(this);
        this.resetProgressionSearch = this.resetProgressionSearch.bind(this);
        this.setChord = this.setChord.bind(this);
    }

    setChord(e){
        let array = [...this.state.chords];
        let index = array.indexOf(e.target.textContent);
        if(index > -1){
            array.splice(index, 1);
            this.setState({
                chords: array
            })
        } else {
            array.push(e.target.textContent)
            this.setState({
                chords: array
            })
        }
    }

    progressionSearch(){
        if(this.state.chords.length === 0)
            return this.resetProgressionSearch();
        else { 
            let result = [];
            let filteredProgrssion = [];
            for (const chordProgression of this.state.progression) {
                if(chordProgression.some(r => this.state.chords.includes(r))){
                    filteredProgrssion.push(chordProgression);
                    for (const chord of chordProgression) {
                        result.push(chord);
                    }
                }
            }

            this.setState({
                progression: filteredProgrssion
            });

            return result;
        }
    }

    resetProgressionSearch(){
        let result = [];
        for (const chordProgression of MajorChordProgressions) {
            for (const chord of chordProgression) {
                result.push(chord);
            }
        }

        this.setState({
            progression: MajorChordProgressions
        });

        return result;
    }

    renderButtons(chords){
        let buttons = [];
        for (const chord of chords) {
            buttons.push(
                <button className={`btn m-1 btn-outline-primary ${this.state.chords.find(e => e === chord) !== undefined ? "active" : ""}`} type="button" onClick={this.setChord}>{chord}</button>
            );
        }

        return buttons;
    }

    render(){
        
        return (
            <div className="container"> 
                <h1>In quale chiave?</h1>
                <p>In base agli accordi presenti nel testo è possibile risalire alla chiave usata e alla progressione degli accordi del brano.</p>
                {this.renderButtons(this.progressionSearch())}
            </div>
        );
    }
}