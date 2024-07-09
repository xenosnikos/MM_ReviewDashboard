import Head from "next/head";
import { ChangeEvent, useContext, useEffect, useState } from "react";
import { useRouter } from "next/router";
import PageHeader from "@/content/Dashboards/Tasks/MainHeader/MainHeader";
import Footer from "@/components/Footer";
import {
  Grid,
  Tab,
  Tabs,
  Container,
  Card,
  Box,
  useTheme,
  styled,
  AlertColor
} from "@mui/material";
import PageTitleWrapper from "@/components/PageTitleWrapper";

import AverageStartRating from "@/content/Dashboards/Tasks/OverviewTab/AverageStartRating";
import TotalReviews from "@/content/Dashboards/Tasks/OverviewTab/TotalReviews";
import ReviewGrowth from "@/content/Dashboards/Tasks/OverviewTab/ReviewGrowth";
import StarRatingBreakDown from "@/content/Dashboards/Tasks/OverviewTab/StarRatingBreakDown";
import ReviewSourceBreakDown from "@/content/Dashboards/Tasks/OverviewTab/ReviewSourceBreakDown";
import ReviewsTable from "@/content/Dashboards/Tasks/ReviewsTab/ReviewsTable";
import SourceGraph from "@/content/Dashboards/Tasks/SourcesTab/SourceGraph";
import SourceTable from "@/content/Dashboards/Tasks/SourcesTab/SourceTable";

import { getDashboardData, getReviewsData } from "@/services";
import DataContext from "@/contexts/DataContext";
import SocialPages from "@/content/Dashboards/Tasks/SocialPagesTab/SocialPages";
import CustomAlert from "@/components/CustomAlert";
import { DashboardDataResponse, ReviewsDataResponse } from "@/models";
import ClientEmailPage from "@/content/Dashboards/Tasks/ClientsEmail/ClientEmailPage";

const TabsContainerWrapper = styled(Box)(
  ({ theme }) => `
      padding: 0 ${theme.spacing(2)};
      position: relative;
      bottom: -1px;

      .MuiTabs-root {
        height: 44px;
        min-height: 44px;
      }

      .MuiTabs-indicator {
          min-height: 4px;
          height: 4px;
          box-shadow: none;
          bottom: -4px;
          background: none;
          border: 0;

          &:after {
            position: absolute;
            left: 50%;
            width: 28px;
            content: ' ';
            margin-left: -14px;
            background: ${theme.colors.primary.main};
            border-radius: inherit;
            height: 100%;
          }
      }

      .MuiTab-root {
          &.MuiButtonBase-root {
              height: 44px;
              min-height: 44px;
              background: ${theme.colors.alpha.white[50]};
              border: 1px solid ${theme.colors.alpha.black[10]};
              border-bottom: 0;
              position: relative;
              margin-right: ${theme.spacing(1)};
              font-size: ${theme.typography.pxToRem(14)};
              color: ${theme.colors.alpha.black[80]};
              border-bottom-left-radius: 0;
              border-bottom-right-radius: 0;

              .MuiTouchRipple-root {
                opacity: .1;
              }

              &:after {
                position: absolute;
                left: 0;
                right: 0;
                width: 100%;
                bottom: 0;
                height: 1px;
                content: '';
                background: ${theme.colors.alpha.black[10]};
              }

              &:hover {
                color: ${theme.colors.alpha.black[100]};
              }
          }

          &.Mui-selected {
              color: ${theme.colors.alpha.black[100]};
              background: ${theme.colors.alpha.white[100]};
              border-bottom-color: ${theme.colors.alpha.white[100]};

              &:after {
                height: 0;
              }
          }
      }
  `
);

