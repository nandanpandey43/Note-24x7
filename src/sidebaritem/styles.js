const styles = theme => ({
  mainContainer:{
    display: "flex",
    flexDirection: "row",
    justifyContent: "spaceBetween",
    // overflow: "scroll"
  },
  listItem: {
    cursor: "pointer",
    display: "inline"
  },
  textSection: {
    maxWidth: "85%"
  },

  optionCointainer: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "spaceBetween",
    marginLeft: "auto",
    paddingLeft: "15px"
    // display: "inline"
    // float: "right"
  },
  editIcon: {
    position: "relative",
    right: "5px",
    
    "&:hover": {
      color: "green"
    }
  },
  deleteIcon: {
    position: "relative",
    right: "5px",
    top: "calc(50% - 20px)",
    "&:hover": {
      color: "red"
    }
  },
  contentStyle:{
    color: "red",
    "&:hover": {
      color: "red"
    }
  }
});

export default styles;
