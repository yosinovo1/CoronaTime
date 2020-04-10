import React, { Component } from "react";

import Typography from "@material-ui/core/Typography";
import InputBase from "@material-ui/core/InputBase";

import { connect } from "react-redux";
import PropTypes from "prop-types";
import {
  getProjects,
  updateSelectedProject,
  updateFilteredProjects,
} from "../../actions/projects";

import Paper from "@material-ui/core/Paper";
import IconButton from "@material-ui/core/IconButton";
import SearchIcon from "@material-ui/icons/Search";

class Header extends Component {
  static propTypes = {
    projects: PropTypes.array.isRequired,
    selectedProject: PropTypes.object,
  };

  constructor(props) {
    super(props);

    this.props.getProjects();
    this.searchFields = ["serialNumber", "location", "address", "customer"];
    this.classes = {
      root: {
        padding: "2px 4px",
        display: "flex",
        alignItems: "center",
        width: 400,
      },
      input: {
        flex: 1,
      },
      iconButton: {
        padding: 10,
      },
      divider: {
        height: 28,
        margin: 4,
      },
    };
  }

  filterProjects(inputValues) {
    let filteredProjects = this.props.projects.filter((projectData) =>
      inputValues
        .split(/ /)
        .filter((inputValue) => !!inputValue)
        .reduce(
          (flag, inputValue) =>
            flag &&
            this.searchFieldsInProject(
              projectData,
              this.searchFields,
              inputValue
            ),
          true
        )
    );
    this.props.updateFilteredProjects(filteredProjects);
  }

  searchFieldsInProject(projectData, searchFields, inputValue) {
    let shouldAdd = false;
    searchFields.forEach((field) => {
      if (!shouldAdd && projectData[field]) {
        if (typeof projectData[field] === "object") {
          // Search in all keys
          shouldAdd = this.searchFieldsInProject(
            projectData[field],
            Object.keys(projectData[field]),
            inputValue
          );
        } else if (
          projectData[field]
            .toString()
            .toLowerCase()
            .includes(inputValue.toLowerCase())
        ) {
          shouldAdd = true;
        }
      }
    });
    return shouldAdd;
  }

  render() {
    return (
      <div
        style={{
          padding: "0.5rem",
          backgroundColor: "rgba(255, 255, 255, 0.08)",
          display: "flex",
          justifyContent: "space-between",
          flexDirection: "row-reverse",
        }}
      >
        <Typography variant="h6">פרוייקטים</Typography>
        <Paper component="form" className={this.classes.root}>
          <InputBase
            placeholder="חפש בפרוייקטים..."
            onChange={(e) => this.filterProjects(e.target.value)}
            autoFocus
            inputProps={{
              style: { textAlign: "right", width: "33vw", padding: "0.5rem" },
            }}
          />
          <IconButton className={this.classes.iconButton} aria-label="search">
            <SearchIcon />
          </IconButton>
        </Paper>
        <Typography variant="h6">
          &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
        </Typography>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  projects: state.projects.projects,
  selectedProject: state.projects.selectedProject,
});

export default connect(mapStateToProps, {
  getProjects,
  updateSelectedProject,
  updateFilteredProjects,
})(Header);
