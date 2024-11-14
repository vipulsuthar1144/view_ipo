import AppColors from "@/theme/utils/AppColors";
import { RootContainer } from "@components/design/styledComponents";
import FallbackError from "@components/FallbackError";
import ItemCompanyList from "@components/ItemCompanyList";
import { AddCircleRounded } from "@mui/icons-material";
import { AppBar, Button, CircularProgress, Grid2, ToggleButton, ToggleButtonGroup, Toolbar } from "@mui/material";
import useCompanyController from "./Company.controller";

const Company = () => {
  const {
    listenerGoToCompanyDetails,
    listenerGoToAddIPO,
    isCompaniesListLoading,
    isCompaniesListError,
    companiesList,
    companyLastVisible,
    filterStatus,
    setFilterStatus,
  } = useCompanyController();

  const renderCompanyList = () => {
    if (isCompaniesListLoading && !companyLastVisible)
      return (
        <CircularProgress size={40} thickness={5} sx={{ color: "loader.main", alignSelf: "center", margin: "auto" }} />
      );

    if (isCompaniesListError) return <FallbackError type="something_went_wrong" />;
    if (companiesList.length === 0 && !isCompaniesListLoading)
      return <FallbackError type="data_not_found" message="No Companies Found" />;
    return (
      <Grid2 container spacing={{ xs: 1, sm: 2 }}>
        {companiesList?.map((item) => (
          <Grid2 size={{ xs: 12, sm: 6, md: 4, lg: 3 }} key={item.id}>
            <ItemCompanyList onClick={() => listenerGoToCompanyDetails(item.id)} IPOData={item} />
          </Grid2>
        ))}
      </Grid2>
    );
  };

  const handleFilterStatusChange = (_: React.MouseEvent<HTMLElement>, newValue: string | null) => {
    if (newValue !== null && (newValue == "all" || newValue == "active" || newValue == "inactive")) {
      setFilterStatus(newValue);
    }
  };

  const renderFilterButtons = () => {
    return (
      <ToggleButtonGroup
        value={filterStatus}
        exclusive
        onChange={handleFilterStatusChange}
        aria-label="Filter IPO"
        sx={{
          "& .MuiToggleButton-root": {
            color: "purple",
            borderColor: "purple",
            borderRadius: "20px",
            padding: "8px 20px",
            marginBottom: "10px",
            "&:not(:last-of-type)": {
              marginRight: "10px",
            },
            "&.Mui-selected": {
              color: "white",
              backgroundColor: "purple",
            },
            "&:hover": {
              backgroundColor: "purple.500",
            },
          },
        }}
      >
        <ToggleButton value="all" aria-label="all">
          All
        </ToggleButton>
        <ToggleButton value="active" aria-label="active">
          Active
        </ToggleButton>
        <ToggleButton value="inactive" aria-label="inactive">
          Inactive
        </ToggleButton>
      </ToggleButtonGroup>
    );
  };

  return (
    <RootContainer>
      <AppBar
        sx={{
          position: "sticky",
          top: 100,
          zIndex: 8,
          backgroundColor: AppColors.white,
          borderRadius: "10px",
          marginBottom: "10px",
        }}
      >
        <Toolbar>
          <Button
            variant="outlined"
            startIcon={<AddCircleRounded />}
            sx={{
              borderRadius: "50px",
              color: AppColors.greenColor,
              borderColor: AppColors.greenColor,
              alignSelf: "center",
              margin: "0 auto",
            }}
            onClick={listenerGoToAddIPO}
          >
            Add IPO
          </Button>
        </Toolbar>
      </AppBar>
      {renderFilterButtons()}
      {renderCompanyList()}
      {/* <Button onClick={loadMore} disabled={isCompaniesListLoading}>
        Load More
        {isCompaniesListLoading && (
          <CircularProgress size={20} sx={{ ml: "10px" }} />
        )}
      </Button> */}
    </RootContainer>
  );
};

export default Company;
