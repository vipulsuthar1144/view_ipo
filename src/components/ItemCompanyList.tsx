import AppColors from "@/theme/utils/AppColors";
import { imgDefaultCompany } from "@assets/images";
import { ImageCompWithLoader } from "@components/design/Image";
import { TwoLineTypo } from "@components/design/styledComponents";
import { Card, CardActionArea, CardContent } from "@mui/material";

interface IItemCompanyProps {
  name?: string;
  logo?: string;
  description?: string;
}

const ItemCompanyList = ({ name, logo, description }: IItemCompanyProps) => {
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
          img={logo}
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
          <TwoLineTypo
            variant="h4"
            sx={{ textTransform: "capitalize", mb: "2px" }}
          >
            {name}
          </TwoLineTypo>
          <TwoLineTypo
            variant="subtitle1"
            color={AppColors.textSecondary}
            sx={{ textTransform: "capitalize" }}
          >
            {description}
          </TwoLineTypo>
        </CardContent>
      </CardActionArea>
    </Card>
  );
};

export default ItemCompanyList;
