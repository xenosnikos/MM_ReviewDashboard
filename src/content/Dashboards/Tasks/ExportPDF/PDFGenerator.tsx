import { useEffect } from "react";
import ApexCharts from "apexcharts";
import { pdf } from "@react-pdf/renderer";
import { saveAs } from "file-saver";
import ExportPDF from "./ExportPDF";
import { getReviewsData } from "@/services";

const PDFGenerator = ({
  clientName,
  params,
  reviewsData,
  data,
  refreshPDF,
  setDataState
}) => {
  useEffect(() => {
    const generatePDF = async () => {
      const props = await getProps();
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
      } catch (error) {
        const errorMessage = "Something went wrong, please try again later.";
        const severity = "error";

        setDataState({
          alertMessage: errorMessage,
          alertSeverity: severity,
          isAlertOpen: true,
          disabledButton: false
        });
      }
    };

    if (refreshPDF) {
      setDataState({ refreshPDF: false });
      generatePDF();
    }
  }, [refreshPDF]);

  const getProps = async () => {
    const chartInstance = ApexCharts.getChartByID("review-chart");
    const chartInstance2 = ApexCharts.getChartByID("star-donut");
    const chartInstance3 = ApexCharts.getChartByID("review-donut");
    /* const chartInstance4 = ApexCharts.getChartByID("source-chart"); */

    const base64 = await chartInstance.dataURI();
    const base642 = await chartInstance2.dataURI();
    const base643 = await chartInstance3.dataURI();
    /* const base644 = await chartInstance4.dataURI(); */

    let chartURI: any;
    let donutURI: any;
    let donut2URI: any;

    if ("imgURI" in base64 && "imgURI" in base642 && "imgURI" in base643) {
      chartURI = base64.imgURI;
      donutURI = base642.imgURI;
      donut2URI = base643.imgURI;
    }

    return {
      data,
      reviewsData,
      chartURI,
      donutURI,
      donut2URI
    };
  };

  return null;
};

export default PDFGenerator;
