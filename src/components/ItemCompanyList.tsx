import { IIPOSchema, ITimeline } from "@/schema/ipo.schema";
import AppColors from "@/theme/utils/AppColors";
import { imgDefaultCompany } from "@assets/images";
import { ImageCompWithLoader } from "@components/design/Image";
import { TwoLineTypo } from "@components/design/styledComponents";
import { Box, Card, CardActionArea, CardContent, Typography } from "@mui/material";
import { computeIPOStatus, formatDate, formatPrice, isPastDate } from "@utils/genaralFunctions";

interface IItemCompanyProps {
  IPOData?: IIPOSchema;
  onClick?: () => void;
}

const ItemCompanyList = ({ onClick, IPOData }: IItemCompanyProps) => {
  const renderOfferDateOrListedOnDate = (timeLine?: ITimeline) => {
    if (!timeLine) return;
    if (isPastDate(timeLine?.listing_date)) {
      return (
        <TwoLineTypo variant="subtitle1" color={AppColors.textSecondary} sx={{ textTransform: "capitalize" }}>
          Listed On : {formatDate(timeLine.listing_date)} at {formatPrice(IPOData?.listing_price)}
        </TwoLineTypo>
      );
    }
    return (
      <TwoLineTypo variant="subtitle1" color={AppColors.textSecondary} sx={{ textTransform: "capitalize" }}>
        Offer Date : {formatDate(timeLine.open_date)} - {formatDate(timeLine.end_date)}
      </TwoLineTypo>
    );
  };

  const renderIPOStatus = () => {
    const ipoStatus = computeIPOStatus(IPOData ?? {});
    return (
      <Box
        component={"span"}
        sx={{
          padding: "0px 10px",
          borderRadius: "5px",
          backgroundColor: ipoStatus.bgColor,
          textTransform: "capitalize",
          color: "white",
        }}
      >
        {`•`}
        {`${ipoStatus?.status}`}
      </Box>
    );
  };

  return (
    <Card
      sx={{
        backgroundColor: "#ffffff",
        backgroundImage: "none",
        borderRadius: "10px",
        boxShadow: "0px 10px 10px 2px rgba(0,0,0,0.2)",
        flexShrink: 0,
        // flexBasis: "180px",
        width: "100%",
        height: "auto",
        overflow: "hidden",
        boxSizing: "border-box",
        transition: "all ease-out 0.2s",
        "&:hover": {
          transform: "scale(1.05)",
        },
      }}
    >
      <CardActionArea
        onClick={onClick}
        sx={{
          height: "100%",
          display: "flex",
          flexDirection: "row",
          justifyContent: "flex-start",
          alignItems: "center",
          gap: "10px",
          padding: "10px",
        }}
      >
        <ImageCompWithLoader
          img={IPOData?.company_logo}
          alt={"Company logo"}
          errorImage={imgDefaultCompany}
          style={{
            // width: "10px",
            alignSelf: "center",
            objectFit: "contain",
            aspectRatio: 1,
            flex: 1,
            borderRadius: "10px",
            // boxShadow: "0px 10px 10px 2px rgba(0,0,0,0.2)",
          }}
        />
        <CardContent
          sx={{
            padding: 0,
            m: 0,
            flex: 2,
          }}
        >
          <Typography variant="h6" sx={{ textTransform: "capitalize", mb: "2px" }}>
            {renderIPOStatus()}
          </Typography>
          <TwoLineTypo variant="h4" sx={{ textTransform: "capitalize", mb: "2px" }}>
            {IPOData?.company_name}
          </TwoLineTypo>
          {renderOfferDateOrListedOnDate(IPOData?.timeline)}
        </CardContent>
      </CardActionArea>
    </Card>
  );
};

export default ItemCompanyList;
