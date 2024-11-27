import { IIPOSchema, ITimeline } from "@/schema/ipo.schema";
import { imgDefaultCompany } from "@assets/images";
import { Business, CalendarToday, CurrencyRupee } from "@mui/icons-material";
import { Box, Card, CardContent, Chip, Typography } from "@mui/material";
import { computeIPOStatus, formatDate, formatPrice } from "@utils/genaralFunctions";
import { ImageCompWithLoader } from "./design/Image";
import { SingleLineTypo } from "./design/styledComponents";

interface IIPOCardProps {
  ipo: IIPOSchema;
  onClick?: () => void;
}
const IPOCard = ({ ipo, onClick }: IIPOCardProps) => {
  const ipoStatus = computeIPOStatus(ipo);

  const renderOfferDateOrListedOnDate = (timeLine?: ITimeline) => {
    if (!timeLine) return;
    if (ipoStatus.status === "LISTED") {
      return (
        <Box display="flex" alignItems="flex-start" sx={{ minHeight: "30px" }}>
          <Business fontSize="small" sx={{ mr: 1 }} />
          <Typography variant="subtitle1">
            Listed On : {formatDate(timeLine.listing_date)} at {formatPrice(ipo?.listing_price)}
          </Typography>
        </Box>
      );
    }
    return (
      <Box display="flex" alignItems="center">
        <CalendarToday fontSize="small" sx={{ mr: 1 }} />
        <Typography variant="subtitle1">
          Offer Date : {formatDate(timeLine.open_date)} - {formatDate(timeLine.end_date)}
        </Typography>
      </Box>
    );
  };

  return (
    <Card
      onClick={onClick}
      sx={{
        backgroundColor: "white",
        borderRadius: 2,
        boxShadow: 1,
        minHeight: "330px",
        maxHeight: "330px",
        // overflow: "hidden",
        position: "relative",
        cursor: "pointer",
        transition: "box-shadow 0.3s",
        "&:hover": {
          boxShadow: 9,
        },
      }}
    >
      <Chip
        label="Inactive"
        sx={{
          px: "2px",
          py: "3px",
          height: "fit-content",
          fontSize: "11px",
          color: "white",
          fontWeight: 500,
          borderRadius: "0px",
          borderBottomLeftRadius: "10px",
          backgroundColor: "grey",
          position: "absolute",
          top: "0px",
          right: "0px",
          display: ipo.is_active == true ? "none" : "flex",
        }}
      />
      <ImageCompWithLoader
        img={ipo?.company_logo}
        alt={ipo?.company_name ?? "Company Name"}
        errorImage={imgDefaultCompany}
        style={{
          // width: "10px",
          width: "100%",
          backgroundColor: "gray.100",
          alignSelf: "center",
          objectFit: "contain",
          aspectRatio: "16/9",
          padding: "10px",
          borderRadius: "10px",
          // boxShadow: "0px 10px 10px 2px rgba(0,0,0,0.2)",
        }}
      />
      <CardContent sx={{ padding: "0 10px", margin: 0 }}>
        <Box display="flex" justifyContent="flex-end" alignItems="center" mb={"5px"}>
          <Chip
            label={`• ${ipoStatus.status}`}
            sx={{
              px: "3px",
              py: "4px",
              height: "fit-content",
              fontSize: "11px",
              color: "white",
              fontWeight: 600,
              letterSpacing: "0.5px",
              borderRadius: "40px",
              backgroundColor: ipoStatus.bgColor,
            }}
          />
        </Box>
        <SingleLineTypo variant="h4" color="text.primary" textTransform={"capitalize"} width={"100%"}>
          {ipo.company_name}
        </SingleLineTypo>

        <Box mt={"10px"} sx={{ typography: "body2", color: "text.secondary", "& > *:not(:last-child)": { mb: 1 } }}>
          {ipo.issue_price && (
            <Box display="flex" alignItems="center">
              <CurrencyRupee fontSize="small" sx={{ mr: 1 }} />
              <Typography>{`Issue Price:  ₹${ipo?.issue_price?.min} - ₹${ipo?.issue_price?.max}`}</Typography>
            </Box>
          )}
          {renderOfferDateOrListedOnDate(ipo.timeline)}
        </Box>
      </CardContent>
    </Card>
  );
};

export default IPOCard;
