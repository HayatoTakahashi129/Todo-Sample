import * as React from "react";
import { useSelector } from "react-redux";
import useApi from "../../hooks/axios/useApi";
import URI_CONST from "../../hooks/axios/constants/uriConst";
import Box from "@mui/material/Box";
import Collapse from "@mui/material/Collapse";
import IconButton from "@mui/material/IconButton";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Typography from "@mui/material/Typography";
import Paper from "@mui/material/Paper";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import { Container } from "@mui/material";

const Todo = () => {
  const sendApi = useApi();
  const todoList = useSelector((state) => state.getApi[URI_CONST.getTodo.url]);
  React.useEffect(() => {
    sendApi(URI_CONST.getTodo);
  }, []);

  return (
    <Container>
      <CollapsibleTable rows={todoList} />
    </Container>
  );
};

export default Todo;

const Row = (props) => {
  const { row, index } = props;
  const [open, setOpen] = React.useState(false);

  return (
    <React.Fragment>
      <TableRow sx={{ "& > *": { borderBottom: "unset" } }}>
        <TableCell>
          <IconButton
            aria-label="expand row"
            size="small"
            onClick={() => setOpen(!open)}
          >
            {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
          </IconButton>
        </TableCell>
        <TableCell component="th" scope="row">
          {index + 1}
        </TableCell>
        <TableCell align="right">{row.title}</TableCell>
        <TableCell align="right">{row.dueDate}</TableCell>
        <TableCell align="right">Edit</TableCell>
        <TableCell align="right">Delete</TableCell>
      </TableRow>
      <TableRow>
        <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
          <Collapse in={open} timeout="auto" unmountOnExit>
            <Box sx={{ margin: 1 }}>
              <Typography variant="h6" gutterBottom component="div">
                Description
              </Typography>
              {row.description}
            </Box>
          </Collapse>
        </TableCell>
      </TableRow>
    </React.Fragment>
  );
};

const CollapsibleTable = (props) => {
  const { rows } = props;
  return (
    <TableContainer component={Paper}>
      <Table aria-label="collapsible table">
        <TableHead>
          <TableRow>
            <TableCell />
            <TableCell>Number</TableCell>
            <TableCell align="right">Title</TableCell>
            <TableCell align="right">DueDate</TableCell>
            <TableCell align="right">Edit</TableCell>
            <TableCell align="right">Delete</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row, index) => (
            <Row key={row.id} row={row} index={index} />
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};
