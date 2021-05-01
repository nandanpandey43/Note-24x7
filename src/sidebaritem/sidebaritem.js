import React from "react";
import { withStyles } from "@material-ui/core/styles";
import styles from "./styles";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import DeleteIcon from "@material-ui/icons/Delete";
import EditIcon from '@material-ui/icons/Edit';
import { removeHTMLTags } from "../helpers";
import Contents from './Contents';


class SidebarItemComponent extends React.Component {
  render() {
    const { _index, _note, classes, selectedNoteIndex } = this.props;

    // function contentPage(){
    //   console.log("clicked");
    //   return <Contents />
    // }

    return (
      <div key={_index} className={classes.mainContainer} >
        <ListItem
          className={classes.listItem}
          selected={selectedNoteIndex === _index}
          alignItems={"flex-start"}
          onClick={() => {this.viewNote(true)
                          this.selectNote(_note, _index)  } }
        >
          <div
            className={classes.textSection}
            // onClick={() => this.selectNote(_note, _index)}
          >
            <ListItemText
              primary={_note.title}
              secondary={removeHTMLTags(_note.body.substring(0, 30)) + "..."}
            />
          </div>
          
        </ListItem>

        <div className={classes.optionCointainer} >

          <EditIcon className={classes.editIcon} 
                  onClick={() => {this.viewNote(false)
                  this.selectNote(_note, _index)
                  
                  console.log("Editor clicked", this.viewContent)  } }
          />
        <DeleteIcon
          onClick={() => this.deleteNote(_note)}
          className={classes.deleteIcon}
        />

        </div>



      </div>
    );
  }

  selectNote = (n, i) => this.props.selectNote(n, i);

  viewNote = (bool) => this.props.viewNote(bool);

  deleteNote = note => {
    if (window.confirm(`Are you sure you want to delete: ${note.title}`)) {
      this.props.deleteNote(note);
    }
  };
}

export default withStyles(styles)(SidebarItemComponent);
