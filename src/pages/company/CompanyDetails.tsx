import { ILotSize, ITimeline } from "@/schema/ipo.schema";
import AppColors from "@/theme/utils/AppColors";
import { imgDefaultCompany } from "@assets/images";
import FallbackError from "@components/FallbackError";
import { QontoConnector, QontoStepIcon } from "@components/Stepper";
import { ImageCompWithLoader } from "@components/design/Image";
import { RootContainer } from "@components/design/styledComponents";
import {
  CircleRounded,
  ThumbDownAltOutlined,
  ThumbUpOutlined,
} from "@mui/icons-material";
import {
  Box,
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
  formatDate,
  formatNumber,
  formatPrice,
  isPastDate,
} from "@utils/genaralFunctions";
import useCompanyDetailsController from "./CompanyDetails.controller";
const CompanyDetails = () => {
  const classes = useStyles();
  const {
    isIPODataError,
    isIPODataLoading,
    IPOData,
    isCompanyDataError,
    isCompanyDataLoading,
    CompanyData,
  } = useCompanyDetailsController();

  const renderRetailMinSharesAndAmount = (lots: ILotSize[]) => {
    let retailMinAmount = 0;
    let retailMinShares = 0;

    lots.forEach((lot) => {
      if (lot.application == "retail_min") {
        retailMinAmount = lot.amount;
        retailMinShares = lot.shares;
      }
    });
    if (retailMinShares == 0 || retailMinAmount == 0) {
      return "";
    }
    return (
      <Typography variant="h6" color={AppColors.textSecondary}>
        <span style={{ color: AppColors.greenColor, fontSize: "25px" }}>
          ₹ {retailMinAmount}
        </span>
        / {retailMinShares} Shares
      </Typography>
    );
  };

  const renderOfferDateOrListedOnDate = (timeLine?: ITimeline) => {
    if (!timeLine) return;
    if (isPastDate(timeLine.listing_date)) {
      return (
        <Typography variant="h6" color={AppColors.textSecondary}>
          Listed On : {formatDate(timeLine.listing_date)} at{" "}
          {formatPrice(IPOData?.listing_price)}
        </Typography>
      );
    }
    return (
      <Typography variant="h6" color={AppColors.textSecondary}>
        Offer Date : {formatDate(timeLine.open_date)} -{" "}
        {formatDate(timeLine.end_date)}
      </Typography>
    );
  };

  const renderIPOStatus = () => {
    if (isPastDate(IPOData?.timeline.listing_date ?? "")) {
      return (
        <span
          style={{
            padding: "0px 10px",
            borderRadius: "5px",
            margin: "0 20px",
            backgroundColor: "green",
            textTransform: "capitalize",
            color: "white",
            fontSize: "18px",
          }}
        >
          Listed
        </span>
      );
    }
    if (isPastDate(IPOData?.timeline.allotment_date ?? "")) {
      return (
        <span
          style={{
            padding: "0px 10px",
            borderRadius: "5px",
            margin: "0 20px",
            backgroundColor: "orange",
            textTransform: "capitalize",
            color: "white",
            fontSize: "18px",
          }}
        >
          {`•`}
          Allotment Out
        </span>
      );
    }
    if (isPastDate(IPOData?.timeline.end_date ?? "")) {
      return (
        <span
          style={{
            padding: "0px 10px",
            borderRadius: "5px",
            margin: "0 20px",
            backgroundColor: "red",
            textTransform: "capitalize",
            color: "white",
            fontSize: "18px",
          }}
        >
          {`•`}
          Closed
        </span>
      );
    }
    if (isPastDate(IPOData?.timeline.open_date ?? "")) {
      return (
        <span
          style={{
            padding: "0px 10px",
            borderRadius: "5px",
            margin: "0 20px",
            backgroundColor: "green",
            textTransform: "capitalize",
            color: "white",
            fontSize: "18px",
          }}
        >
          {`•`}
          Live
        </span>
      );
    }
    if (!isPastDate(IPOData?.timeline.open_date ?? "")) {
      return (
        <span
          style={{
            padding: "0px 10px",
            borderRadius: "5px",
            margin: "0 20px",
            backgroundColor: "purple",
            textTransform: "capitalize",
            color: "white",
            fontSize: "18px",
          }}
        >
          {`•`}
          Pre Apply
        </span>
      );
    }
    return (
      <span
        style={{
          padding: "0px 10px",
          borderRadius: "5px",
          margin: "0 20px",
          backgroundColor: "green",
          textTransform: "capitalize",
          color: "white",
          fontSize: "18px",
        }}
      >
        {`•`}
        {`${IPOData?.status}`}
      </span>
    );
  };

  const renderCompanyData = () => {
    if (isCompanyDataLoading)
      return (
        <CircularProgress
          size={40}
          thickness={5}
          sx={{ color: "loader.main", alignSelf: "center", margin: "auto" }}
        />
      );

    if (isCompanyDataError)
      return <FallbackError type="something_went_wrong" />;
    if (!CompanyData)
      return (
        <FallbackError type="data_not_found" message="No Company IPO Found" />
      );

    return (
      <>
        <Box
          component={"div"}
          className={classes.container}
          sx={{ padding: "20px 20px" }}
        >
          <ImageCompWithLoader
            img={CompanyData.logo}
            alt={"Company logo"}
            errorImage={imgDefaultCompany}
            style={{
              width: "100px",
              alignSelf: "center",
              objectFit: "contain",
              aspectRatio: 1,
              borderRadius: "10px",
            }}
          />
          <Box sx={{ flex: 1 }}>
            <Typography variant="h3" mb={"5px"}>
              {CompanyData.name}
              {renderIPOStatus()}
            </Typography>
            {renderOfferDateOrListedOnDate(IPOData?.timeline)}
          </Box>
          <Box>{renderRetailMinSharesAndAmount(IPOData?.lot_sizes ?? [])}</Box>
        </Box>
        {renderIPODetails()}
        {renderSubscriptionsDetails()}
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
      if (isPastDate(item.date ?? "")) {
        activeStep = index + 1;
      }
    });

    return (
      <Stepper
        activeStep={activeStep}
        alternativeLabel
        connector={<QontoConnector />}
        sx={{ width: "100%" }}
      >
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
        <Box
          component={"div"}
          className={classes.container}
          sx={{ flexDirection: "column", alignItems: "flex-start" }}
        >
          <Typography variant="h3" mb={"30px"}>
            {CompanyData?.name} IPO Details
          </Typography>
          {renderStepper()}
          <Grid2 container p={"10px"} spacing={2} sx={{ width: "100%" }}>
            <Grid2 size={{ xs: 12, md: 6 }}>
              <Typography
                variant="subtitle1"
                sx={{ color: AppColors.textSecondary }}
              >
                IssuePrice
              </Typography>
              <Typography variant="h6">
                {`₹${IPOData?.issue_price.min}-${IPOData?.issue_price.max}`} per
                Equity Share
              </Typography>
            </Grid2>

            <Grid2 size={{ xs: 12, md: 6 }}>
              <Typography
                variant="subtitle1"
                sx={{ color: AppColors.textSecondary }}
              >
                Face Value
              </Typography>
              <Typography variant="h6">
                {`₹${IPOData?.face_value} `}Per Equity Share
              </Typography>
            </Grid2>
            <Grid2 size={{ xs: 12, md: 6 }}>
              <Typography
                variant="subtitle1"
                sx={{ color: AppColors.textSecondary }}
              >
                Listing Of Group
              </Typography>
              <Typography variant="h6">
                {IPOData?.listing_at?.map((item, index) => (
                  <span key={index}> {item} </span>
                ))}
              </Typography>
            </Grid2>
            <Grid2 size={{ xs: 12, md: 6 }}>
              <Typography
                variant="subtitle1"
                sx={{ color: AppColors.textSecondary }}
              >
                Registrar
              </Typography>
              <Typography variant="h6">{IPOData?.registrar.name}</Typography>
            </Grid2>
            <Grid2 size={{ xs: 12, md: 6 }}>
              <Typography
                variant="subtitle1"
                sx={{ color: AppColors.textSecondary }}
              >
                Market Lot
              </Typography>

              {IPOData?.lot_sizes.map((item, index) => (
                <Box key={index}>
                  {item.application === "retail_min" && (
                    <Typography variant="h6">
                      Retail:{" "}
                      {`${item.shares} Shares (${formatPrice(item.amount)})`}
                    </Typography>
                  )}
                  {item.application === "s_nii_min" && (
                    <Typography variant="h6">
                      S-HNI:{" "}
                      {`${item.shares} Shares (${formatPrice(item.amount)})`}
                    </Typography>
                  )}
                  {item.application === "b_nii_min" && (
                    <Typography variant="h6">
                      B-HNI:{" "}
                      {`${item.shares} Shares (${formatPrice(item.amount)})`}
                    </Typography>
                  )}
                </Box>
              ))}
            </Grid2>
            <Grid2 size={{ xs: 12, md: 6 }}>
              <Typography
                variant="subtitle1"
                sx={{ color: AppColors.textSecondary }}
              >
                Lead Manager
              </Typography>
              {IPOData?.lead_managers.map((item, index) => (
                <Typography key={index} variant="h6">
                  {item}
                </Typography>
              ))}
            </Grid2>
            <Grid2 size={{ xs: 12, md: 6 }}>
              <Typography
                variant="subtitle1"
                sx={{ color: AppColors.textSecondary }}
              >
                Issue Size
              </Typography>
              <Typography variant="h6">{`Total : ${formatPrice(IPOData?.issue_size.total)} Cr.`}</Typography>
              <Typography variant="h6">{`#Fresh : ${formatPrice(IPOData?.issue_size.fresh)} Cr.`}</Typography>
              <Typography variant="h6">{`#OFS : ${formatPrice(IPOData?.issue_size.offer_for_sale)} Cr.`}</Typography>
            </Grid2>
            <Grid2 size={{ xs: 12, md: 6 }}>
              <Typography
                variant="subtitle1"
                sx={{ color: AppColors.textSecondary }}
              >
                Retail Portion
              </Typography>
              <Typography variant="h6">IssuePrice</Typography>
            </Grid2>
            <Grid2 size={{ xs: 12, md: 6 }}>
              <Typography
                variant="subtitle1"
                sx={{ color: AppColors.textSecondary }}
              >
                Subscription
              </Typography>
              <Typography variant="h6">{`${IPOData?.subscription_rate} times`}</Typography>
            </Grid2>
            <Grid2 size={{ xs: 12, md: 6 }}>
              <Typography
                variant="subtitle1"
                sx={{ color: AppColors.textSecondary }}
              >
                IPO Docs
              </Typography>

              <Typography variant="h6">
                <a href={IPOData?.docs.anchor ?? ""} target="_blank">
                  Anchor
                </a>
                {" , "}
                <a href={IPOData?.docs.drph ?? ""} target="_blank">
                  DRPH
                </a>
                {" , "}
                <a href={IPOData?.docs.rph ?? ""} target="_blank">
                  RPH
                </a>
              </Typography>
            </Grid2>
          </Grid2>
        </Box>
      </>
    );
  };

  const renderSubscriptionsDetails = () => {
    return (
      <>
        <Box
          component={"div"}
          className={classes.container}
          sx={{ flexDirection: "column", alignItems: "flex-start" }}
        >
          <Typography variant="h3">
            {CompanyData?.name} IPO Subscription Details
          </Typography>
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
                <TableRow
                  sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                >
                  <TableCell component="th" scope="row">
                    <Typography
                      variant="h6"
                      sx={{ color: AppColors.textSecondary }}
                    >
                      Shares Offered / Reserved
                    </Typography>
                  </TableCell>
                  <TableCell>
                    <Typography
                      variant="h6"
                      sx={{ color: AppColors.textSecondary }}
                    >
                      {formatNumber(IPOData?.applications.qib)}
                    </Typography>
                  </TableCell>
                  <TableCell>
                    <Typography
                      variant="h6"
                      sx={{ color: AppColors.textSecondary }}
                    >
                      {formatNumber(IPOData?.applications.nii.total)}
                    </Typography>
                    <Typography
                      variant="subtitle1"
                      sx={{ color: AppColors.textSecondary }}
                    >
                      {`${formatNumber(IPOData?.applications.nii.b_nii)} / ${formatNumber(IPOData?.applications.nii.s_nii)}`}
                    </Typography>
                  </TableCell>
                  <TableCell>
                    <Typography
                      variant="h6"
                      sx={{ color: AppColors.textSecondary }}
                    >
                      {formatNumber(IPOData?.applications.retail)}
                    </Typography>
                  </TableCell>
                  <TableCell>
                    <Typography
                      variant="h6"
                      sx={{ color: AppColors.textSecondary }}
                    >
                      {formatNumber(IPOData?.applications.total)}
                    </Typography>
                  </TableCell>
                </TableRow>

                {IPOData?.subscriptions.map((item, index) => (
                  <TableRow
                    key={index}
                    sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                  >
                    <TableCell component="th" scope="row">
                      <Typography
                        variant="h6"
                        sx={{ color: AppColors.textSecondary }}
                      >
                        {formatDate(item.date)}
                      </Typography>
                    </TableCell>
                    <TableCell>
                      <Typography
                        variant="h6"
                        sx={{ color: AppColors.textSecondary }}
                      >
                        {item.qib} x
                      </Typography>
                    </TableCell>
                    <TableCell>
                      <Typography
                        variant="h6"
                        sx={{ color: AppColors.textSecondary }}
                      >
                        {item.nii.total} x
                      </Typography>
                      <Typography
                        variant="subtitle1"
                        sx={{ color: AppColors.textSecondary }}
                      >
                        {`${item.nii.b_nii} x  / ${item.nii.s_nii} x`}
                      </Typography>
                    </TableCell>
                    <TableCell>
                      <Typography
                        variant="h6"
                        sx={{ color: AppColors.textSecondary }}
                      >
                        {item.retail} x
                      </Typography>
                    </TableCell>
                    <TableCell>
                      <Typography
                        variant="h6"
                        sx={{ color: AppColors.textSecondary }}
                      >
                        {item.total} x
                      </Typography>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
          <Typography variant="h5">
            Total No. of Applications:{" "}
            {formatNumber(IPOData?.applications.total)}
          </Typography>
        </Box>
      </>
    );
  };

  const renderCompanyFinancials = () => {
    return (
      <>
        <Box
          component={"div"}
          className={classes.container}
          sx={{ flexDirection: "column", alignItems: "flex-start" }}
        >
          <Typography variant="h3">
            {CompanyData?.name} Company Financials{" "}
            <span style={{ color: AppColors.textSecondary, fontSize: "18px" }}>
              All values are in ₹ Cr.
            </span>
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
                {CompanyData?.financials?.map((item, index) => (
                  <TableRow
                    key={index}
                    sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                  >
                    <TableCell component="th" scope="row">
                      <Typography
                        variant="h6"
                        sx={{ color: AppColors.textSecondary }}
                      >
                        {formatDate(item.period)}
                      </Typography>
                    </TableCell>
                    <TableCell>
                      <Typography
                        variant="h6"
                        sx={{ color: AppColors.textSecondary }}
                      >
                        {item.assets}
                      </Typography>
                    </TableCell>

                    <TableCell>
                      <Typography
                        variant="h6"
                        sx={{ color: AppColors.textSecondary }}
                      >
                        {item.revenue}
                      </Typography>
                    </TableCell>
                    <TableCell>
                      <Typography
                        variant="h6"
                        sx={{ color: AppColors.textSecondary }}
                      >
                        {item.profit}
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
    return (
      <>
        <Box
          component={"div"}
          className={classes.container}
          sx={{ flexDirection: "column", alignItems: "flex-start" }}
        >
          <Typography variant="h3">{CompanyData?.name} Valuations</Typography>
          <Grid2 container p={"10px"} spacing={2} sx={{ width: "100%" }}>
            <Grid2 size={{ xs: 12, md: 6 }}>
              <Typography
                variant="subtitle1"
                sx={{ color: AppColors.textSecondary }}
              >
                EPS Pre IPO
              </Typography>
              <Typography variant="h6">
                {IPOData?.valuations.earning_per_share.pre_ipo}
              </Typography>
            </Grid2>

            <Grid2 size={{ xs: 12, md: 6 }}>
              <Typography
                variant="subtitle1"
                sx={{ color: AppColors.textSecondary }}
              >
                EPS Post IPO
              </Typography>
              <Typography variant="h6">
                {IPOData?.valuations.earning_per_share.post_ipo}
              </Typography>
            </Grid2>
            <Grid2 size={{ xs: 12, md: 6 }}>
              <Typography
                variant="subtitle1"
                sx={{ color: AppColors.textSecondary }}
              >
                P/E Pre IPO
              </Typography>
              <Typography variant="h6">
                {IPOData?.valuations.price_earning_ratio.pre_ipo}
              </Typography>
            </Grid2>
            <Grid2 size={{ xs: 12, md: 6 }}>
              <Typography
                variant="subtitle1"
                sx={{ color: AppColors.textSecondary }}
              >
                P/E Post IPO
              </Typography>
              <Typography variant="h6">
                {IPOData?.valuations.price_earning_ratio.post_ipo}
              </Typography>
            </Grid2>
            <Grid2 size={{ xs: 12, md: 6 }}>
              <Typography
                variant="subtitle1"
                sx={{ color: AppColors.textSecondary }}
              >
                RoNW
              </Typography>
              <Typography variant="h6">
                {IPOData?.valuations.return_on_net_worth} %
              </Typography>
            </Grid2>
          </Grid2>
        </Box>
      </>
    );
  };

  const renderCompanyDisclaimer = () => {
    return (
      <>
        <Box
          component={"div"}
          className={classes.container}
          sx={{ flexDirection: "column", alignItems: "flex-start" }}
        >
          <Typography variant="h3">Disclaimer</Typography>
          <Typography variant="h6" sx={{ color: AppColors.textSecondary }}>
            {IPOData?.disclaimer}
          </Typography>
        </Box>
      </>
    );
  };
  const renderAboutTheCompany = () => {
    return (
      <>
        <Box
          component={"div"}
          className={classes.container}
          sx={{ flexDirection: "column", alignItems: "flex-start" }}
        >
          <Typography variant="h3"> About the Company </Typography>
          <Typography variant="h6" sx={{ color: AppColors.textSecondary }}>
            {CompanyData?.about}
          </Typography>
        </Box>
      </>
    );
  };

  const renderCompanyStrength = () => {
    if (
      (!CompanyData?.strengths && !CompanyData?.weaknesses) ||
      (CompanyData?.strengths?.length == 0 &&
        CompanyData?.weaknesses?.length == 0)
    )
      return;
    return (
      <>
        <Box
          component={"div"}
          className={classes.container}
          sx={{ flexDirection: "column", alignItems: "flex-start" }}
        >
          <Typography variant="h3">
            {" "}
            {CompanyData?.name} - Strength and Weakness
          </Typography>

          <Grid2 container spacing={2}>
            {CompanyData?.strengths && CompanyData?.strengths.length > 0 && (
              <Grid2 size={{ xs: 12, md: 6 }}>
                <Typography variant="h5">Strength</Typography>
                <List>
                  {CompanyData?.strengths?.map((item, index) => (
                    <ListItem key={index}>
                      <ThumbUpOutlined color="success" sx={{ mr: "10px" }} />

                      <Typography variant="h6">{item}.</Typography>
                    </ListItem>
                  ))}
                </List>
              </Grid2>
            )}
            {CompanyData?.weaknesses && CompanyData?.weaknesses.length > 0 && (
              <Grid2 size={{ xs: 12, md: 6 }}>
                <Typography variant="h5">Weakness</Typography>
                <List>
                  {CompanyData?.weaknesses?.map((item, index) => (
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
        <Box
          component={"div"}
          className={classes.container}
          sx={{ flexDirection: "column", alignItems: "flex-start" }}
        >
          <Typography variant="h3">Other Details</Typography>

          <Grid2 container spacing={2} sx={{ width: "100%" }}>
            <Grid2 size={{ xs: 12, md: 6 }}>
              <Typography
                variant="h5"
                sx={{ color: AppColors.textSecondary, mb: "10px" }}
              >
                Company Contact Details
              </Typography>
              <Typography variant="h5">{CompanyData?.name}</Typography>
              <Typography variant="h6">
                <span style={{ color: AppColors.textSecondary }}>
                  Address :
                </span>
                {CompanyData?.contact_info?.address}
              </Typography>
              <Typography variant="h6">
                <span style={{ color: AppColors.textSecondary }}>Phone : </span>
                {CompanyData?.contact_info?.phone}
              </Typography>
              <Typography variant="h6">
                <span style={{ color: AppColors.textSecondary }}>Email : </span>
                {CompanyData?.contact_info?.email}
              </Typography>
              <Typography variant="h6">
                <span style={{ color: AppColors.textSecondary }}>
                  WebSite :
                </span>
                <a href={CompanyData?.contact_info?.website} target="_blank">
                  {CompanyData?.contact_info?.website}
                </a>
              </Typography>
            </Grid2>
            <Grid2 size={{ xs: 12, md: 6 }}>
              <Typography
                variant="h5"
                sx={{ color: AppColors.textSecondary, mb: "10px" }}
              >
                Registrar Contact Details
              </Typography>
              <Typography variant="h5">{IPOData?.registrar?.name}</Typography>
              <Typography variant="h6">
                <span style={{ color: AppColors.textSecondary }}>Phone :</span>{" "}
                {IPOData?.registrar?.phone}
              </Typography>
              <Typography variant="h6">
                <span style={{ color: AppColors.textSecondary }}>Email :</span>{" "}
                {IPOData?.registrar?.email}
              </Typography>
              <Typography variant="h6">
                <span style={{ color: AppColors.textSecondary }}>
                  WebSite :
                </span>{" "}
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
    if (!IPOData?.issue_objectives || IPOData?.issue_objectives.length === 0)
      return;
    return (
      <>
        <Box
          component={"div"}
          className={classes.container}
          sx={{ flexDirection: "column", alignItems: "flex-start" }}
        >
          <Typography variant="h3">
            {CompanyData?.name} IPO - Issue Objectives
          </Typography>
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
  const renderCompanyPromoters = () => {
    if (!CompanyData?.promoters || CompanyData?.promoters.length === 0) return;
    return (
      <>
        <Box
          component={"div"}
          className={classes.container}
          sx={{ flexDirection: "column", alignItems: "flex-start" }}
        >
          <Typography variant="h3">{CompanyData?.name} Promoter(s)</Typography>
          <List>
            {CompanyData?.promoters?.map((item, index) => (
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
    borderRadius: "10px",
    boxShadow: "0px 10px 10px 2px rgba(0,0,0,0.2)",
  },
});

// const ChipInput: React.FC = () => {
//   const [inputValue, setInputValue] = useState<string>("");
//   const [chips, setChips] = useState<string[]>([]);

//   const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
//     if (event.key === "Alt" && inputValue.trim()) {
//       setChips([...chips, inputValue.trim()]);
//       setInputValue(""); // Clear input after adding the chip
//     }
//   };

//   const handleDeleteChip = (chipToDelete: string) => {
//     setInputValue("");
//     setChips((preChips) => preChips.filter((chip) => chip !== chipToDelete));
//   };

//   return (
//     <Box>
//       <TextField
//         label="Enter something"
//         variant="outlined"
//         multiline
//         value={inputValue}
//         onChange={(e) => setInputValue(e.target.value)}
//         onKeyDown={handleKeyDown}
//         fullWidth
//       />
//       <Box sx={{ marginTop: 2 }}>
//         {chips.map((chip, index) => (
//           <Box
//             component={"div"}
//             key={index}
//             onClick={() => setInputValue(chip)}
//             sx={{
//               backgroundColor: "#e0e0e0",
//               borderRadius: "16px",
//               padding: "8px",
//               margin: "4px",
//               width: "fit-content",
//               cursor: "pointer",
//               // fontSize: "14px", // Font size for the chip
//               // minWidth: "100px", // Minimum width for the chip
//               // maxWidth: "calc(100% - 16px)", // Maximum width for the chip
//               wordWrap: "break-word", // Allow word breaking to create new lines
//               overflowWrap: "break-word", // Allow overflow breaking
//             }}
//           >
//             <span>{chip}</span>

//             <Button
//               onClick={(e) => {
//                 e.stopPropagation();
//                 handleDeleteChip(chip);
//               }}
//               sx={{ marginLeft: 1 }}
//             >
//               <Delete color="error" />
//             </Button>
//           </Box>
//         ))}
//       </Box>
//     </Box>
//   );
// };
