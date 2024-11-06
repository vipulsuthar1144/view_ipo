import React, { useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
  Button,
  Box,
  IconButton,
  Paper,
} from "@mui/material";
import AppTextField from "@components/design/AppTextField";
import { DatePicker } from "@mui/x-date-pickers";
import {
  AddCircleOutline,
  AddOutlined,
  Delete,
  DeleteOutline,
} from "@mui/icons-material";

interface RowData {
  id: number;
  name: string;
  age: string;
}

const EditableTable: React.FC = () => {
  const [rows, setRows] = useState<RowData[]>([{ id: 1, name: "", age: "" }]);
  const [rowCount, setRowCount] = useState(1);

  const handleInputChange = (
    id: number,
    field: keyof RowData,
    value: string
  ) => {
    const updatedRows = rows.map((row) =>
      row.id === id ? { ...row, [field]: value } : row
    );
    setRows(updatedRows);
  };

  const addRow = () => {
    setRowCount(rowCount + 1);
    setRows([...rows, { id: rowCount + 1, name: "", age: "" }]);
  };

  const removeRow = (id: number) => {
    setRows(rows.filter((row) => row.id !== id));
  };

  return (
    <Box sx={{ width: "100%" }}>
      <IconButton onClick={addRow} color="success">
        <AddCircleOutline />
      </IconButton>
      <TableContainer sx={{ width: "100%" }} component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell></TableCell>
              <TableCell>Assets</TableCell>
              <TableCell>Revenue</TableCell>
              <TableCell>Profit After Tax</TableCell>
              <TableCell></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.map((row) => (
              <TableRow key={row.id}>
                <TableCell>
                  <DatePicker name="startDate" />
                </TableCell>
                <TableCell>
                  <AppTextField label="" name="assets" />
                </TableCell>
                <TableCell>
                  <AppTextField label="" name="assets" />
                </TableCell>
                <TableCell>
                  <AppTextField label="" name="assets" />
                </TableCell>
                <TableCell>
                  <IconButton onClick={() => removeRow(row.id)} color="error">
                    <Delete />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
};

export default EditableTable;