function DashboardTasks() {
  const router = useRouter();
  const theme = useTheme();
  const {
    currentTab,
    data,
    selectedSources,
    selectedRatings,
    page,
    limit,
    setDataState
  } = useContext(DataContext);

  const [monthReview, setMonthReview] = useState(0);
  const { client } = router.query;
  const clientId = typeof client === "string" ? client : "";

  const tabs = [
    { value: "overview", label: "Overview" },
    { value: "reviews", label: "Reviews" },
    { value: "sources", label: "Sources" },
    { value: "social_pages", label: "Social Pages" },
    { value: "clients_email", label: "Clients Email" }
  ];

  const handleTabsChange = (_event: ChangeEvent<{}>, value: string): void => {
    setDataState({
      currentTab: value,
      page: 0
    });
  };

  const params = {
    client: clientId,
    per_page: limit,
    page: page + 1,
    sources: JSON.stringify(selectedSources),
    ratings: JSON.stringify(selectedRatings)
  };

  useEffect(() => {
    const getData = async () => {
      try {
        const response: ReviewsDataResponse = await getReviewsData(params);

        setDataState({
          reviewsData: response
        });
      } catch (error) {
        const errorMessage = "Could not load reviews, please try again later.";
        const severity: AlertColor = "error";

        setDataState({
          alertMessage: errorMessage,
          alertSeverity: severity,
          isAlertOpen: true
        });
      }
    };

    if (typeof client === "string") {
      getData();
    }
  }, [page, limit, selectedSources, selectedRatings, client]);

  useEffect(() => {
    const getData = async () => {
      try {
        const response: DashboardDataResponse = await getDashboardData(clientId);
        setDataState({
          data: response,
          disabledButton: false
        });
      } catch (error) {
        const errorMessage = "Could not load data, please try again later.";
        const severity: AlertColor = "error";

        setDataState({
          disabledButton: false,
          alertMessage: errorMessage,
          alertSeverity: severity,
          isAlertOpen: true
        });
      }
    };

    if (typeof client === "string") {
      getData();
    }
  }, [client]);

  return (
    <>
      <Head>
        <title>Maxxmedia Dashboard</title>
      </Head>
      <PageTitleWrapper>
        <PageHeader clientName={data?.clientName || ""} params={params} />
      </PageTitleWrapper>
      <Container maxWidth="lg">
        <TabsContainerWrapper>
          <Tabs
            onChange={handleTabsChange}
            value={currentTab}
            variant="scrollable"
            scrollButtons="auto"
            textColor="primary"
            indicatorColor="primary"
          >
            {tabs.map((tab) => (
              <Tab key={tab.value} label={tab.label} value={tab.value} />
            ))}
          </Tabs>
        </TabsContainerWrapper>
        <Card variant="outlined">
          <Box p={4}>
            <Grid
              container
              direction="row"
              justifyContent="center"
              alignItems="stretch"
              spacing={4}
            >
              {currentTab === "overview" && (
                <>
                  <Grid item xs={4}>
                    <Box display="flex" flexDirection="column" gap={2}>
                      <AverageStartRating
                        rating={
                          data?.averageRating ? parseFloat(data.averageRating) : null
                        }
                      />
                      <TotalReviews
                        amount={monthReview > 0 ? monthReview : data?.totalReviews}
                      />
                    </Box>
                  </Grid>
                  <Grid item xs={8}>
                    <Box
                      p={4}
                      sx={{
                        background: `${theme.colors.alpha.black[5]}`
                      }}
                    >
                      <ReviewGrowth setMonth={setMonthReview} />
                    </Box>
                  </Grid>
                  <Grid item xs={6}>
                    <StarRatingBreakDown
                      data={data?.starRatingBreakdown}
                      total={monthReview > 0 ? monthReview : data?.totalReviews}
                    />
                  </Grid>
                  <Grid item xs={6}>
                    <ReviewSourceBreakDown data={data?.reviewSourceBreakDown} />
                  </Grid>
                </>
              )}
              {currentTab === "reviews" && (
                <Grid item xs={12}>
                  <ReviewsTable />
                </Grid>
              )}
              {currentTab === "sources" && (
                <>
                  <Grid item xs={12}>
                    <SourceGraph data={data?.sourcesGraphData?.series} />
                  </Grid>
                  <Grid item xs={12}>
                    <SourceTable data={data?.sourceTableData} />
                  </Grid>
                </>
              )}
              {currentTab === "social_pages" && (
                <Grid item xs={12}>
                  <SocialPages />
                </Grid>
              )}
              {currentTab === "clients_email" && (
                <Grid item xs={12}>
                  <ClientEmailPage />
                </Grid>
              )}
            </Grid>
          </Box>
        </Card>
        <CustomAlert />
      </Container>
      <Footer />
    </>
  );
}

DashboardTasks.getLayout = (page) => page;

export default DashboardTasks;
