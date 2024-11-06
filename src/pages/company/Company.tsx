import { RootContainer } from "@components/design/styledComponents";
import FallbackError from "@components/FallbackError";
import { AppBar, Button, CircularProgress, Grid2, Toolbar } from "@mui/material";
import useCompanyController from "./Company.controller";
import ItemCompanyList from "@components/ItemCompanyList";
import AppColors from "@/theme/utils/AppColors";
import { AddCircleRounded } from "@mui/icons-material";

const Company = () => {
  const {
    listenerGoToCompanyDetails,
    listenerGoToAddIPO,
    isCompaniesListLoading,
    isCompaniesListError,
    companiesList,
    companyLastVisible,
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

  return (
    <RootContainer>
      <AppBar
        sx={{
          position: "sticky",
          top: 100,
          zIndex: 8,
          backgroundColor: AppColors.white,
          borderRadius: "10px",
          marginBottom: "20px",
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
