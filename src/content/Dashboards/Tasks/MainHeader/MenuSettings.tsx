import { useContext, useRef, useState } from "react";
import NextLink from "next/link";
import {
  AlertColor,
  Box,
  Button,
  CircularProgress,
  Divider,
  Hidden,
  lighten,
  List,
  ListItem,
  ListItemText,
  Popover,
  Typography
} from "@mui/material";
import DocumentScannerTwoToneIcon from "@mui/icons-material/DocumentScannerTwoTone";
import { styled } from "@mui/material/styles";
import ExpandMoreTwoToneIcon from "@mui/icons-material/ExpandMoreTwoTone";
import AccountTreeTwoToneIcon from "@mui/icons-material/AccountTreeTwoTone";
import SettingsTwoToneIcon from "@mui/icons-material/SettingsTwoTone";
import DataContext from "@/contexts/DataContext";
import { getDashboardDateData, getReviewsData } from "@/services";
import SignOut from "./SignOut";
import dynamic from "next/dynamic";
import DocConfirm from "./DocConfirm";
import { DashboardDataResponse, ReviewsDataResponse } from "@/models";
const PDFGenerator = dynamic(() => import("../ExportPDF/PDFGenerator"), {
  ssr: false
});

const UserBoxButton = styled(Button)(
  ({ theme }) => `
        padding-left: ${theme.spacing(1)};
        padding-right: ${theme.spacing(1)};
`
);

const MenuUserBox = styled(Box)(
  ({ theme }) => `
        background: ${theme.colors.alpha.black[5]};
        padding: ${theme.spacing(2)};
`
);

const UserBoxText = styled(Box)(
  ({ theme }) => `
        text-align: left;
        padding-left: ${theme.spacing(1)};
`
);

const UserBoxLabel = styled(Typography)(
  ({ theme }) => `
        font-weight: ${theme.typography.fontWeightBold};
        color: ${theme.palette.secondary.main};
        display: block;
`
);

const UserBoxDescription = styled(Typography)(
  ({ theme }) => `
        color: ${lighten(theme.palette.secondary.main, 0.5)}
`
);

