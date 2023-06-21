import {
  Typography,
  Button,
  Box,
  alpha,
  lighten,
  Avatar,
  styled,
  CircularProgress
} from '@mui/material';
import DocumentScannerTwoToneIcon from '@mui/icons-material/DocumentScannerTwoTone';
import AddAlertTwoToneIcon from '@mui/icons-material/AddAlertTwoTone';
import { useContext, useEffect, useState } from 'react';
import ExportPDF from './ExportPDF/ExportPDF';
import { pdf } from '@react-pdf/renderer';
import DataContext from '@/contexts/DataContext';
import { saveAs } from 'file-saver';
import { getReviewsData } from '@/services';
import SelectClient from './SelectClient';

const AvatarPageTitle = styled(Avatar)(
  ({ theme }) => `
      width: ${theme.spacing(8)};
      height: ${theme.spacing(8)};
      color: ${theme.colors.primary.main};
      margin-right: ${theme.spacing(2)};
      background: ${theme.palette.mode === 'dark'
      ? theme.colors.alpha.trueWhite[10]
      : theme.colors.alpha.white[50]
    };
      box-shadow: ${theme.palette.mode === 'dark'
      ? '0 1px 0 ' +
      alpha(lighten(theme.colors.primary.main, 0.8), 0.2) +
      ', 0px 2px 4px -3px rgba(0, 0, 0, 0.3), 0px 5px 16px -4px rgba(0, 0, 0, .5)'
      : '0px 2px 4px -3px ' +
      alpha(theme.colors.alpha.black[100], 0.4) +
      ', 0px 5px 16px -4px ' +
      alpha(theme.colors.alpha.black[100], 0.2)
    };
`
);

function PageHeader({ clientName, params }) {
  const {
    reviewsData,
    setReviewsData,
    data,
    chartURI,
    donutURI,
    donut2URI,
    disabledButton,
    setDisabledButton } = useContext(DataContext);
  const [refresh, setRefresh] = useState(false);

  const totalReviews = reviewsData?.total;

  const handlePDF = async () => {
    setDisabledButton(true);

    await getReviewsData({ ...params, per_page: totalReviews })
      .then(response => setReviewsData(response))
      .catch(error => {
        console.log(error)
        return setDisabledButton(false);
      });
    setRefresh(true);
  }

  useEffect(() => {
    const getPDF = async () => {
      const props = getProps();
      const doc = <ExportPDF {...props} />;
      const asPdf = pdf(doc);
      asPdf.updateContainer(doc);
      const blob = await asPdf.toBlob();
      saveAs(blob, `${clientName}.pdf`);
      await getReviewsData(params)
        .then(response => {
          setReviewsData(response);
          setDisabledButton(false);
        })
        .catch(error => {
          console.log(error);
          setDisabledButton(false);
        });
    }

    if (refresh) {
      setRefresh(false);
      getPDF();
    }
  }, [refresh])

  const getProps = () => {
    return {
      data,
      reviewsData,
      chartURI,
      donutURI,
      donut2URI
    }
  }

  return (
    <Box
      display="flex"
      alignItems={{ xs: 'stretch', md: 'center' }}
      flexDirection={{ xs: 'column', md: 'row' }}
      justifyContent="space-between"
    >
      <Box display="flex" alignItems="center">
        <AvatarPageTitle variant="rounded">
          <AddAlertTwoToneIcon fontSize="large" />
        </AvatarPageTitle>
        <Box>
          <Box display="flex" alignItems="center" sx={{ marginBottom:"5px" }}>
            <Typography variant="h3" component="h3" gutterBottom>
              Welcome,
            </Typography>
            <SelectClient />
          </Box>
          <Typography variant="subtitle2">
            Monitor all your reviews in your new personal dashboard.
          </Typography>
        </Box>
      </Box>
      <Box mt={{ xs: 3, md: 0 }}>
        <Button
          variant="contained"
          startIcon={<DocumentScannerTwoToneIcon />}
          onClick={handlePDF}
          disabled={disabledButton} >
          {disabledButton ? (
            <div style={{
              paddingTop: "3px",
              paddingBottom: "-3px",
              paddingLeft: "13px",
              paddingRight: "13px"
            }}>
              <CircularProgress size={17.5} />
            </div>) :
            ("Export")}
        </Button>
      </Box>
    </Box>
  );
}

export default PageHeader;
