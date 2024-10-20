import { RootContainer } from "@components/design/styledComponents";
import FallbackError from "@components/FallbackError";
import { CircularProgress, Grid2 } from "@mui/material";
import useCompanyController from "./Company.controller";
import ItemCompanyList from "@components/ItemCompanyList";

const Company = () => {
  const {
    isCompaniesListLoading,
    isCompaniesListError,
    companiesList,
    companyLastVisible,
  } = useCompanyController();

  const renderCompanyList = () => {
    if (isCompaniesListLoading && !companyLastVisible)
      return (
        <CircularProgress
          size={40}
          thickness={5}
          sx={{ color: "loader.main", alignSelf: "center", margin: "auto" }}
        />
      );

    if (isCompaniesListError)
      return <FallbackError type="something_went_wrong" />;
    if (companiesList.length === 0 && !isCompaniesListLoading)
      return (
        <FallbackError type="data_not_found" message="No Companies Found" />
      );
    return (
      <Grid2 container spacing={{ xs: 1, sm: 2 }}>
        {companiesList?.map((item) => (
          <Grid2 size={{ xs: 12, sm: 6, md: 4, lg: 3 }} key={item.id}>
            <ItemCompanyList
              name={item.name}
              description={item?.about}
              logo={item.logo}
            />
          </Grid2>
        ))}
      </Grid2>
    );
  };

  return (
    <RootContainer>
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
