import { IIPOSchema } from "@/schema/ipo.schema";
import { useAppDispatch, useAppSelector } from "@/store/store";
import { addIPO, fetchCompanyIPObyId, updateIPO } from "@/store/thunkService/ipo.thunkService";
import AppColors from "@/theme/utils/AppColors";
import { imgDefaultCompany } from "@assets/images";
import { ImageCompWithLoader } from "@components/design/Image";
import { RootContainer } from "@components/design/styledComponents";
import FallbackError from "@components/FallbackError";
import IsActiveSwitch from "@components/IsActiveSwitch";
import { AddCircleOutline, Delete, Save } from "@mui/icons-material";
import {
  Backdrop,
  Box,
  CircularProgress,
  Grid2,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
} from "@mui/material";
import AppBar from "@mui/material/AppBar";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import { makeStyles } from "@mui/styles";
import { DatePicker } from "@mui/x-date-pickers";
import moment from "moment";
import * as React from "react";
import { Controller, SubmitHandler, useFieldArray, useForm } from "react-hook-form";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import EditableChips from "./EditableChips";
import { showCustomToast } from "@utils/customToast";

type FormValues = IIPOSchema;

interface IDialogUpdateCompanyDataProps {
  // IPOData?: IIPOSchema | null;
  isNew?: boolean;
}

