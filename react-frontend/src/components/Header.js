import { useState, useEffect } from "react";
import axios from "axios";
// import "./Header.css";
import {
  Stack,
  Button,
  AppBar,
  Toolbar,
  IconButton,
  Typography,
  Card,
  CardActions,
  Box,
  CardContent,
  CardHeader,
  Grid,
  TextField,
  InputAdornment,
  Fab,
  Checkbox,
  Divider,
} from "@mui/material";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import TaskAltIcon from "@mui/icons-material/TaskAlt";
import TaskIcon from "@mui/icons-material/Task";
import AddTaskIcon from "@mui/icons-material/AddTask";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import DeleteForeverOutlinedIcon from "@mui/icons-material/DeleteForeverOutlined";
import EditIcon from "@mui/icons-material/Edit";
import RadioButtonUncheckedIcon from "@mui/icons-material/RadioButtonUnchecked";

function Header() {
  const [taskList, setTaskList] = useState([]);
  const [taskTitle, setTaskTitle] = useState("");
  const [check, setCheck] = useState(0);
  const [updateItem, setUpdateItem] = useState(null);

  const createPostRequest = () => {
    const post = { title: taskTitle };
    axios
      .post("http://localhost:4000", post)
      .then((res) => {
        console.log(`create response ${res}`);
        getFreshTasksRequest();
        setTaskTitle("");
      })
      .catch((err) => {
        console.log(`Create error ${err}`);
      });
  };

  const deleteTaskRequest = (_id) => {
    axios
      .delete(`http://localhost:4000/${_id}`)
      .then((res) => {
        console.log(`delete response ${res}`);
        getFreshTasksRequest();
      })
      .catch((err) => {
        console.log(`Delete error ${err}`);
      });
  };

  const updateTaskRequest = (updatedItem) => {
    axios
      .patch(`http://localhost:4000/${updatedItem._id}`, {
        title: updatedItem.title,
        completed: updatedItem.completed,
      })
      .then((res) => {
        console.log(`update response ${res}`);
        getFreshTasksRequest();
      })
      .catch((err) => {
        console.log(`update error ${err}`);
      });
  };

  const getFreshTasksRequest = () => {
    console.log("Fresh data called");
    axios
      .get("http://localhost:4000")
      .then((res) => {
        console.log(res.data.tasks);
        setTaskList((prevTaksList) => {
          return res.data.tasks;
        });
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const updateTaskTitle = (item) => {
    setUpdateItem(item);
  };

  const colorTheme = createTheme({
    palette: {
      mode: "dark",
      primary: {
        main: "#073a6d",
      },
    },
  });

  const navBarComponent = (
    <ThemeProvider theme={colorTheme}>
      <AppBar position="static" enableColorOnDark>
        <Toolbar>
          <IconButton size="large" edge="start" color="inherit">
            <TaskAltIcon></TaskAltIcon>
          </IconButton>
          <Typography
            variant="h6"
            component="div"
            sx={{ flexGrow: 1, textAlign: "left" }}
          >
            Task Manager
          </Typography>
        </Toolbar>
      </AppBar>
    </ThemeProvider>
  );

  const taskComponent = (item) => {
    return (
      <Stack
        direction="row"
        alignItems="center"
        // sx={{
        //   ...(item.completed && { border: "1px solid green" }),
        //   ...(!item.completed && { border: "1px solid red" }),
        // }}
        height={65}
        sx={{
          ...(item.completed && { background: "#aef1cd" }),
          ...(!item.completed && { background: "#e69f8b" }),
          ...(item.completed && { border: "1px solid green" }),
          ...(!item.completed && { border: "1px solid red" }),
        }}
      >
        <Checkbox
          icon={<RadioButtonUncheckedIcon />}
          checkedIcon={<CheckCircleIcon />}
          checked={item.completed}
          onChange={(e) => {
            updateTaskRequest({
              _id: item._id,
              title: item.title,
              completed: e.target.checked,
            });
          }}
        ></Checkbox>
        <Typography
          variant="body1"
          sx={{
            flexGrow: 1,
            textAlign: "left",
            ...(item.completed && { textDecoration: "line-through" }),
          }}
        >
          {item.title}
        </Typography>
        <IconButton
          onClick={() => {
            updateTaskTitle(item);
          }}
        >
          <EditIcon />
        </IconButton>
        <IconButton
          onClick={() => {
            deleteTaskRequest(item._id);
          }}
        >
          <DeleteForeverOutlinedIcon />
        </IconButton>
      </Stack>
    );
  };

  const cardHeader = (title, InputTaskIcon) => {
    return (
      <CardHeader
        avatar={InputTaskIcon}
        title={title}
        disableTypography={false}
        titleTypographyProps={{ variant: "h4", color: "white" }}
        sx={{
          textAlign: "left",
          //   backgroundColor: "#1976d2",
          // backgroundColor: "#8833efdf",
          backgroundColor: "#1976d2",
        }}
      ></CardHeader>
    );
  };

  const addTaskComponent = () => {
    return (
      <CardContent>
        <Stack direction="row">
          <TextField
            variant="outlined"
            label="Add Task"
            onChange={(e) => {
              setTaskTitle(e.target.value);
            }}
            onKeyDown={(ev) => {
              console.log(`Pressed keyCode ${ev.key}`);
              if (ev.key === "Enter") {
                // Do code here
                createPostRequest();
                ev.preventDefault();
              }
            }}
            value={taskTitle}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <TaskIcon />
                </InputAdornment>
              ),
            }}
            sx={{ flexGrow: 1 }}
          ></TextField>
          <Fab
            color="primary"
            aria-label="add"
            sx={{ ml: 2 }}
            onClick={() => {
              createPostRequest();
            }}
          >
            <AddTaskIcon></AddTaskIcon>
          </Fab>
        </Stack>
      </CardContent>
    );
  };

  const updateItemRequest = () => {
    updateTaskRequest(updateItem);
    setUpdateItem(null);
  };

  const updateTaskComponent = () => {
    return (
      <CardContent>
        <Stack direction="row">
          <TextField
            variant="outlined"
            label="Update Task"
            onChange={(e) => {
              setUpdateItem({ ...updateItem, title: e.target.value });
            }}
            onKeyDown={(ev) => {
              console.log(`Pressed keyCode ${ev.key}`);
              if (ev.key === "Enter") {
                // Do code here
                updateItemRequest();
                ev.preventDefault();
              }
            }}
            value={updateItem.title}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <TaskIcon />
                </InputAdornment>
              ),
            }}
            sx={{ flexGrow: 1 }}
          ></TextField>
          <Fab
            color="primary"
            aria-label="add"
            sx={{ ml: 2 }}
            onClick={() => {
              updateItemRequest();
            }}
          >
            <AddTaskIcon></AddTaskIcon>
          </Fab>
        </Stack>
      </CardContent>
    );
  };

  useEffect(() => {
    getFreshTasksRequest();
  }, []);

  const addTaskCard = () => {
    return (
      <Card
        raised={true}
        sx={{
          width: 500,
          display: "flex",
          flexDirection: "column",
        }}
      >
        {/* Card Header */}
        {cardHeader(
          "Create New Task",
          <TaskAltIcon style={{ color: "white" }}></TaskAltIcon>
        )}

        {/* Add Task field */}
        {addTaskComponent()}
      </Card>
    );
  };

  const updateTaskCard = () => {
    return (
      <Card
        raised={true}
        sx={{
          width: 500,
          display: "flex",
          flexDirection: "column",
        }}
      >
        {/* Card Header */}
        {cardHeader(
          "Update Task",
          <TaskAltIcon style={{ color: "white" }}></TaskAltIcon>
        )}

        {/* Add Task field */}
        {updateTaskComponent()}
      </Card>
    );
  };

  return (
    <>
      {/* Navbar Component */}
      {navBarComponent}

      <Grid container direction="column" sx={{ alignItems: "center", my: 7 }}>
        <Grid item sx={{ display: "flex", flexDirection: "column" }}>
          {updateItem != null ? updateTaskCard() : addTaskCard()}
        </Grid>
        <Grid item>
          <Card
            raised={true}
            sx={{
              width: 900,
              display: "flex",
              flexDirection: "column",
              my: 10,
            }}
          >
            {/* Card Header */}
            {cardHeader(
              "Your Tasks",
              <TaskIcon style={{ color: "white" }}></TaskIcon>
            )}

            {/* Task list render */}
            <CardContent>
              {taskList.map((item) => {
                return taskComponent(item);
              })}
              {/* <Stack
                direction="column"
                spacing={2}
                divider={
                  <Divider
                    variant="fullWidth"
                    flexItem
                    orientation="horizontal"
                  ></Divider>
                }
                sx={{ my: 2, border: "1px black" }}
              >
                {taskList.map((item) => {
                  return taskComponent(item);
                })}
              </Stack> */}
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </>
  );
}

export default Header;
