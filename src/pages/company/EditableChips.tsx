import { AddCircleOutline } from "@mui/icons-material";
import { Box, Chip, IconButton, InputAdornment, List, ListItem, TextField, Typography } from "@mui/material";
import React, { useEffect } from "react";
import { useStyles } from "./DialogUpdateCompanyData";
import { useAppDispatch } from "@/store/store";
import {
  updateLeadManagersList,
  updateCompanyIssueObjectiveList,
  updateCompanyListingOfGroupsList,
  updateCompanyPromotersList,
  updateCompanyStrengthList,
  updateCompanyWeaknessList,
} from "@/store/slice/ipo.slice";

type TEditableChipsProps = {
  title: string;
  label: string;
  defaultList?: string[] | null;
  id:
    | "lead_managers"
    | "company_strength"
    | "company_weakness"
    | "company_issue_objective"
    | "company_promoters"
    | "listing_of_groups";
};

const EditableChips = ({ title, label, defaultList, id }: TEditableChipsProps) => {
  const classes = useStyles();
  const dispatch = useAppDispatch();

  const [leadManagers, setLeadManagers] = React.useState<string[]>([...(defaultList ?? [])]);
  const [leadManagerInputValue, setLeadManagerInputValue] = React.useState("");

  useEffect(() => {
    const timeout = setTimeout(() => {
      switch (id) {
        case "lead_managers":
          dispatch(updateLeadManagersList(leadManagers));
          break;
        case "company_strength":
          dispatch(updateCompanyStrengthList(leadManagers));
          break;
        case "company_weakness":
          dispatch(updateCompanyWeaknessList(leadManagers));
          break;
        case "company_issue_objective":
          dispatch(updateCompanyIssueObjectiveList(leadManagers));
          break;
        case "company_promoters":
          dispatch(updateCompanyPromotersList(leadManagers));
          break;
        case "listing_of_groups":
          dispatch(updateCompanyListingOfGroupsList(leadManagers));
          break;
        default:
          break;
      }
    }, 500);

    return () => clearTimeout(timeout);
  }, [leadManagers.length]);

  const addValue = () => {
    if (leadManagerInputValue.trim()) {
      setLeadManagers((pre) => [...pre, leadManagerInputValue.trim()]);
      setLeadManagerInputValue("");
    }
  };

  const deleteData = (indexForDelete: number) => {
    setLeadManagers((pre) => pre.filter((_, i) => i !== indexForDelete));
  };

  return (
    <Box component={"div"} className={classes.container} sx={{ flexDirection: "column", alignItems: "flex-start" }}>
      <Typography variant="h3">{title}</Typography>
      {/* <AppTextField label="Manager" name="company_managers" multiline hasAddIcon /> */}
      <TextField
        id={id}
        label={label}
        value={leadManagerInputValue}
        onChange={(e) => setLeadManagerInputValue(e.target.value)}
        fullWidth
        autoComplete="off"
        multiline
        slotProps={{
          input: {
            endAdornment: (
              <InputAdornment position="end">
                <IconButton onClick={addValue}>
                  <AddCircleOutline color="success" />
                </IconButton>
              </InputAdornment>
            ),
          },
        }}
      />
      <List sx={{ width: "100%" }}>
        {leadManagers?.map((item, index) => (
          <ListItem key={index}>
            <Chip
              component={"span"}
              sx={{
                height: "auto",
                padding: "10px 5px",
                "& .MuiChip-label": {
                  display: "block",
                  whiteSpace: "normal",
                },
              }}
              label={item}
              onDelete={() => deleteData(index)}
            />
          </ListItem>
        ))}
      </List>
    </Box>
  );
};

export default EditableChips;