export default function DialogUpdateCompanyData({ isNew = true }: IDialogUpdateCompanyDataProps) {
  const classes = useStyles();
  const dispatch = useAppDispatch();
  const { companyId } = useParams();
  const navigate = useNavigate();
  const location = useLocation();

  React.useEffect(() => {
    if (companyId) {
      dispatch(fetchCompanyIPObyId(companyId));
    }
    return () => {
      IPOData && reset(IPOData);
    };
  }, [dispatch, companyId, location.pathname]);

  const {
    leadManagers,
    companyIssueObjectiveList,
    companyListOfGroupsList,
    companyPromotersList,
    companyStrenghtList,
    companyWeaknessList,
    isIPODataError,
    isIPODataLoading,
    IPOData,
    isCRUDIPOLoading,
    isCRUDIPOError,
    isIPOActive,
  } = useAppSelector((state) => state.IPO);

  // const [companyLogo, setCompanyLogo] = React.useState(IPOData?.company_logo ?? imgDefaultCompany);

  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
    reset,
  } = useForm<FormValues>({
    defaultValues: !isNew
      ? IPOData?.lot_sizes
        ? (IPOData ?? {})
        : {
            ...IPOData,
            lot_sizes: [
              { application: "retail_min" },
              { application: "retail_max" },
              { application: "s_nii_min" },
              { application: "s_nii_max" },
              { application: "b_nii_min" },
            ],
          }
      : {
          lot_sizes: [
            { application: "retail_min" },
            { application: "retail_max" },
            { application: "s_nii_min" },
            { application: "s_nii_max" },
            { application: "b_nii_min" },
          ],
        },
  });

  const {
    fields: companyFinancialsFields,
    append: companyFinancialsAppend,
    remove: companyFinancialsRemove,
  } = useFieldArray({
    control,
    name: "company_financials",
  });
  const {
    fields: subscriptionsFields,
    append: subscriptionsAppend,
    remove: subscriptionsRemove,
  } = useFieldArray({
    control,
    name: "subscriptions",
  });
  const { fields: lotSizesFields } = useFieldArray({
    control,
    name: "lot_sizes",
  });

  const onSubmit: SubmitHandler<FormValues> = (data) => {
    data.lead_managers = leadManagers;
    data.issue_objectives = companyIssueObjectiveList;
    data.company_promoters = companyPromotersList;
    data.company_strengths = companyStrenghtList;
    data.company_weaknesses = companyWeaknessList;
    data.listing_at = companyListOfGroupsList;
    data.is_active = isIPOActive;
    if (isNew) {
      dispatch(addIPO(data))
        .unwrap()
        .then(() => {
          if (!isCRUDIPOLoading && !isCRUDIPOError) {
            // navigate(`/`, { replace: true });
            navigate(-1);
          }
        });
    } else {
      // handleUpdate(data);
      dispatch(updateIPO({ companyId: companyId ?? "", ipoData: data }))
        .unwrap()
        .then(() => {
          if (!isCRUDIPOLoading && !isCRUDIPOError) {
            // companyId && navigate(`/ipo/${companyId}`, { replace: true });
            navigate(-1);
          }
        });
    }
  };

  const validateDates = (ipo: FormValues) => {
    const today = new Date();
    const openDate = new Date(ipo?.timeline?.open_date ?? "");
    const closeDate = new Date(ipo?.timeline?.end_date ?? "");
    const allotmentDate = new Date(ipo?.timeline?.allotment_date ?? "");
    const listedDate = new Date(ipo?.timeline?.listing_date ?? "");

    if (openDate < today && isNew) return "Open date must be in the future.";
    if (closeDate <= openDate) return "Close date must be after open date.";
    if (allotmentDate <= closeDate) return "Allotment date must be after close date.";
    if (listedDate <= allotmentDate) return "Listed date must be after allotment date.";
    return true;
  };

  const editCompanyData = () => {
    return (
      <>
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
          }}
        >
          <Box>
            <ImageCompWithLoader
              img={isNew ? imgDefaultCompany : IPOData?.company_logo}
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
          </Box>

          <Box sx={{ flex: 3, minWidth: "fit-content" }}>
            <TextField
              id="company_name"
              label="Company Name"
              fullWidth
              autoComplete="on"
              error={errors.company_name ? true : false}
              helperText={errors.company_name ? errors.company_name.message : null}
              {...register("company_name", { required: "Company name is required" })}
            />
            <TextField
              id="company_logo"
              label="Company Logo URL"
              fullWidth
              autoComplete="on"
              type="url"
              error={errors.company_logo ? true : false}
              sx={{
                marginTop: "20px",
              }}
              helperText={errors.company_logo ? errors.company_logo.message : null}
              {...register("company_logo", { required: "Company logo is required" })}
            />
            <IsActiveSwitch isActive={isNew ? false : IPOData?.is_active} />
          </Box>
        </Box>
      </>
    );
  };
  const editIPODetails = () => {
    return (
      <>
        <Box component={"div"} className={classes.container} sx={{ flexDirection: "column", alignItems: "flex-start" }}>
          <Typography variant="h3">Company - IPO Details</Typography>

          <Grid2 container p={"10px"} spacing={3} sx={{ width: "100%" }}>
            <Grid2 size={{ xs: 6, md: 3 }}>
              <Box sx={{ display: "flex", flexDirection: "column", gap: "15px" }}>
                <Typography variant="subtitle1" sx={{ color: AppColors.textSecondary }}>
                  Open Date
                </Typography>
                {/* <DatePicker /> */}
                <Controller
                  control={control}
                  name={`timeline.open_date`}
                  rules={{ required: "Date is required" }}
                  render={({ field }) => (
                    <DatePicker
                      {...field}
                      label=""
                      value={moment(field.value)}
                      onChange={(newDate) => field.onChange(newDate?.format("YYYY-MM-DD").toString())}
                      defaultValue={moment()}
                      slotProps={{
                        textField: {
                          required: true,
                          error: errors.timeline?.open_date ? true : false,
                          helperText: errors.timeline?.open_date ? errors.timeline?.open_date?.message : null,
                        },
                      }}
                    />
                  )}
                />
              </Box>
            </Grid2>
            <Grid2 size={{ xs: 6, md: 3 }}>
              <Box sx={{ display: "flex", flexDirection: "column", gap: "15px" }}>
                <Typography variant="subtitle1" sx={{ color: AppColors.textSecondary }}>
                  Close Date
                </Typography>
                {/* <DatePicker /> */}
                <Controller
                  control={control}
                  name={`timeline.end_date`}
                  rules={{ required: "Date is required" }}
                  render={({ field }) => (
                    <DatePicker
                      {...field}
                      label=""
                      value={moment(field.value)}
                      defaultValue={moment()}
                      onChange={(newDate) => field.onChange(newDate?.format("YYYY-MM-DD").toString())}
                      slotProps={{
                        textField: {
                          required: true,
                          error: errors.timeline?.end_date ? true : false,
                          helperText: errors.timeline?.end_date ? errors.timeline?.end_date?.message : null,
                        },
                      }}
                    />
                  )}
                />
              </Box>
            </Grid2>
            <Grid2 size={{ xs: 6, md: 3 }}>
              <Box sx={{ display: "flex", flexDirection: "column", gap: "15px" }}>
                <Typography variant="subtitle1" sx={{ color: AppColors.textSecondary }}>
                  Allotment Date
                </Typography>
                {/* <DatePicker /> */}
                <Controller
                  control={control}
                  name={`timeline.allotment_date`}
                  rules={{ required: "Date is required" }}
                  render={({ field }) => (
                    <DatePicker
                      {...field}
                      label=""
                      value={moment(field.value)}
                      defaultValue={moment()}
                      onChange={(newDate) => field.onChange(newDate?.format("YYYY-MM-DD").toString())}
                      slotProps={{
                        textField: {
                          required: true,
                          error: errors.timeline?.allotment_date ? true : false,
                          helperText: errors.timeline?.allotment_date ? errors.timeline?.allotment_date?.message : null,
                        },
                      }}
                    />
                  )}
                />
              </Box>
            </Grid2>

            <Grid2 size={{ xs: 6, md: 3 }}>
              <Box sx={{ display: "flex", flexDirection: "column", gap: "15px" }}>
                <Typography variant="subtitle1" sx={{ color: AppColors.textSecondary }}>
                  Listed Date
                </Typography>
                {/* <DatePicker /> */}
                <Controller
                  control={control}
                  name={`timeline.listing_date`}
                  rules={{ required: "Date is required" }}
                  render={({ field }) => (
                    <DatePicker
                      {...field}
                      label=""
                      value={moment(field.value)}
                      defaultValue={moment()}
                      onChange={(newDate) => field.onChange(newDate?.format("YYYY-MM-DD").toString())}
                      slotProps={{
                        textField: {
                          required: true,
                          error: errors.timeline?.listing_date ? true : false,
                          helperText: errors.timeline?.listing_date ? errors.timeline?.listing_date?.message : null,
                        },
                      }}
                    />
                  )}
                />
              </Box>
            </Grid2>

            <Grid2 size={{ xs: 12, md: 6 }}>
              <Box sx={{ display: "flex", flexDirection: "column", gap: "15px" }}>
                <Typography variant="subtitle1" sx={{ color: AppColors.textSecondary }}>
                  Issue Price (₹ per Equity Share)
                </Typography>
                {/* <AppTextField label="min" name="company_name" type="number" />
                <AppTextField label="max" name="company_name" type="number" /> */}

                <TextField
                  id="issue_price.min"
                  label="Min"
                  fullWidth
                  autoComplete="on"
                  type="number"
                  slotProps={{
                    htmlInput: {
                      step: ".01",
                    },
                  }}
                  error={errors.issue_price?.min ? true : false}
                  helperText={errors.issue_price?.min ? errors.issue_price?.min.message : null}
                  {...register("issue_price.min", { required: "Field is required" })}
                />
                <TextField
                  id="issue_price.max"
                  label="Max"
                  fullWidth
                  autoComplete="on"
                  type="number"
                  slotProps={{
                    htmlInput: {
                      step: ".01",
                    },
                  }}
                  error={errors.issue_price?.max ? true : false}
                  helperText={errors.issue_price?.max ? errors.issue_price?.max.message : null}
                  {...register("issue_price.max", { required: "Field is required" })}
                />
              </Box>
            </Grid2>

            <Grid2 size={{ xs: 12, md: 6 }}>
              <Box sx={{ display: "flex", flexDirection: "column", gap: "15px" }}>
                <Typography variant="subtitle1" sx={{ color: AppColors.textSecondary }}>
                  Issue Size (All value in ₹Cr.)
                </Typography>
                {/* <AppTextField label="Fresh" name="company_name" type="number" />
                <AppTextField label="Offer For Sale" name="company_name" type="number" /> */}

                <TextField
                  id="issue_size.fresh"
                  label="Fresh"
                  fullWidth
                  autoComplete="on"
                  type="number"
                  slotProps={{
                    htmlInput: {
                      step: ".01",
                    },
                  }}
                  error={errors.issue_size?.fresh ? true : false}
                  helperText={errors.issue_size?.fresh ? errors.issue_size?.fresh.message : null}
                  {...register("issue_size.fresh", { required: "Field is required" })}
                />
                <TextField
                  id="issue_size.offer_for_sale"
                  label="Offer for Sale"
                  fullWidth
                  autoComplete="on"
                  type="number"
                  slotProps={{
                    htmlInput: {
                      step: ".01",
                    },
                  }}
                  error={errors.issue_size?.offer_for_sale ? true : false}
                  helperText={errors.issue_size?.offer_for_sale ? errors.issue_size?.offer_for_sale.message : null}
                  {...register("issue_size.offer_for_sale", { required: "Field is required" })}
                />
              </Box>
            </Grid2>

            <Grid2 size={{ xs: 12, md: 6 }}>
              <Box sx={{ display: "flex", flexDirection: "column", gap: "15px" }}>
                <Typography variant="subtitle1" sx={{ color: AppColors.textSecondary }}>
                  Face Value (₹ per Equity Share)
                </Typography>
                {/* <AppTextField label="₹" name="company_name" type="number" /> */}
                <TextField
                  id="face_value"
                  label="₹"
                  fullWidth
                  autoComplete="on"
                  type="number"
                  slotProps={{
                    htmlInput: {
                      step: ".01",
                    },
                  }}
                  error={errors.face_value ? true : false}
                  helperText={errors.face_value ? errors.face_value.message : null}
                  {...register("face_value", { required: "Face value is required" })}
                />
              </Box>
            </Grid2>

            <Grid2 size={{ xs: 12, md: 6 }}>
              <Box sx={{ display: "flex", flexDirection: "column", gap: "15px" }}>
                <Typography variant="subtitle1" sx={{ color: AppColors.textSecondary }}>
                  Subscription rate
                </Typography>
                {/* <AppTextField label="Subscription rate" name="company_name" type="number" /> */}
                <TextField
                  id="subscription_rate"
                  label="Subscription rate"
                  fullWidth
                  autoComplete="on"
                  type="number"
                  slotProps={{
                    htmlInput: {
                      step: ".01",
                    },
                  }}
                  error={errors.subscription_rate ? true : false}
                  helperText={errors.subscription_rate ? errors.subscription_rate.message : null}
                  {...register("subscription_rate", { required: "Subscription rate is required" })}
                />
              </Box>
            </Grid2>

            <Grid2 size={{ xs: 12, md: 6 }}>
              <Box sx={{ display: "flex", flexDirection: "column", gap: "15px" }}>
                <Typography variant="subtitle1" sx={{ color: AppColors.textSecondary }}>
                  Retail Portion (%)
                </Typography>
                {/* <AppTextField label="Retail" name="company_name" type="number" />
                <AppTextField label="QIB" name="company_name" type="number" />
                <AppTextField label="bNII" name="company_name" type="number" />
                <AppTextField label="sNII" name="company_name" type="number" /> */}

                <TextField
                  id="quota.retail"
                  label="Retail %"
                  fullWidth
                  autoComplete="on"
                  type="number"
                  slotProps={{
                    htmlInput: {
                      step: ".01",
                    },
                  }}
                  error={errors.quota?.retail ? true : false}
                  helperText={errors.quota?.retail ? errors.quota?.retail.message : null}
                  {...register("quota.retail", {
                    required: "Field is required",
                    max: {
                      value: 100,
                      message: "value between 0 and 100",
                    },
                    min: {
                      value: 0,
                      message: "Value between 0 and 100 ",
                    },
                  })}
                />
                <TextField
                  id="quota.qib"
                  label="QIB %"
                  fullWidth
                  autoComplete="on"
                  type="number"
                  slotProps={{
                    htmlInput: {
                      step: ".01",
                    },
                  }}
                  error={errors.quota?.qib ? true : false}
                  helperText={errors.quota?.qib ? errors.quota?.qib.message : null}
                  {...register("quota.qib", {
                    required: "Field is required",
                    max: {
                      value: 100,
                      message: "value between 0 and 100",
                    },
                    min: {
                      value: 0,
                      message: "Value between 0 and 100 ",
                    },
                  })}
                />
                <TextField
                  id="quota.nii.b_nii"
                  label="bNII %"
                  fullWidth
                  autoComplete="on"
                  type="number"
                  slotProps={{
                    htmlInput: {
                      step: ".01",
                    },
                  }}
                  error={errors.quota?.nii?.b_nii ? true : false}
                  helperText={errors.quota?.nii?.b_nii ? errors.quota?.nii?.b_nii.message : null}
                  {...register("quota.nii.b_nii", {
                    required: "Field is required",
                    max: {
                      value: 100,
                      message: "value between 0 and 100",
                    },
                    min: {
                      value: 0,
                      message: "Value between 0 and 100 ",
                    },
                  })}
                />

                <TextField
                  id="quota.nii.s_nii"
                  label="sNII %"
                  fullWidth
                  autoComplete="on"
                  type="number"
                  slotProps={{
                    htmlInput: {
                      step: ".01",
                    },
                  }}
                  error={errors.quota?.nii?.s_nii ? true : false}
                  helperText={errors.quota?.nii?.s_nii ? errors.quota?.nii?.s_nii.message : null}
                  {...register("quota.nii.s_nii", {
                    required: "Field is required",
                    max: {
                      value: 100,
                      message: "value between 0 and 100",
                    },
                    min: {
                      value: 0,
                      message: "Value between 0 and 100 ",
                    },
                  })}
                />
              </Box>
            </Grid2>

            <Grid2 size={{ xs: 12, md: 6 }}>
              <Box sx={{ display: "flex", flexDirection: "column", gap: "15px" }}>
                <Typography variant="subtitle1" sx={{ color: AppColors.textSecondary }}>
                  IPO Docs
                </Typography>

                {/* <AppTextField label="Anchor" name="company_name" />
                <AppTextField label="DRPH" name="company_name" />
                <AppTextField label="RPH" name="company_name" /> */}

                <TextField
                  id="docs.anchor"
                  label="Anchor"
                  fullWidth
                  autoComplete="on"
                  error={errors.docs?.anchor ? true : false}
                  helperText={errors.docs?.anchor ? errors.docs?.anchor.message : null}
                  {...register("docs.anchor", {
                    required: "Field is required",
                  })}
                />
                <TextField
                  id="docs.drph"
                  label="DRPH"
                  fullWidth
                  autoComplete="on"
                  error={errors.docs?.drph ? true : false}
                  helperText={errors.docs?.drph ? errors.docs?.drph.message : null}
                  {...register("docs.drph", { required: "Field is required" })}
                />
                <TextField
                  id="docs.rph"
                  label="RPH"
                  fullWidth
                  autoComplete="on"
                  error={errors.docs?.rph ? true : false}
                  helperText={errors.docs?.rph ? errors.docs?.rph.message : null}
                  {...register("docs.rph", { required: "Field is required" })}
                />
              </Box>
            </Grid2>

            <Grid2 size={{ xs: 12, md: 6 }}>
              <Box sx={{ display: "flex", flexDirection: "column", gap: "15px" }}>
                <Typography variant="subtitle1" sx={{ color: AppColors.textSecondary }}>
                  Listing Price (₹)
                </Typography>
                <TextField
                  id="listing_price"
                  label="Listing Price"
                  fullWidth
                  autoComplete="on"
                  type="number"
                  slotProps={{
                    htmlInput: {
                      step: ".01",
                    },
                  }}
                  defaultValue={0}
                  error={errors.listing_price ? true : false}
                  helperText={errors.listing_price ? errors.listing_price.message : null}
                  {...register("listing_price", { required: "Field is required" })}
                />
              </Box>
            </Grid2>
          </Grid2>
        </Box>
      </>
    );
  };
  const editCompanySubscriptionDetails = () => {
    return (
      <>
        <Box
          component={"div"}
          className={classes.container}
          sx={{ flexDirection: "column", alignItems: "flex-start", gap: "5px" }}
        >
          <Box
            sx={{
              width: "100%",
              display: "flex",
              justifyContent: "space-between",
            }}
          >
            <Typography variant="h3">Company - IPO Subscription Details</Typography>
            <IconButton
              color="success"
              onClick={() => {
                subscriptionsAppend({ date: "", qib: 0, retail: 0, nii: { s_nii: 0, b_nii: 0, total: 0 }, total: 0 });
              }}
            >
              <AddCircleOutline />
            </IconButton>
          </Box>

          <TableContainer sx={{ width: "100%" }} component={Paper}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>
                    <Typography variant="h5">Date</Typography>
                  </TableCell>
                  <TableCell>
                    <Typography variant="h5">QIB</Typography>
                  </TableCell>
                  <TableCell>
                    <Typography variant="h5">bNII</Typography>
                  </TableCell>
                  <TableCell>
                    <Typography variant="h5">sNII</Typography>
                  </TableCell>
                  <TableCell>
                    <Typography variant="h5">Retail</Typography>
                  </TableCell>
                  <TableCell></TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {subscriptionsFields.map((_, index) => (
                  <TableRow key={index}>
                    <TableCell>
                      {/* <DatePicker name="startDate" /> */}

                      <Controller
                        control={control}
                        name={`subscriptions.${index}.date`}
                        rules={{ required: "Date is required" }}
                        render={({ field }) => (
                          <DatePicker
                            {...field}
                            label="Date"
                            value={moment(field.value)}
                            onChange={(newDate) => field.onChange(newDate?.format("YYYY-MM-DD").toString())}
                            defaultValue={moment()}
                            slotProps={{
                              textField: {
                                required: true,
                                error: errors.subscriptions && errors.subscriptions[index]?.date ? true : false,
                                helperText: errors.subscriptions ? errors.subscriptions[index]?.date?.message : null,
                              },
                            }}
                          />
                        )}
                      />
                    </TableCell>
                    <TableCell>
                      <TextField
                        id={`subscriptions.${index}.qib`}
                        label=""
                        fullWidth
                        autoComplete="on"
                        autoFocus={false}
                        type="number"
                        slotProps={{
                          htmlInput: {
                            step: ".01",
                          },
                        }}
                        defaultValue={0}
                        error={errors?.subscriptions && errors?.subscriptions[index]?.qib ? true : false}
                        helperText={errors.subscriptions ? errors.subscriptions[index]?.qib?.message : null}
                        {...register(`subscriptions.${index}.qib` as const, {
                          required: "Field is required",
                        })}
                      />
                    </TableCell>
                    <TableCell>
                      <TextField
                        id={`subscriptions.${index}.nii.b_nii`}
                        label=""
                        fullWidth
                        autoComplete="on"
                        autoFocus={false}
                        type="number"
                        slotProps={{
                          htmlInput: {
                            step: ".01",
                          },
                        }}
                        defaultValue={0}
                        error={errors?.subscriptions && errors?.subscriptions[index]?.nii?.b_nii ? true : false}
                        helperText={errors.subscriptions ? errors.subscriptions[index]?.nii?.b_nii?.message : null}
                        {...register(`subscriptions.${index}.nii.b_nii` as const, {
                          required: "Field is required",
                        })}
                      />
                    </TableCell>
                    <TableCell>
                      <TextField
                        id={`subscriptions.${index}.nii.s_nii`}
                        label=""
                        fullWidth
                        autoComplete="on"
                        autoFocus={false}
                        type="number"
                        slotProps={{
                          htmlInput: {
                            step: ".01",
                          },
                        }}
                        defaultValue={0}
                        error={errors?.subscriptions && errors?.subscriptions[index]?.nii?.s_nii ? true : false}
                        helperText={errors.subscriptions ? errors.subscriptions[index]?.nii?.s_nii?.message : null}
                        {...register(`subscriptions.${index}.nii.s_nii` as const, {
                          required: "Field is required",
                        })}
                      />
                    </TableCell>
                    <TableCell>
                      <TextField
                        id={`subscriptions.${index}.retail`}
                        label=""
                        fullWidth
                        autoComplete="on"
                        autoFocus={false}
                        type="number"
                        slotProps={{
                          htmlInput: {
                            step: ".01",
                          },
                        }}
                        defaultValue={0}
                        error={errors?.subscriptions && errors?.subscriptions[index]?.retail ? true : false}
                        helperText={errors.subscriptions ? errors.subscriptions[index]?.retail?.message : null}
                        {...register(`subscriptions.${index}.retail` as const, {
                          required: "Field is required",
                        })}
                      />
                    </TableCell>
                    <TableCell>
                      <IconButton onClick={() => subscriptionsRemove(index)} color="error">
                        <Delete />
                      </IconButton>
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
  const editCompanyMarketLot = () => {
    return (
      <>
        <Box
          component={"div"}
          className={classes.container}
          sx={{ flexDirection: "column", alignItems: "flex-start", gap: "5px" }}
        >
          <Typography variant="h3">Company - Market Lot (Lot Size)</Typography>

          <TableContainer sx={{ width: "100%" }} component={Paper}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>
                    <Typography variant="h5">Application</Typography>
                  </TableCell>
                  <TableCell>
                    <Typography variant="h5">Lot</Typography>
                  </TableCell>
                  <TableCell>
                    <Typography variant="h5">Shares</Typography>
                  </TableCell>
                  <TableCell>
                    <Typography variant="h5">Amount</Typography>
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {lotSizesFields.map((_, index) => (
                  <TableRow key={index}>
                    <TableCell>
                      <TextField
                        id={`lot_sizes.${index}.application`}
                        label=""
                        fullWidth
                        autoComplete="on"
                        autoFocus={false}
                        disabled={true}
                        error={errors?.lot_sizes && errors?.lot_sizes[index]?.application ? true : false}
                        helperText={errors.lot_sizes ? errors.lot_sizes[index]?.application?.message : null}
                        {...register(`lot_sizes.${index}.application` as const, {
                          required: "Field is required",
                        })}
                      />
                    </TableCell>
                    <TableCell>
                      <TextField
                        id={`lot_sizes.${index}.lot`}
                        label=""
                        fullWidth
                        autoComplete="on"
                        autoFocus={false}
                        type="number"
                        slotProps={{
                          htmlInput: {
                            step: ".01",
                          },
                        }}
                        defaultValue={0}
                        error={errors?.lot_sizes && errors?.lot_sizes[index]?.lot ? true : false}
                        helperText={errors.lot_sizes ? errors.lot_sizes[index]?.lot?.message : null}
                        {...register(`lot_sizes.${index}.lot` as const, {
                          required: "Field is required",
                        })}
                      />
                    </TableCell>
                    <TableCell>
                      <TextField
                        id={`lot_sizes.${index}.shares`}
                        label=""
                        fullWidth
                        autoComplete="on"
                        autoFocus={false}
                        type="number"
                        slotProps={{
                          htmlInput: {
                            step: ".01",
                          },
                        }}
                        defaultValue={0}
                        error={errors?.lot_sizes && errors?.lot_sizes[index]?.shares ? true : false}
                        helperText={errors.lot_sizes ? errors.lot_sizes[index]?.shares?.message : null}
                        {...register(`lot_sizes.${index}.shares` as const, {
                          required: "Field is required",
                        })}
                      />
                    </TableCell>
                    <TableCell>
                      <TextField
                        id={`lot_sizes.${index}.amount`}
                        label=""
                        fullWidth
                        autoComplete="on"
                        autoFocus={false}
                        type="number"
                        slotProps={{
                          htmlInput: {
                            step: ".01",
                          },
                        }}
                        defaultValue={0}
                        error={errors?.lot_sizes && errors?.lot_sizes[index]?.amount ? true : false}
                        helperText={errors.lot_sizes ? errors.lot_sizes[index]?.amount?.message : null}
                        {...register(`lot_sizes.${index}.amount` as const, {
                          required: "Field is required",
                        })}
                      />
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
  const editApplicationDetails = () => {
    return (
      <>
        <Box component={"div"} className={classes.container} sx={{ flexDirection: "column", alignItems: "flex-start" }}>
          <Typography variant="h3">Company- IPO Application Details</Typography>
          <TableContainer component={Paper}>
            <Table aria-label="simple table">
              <TableHead>
                <TableRow>
                  <TableCell>
                    <Typography variant="h5">QIB</Typography>
                  </TableCell>
                  <TableCell>
                    <Typography variant="h5">bNII</Typography>
                  </TableCell>
                  <TableCell>
                    <Typography variant="h5">sNII</Typography>
                  </TableCell>
                  <TableCell>
                    <Typography variant="h5">Retail</Typography>
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                <TableRow sx={{ "&:last-child td, &:last-child th": { border: 0 } }}>
                  <TableCell>
                    {/* <AppTextField label="" name="assets" type="number" /> */}
                    <TextField
                      id="applications.qib"
                      fullWidth
                      autoComplete="on"
                      type="number"
                      slotProps={{
                        htmlInput: {
                          step: ".01",
                        },
                      }}
                      error={errors.applications?.qib ? true : false}
                      helperText={errors.applications?.qib ? errors.applications?.qib.message : null}
                      {...register("applications.qib")}
                    />
                  </TableCell>
                  <TableCell>
                    {/* <AppTextField label="" name="assets" type="number" /> */}
                    <TextField
                      id="applications.nii.b_nii"
                      fullWidth
                      autoComplete="on"
                      type="number"
                      slotProps={{
                        htmlInput: {
                          step: ".01",
                        },
                      }}
                      error={errors.applications?.nii?.b_nii ? true : false}
                      helperText={errors.applications?.nii?.b_nii ? errors.applications?.nii?.b_nii.message : null}
                      {...register("applications.nii.b_nii")}
                    />
                  </TableCell>
                  <TableCell>
                    {/* <AppTextField label="" name="assets" type="number" /> */}
                    <TextField
                      id="applications.nii.s_nii"
                      fullWidth
                      autoComplete="on"
                      type="number"
                      slotProps={{
                        htmlInput: {
                          step: ".01",
                        },
                      }}
                      error={errors.applications?.nii?.s_nii ? true : false}
                      helperText={errors.applications?.nii?.s_nii ? errors.applications?.nii?.s_nii.message : null}
                      {...register("applications.nii.s_nii")}
                    />
                  </TableCell>
                  <TableCell>
                    {/* <AppTextField label="" name="assets" type="number" /> */}
                    <TextField
                      id="applications.retail"
                      fullWidth
                      autoComplete="on"
                      type="number"
                      slotProps={{
                        htmlInput: {
                          step: ".01",
                        },
                      }}
                      error={errors.applications?.retail ? true : false}
                      helperText={errors.applications?.retail ? errors.applications?.retail.message : null}
                      {...register("applications.retail")}
                    />
                  </TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </TableContainer>
        </Box>
      </>
    );
  };
  const editCompanyLeadManagers = () => {
    return (
      <EditableChips
        id="lead_managers"
        label="Mananger Name"
        defaultList={!isNew ? IPOData?.lead_managers : null}
        title="Company Lead Managers"
      />
    );
  };
  const editCompanyValuations = () => {
    return (
      <>
        <Box component={"div"} className={classes.container} sx={{ flexDirection: "column", alignItems: "flex-start" }}>
          <Typography variant="h3">Company Valuations</Typography>
          <Grid2 container spacing={2} sx={{ width: "100%" }}>
            <Grid2 size={{ xs: 12, md: 6 }}>
              {/* <AppTextField label="EPS Pre IPO" name="eps_pre_ipo" type="number" /> */}
              <TextField
                id="valuations.earning_per_share.pre_ipo "
                label="Earning Per Share (Pre IPO)"
                fullWidth
                autoComplete="on"
                type="number"
                slotProps={{
                  htmlInput: {
                    step: ".01",
                  },
                }}
                error={errors.valuations?.earning_per_share?.pre_ipo ? true : false}
                helperText={
                  errors.valuations?.earning_per_share?.pre_ipo
                    ? errors.valuations?.earning_per_share?.pre_ipo.message
                    : null
                }
                {...register("valuations.earning_per_share.pre_ipo", {
                  required: "Field is required",
                })}
              />
            </Grid2>

            <Grid2 size={{ xs: 12, md: 6 }}>
              {/* <AppTextField label="EPS Post IPO" name="EPS Post IPO" type="number" /> */}
              <TextField
                id="valuations.earning_per_share.post_ipo "
                label="Earning Per Share (Post IPO)"
                fullWidth
                autoComplete="on"
                type="number"
                slotProps={{
                  htmlInput: {
                    step: ".01",
                  },
                }}
                error={errors.valuations?.earning_per_share?.post_ipo ? true : false}
                helperText={
                  errors.valuations?.earning_per_share?.post_ipo
                    ? errors.valuations?.earning_per_share?.post_ipo.message
                    : null
                }
                {...register("valuations.earning_per_share.post_ipo", {
                  required: "Field is required",
                })}
              />
            </Grid2>
            <Grid2 size={{ xs: 12, md: 6 }}>
              {/* <AppTextField label="P/E Pre IPO" name="P/E Pre IPO" type="number" /> */}
              <TextField
                id="valuations.price_earning_ratio.pre_ipo "
                label="Price Earning Ratio (Pre IPO)"
                fullWidth
                autoComplete="on"
                type="number"
                slotProps={{
                  htmlInput: {
                    step: ".01",
                  },
                }}
                error={errors.valuations?.price_earning_ratio?.pre_ipo ? true : false}
                helperText={
                  errors.valuations?.price_earning_ratio?.pre_ipo
                    ? errors.valuations?.price_earning_ratio?.pre_ipo.message
                    : null
                }
                {...register("valuations.price_earning_ratio.pre_ipo", {
                  required: "Field is required",
                })}
              />
            </Grid2>
            <Grid2 size={{ xs: 12, md: 6 }}>
              {/* <AppTextField label="P/E Post IPO" name="P/E Post IPO" type="number" /> */}
              <TextField
                id="valuations.price_earning_ratio.post_ipo "
                label="Price Earning Ratio (Post IPO)"
                fullWidth
                autoComplete="on"
                type="number"
                slotProps={{
                  htmlInput: {
                    step: ".01",
                  },
                }}
                error={errors.valuations?.price_earning_ratio?.post_ipo ? true : false}
                helperText={
                  errors.valuations?.price_earning_ratio?.post_ipo
                    ? errors.valuations?.price_earning_ratio?.post_ipo.message
                    : null
                }
                {...register("valuations.price_earning_ratio.post_ipo", {
                  required: "Field is required",
                })}
              />
            </Grid2>
            <Grid2 size={{ xs: 12, md: 6 }}>
              {/* <AppTextField label="RoNW" name="RoNW" type="number" /> */}
              <TextField
                id="valuations.return_on_net_worth "
                label="Return On Net Worth (%)"
                fullWidth
                autoComplete="on"
                type="number"
                slotProps={{
                  htmlInput: {
                    step: ".01",
                  },
                }}
                error={errors.valuations?.return_on_net_worth ? true : false}
                helperText={
                  errors.valuations?.return_on_net_worth ? errors.valuations?.return_on_net_worth.message : null
                }
                {...register("valuations.return_on_net_worth", {
                  required: "Field is required",
                })}
              />
            </Grid2>
          </Grid2>
        </Box>
      </>
    );
  };
  const editCompanyFinancials = () => {
    return (
      <>
        <Box
          component={"div"}
          className={classes.container}
          sx={{ flexDirection: "column", alignItems: "flex-start", gap: "5px" }}
        >
          <Box
            sx={{
              width: "100%",
              display: "flex",
              justifyContent: "space-between",
            }}
          >
            <Typography variant="h3">
              Company Financials{" "}
              <span style={{ color: AppColors.textSecondary, fontSize: "18px" }}>All values are in ₹ Cr.</span>
            </Typography>
            <IconButton
              color="success"
              onClick={() => {
                companyFinancialsAppend({ period: "", assets: 0, revenue: 0, profit: 0 });
              }}
            >
              <AddCircleOutline />
            </IconButton>
          </Box>

          <TableContainer sx={{ width: "100%" }} component={Paper}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell></TableCell>
                  <TableCell>
                    <Typography variant="h5">Assets</Typography>
                  </TableCell>
                  <TableCell>
                    <Typography variant="h5">Revenue</Typography>
                  </TableCell>
                  <TableCell>
                    <Typography variant="h5">Profit After Tax</Typography>
                  </TableCell>
                  <TableCell></TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {companyFinancialsFields.map((_, index) => (
                  <TableRow key={index}>
                    <TableCell>
                      <Controller
                        control={control}
                        name={`company_financials.${index}.period`}
                        rules={{ required: "Date is required" }}
                        render={({ field }) => (
                          <DatePicker
                            {...field}
                            label="Date"
                            value={moment(field.value)}
                            defaultValue={moment()}
                            onChange={(newDate) => field.onChange(newDate?.format("YYYY-MM-DD").toString())}
                            slotProps={{
                              textField: {
                                required: true,
                                error:
                                  errors.company_financials && errors.company_financials[index]?.period ? true : false,
                                helperText: errors.company_financials
                                  ? errors.company_financials[index]?.period?.message
                                  : null,
                              },
                            }}
                          />
                        )}
                      />
                    </TableCell>
                    <TableCell>
                      <TextField
                        id={`company_financials.${index}.assets`}
                        label=""
                        fullWidth
                        autoComplete="on"
                        autoFocus={false}
                        type="number"
                        slotProps={{
                          htmlInput: {
                            step: ".01",
                          },
                        }}
                        defaultValue={0}
                        error={errors?.company_financials && errors?.company_financials[index]?.assets ? true : false}
                        helperText={
                          errors.company_financials ? errors.company_financials[index]?.assets?.message : null
                        }
                        {...register(`company_financials.${index}.assets` as const, {
                          required: "Field is required",
                        })}
                      />
                    </TableCell>
                    <TableCell>
                      <TextField
                        id={`company_financials.${index}.revenue`}
                        label=""
                        fullWidth
                        autoComplete="on"
                        type="number"
                        slotProps={{
                          htmlInput: {
                            step: ".01",
                          },
                        }}
                        defaultValue={0}
                        error={errors?.company_financials && errors?.company_financials[index]?.revenue ? true : false}
                        helperText={
                          errors.company_financials ? errors.company_financials[index]?.revenue?.message : null
                        }
                        {...register(`company_financials.${index}.revenue` as const, {
                          required: "Field is required",
                        })}
                      />
                    </TableCell>
                    <TableCell>
                      <TextField
                        id={`company_financials.${index}.profit`}
                        label=""
                        fullWidth
                        autoComplete="on"
                        type="number"
                        slotProps={{
                          htmlInput: {
                            step: ".01",
                          },
                        }}
                        defaultValue={0}
                        error={errors?.company_financials && errors?.company_financials[index]?.profit ? true : false}
                        helperText={
                          errors.company_financials ? errors.company_financials[index]?.profit?.message : null
                        }
                        {...register(`company_financials.${index}.profit` as const, {
                          required: "Field is required",
                        })}
                      />
                    </TableCell>
                    <TableCell>
                      <IconButton onClick={() => companyFinancialsRemove(index)} color="error">
                        <Delete />
                      </IconButton>
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
  const editCompanyStrengthAndWeakness = () => {
    return (
      <>
        <Box
          component={"div"}
          className={classes.container}
          sx={{
            backgroundColor: "transparent",
            flexDirection: "column",
            alignItems: "flex-start",
            boxShadow: "none",
            padding: "10px",
          }}
        >
          {/* <Typography variant="h3">Company - Strength and Weakness</Typography> */}
          <Grid2 container spacing={2} sx={{ width: "100%" }}>
            <Grid2 size={{ xs: 12, md: 6 }}>
              <EditableChips
                id="company_strength"
                label="Strength"
                defaultList={!isNew ? IPOData?.company_strengths : null}
                title="Company Strength"
              />
            </Grid2>

            <Grid2 size={{ xs: 12, md: 6 }}>
              <EditableChips
                id="company_weakness"
                label="Weakness"
                defaultList={!isNew ? IPOData?.company_weaknesses : null}
                title="Company Weakness"
              />
            </Grid2>
          </Grid2>
        </Box>
      </>
    );
  };
  const editCompanyIssueObjectives = () => {
    return (
      <>
        <EditableChips
          id="company_issue_objective"
          label="Issue"
          defaultList={!isNew ? IPOData?.issue_objectives : null}
          title="Company - Issue Objectives"
        />
        {/* <Box component={"div"} className={classes.container} sx={{ flexDirection: "column", alignItems: "flex-start" }}>
          <Typography variant="h3">Company - Issue Objectives</Typography>
          <AppTextField label="Issue" name="issue_objective" multiline hasAddIcon />
          <List>
            {IPOData?.issue_objectives?.map((item, index) => (
              <ListItem key={index}>
                <CircleRounded sx={{ fontSize: "10px", mr: "10px" }} />
                <Typography variant="h6">{`${item}`}.</Typography>
              </ListItem>
            ))}
          </List>
        </Box> */}
      </>
    );
  };
  const editCompanyPromoters = () => {
    return (
      <>
        <EditableChips
          id="company_promoters"
          label="Promoter Name"
          defaultList={!isNew ? IPOData?.company_promoters : null}
          title="Company Promoter(s)"
        />
      </>
    );
  };
  const editListingOfGroups = () => {
    return (
      <>
        <EditableChips
          id="listing_of_groups"
          label="Group Name"
          defaultList={!isNew ? IPOData?.listing_at : null}
          title="Listing of Groups"
        />
      </>
    );
  };
  const editCompanyAndRegistrarAddress = () => {
    return (
      <>
        <Box component={"div"} className={classes.container} sx={{ flexDirection: "column", alignItems: "flex-start" }}>
          <Typography variant="h3">Other Details</Typography>

          <Grid2 container spacing={2} sx={{ width: "100%" }}>
            <Grid2 size={{ xs: 12, md: 6 }} gap={5}>
              <Box sx={{ display: "flex", flexDirection: "column", gap: "15px" }}>
                <Typography variant="h5" sx={{ color: AppColors.textSecondary, mb: "10px" }}>
                  Company Contact Details
                </Typography>

                <TextField
                  id="company_contact_info.phone "
                  label="Phone Number"
                  fullWidth
                  autoComplete="on"
                  type="tel"
                  error={errors.company_contact_info?.phone ? true : false}
                  helperText={errors.company_contact_info?.phone ? errors.company_contact_info?.phone.message : null}
                  {...register("company_contact_info.phone", {
                    // required: "Field is required",
                    pattern: {
                      value: /^[0-9]{10}$/, // Validates only numbers and ensures exactly 10 digits
                      message: "Enter a valid 10-digit phone number",
                    },
                  })}
                />

                <TextField
                  id="company_contact_info.email "
                  label="Email Address"
                  fullWidth
                  autoComplete="on"
                  type="email"
                  error={errors.company_contact_info?.email ? true : false}
                  helperText={errors.company_contact_info?.email ? errors.company_contact_info?.email.message : null}
                  {...register("company_contact_info.email", {
                    // required: "Field is required"
                  })}
                />

                <TextField
                  id="company_contact_info.website "
                  label="Website URL"
                  fullWidth
                  autoComplete="on"
                  type="url"
                  error={errors.company_contact_info?.website ? true : false}
                  helperText={
                    errors.company_contact_info?.website ? errors.company_contact_info?.website.message : null
                  }
                  {...register("company_contact_info.website", {
                    // required: "Field is required"
                  })}
                />

                <TextField
                  id="company_contact_info.address "
                  label="Address"
                  fullWidth
                  autoComplete="on"
                  multiline
                  minRows={3}
                  error={errors.company_contact_info?.address ? true : false}
                  helperText={
                    errors.company_contact_info?.address ? errors.company_contact_info?.address.message : null
                  }
                  {...register("company_contact_info.address", {
                    // required: "Field is required"
                  })}
                />
              </Box>
            </Grid2>
            <Grid2 size={{ xs: 12, md: 6 }}>
              <Box sx={{ display: "flex", flexDirection: "column", gap: "15px" }}>
                <Typography variant="h5" sx={{ color: AppColors.textSecondary, mb: "10px" }}>
                  Registrar Contact Details
                </Typography>
                {/* <AppTextField label="Registrar Name" name="registrar_name" />
                <AppTextField label="Phone Number" name="registrar_phone" type="number" />
                <AppTextField label="Email Address" name="registrar_email" type="email" />
                <AppTextField label="Website URL" name="registrar_website" /> */}

                <TextField
                  id="registrar.name"
                  label="Registrar Name"
                  fullWidth
                  autoComplete="on"
                  error={errors.registrar?.name ? true : false}
                  helperText={errors.registrar?.name ? errors.registrar?.name.message : null}
                  {...register("registrar.name", {
                    // required: "Field is required"
                  })}
                />

                <TextField
                  id="registrar.phone "
                  label="Phone Number"
                  fullWidth
                  autoComplete="on"
                  type="tel"
                  error={errors.registrar?.phone ? true : false}
                  helperText={errors.registrar?.phone ? errors.registrar?.phone.message : null}
                  {...register("registrar.phone", {
                    // required: "Field is required",
                    pattern: {
                      value: /^[0-9]{10}$/, // Validates only numbers and ensures exactly 10 digits
                      message: "Enter a valid 10-digit phone number",
                    },
                  })}
                />

                <TextField
                  id="registrar.email "
                  label="Email Address"
                  fullWidth
                  autoComplete="on"
                  type="email"
                  error={errors.registrar?.email ? true : false}
                  helperText={errors.registrar?.email ? errors.registrar?.email.message : null}
                  {...register("registrar.email", {
                    // required: "Field is required"
                  })}
                />

                <TextField
                  id="registrar.website "
                  label="Website URL"
                  fullWidth
                  autoComplete="on"
                  type="url"
                  error={errors.registrar?.website ? true : false}
                  helperText={errors.registrar?.website ? errors.registrar?.website.message : null}
                  {...register("registrar.website", {
                    // required: "Field is required"
                  })}
                />
              </Box>
            </Grid2>
          </Grid2>
        </Box>
      </>
    );
  };
  const editCompanyAbout = () => {
    return (
      <>
        <Box component={"div"} className={classes.container} sx={{ flexDirection: "column", alignItems: "flex-start" }}>
          <Typography variant="h3">About The Company</Typography>
          {/* <AppTextField label="About" name="company_about" multiline minRows={5} /> */}
          <TextField
            id="company_about"
            label="About"
            fullWidth
            autoComplete="on"
            multiline
            minRows={5}
            error={errors.company_about ? true : false}
            helperText={errors.company_about ? errors.company_about.message : null}
            {...register("company_about", { required: "Field is required" })}
          />
        </Box>
      </>
    );
  };
  const editCompanyDisclaimer = () => {
    return (
      <>
        <Box component={"div"} className={classes.container} sx={{ flexDirection: "column", alignItems: "flex-start" }}>
          <Typography variant="h3">Disclaimer</Typography>
          {/* <AppTextField label="Discalimer" name="company_disclaimer"  /> */}
          <TextField
            id="disclaimer"
            label="Disclaimer"
            fullWidth
            autoComplete="on"
            multiline
            minRows={5}
            error={errors.disclaimer ? true : false}
            helperText={errors.disclaimer ? errors.disclaimer.message : null}
            {...register("disclaimer", { required: "Field is required" })}
          />
        </Box>
      </>
    );
  };

  const renderUI = () => {
    if (isIPODataLoading && !isNew)
      return (
        <CircularProgress size={40} thickness={5} sx={{ color: "loader.main", alignSelf: "center", margin: "auto" }} />
      );

    if (isIPODataError && !isNew) return <FallbackError type="something_went_wrong" />;
    if (!IPOData && !isNew) return <FallbackError type="data_not_found" message="No Company IPO Found" />;

    return (
      <form
        onSubmit={handleSubmit((data) => {
          const dateValidation = validateDates(data);
          if (dateValidation == true) {
            onSubmit(data);
          } else {
            showCustomToast(dateValidation, "error");
          }
        })}
      >
        <AppBar
          sx={{
            position: "sticky",
            top: 0,
            zIndex: 8,
            backgroundColor: AppColors.white,
            borderRadius: "10px",
            marginBottom: "20px",
          }}
        >
          <Toolbar>
            <Typography sx={{ ml: 2, flex: 1 }} variant="h4">
              {!isNew ? (IPOData?.company_name ?? "Add IPO") : "Add IPO"}
            </Typography>
            <Button
              variant="outlined"
              color="success"
              type="submit"
              startIcon={<Save />}
              sx={{
                borderRadius: "50px",
                padding: "8px 20px",
              }}
              // onClick={handleClose}
            >
              Save
            </Button>
          </Toolbar>
        </AppBar>
        <Box
          sx={{
            padding: "5px",
            // minHeight: "100vh",
            display: "flex",
            flexDirection: "column",
            gap: "20px",
            alignItems: "center",
          }}
        >
          {editCompanyData()}
          {editIPODetails()}
          {editCompanySubscriptionDetails()}
          {editCompanyFinancials()}
          {editApplicationDetails()}
          {editCompanyMarketLot()}
          {editCompanyValuations()}
          {editListingOfGroups()}
          {editCompanyLeadManagers()}
          {editCompanyPromoters()}
          {editCompanyIssueObjectives()}
          {editCompanyStrengthAndWeakness()}
          {editCompanyAndRegistrarAddress()}
          {editCompanyAbout()}
          {editCompanyDisclaimer()}
        </Box>
      </form>
    );
  };

  return (
    // <>
    <RootContainer style={{ alignItems: "center", gap: "30px" }}>
      <Backdrop sx={{ color: "#fff", zIndex: 9 }} open={isCRUDIPOLoading}>
        <CircularProgress size={40} thickness={5} sx={{ color: "loader.main", alignSelf: "center", margin: "auto" }} />
      </Backdrop>
      {renderUI()}
    </RootContainer>
  );
}

export const useStyles = makeStyles({
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
    overflow: "hidden",
    // boxShadow: "0px 10px 10px 2px rgba(0,0,0,0.2)",
  },
});
