import useIPOs from "@/service/useIPOs";
import { RootContainer } from "@components/design/styledComponents";
import FallbackError from "@components/FallbackError";
import IPOCard from "@components/IPOCard";
import { Add } from "@mui/icons-material";
import { Button, CircularProgress, Grid2, Stack, ToggleButton, ToggleButtonGroup, Typography } from "@mui/material";

const Company = () => {
  const {
    ipos,
    loading,
    error,
    hasMore,
    loadMore,
    filterIPOs,
    filterStatus,
    listenerGoToCompanyDetails,
    listenerGoToAddIPO,
  } = useIPOs();

  const renderCompanyList = () => {
    if (error) return <FallbackError type="something_went_wrong" />;
    if (ipos.length === 0 && !loading) return <FallbackError type="data_not_found" message="No IPO's Available" />;
    return (
      <>
        <Grid2 container width={"100%"} spacing={{ xs: 1, sm: 2 }}>
          {ipos?.map((item) => (
            <Grid2 size={{ xs: 12, sm: 6, md: 4, lg: 3 }} key={item.id}>
              <IPOCard ipo={item} onClick={() => listenerGoToCompanyDetails(item.id)} />
            </Grid2>
          ))}
        </Grid2>
        {loading && (
          <CircularProgress
            size={24}
            thickness={5}
            sx={{ color: "loader.main", alignSelf: "center", margin: " 0 auto", mt: "10px" }}
          />
        )}
        {hasMore && !loading && (
          <Button
            variant="contained"
            color="primary"
            onClick={loadMore}
            sx={{ width: "fit-content", alignSelf: "center", margin: " 0 auto", padding: "5px 15px", mt: "10px" }}
          >
            Load More
          </Button>
        )}
        {!hasMore && !loading && (
          <Typography variant="h5" sx={{ alignSelf: "center", margin: " 0 auto", mt: "10px" }}>
            No more IPO's available.
          </Typography>
        )}
      </>
    );
  };

  const handleFilterStatusChange = (_: React.MouseEvent<HTMLElement>, newValue: string | null) => {
    if (newValue !== null && (newValue == "all" || newValue == "active" || newValue == "inactive")) {
      // setFilterStatus(newValue);
      filterIPOs(newValue);
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
            color: "primary.main",
            borderColor: "primary.main",
            borderRadius: "20px",
            padding: "8px 20px",
            marginBottom: "10px",
            backgroundColor: "transparent",
            "&:not(:last-of-type)": {
              marginRight: "10px",
            },
            "&.Mui-selected": {
              color: "white",
              backgroundColor: "primary.main",
            },
            "&:hover": {
              backgroundColor: "primary.main",
              color: "white",
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
    <RootContainer style={{ marginTop: "0px" }}>
      <Stack direction={"row"} justifyContent={"space-between"} alignItems={"center"}>
        {renderFilterButtons()}
        <Button
          variant="contained"
          color="success"
          startIcon={<Add />}
          sx={{
            borderRadius: "50px",
            padding: "8px 20px",
          }}
          onClick={listenerGoToAddIPO}
        >
          Add IPO
        </Button>
      </Stack>

      {renderCompanyList()}
    </RootContainer>
  );
};

export default Company;