function MenuSettings({ clientName, params }) {
  const {
    currentTab,
    refreshPDF,
    reviewsData,
    data,
    disabledButton,
    selectedDateOption,
    startDate,
    endDate,
    setDataState,
    chartTitle,
    clientId,
    selectedSources
  } = useContext(DataContext);

  const user = {
    title: "Menu Settings",
    subtitle: "MaxxMedia"
  };

  const ref = useRef<any>(null);
  const [isOpen, setOpen] = useState<boolean>(false);

  const handleOpen = (): void => {
    setOpen(true);
  };

  const handleClose = (): void => {
    setOpen(false);
  };

  const totalReviews = reviewsData?.total;

  const [isConfirmationDialogOpen, setConfirmationDialogOpen] = useState(false);

  const handleConfirmationDialogOpen = () => {
    if (!clientId) {
      const errorMessage = "Please select a client before proceeding.";
      const severity: AlertColor = "warning";

      setDataState({
        alertMessage: errorMessage,
        alertSeverity: severity,
        isAlertOpen: true
      });
      return;
    }

    if (currentTab !== "overview") {
      setDataState({
        currentTab: "overview"
      });
    }
    handleClose();
    setConfirmationDialogOpen(true);
  };

  const handleConfirmationDialogClose = () => {
    setConfirmationDialogOpen(false);
  };

  const handlePDF = async (dd: any, selectedDate: any) => {
    setDataState({
      disabledButton: true
    });

    try {

      if (selectedDateOption !== "all") {
        const data: any = await getDashboardDateData(
          clientId,
          selectedDate,
          false
        );
        if (data) {
          const filteredResponse = {
            ...data,
            data: (data.reviewGrowth as Array<any>).filter((review) => {
              const reviewDate = new Date(
                review.date.replace(/\b(\d+)(st|nd|rd|th)\b/g, "$1")
              );
              const startDateFormatted = new Date(startDate);
              const endDateFormatted = new Date(endDate);

              const reviewDateUTC = new Date(
                Date.UTC(
                  reviewDate.getFullYear(),
                  reviewDate.getMonth(),
                  reviewDate.getDate()
                )
              );
              const startDateUTC = new Date(
                Date.UTC(
                  startDateFormatted.getFullYear(),
                  startDateFormatted.getMonth(),
                  startDateFormatted.getDate()
                )
              );
              const endDateUTC = new Date(
                Date.UTC(
                  endDateFormatted.getFullYear(),
                  endDateFormatted.getMonth(),
                  endDateFormatted.getDate()
                )
              );

              return reviewDateUTC >= startDateUTC && reviewDateUTC <= endDateUTC;
            })
          };
          setDataState({
            data : data,
            reviewsData: filteredResponse,
            refreshPDF: true
          });
        }
        handleConfirmationDialogClose();
        return;
      } else {
        const response: ReviewsDataResponse = await getReviewsData({
          ...params,
          per_page: totalReviews
        });

        setDataState({
          reviewsData: response,
          refreshPDF: true
        });
      }


      handleConfirmationDialogClose();
    } catch (error) {
      const errorMessage = "Something went wrong, please try again later.";
      const severity: AlertColor = "error";

      setDataState({
        alertMessage: errorMessage,
        alertSeverity: severity,
        isAlertOpen: true,
        disabledButton: false
      });
    }
  };

  return (
    <>
      <UserBoxButton color="secondary" ref={ref} onClick={handleOpen}>
        {disabledButton ? (
          <CircularProgress size={17.5} sx={{ marginRight: "10px" }} />
        ) : (
          <SettingsTwoToneIcon color="primary" fontSize="medium" />
        )}
        <Hidden mdDown>
          <UserBoxText>
            <UserBoxLabel variant="body1">{user.title}</UserBoxLabel>
            <UserBoxDescription variant="body2">{user.subtitle}</UserBoxDescription>
          </UserBoxText>
        </Hidden>
        <Hidden smDown>
          <ExpandMoreTwoToneIcon sx={{ ml: 1 }} />
        </Hidden>
      </UserBoxButton>
      <Popover
        anchorEl={ref.current}
        onClose={handleClose}
        open={isOpen}
        anchorOrigin={{
          vertical: "top",
          horizontal: "right"
        }}
        transformOrigin={{
          vertical: "top",
          horizontal: "right"
        }}
      >
        <MenuUserBox sx={{ minWidth: 210 }} display="flex" alignItems="center">
          <SettingsTwoToneIcon fontSize="medium" />
          <UserBoxText>
            <UserBoxLabel variant="body1">{user.title}</UserBoxLabel>
            <UserBoxDescription variant="body2">{user.subtitle}</UserBoxDescription>
          </UserBoxText>
        </MenuUserBox>
        <Divider sx={{ mb: 0 }} />
        <List sx={{ p: 1 }} component="nav">
          <ListItem button onClick={handleConfirmationDialogOpen}>
            <DocumentScannerTwoToneIcon fontSize="small" />
            <ListItemText primary="Export PDF" />
            {disabledButton ? (
              <CircularProgress size={17.5} sx={{ marginRight: "15px" }} />
            ) : (
              ""
            )}
          </ListItem>
          <NextLink href="/account-settings" passHref>
            <ListItem button>
              <AccountTreeTwoToneIcon fontSize="small" />
              <ListItemText primary="Account Settings" />
            </ListItem>
          </NextLink>
        </List>
        <Divider />
        <SignOut />
      </Popover>
      <DocConfirm
        open={isConfirmationDialogOpen}
        onClose={handleConfirmationDialogClose}
        onConfirm={handlePDF}
      />
      {typeof window !== "undefined" && (
        <PDFGenerator
          clientName={clientName}
          params={params}
          reviewsData={reviewsData}
          data={data}
          refreshPDF={refreshPDF}
          chartTitle={chartTitle}
          selectedSources={selectedSources}
          setDataState={setDataState}
        />
      )}
    </>
  );
}

export default MenuSettings;
