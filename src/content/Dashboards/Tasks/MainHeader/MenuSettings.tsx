import { useContext, useEffect, useRef, useState } from "react";
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
import ExportPDF from "../ExportPDF/ExportPDF";
import { pdf } from "@react-pdf/renderer";
import { saveAs } from "file-saver";
import SignOut from "./SignOut";

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
    reviewsData,
    data,
    chartURI,
    donutURI,
    donut2URI,
    disabledButton,
    setDataState
  } = useContext(DataContext);
  const [refresh, setRefresh] = useState(false);

  const totalReviews = reviewsData?.total;

  const handlePDF = async () => {
    setDataState({
      disabledButton: true
    });

    try {
      const response = await getReviewsData({ ...params, per_page: totalReviews });

      setDataState({
        reviewsData: response
      });
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

    setRefresh(true);
  };

  useEffect(() => {
    const getPDF = async () => {
      const props = getProps();
      const doc = <ExportPDF {...props} />;
      const asPdf = pdf(doc);
      asPdf.updateContainer(doc);
      const blob = await asPdf.toBlob();
      saveAs(blob, `${clientName}.pdf`);

      try {
        const response = await getReviewsData(params);

        setDataState({
          reviewsData: response,
          disabledButton: false
        });
        setOpen(false);
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

    if (refresh) {
      setRefresh(false);
      getPDF();
    }
  }, [refresh]);

  const getProps = () => {
    return {
      data,
      reviewsData,
      chartURI,
      donutURI,
      donut2URI
    };
  };

  return (
    <>
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
          <ListItem button onClick={handlePDF}>
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
    </>
  );
}

export default MenuSettings;
