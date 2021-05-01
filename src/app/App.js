import React from "react";
import SidebarComponent from "../sidebar/sidebar";
import EditorComponent from "../editor/editor";
import "./App.css";
import styles from "./styles";
import { withStyles } from "@material-ui/core";
import { auth, projectFirestore, firebase } from "../firebase";
import Contents from "../sidebaritem/Contents";
// const firebase = require("firebase");

class App extends React.Component {
  constructor() {
    super();
    this.state = {
      selectedNoteIndex: null,
      selectedNote: null,
      notes: null,
      user: "",
      viewContent: false
    };
  }

  render() {
    return (
      <div className="app-container">
        <SidebarComponent
          selectedNoteIndex={this.state.selectedNoteIndex}
          notes={this.state.notes}
          deleteNote={this.deleteNote}
          selectNote={this.selectNote}
          viewNote={this.viewNote}
          newNote={this.newNote} 
          user={this.state.user}
        />

        
        {this.state.selectedNote ? 
        (
          this.state.viewContent ? (
            <Contents
              selectedNote={this.state.selectedNote}
              selectedNoteIndex={this.state.selectedNoteIndex}
             />
        ) : 

          <EditorComponent
            selectedNote={this.state.selectedNote}
            selectedNoteIndex={this.state.selectedNoteIndex}
            notes={this.state.notes}
            noteUpdate={this.noteUpdate}
          />
        ) : null}

        


      </div>
    );
  }

  componentWillMount = () => {
    auth.onAuthStateChanged(async user => {
      if (!user) {
        this.props.history.push("/signin");
      } else {
        projectFirestore
          .collection("notes")
          .where("user", "==", auth.currentUser.email)
          .orderBy("timestamp", "desc")
          .onSnapshot(async serverUpdate => {
            const notes = serverUpdate.docs.map(_doc => {
              const data = _doc.data();
              data["id"] = _doc.id;
              return data;
            });
            await this.setState({
              notes: notes,
              user: auth.currentUser.email
            });
          });
      }
    });
  };

  /*
  componentWillMount = () => {
    firebase.auth().onAuthStateChanged( async user => {
      if(!user) {
        this.props.history.push('/signin')
      } else {
        await firebase.firestore.collection.where('users', 'array-contains', user.email)
      }
    })
  }
  */

  selectNote = (note, index) => {
    this.setState({ selectedNoteIndex: index, selectedNote: note });
  };

  viewNote = (bool) => {
    this.setState({ viewContent:bool });
  }

  noteUpdate = (id, noteObj) => {
    projectFirestore
      .collection("notes")
      .doc(id)
      .update({
        title: noteObj.title,
        body: noteObj.body,
        timestamp: firebase.firestore.FieldValue.serverTimestamp(),
        user: auth.currentUser.email
      });
  };

  newNote = async title => {
    const note = {
      title: title,
      body: ""
    };
    const newFromDB = await projectFirestore
      .collection("notes")
      .add({
        title: note.title,
        body: note.body,
        timestamp: firebase.firestore.FieldValue.serverTimestamp(),
        user: auth.currentUser.email
      });
    const newID = newFromDB.id;
    await this.setState({ notes: [...this.state.notes, note] });
    const newNoteIndex = this.state.notes.indexOf(
      this.state.notes.filter(_note => _note.id === newID)[0]
    );
    this.setState({
      selectedNote: this.state.notes[newNoteIndex],
      selectedNoteIndex: newNoteIndex
    });
  };

  deleteNote = async note => {
    const noteIndex = this.state.notes.indexOf(note);
    await this.setState({
      notes: this.state.notes.filter(_note => _note !== note)
    });
    if (this.state.selectedNoteIndex === noteIndex) {
      this.setState({ selectedNoteIndex: null, selectedNote: null });
    } else {
      this.state.notes.length > 1
        ? this.selectNote(
            this.state.notes[this.state.selectedNoteIndex - 1],
            this.state.selectedNoteIndex - 1
          )
        : this.setState({ selectedNoteIndex: null, selectedNote: null });
    }

    projectFirestore
      .collection("notes")
      .doc(note.id)
      .delete();
  };

  signOut = () => {
    auth.signOut();
  };
}

export default withStyles(styles)(App);
