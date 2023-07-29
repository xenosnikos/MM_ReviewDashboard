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
import { getReviewsData } from "@/services";
import SignOut from "./SignOut";
import dynamic from "next/dynamic";
import DocConfirm from "./DocConfirm";
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

  const {
    currentTab,
    refreshPDF,
    reviewsData,
    data,
    disabledButton,
    /* selectedDateOption,
    startDate,
    endDate, */
    setDataState
  } = useContext(DataContext);

  const totalReviews = reviewsData?.total;

  const [isConfirmationDialogOpen, setConfirmationDialogOpen] = useState(false);

  const handleConfirmationDialogOpen = () => {
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
    setDataState({
      disabledButton: true
    });

    try {
      const response = await getReviewsData({ ...params, per_page: totalReviews });

      // aqui

      setDataState({
        reviewsData: response,
        refreshPDF: true
      });

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

    /*  setDataState({ refreshPDF: true }); */
  };

  return (
    <>
      {typeof window !== "undefined" && (
        <PDFGenerator
          clientName={clientName}
          params={params}
          reviewsData={reviewsData}
          data={data}
          refreshPDF={refreshPDF}
          /* selectedDateOption={selectedDateOption}
          startDate={startDate}
          endDate={endDate} */
          setDataState={setDataState}
        />
      )}
      <UserBoxButton color="secondary" ref={ref} onClick={handleOpen}>
        <SettingsTwoToneIcon color="primary" fontSize="medium" />
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
              <>
                <CircularProgress size={17.5} sx={{ marginRight: "15px" }} />
              </>
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
    </>
  );
}

export default MenuSettings;
