import AppColors from "@/theme/utils/AppColors";
import { Check } from "@mui/icons-material";
import {
  StepConnector,
  stepConnectorClasses,
  StepIconProps,
  styled,
} from "@mui/material";

export const QontoConnector = styled(StepConnector)(({ theme }) => ({
  [`&.${stepConnectorClasses.alternativeLabel}`]: {
    top: 10,
    left: "calc(-50% + 16px)",
    right: "calc(50% + 16px)",
  },
  [`&.${stepConnectorClasses.active}`]: {
    [`& .${stepConnectorClasses.line}`]: {
      borderColor: AppColors.textSecondary,
    },
  },
  [`&.${stepConnectorClasses.completed}`]: {
    [`& .${stepConnectorClasses.line}`]: {
      borderColor: AppColors.greenColor,
    },
  },
  [`& .${stepConnectorClasses.line}`]: {
    borderColor: AppColors.greenColor,
    borderTopWidth: 3,
    borderRadius: 1,
  },
}));

export const QontoStepIconRoot = styled("div")<{
  ownerState: { active?: boolean };
}>(({ theme }) => ({
  color: AppColors.textSecondary,
  display: "flex",
  height: 22,
  alignItems: "center",
  "& .QontoStepIcon-completedIcon": {
    color: AppColors.greenColor,
    zIndex: 1,
    fontSize: 30,
  },
  "& .QontoStepIcon-circle": {
    width: 12,
    height: 12,
    borderRadius: "50%",
    backgroundColor: "currentColor",
  },
  // ...theme.applyStyles("dark", {
  //   color: AppCol,
  // }),
  variants: [
    {
      props: ({ ownerState }) => ownerState.active,
      style: {
        color: AppColors.textSecondary,
      },
    },
  ],
}));

export function QontoStepIcon(props: StepIconProps) {
  const { active, completed, className } = props;

  return (
    <QontoStepIconRoot ownerState={{ active }} className={className}>
      {completed ? (
        <Check className="QontoStepIcon-completedIcon" />
      ) : (
        <div className="QontoStepIcon-circle" />
      )}
    </QontoStepIconRoot>
  );
}
