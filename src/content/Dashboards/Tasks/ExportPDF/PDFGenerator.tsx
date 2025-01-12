import { useContext, useEffect } from "react";
import ApexCharts from "apexcharts";
import { pdf } from "@react-pdf/renderer";
import { saveAs } from "file-saver";
import DocPDF from "./DocPDF";
import { getReviewsData } from "@/services";
import { providers } from "@/helpers/constant";
import DataContext from "@/contexts/DataContext";

function PDFGenerator({
  clientName,
  params,
  reviewsData,
  data,
  refreshPDF,
  chartTitle,
  selectedSources,
  setDataState
}) {
  const { startDate, endDate } = useContext(DataContext);

  useEffect(() => {
    let isMounted = true;

    const generatePDF = async () => {
      if (!data || !reviewsData || !refreshPDF) return;

      try {
        // Add delay to ensure charts are rendered
        await new Promise((resolve) => setTimeout(resolve, 2000));

        const props = await getProps();
        const doc = <DocPDF {...props} />;
        const asPdf = pdf(doc);
        asPdf.updateContainer(doc);
        const blob = await asPdf.toBlob();

        if (!isMounted) return;

        saveAs(blob, `${clientName}.pdf`);

        const response = await getReviewsData(params);

        if (!isMounted) return;

        setDataState({
          reviewsData: response,
          selectedSources: providers,
          disabledButton: false,
          refreshPDF: false
        });
      } catch (error) {
        if (!isMounted) return;

        console.error("Error generating PDF:", error);
        setDataState({
          alertMessage: "Something went wrong, please try again later.",
          alertSeverity: "error",
          isAlertOpen: true,
          disabledButton: false,
          refreshPDF: false
        });
      }
    };

    generatePDF();

    return () => {
      isMounted = false;
    };
  }, [refreshPDF, data, reviewsData]);

  const getProps = async () => {
    const chartInstance = ApexCharts.getChartByID("review-chart");
    const chartInstance2 = ApexCharts.getChartByID("star-donut");
    const chartInstance3 = ApexCharts.getChartByID("review-donut");

    const base64 = await chartInstance.dataURI();
    const base642 = await chartInstance2.dataURI();
    const base643 = await chartInstance3.dataURI();

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
      donut2URI,
      chartTitle,
      selectedSources,
      startDate,
      endDate
    };
  };

  return null;
}

export default PDFGenerator;
