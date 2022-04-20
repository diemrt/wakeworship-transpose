import React from "react";
import { MajorChordProgressions } from "../data/ChordProgressions";

export default class ChordProgressionTab extends React.Component{

    render(){
        let tabContent = [];

        for (const chordProgression of MajorChordProgressions) {
            let buttons = [];

            for (const chord of chordProgression) {
                buttons.push(
                    <button type="button" className="btn btn-primary">{chord}</button>
                );   
            }

            tabContent.push(
                <div className="tab-pane fade" id={`pills-${chordProgression[0].toLowerCase()}chord`} role="tabpanel" aria-labelledby={`pills-${chordProgression[0].toLowerCase()}chord-tab`}>
                    <p>Progressione accordi</p>
                    <div class="btn-group" role="group" aria-label="Basic example">
                        {buttons}
                    </div>
                </div>
            )
        }

        return (
            <div className="tab-content" id="pills-tabContent">
                {tabContent}
            </div>
        );
    }
}