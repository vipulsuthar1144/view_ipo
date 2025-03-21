import { ILotSize, ITimeline } from "@/schema/ipo.schema";
import AppColors from "@/theme/utils/AppColors";
import { imgDefaultCompany } from "@assets/images";
import FallbackError from "@components/FallbackError";
import { QontoConnector, QontoStepIcon } from "@components/Stepper";
import { ImageCompWithLoader } from "@components/design/Image";
import { RootContainer } from "@components/design/styledComponents";
import { CircleRounded, DeleteForever, Edit, ThumbDownAltOutlined, ThumbUpOutlined } from "@mui/icons-material";
import {
  Backdrop,
  Box,
  Button,
  Chip,
  CircularProgress,
  Grid2,
  List,
  ListItem,
  Paper,
  Step,
  StepLabel,
  Stepper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";
import { makeStyles } from "@mui/styles";
import {
  computeIPOStatus,
  formatDate,
  formatNumber,
  formatPrice,
  isPastDate,
  isPastOrSameDate,
} from "@utils/genaralFunctions";
import useCompanyDetailsController from "./CompanyDetails.controller";
const CompanyDetails = () => {
  const classes = useStyles();
  const { isIPODataError, isIPODataLoading, IPOData, isCRUDIPOLoading, handleDeleteIPObyId, listenerGoToUpdateScreen } =
    useCompanyDetailsController();

  const renderRetailMinSharesAndAmount = (lots: ILotSize[]) => {
    let retailMinAmount = 0;
    let retailMinShares = 0;

    lots.forEach((lot) => {
      if (lot.application == "retail_min") {
        retailMinAmount = lot?.amount ?? 0;
        retailMinShares = lot?.shares ?? 0;
      }
    });
    if (retailMinShares == 0 || retailMinAmount == 0) {
      return "";
    }
    return (
      <Typography variant="h6" sx={{ flex: 1, textAlign: "flex-end" }} color={AppColors.textSecondary}>
        <span style={{ color: AppColors.greenColor, fontSize: "25px" }}>₹ {formatNumber(retailMinAmount)}</span>/{" "}
        {retailMinShares} Shares
      </Typography>
    );
  };

  const renderOfferDateOrListedOnDate = (timeLine?: ITimeline) => {
    if (!timeLine) return;
    if (isPastDate(timeLine?.listing_date)) {
      return (
        <Typography variant="h6" color={AppColors.textSecondary}>
          Listed On : {formatDate(timeLine.listing_date)} at {formatPrice(IPOData?.listing_price)}
        </Typography>
      );
    }
    return (
      <Typography variant="h6" color={AppColors.textSecondary}>
        Offer Date : {formatDate(timeLine.open_date)} - {formatDate(timeLine.end_date)}
      </Typography>
    );
  };

  const renderIPOStatus = () => {
    const ipoStatus = computeIPOStatus(IPOData ?? {});
    return (
      <Chip
        label={`• ${ipoStatus.status}`}
        sx={{
          px: "5px",
          py: "5px",
          height: "fit-content",
          fontSize: "13px",
          color: "white",
          fontWeight: 600,
          letterSpacing: "0.5px",
          borderRadius: "40px",
          backgroundColor: ipoStatus.bgColor,
        }}
      />
    );
  };

  const renderCompanyData = () => {
    if (isIPODataLoading)
      return (
        <CircularProgress size={40} thickness={5} sx={{ color: "loader.main", alignSelf: "center", margin: "auto" }} />
      );

    if (isIPODataError) return <FallbackError type="something_went_wrong" />;
    if (!IPOData) return <FallbackError type="data_not_found" message="No Company IPO Found" />;

    return (
      <>
        <Backdrop sx={{ color: "#fff", zIndex: 11 }} open={isCRUDIPOLoading}>
          <CircularProgress
            size={40}
            thickness={5}
            sx={{ color: "loader.main", alignSelf: "center", margin: "auto" }}
          />
        </Backdrop>

        <Box
          component={"div"}
          className={classes.container}
          sx={{
            padding: "20px",
            width: "100%",
            height: "auto",
            display: "flex",
            gap: "30px",
            flexWrap: "wrap",
            position: "relative",
          }}
        >
          <ImageCompWithLoader
            img={IPOData.company_logo?.url}
            alt={"Company logo"}
            errorImage={imgDefaultCompany}
            style={{
              width: "100px",
              alignSelf: "center",
              objectFit: "contain",
              aspectRatio: 1,
              borderRadius: "10px",
              flex: 1,
              minWidth: "100px",
              maxWidth: "100px",
            }}
          />
          <Chip
            label="Inactive"
            sx={{
              px: "2px",
              py: "3px",
              height: "fit-content",
              fontSize: "13px",
              color: "white",
              fontWeight: 500,
              borderRadius: "0px",
              borderBottomRightRadius: "10px",
              backgroundColor: "grey",
              position: "absolute",
              top: "0px",
              left: "0px",
              display: IPOData.is_active == true ? "none" : "flex",
            }}
          />
          <Box sx={{ flex: 3, minWidth: "fit-content" }}>
            {renderIPOStatus()}
            <Typography variant="h3" mb={"5px"}>
              {IPOData.company_name}
            </Typography>
            {renderOfferDateOrListedOnDate(IPOData?.timeline)}
          </Box>

          <Box
            sx={{
              flex: 1,
              minWidth: "fit-content",
              display: "flex",
              flexDirection: "column",
              alignItems: "flex-end",
            }}
          >
            <Button
              variant="contained"
              color="primary"
              startIcon={<Edit />}
              sx={{
                padding: "5px 24px",
              }}
              onClick={listenerGoToUpdateScreen}
            >
              Update
            </Button>
            <Button
              variant="outlined"
              color="error"
              startIcon={<DeleteForever />}
              sx={{
                padding: "5px 24px",
                marginTop: "10px",
              }}
              onClick={handleDeleteIPObyId}
            >
              Delete
            </Button>
            {renderRetailMinSharesAndAmount(IPOData?.lot_sizes ?? [])}
          </Box>
        </Box>
        {renderIPODetails()}
        {renderSubscriptionsDetails()}
        {renderApplicationDetails()}
        {renderCompanyValuations()}
        {renderCompanyFinancials()}
        {renderCompanyStrength()}
        {renderCompanyIssueObjectives()}
        {renderCompanyPromoters()}
        {renderCompanyAndRegistrarAddress()}
        {renderAboutTheCompany()}
        {renderCompanyDisclaimer()}
      </>
    );
  };

  const renderStepper = () => {
    const stepperItems = [
      {
        label: "Open Date",
        date: IPOData?.timeline?.open_date,
      },
      {
        label: "Close Date",
        date: IPOData?.timeline?.end_date,
      },
      {
        label: "Allotment Date",
        date: IPOData?.timeline?.allotment_date,
      },
      {
        label: "Listing Date",
        date: IPOData?.timeline?.listing_date,
      },
    ];

    let activeStep = -1;
    stepperItems.forEach((item, index) => {
      if (index == 0 && isPastOrSameDate(item.date)) {
        activeStep = index + 1;
      } else if (isPastDate(item.date ?? "")) {
        activeStep = index + 1;
      }
    });

    return (
      <Stepper activeStep={activeStep} alternativeLabel connector={<QontoConnector />} sx={{ width: "100%" }}>
        {stepperItems.map((item, index) => (
          <Step key={index}>
            <StepLabel StepIconComponent={QontoStepIcon}>
              <Typography variant="h6">{formatDate(item.date)}</Typography>
              <Typography variant="subtitle2">{item.label}</Typography>
            </StepLabel>
          </Step>
        ))}
      </Stepper>
    );
  };

  const renderIPODetails = () => {
    return (
      <>
        <Box component={"div"} className={classes.container} sx={{ flexDirection: "column", alignItems: "flex-start" }}>
          <Typography variant="h3" mb={"30px"}>
            {IPOData?.company_name} IPO Details
          </Typography>
          {renderStepper()}
          <Grid2 container p={"10px"} spacing={2} sx={{ width: "100%" }}>
            <Grid2 size={{ xs: 12, md: 6 }}>
              <Typography variant="subtitle1" sx={{ color: AppColors.textSecondary }}>
                IssuePrice
              </Typography>
              <Typography variant="h6">
                {`₹${IPOData?.issue_price?.min}-${IPOData?.issue_price?.max}`} per Equity Share
              </Typography>
            </Grid2>

            <Grid2 size={{ xs: 12, md: 6 }}>
              <Typography variant="subtitle1" sx={{ color: AppColors.textSecondary }}>
                Face Value
              </Typography>
              <Typography variant="h6">{`₹${formatNumber(IPOData?.face_value)} `}Per Equity Share</Typography>
            </Grid2>
            <Grid2 size={{ xs: 12, md: 6 }}>
              <Typography variant="subtitle1" sx={{ color: AppColors.textSecondary }}>
                Listing Of Group
              </Typography>
              <Typography variant="h6">
                {IPOData?.listing_at?.map((item, index) => <span key={index}> {item} </span>)}
              </Typography>
            </Grid2>
            <Grid2 size={{ xs: 12, md: 6 }}>
              <Typography variant="subtitle1" sx={{ color: AppColors.textSecondary }}>
                Registrar
              </Typography>
              <Typography variant="h6">{IPOData?.registrar?.name ?? "-"}</Typography>
            </Grid2>
            <Grid2 size={{ xs: 12, md: 6 }}>
              <Typography variant="subtitle1" sx={{ color: AppColors.textSecondary }}>
                Market Lot
              </Typography>

              {IPOData?.lot_sizes?.map((item, index) => (
                <Box key={index}>
                  {item.application === "retail_min" && (
                    <Typography variant="h6">
                      Retail: {`${formatNumber(item.shares)} Shares (${formatPrice(item.amount)})`}
                    </Typography>
                  )}
                  {item.application === "s_nii_min" && (
                    <Typography variant="h6">
                      S-HNI: {`${formatNumber(item.shares)} Shares (${formatPrice(item.amount)})`}
                    </Typography>
                  )}
                  {item.application === "b_nii_min" && (
                    <Typography variant="h6">
                      B-HNI: {`${formatNumber(item.shares)} Shares (${formatPrice(item.amount)})`}
                    </Typography>
                  )}
                </Box>
              ))}
            </Grid2>
            <Grid2 size={{ xs: 12, md: 6 }}>
              <Typography variant="subtitle1" sx={{ color: AppColors.textSecondary }}>
                Lead Manager
              </Typography>
              {IPOData?.lead_managers?.map((item, index) => (
                <Typography key={index} variant="h6">
                  {item}
                </Typography>
              ))}
            </Grid2>
            <Grid2 size={{ xs: 12, md: 6 }}>
              <Typography variant="subtitle1" sx={{ color: AppColors.textSecondary }}>
                Issue Size
              </Typography>
              <Typography variant="h6">{`Total : ${formatPrice((IPOData?.issue_size?.fresh ?? 0) + (IPOData?.issue_size?.offer_for_sale ?? 0))} Cr.`}</Typography>
              <Typography variant="h6">{`#Fresh : ${formatPrice(IPOData?.issue_size?.fresh)} Cr.`}</Typography>
              <Typography variant="h6">{`#OFS : ${formatPrice(IPOData?.issue_size?.offer_for_sale)} Cr.`}</Typography>
            </Grid2>
            <Grid2 size={{ xs: 12, md: 6 }}>
              <Typography variant="subtitle1" sx={{ color: AppColors.textSecondary }}>
                Retail Portion
              </Typography>
              <Typography variant="h6">{`Retails : ${formatNumber(IPOData?.quota?.retail)}%`}</Typography>
              <Typography variant="h6">{`QIB : ${formatNumber(IPOData?.quota?.qib)}%`}</Typography>
              <Typography variant="h6">{`bNII : ${formatNumber(IPOData?.quota?.nii?.b_nii)}%`}</Typography>
              <Typography variant="h6">{`sNII : ${formatNumber(IPOData?.quota?.nii?.s_nii)}%`}</Typography>
            </Grid2>
            <Grid2 size={{ xs: 12, md: 6 }}>
              <Typography variant="subtitle1" sx={{ color: AppColors.textSecondary }}>
                Subscription
              </Typography>
              <Typography variant="h6">{`${formatNumber(IPOData?.subscription_rate)} times`}</Typography>
            </Grid2>
            <Grid2 size={{ xs: 12, md: 6 }}>
              <Typography variant="subtitle1" sx={{ color: AppColors.textSecondary }}>
                IPO Docs
              </Typography>

              <Typography variant="h6">
                <a href={IPOData?.docs?.anchor ?? ""} target="_blank">
                  Anchor
                </a>
                {" , "}
                <a href={IPOData?.docs?.drph ?? ""} target="_blank">
                  DRPH
                </a>
                {" , "}
                <a href={IPOData?.docs?.rph ?? ""} target="_blank">
                  RPH
                </a>
              </Typography>
            </Grid2>
          </Grid2>
        </Box>
      </>
    );
  };

  const renderApplicationDetails = () => {
    if (!IPOData?.applications) return;
    return (
      <>
        <Box component={"div"} className={classes.container} sx={{ flexDirection: "column", alignItems: "flex-start" }}>
          <Typography variant="h3">{IPOData?.company_name} IPO Application Details</Typography>
          <TableContainer component={Paper}>
            <Table aria-label="simple table">
              <TableHead>
                <TableRow>
                  <TableCell>
                    <Typography variant="h5">QIB</Typography>
                  </TableCell>
                  <TableCell>
                    <Typography variant="h5">NII</Typography>
                    <Typography variant="subtitle1">bNII / sNII</Typography>
                  </TableCell>
                  <TableCell>
                    <Typography variant="h5">Retail</Typography>
                  </TableCell>
                  <TableCell>
                    <Typography variant="h5">Total</Typography>
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                <TableRow sx={{ "&:last-child td, &:last-child th": { border: 0 } }}>
                  <TableCell>
                    <Typography variant="h6" sx={{ color: AppColors.textSecondary }}>
                      {formatNumber(IPOData?.applications?.qib)}
                    </Typography>
                  </TableCell>
                  <TableCell>
                    <Typography variant="h6" sx={{ color: AppColors.textSecondary }}>
                      {formatNumber(
                        (IPOData?.applications?.nii?.b_nii ?? 0) + (IPOData?.applications?.nii?.s_nii ?? 0)
                      )}
                    </Typography>
                    <Typography variant="subtitle1" sx={{ color: AppColors.textSecondary }}>
                      {`${formatNumber(IPOData?.applications?.nii?.b_nii)} / ${formatNumber(IPOData?.applications?.nii?.s_nii)}`}
                    </Typography>
                  </TableCell>
                  <TableCell>
                    <Typography variant="h6" sx={{ color: AppColors.textSecondary }}>
                      {formatNumber(IPOData?.applications?.retail)}
                    </Typography>
                  </TableCell>
                  <TableCell>
                    <Typography variant="h6" sx={{ color: AppColors.textSecondary }}>
                      {formatNumber(
                        (IPOData?.applications?.qib ?? 0) +
                          (IPOData?.applications?.nii?.b_nii ?? 0) +
                          (IPOData?.applications?.nii?.s_nii ?? 0) +
                          (IPOData?.applications?.retail ?? 0)
                      )}
                    </Typography>
                  </TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </TableContainer>
        </Box>
      </>
    );
  };
  const renderSubscriptionsDetails = () => {
    if (!IPOData?.subscriptions || IPOData?.subscriptions.length === 0) return;
    return (
      <>
        <Box component={"div"} className={classes.container} sx={{ flexDirection: "column", alignItems: "flex-start" }}>
          <Typography variant="h3">{IPOData?.company_name} IPO Subscription Details</Typography>
          <TableContainer component={Paper}>
            <Table aria-label="simple table">
              <TableHead>
                <TableRow>
                  <TableCell>
                    <Typography variant="h5">As on</Typography>
                  </TableCell>
                  <TableCell>
                    <Typography variant="h5">QIB</Typography>
                  </TableCell>
                  <TableCell>
                    <Typography variant="h5">NII</Typography>
                    <Typography variant="subtitle1">bNII / sNII</Typography>
                  </TableCell>
                  <TableCell>
                    <Typography variant="h5">Retail</Typography>
                  </TableCell>
                  <TableCell>
                    <Typography variant="h5">Total</Typography>
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {IPOData?.subscriptions?.map((item, index) => (
                  <TableRow key={index} sx={{ "&:last-child td, &:last-child th": { border: 0 } }}>
                    <TableCell component="th" scope="row">
                      <Typography variant="h6" sx={{ color: AppColors.textSecondary }}>
                        {formatDate(item.date)}
                      </Typography>
                    </TableCell>
                    <TableCell>
                      <Typography variant="h6" sx={{ color: AppColors.textSecondary }}>
                        {formatNumber(item.qib)} x
                      </Typography>
                    </TableCell>
                    <TableCell>
                      <Typography variant="h6" sx={{ color: AppColors.textSecondary }}>
                        {formatNumber((item.nii?.b_nii ?? 0) + (item.nii?.s_nii ?? 0))} x
                      </Typography>
                      <Typography variant="subtitle1" sx={{ color: AppColors.textSecondary }}>
                        {`${formatNumber(item.nii?.b_nii)} x  / ${formatNumber(item.nii?.s_nii)} x`}
                      </Typography>
                    </TableCell>
                    <TableCell>
                      <Typography variant="h6" sx={{ color: AppColors.textSecondary }}>
                        {formatNumber(item.retail)} x
                      </Typography>
                    </TableCell>
                    <TableCell>
                      <Typography variant="h6" sx={{ color: AppColors.textSecondary }}>
                        {formatNumber(
                          (item.qib ?? 0) + (item.nii?.b_nii ?? 0) + (item.nii?.s_nii ?? 0) + (item.retail ?? 0)
                        )}{" "}
                        x
                      </Typography>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Box>
      </>
    );
  };

  const renderCompanyFinancials = () => {
    if (!IPOData?.company_financials || IPOData?.company_financials?.length == 0) return;
    return (
      <>
        <Box component={"div"} className={classes.container} sx={{ flexDirection: "column", alignItems: "flex-start" }}>
          <Typography variant="h3">
            {IPOData?.company_name} Company Financials{" "}
            <span style={{ color: AppColors.textSecondary, fontSize: "18px" }}>All values are in ₹ Cr.</span>
          </Typography>
          <TableContainer component={Paper}>
            <Table aria-label="simple table">
              <TableHead>
                <TableRow>
                  <TableCell>
                    <Typography variant="h5"></Typography>
                  </TableCell>
                  <TableCell>
                    <Typography variant="h5">Assets</Typography>
                  </TableCell>
                  <TableCell>
                    <Typography variant="h5">Revenue</Typography>
                  </TableCell>
                  <TableCell>
                    <Typography variant="h5">Profit After Tax</Typography>
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {IPOData?.company_financials?.map((item, index) => (
                  <TableRow key={index} sx={{ "&:last-child td, &:last-child th": { border: 0 } }}>
                    <TableCell component="th" scope="row">
                      <Typography variant="h6" sx={{ color: AppColors.textSecondary }}>
                        {formatDate(item.period)}
                      </Typography>
                    </TableCell>
                    <TableCell>
                      <Typography variant="h6" sx={{ color: AppColors.textSecondary }}>
                        {formatNumber(item.assets)}
                      </Typography>
                    </TableCell>

                    <TableCell>
                      <Typography variant="h6" sx={{ color: AppColors.textSecondary }}>
                        {formatNumber(item.revenue)}
                      </Typography>
                    </TableCell>
                    <TableCell>
                      <Typography variant="h6" sx={{ color: AppColors.textSecondary }}>
                        {formatNumber(item.profit)}
                      </Typography>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Box>
      </>
    );
  };

  const renderCompanyValuations = () => {
    if (!IPOData?.valuations) return;
    return (
      <>
        <Box component={"div"} className={classes.container} sx={{ flexDirection: "column", alignItems: "flex-start" }}>
          <Typography variant="h3">{IPOData?.company_name} Valuations</Typography>
          <Grid2 container p={"10px"} spacing={2} sx={{ width: "100%" }}>
            <Grid2 size={{ xs: 12, md: 6 }}>
              <Typography variant="subtitle1" sx={{ color: AppColors.textSecondary }}>
                EPS Pre IPO
              </Typography>
              <Typography variant="h6">{formatNumber(IPOData?.valuations?.earning_per_share?.pre_ipo)}</Typography>
            </Grid2>

            <Grid2 size={{ xs: 12, md: 6 }}>
              <Typography variant="subtitle1" sx={{ color: AppColors.textSecondary }}>
                EPS Post IPO
              </Typography>
              <Typography variant="h6">{formatNumber(IPOData?.valuations?.earning_per_share?.post_ipo)}</Typography>
            </Grid2>
            <Grid2 size={{ xs: 12, md: 6 }}>
              <Typography variant="subtitle1" sx={{ color: AppColors.textSecondary }}>
                P/E Pre IPO
              </Typography>
              <Typography variant="h6">{formatNumber(IPOData?.valuations?.price_earning_ratio?.pre_ipo)}</Typography>
            </Grid2>
            <Grid2 size={{ xs: 12, md: 6 }}>
              <Typography variant="subtitle1" sx={{ color: AppColors.textSecondary }}>
                P/E Post IPO
              </Typography>
              <Typography variant="h6">{formatNumber(IPOData?.valuations?.price_earning_ratio?.post_ipo)}</Typography>
            </Grid2>
            <Grid2 size={{ xs: 12, md: 6 }}>
              <Typography variant="subtitle1" sx={{ color: AppColors.textSecondary }}>
                RoNW
              </Typography>
              <Typography variant="h6">{formatNumber(IPOData?.valuations?.return_on_net_worth)} %</Typography>
            </Grid2>
          </Grid2>
        </Box>
      </>
    );
  };

  const renderCompanyStrength = () => {
    if (
      (!IPOData?.company_strengths && !IPOData?.company_weaknesses) ||
      (IPOData?.company_strengths?.length == 0 && IPOData?.company_weaknesses?.length == 0)
    )
      return;
    return (
      <>
        <Box component={"div"} className={classes.container} sx={{ flexDirection: "column", alignItems: "flex-start" }}>
          <Typography variant="h3"> {IPOData?.company_name} - Strength and Weakness</Typography>

          <Grid2 container spacing={2} width={"100%"}>
            {IPOData?.company_strengths && IPOData?.company_strengths.length > 0 && (
              <Grid2 size={{ xs: 12, md: 6 }}>
                <Typography variant="h5">Strength</Typography>
                <List>
                  {IPOData?.company_strengths?.map((item, index) => (
                    <ListItem key={index}>
                      <ThumbUpOutlined color="success" sx={{ mr: "10px" }} />

                      <Typography variant="h6">{item}.</Typography>
                    </ListItem>
                  ))}
                </List>
              </Grid2>
            )}
            {IPOData?.company_weaknesses && IPOData?.company_weaknesses.length > 0 && (
              <Grid2 size={{ xs: 12, md: 6 }}>
                <Typography variant="h5">Weakness</Typography>
                <List>
                  {IPOData?.company_weaknesses?.map((item, index) => (
                    <ListItem key={index}>
                      <ThumbDownAltOutlined color="error" sx={{ mr: "10px" }} />
                      <Typography variant="h6">{item}.</Typography>
                    </ListItem>
                  ))}
                </List>
              </Grid2>
            )}
          </Grid2>
        </Box>
      </>
    );
  };

  const renderCompanyAndRegistrarAddress = () => {
    return (
      <>
        <Box component={"div"} className={classes.container} sx={{ flexDirection: "column", alignItems: "flex-start" }}>
          <Typography variant="h3">Other Details</Typography>

          <Grid2 container spacing={2} sx={{ width: "100%" }}>
            <Grid2 size={{ xs: 12, md: 6 }}>
              <Typography variant="h5" sx={{ color: AppColors.textSecondary, mb: "10px" }}>
                Company Contact Details
              </Typography>
              <Typography variant="h5">{IPOData?.company_name}</Typography>
              <Typography variant="h6">
                <span style={{ color: AppColors.textSecondary }}>Address :</span>
                {IPOData?.company_contact_info?.address}
              </Typography>
              <Typography variant="h6">
                <span style={{ color: AppColors.textSecondary }}>Phone : </span>
                {IPOData?.company_contact_info?.phone}
              </Typography>
              <Typography variant="h6">
                <span style={{ color: AppColors.textSecondary }}>Email : </span>
                {IPOData?.company_contact_info?.email}
              </Typography>
              <Typography variant="h6">
                <span style={{ color: AppColors.textSecondary }}>WebSite :</span>
                <a href={IPOData?.company_contact_info?.website} target="_blank">
                  {IPOData?.company_contact_info?.website}
                </a>
              </Typography>
            </Grid2>
            <Grid2 size={{ xs: 12, md: 6 }}>
              <Typography variant="h5" sx={{ color: AppColors.textSecondary, mb: "10px" }}>
                Registrar Contact Details
              </Typography>
              <Typography variant="h5">{IPOData?.registrar?.name}</Typography>
              <Typography variant="h6">
                <span style={{ color: AppColors.textSecondary }}>Phone :</span> {IPOData?.registrar?.phone}
              </Typography>
              <Typography variant="h6">
                <span style={{ color: AppColors.textSecondary }}>Email :</span> {IPOData?.registrar?.email}
              </Typography>
              <Typography variant="h6">
                <span style={{ color: AppColors.textSecondary }}>WebSite :</span>{" "}
                <a href={IPOData?.registrar?.website} target="_blank">
                  {IPOData?.registrar?.website}
                </a>
              </Typography>
            </Grid2>
          </Grid2>
        </Box>
      </>
    );
  };

  const renderCompanyIssueObjectives = () => {
    if (!IPOData?.issue_objectives || IPOData?.issue_objectives.length === 0) return;
    return (
      <>
        <Box component={"div"} className={classes.container} sx={{ flexDirection: "column", alignItems: "flex-start" }}>
          <Typography variant="h3">{IPOData?.company_name} - Issue Objectives</Typography>
          <List>
            {IPOData?.issue_objectives?.map((item, index) => (
              <ListItem key={index}>
                <CircleRounded sx={{ fontSize: "10px", mr: "10px" }} />
                <Typography variant="h6">{`${item}`}.</Typography>
              </ListItem>
            ))}
          </List>
        </Box>
      </>
    );
  };

  const renderCompanyDisclaimer = () => {
    if (!IPOData?.disclaimer || IPOData.disclaimer == "") return;
    return (
      <>
        <Box component={"div"} className={classes.container} sx={{ flexDirection: "column", alignItems: "flex-start" }}>
          <Typography variant="h3">Disclaimer</Typography>
          <Typography
            component={"pre"}
            variant="h6"
            sx={{
              color: AppColors.textSecondary,
              overflowWrap: "break-word",
              whiteSpace: "pre-wrap",
              wordBreak: "break-word",
            }}
          >
            {IPOData?.disclaimer}
          </Typography>
        </Box>
      </>
    );
  };
  const renderAboutTheCompany = () => {
    if (!IPOData?.company_about || IPOData?.company_about == "") return;
    return (
      <>
        <Box component={"div"} className={classes.container} sx={{ flexDirection: "column", alignItems: "flex-start" }}>
          <Typography variant="h3"> About the Company </Typography>
          <Typography
            component={"pre"}
            variant="h6"
            sx={{
              width: "100%",
              color: AppColors.textSecondary,
              overflowWrap: "break-word", // Adds support for breaking long words
              whiteSpace: "pre-wrap", // Ensures white spaces are respected and words can break
              wordBreak: "break-word",
            }}
          >
            {IPOData?.company_about}
          </Typography>
        </Box>
      </>
    );
  };

  const renderCompanyPromoters = () => {
    if (!IPOData?.company_promoters || IPOData?.company_promoters.length === 0) return;
    return (
      <>
        <Box component={"div"} className={classes.container} sx={{ flexDirection: "column", alignItems: "flex-start" }}>
          <Typography variant="h3">{IPOData?.company_name} Promoter(s)</Typography>
          <List>
            {IPOData?.company_promoters?.map((item, index) => (
              <ListItem key={index}>
                <CircleRounded sx={{ fontSize: "10px", mr: "10px" }} />
                <Typography variant="h6">{`${item}`}.</Typography>
              </ListItem>
            ))}
          </List>
        </Box>
      </>
    );
  };
  return (
    <RootContainer style={{ alignItems: "center", gap: "30px" }}>
      {/* <DialogUpdateCompanyData ipoData={IPOData} /> */}
      {renderCompanyData()}
    </RootContainer>
  );
};

export default CompanyDetails;

const useStyles = makeStyles({
  container: {
    backgroundColor: AppColors.white,
    display: "flex",
    // justifyContent: "center",
    alignItems: "center",
    gap: "20px",
    padding: "20px",
    // width: "500px",
    // height: "300px",
    maxWidth: "1200px",
    width: "100%",
    // height: "fit-content",
    borderRadius: "10px",
    // overflow: "hidden",
    // boxShadow: "0px 10px 10px 2px rgba(0,0,0,0.2)",
  },
});
