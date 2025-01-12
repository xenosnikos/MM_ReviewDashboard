import { useContext, useRef, useState, useEffect } from "react";
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
import SettingsTwoToneIcon from "@mui/icons-material/SettingsTwoTone";
import DataContext from "@/contexts/DataContext";
import { getDashboardData, getDashboardDateData, getReviewsData } from "@/services";
import SignOut from "./SignOut";
import dynamic from "next/dynamic";
import DocConfirm from "./DocConfirm";
import { getCurrentUser } from "@/services/login/index";

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
    disabledButton,
    selectedDateOption,
    startDate,
    endDate,
    setDataState,
    chartTitle,
    clientId,
    selectedSources
  } = useContext(DataContext);

  const [username, setUsername] = useState<string>("");

  useEffect(() => {
    const user = getCurrentUser();
    if (user) {
      setUsername(user.username);
    }
  }, []);

  const user = {
    title: "Account",
    subtitle: username
  };

  const ref = useRef<any>(null);
  const [isOpen, setOpen] = useState<boolean>(false);
  const [customdateData, setcustomdateData] = useState<any>();
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

  const handlePDF = async () => {
    try {
      setDataState({
        disabledButton: true
      });

      if (selectedDateOption !== "all") {
        if (!startDate || !endDate) {
          throw new Error("Please select a valid date range");
        }

        const selectedDate = [{ startDate, endDate }];

        // Use Promise.all to fetch data in parallel
        const [dateData, reviewsResponse] = await Promise.all([
          getDashboardDateData(clientId, selectedDate, false),
          getReviewsData({
            ...params,
            per_page: totalReviews
          })
        ]);

        // Filter reviews by date
        const filteredReviews = {
          ...reviewsResponse,
          data: reviewsResponse.data?.filter((review) => {
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

        // Single state update with all changes
        await setDataState({
          data: dateData,
          reviewsData: filteredReviews,
          refreshPDF: true
        });
        setcustomdateData(dateData);
      } else {
        const [reviewsResponse, dashboardData] = await Promise.all([
          getReviewsData({
            ...params,
            per_page: totalReviews
          }),
          getDashboardData(clientId)
        ]);

        // Single state update
        await setDataState({
          data: dashboardData,
          reviewsData: reviewsResponse,
          refreshPDF: true
        });
        setcustomdateData(dashboardData);
      }

      handleConfirmationDialogClose();
    } catch (error) {
      console.error("Error in handlePDF:", error);
      setDataState({
        alertMessage: error.message || "Something went wrong, please try again later.",
        alertSeverity: "error",
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
        </List>
        <Divider />
        <SignOut />
      </Popover>
      <DocConfirm
        open={isConfirmationDialogOpen}
        onClose={handleConfirmationDialogClose}
        onConfirm={() => handlePDF()}
      />
      {typeof window !== "undefined" && (
        <PDFGenerator
          clientName={clientName}
          params={params}
          reviewsData={reviewsData}
          data={customdateData}
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
