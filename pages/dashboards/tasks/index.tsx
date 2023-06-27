import Head from 'next/head';
import { ChangeEvent, useContext, useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import PageHeader from '@/content/Dashboards/Tasks/PageHeader';
import Footer from '@/components/Footer';
import {
  Grid,
  Tab,
  Tabs,
  Container,
  Card,
  Box,
  useTheme,
  styled,
} from '@mui/material';
import PageTitleWrapper from '@/components/PageTitleWrapper';

import AverageStartRating from '@/content/Dashboards/Tasks/AverageStartRating';
import TotalReviews from '@/content/Dashboards/Tasks/TotalReviews';
import ReviewGrowth from '@/content/Dashboards/Tasks/ReviewGrowth';
import StarRatingBreakDown from '@/content/Dashboards/Tasks/StarRatingBreakDown';
import ReviewSourceBreakDown from '@/content/Dashboards/Tasks/ReviewSourceBreakDown';
import ReviewsTable from '@/content/Dashboards/Tasks/ReviewsTable';
import SourceGraph from '@/content/Dashboards/Tasks/SourceGraph';
import SourceTable from '@/content/Dashboards/Tasks/SourceTable';

import { getDashboardData, getReviewsData } from '@/services';
import DataContext from '@/contexts/DataContext';
import SocialPages from '@/content/Dashboards/Tasks/SocialPages';

const TabsContainerWrapper = styled(Box)(
  ({ theme }) => `
      padding: 0 ${theme.spacing(2)};
      position: relative;
      bottom: -1px;

      .MuiTabs-root {
        height: 44px;
        min-height: 44px;
      }

      .MuiTabs-scrollableX {
        overflow-x: auto !important;
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
    data,
    setData,
    selectedSources,
    selectedRatings,
    page,
    setPage,
    limit,
    reviewsData,
    setReviewsData,
    setDisabledButton } = useContext(DataContext);

  const { client } = router.query;
  const clientString = typeof client === 'string' ? client : '';

  const [currentTab, setCurrentTab] = useState<string>('overview');

  const tabs = [
    { value: 'overview', label: 'Overview' },
    { value: 'reviews', label: 'Reviews' },
    { value: 'sources', label: 'Sources' },
    { value: 'social_pages', label: 'Social Pages' }
  ];

  const handleTabsChange = (_event: ChangeEvent<{}>, value: string): void => {
    setCurrentTab(value);
    setPage(1);
  };

  const params = {
    client: clientString,
    per_page: limit,
    page: page,
    sources: JSON.stringify(selectedSources),
    ratings: JSON.stringify(selectedRatings)
  }

  useEffect(() => {
    const getData = async () => {
      await getReviewsData(params)
        .then(response => setReviewsData(response))
        .catch(error => console.log(error));
    }

    if (typeof client === 'string') {
      getData();
    }
  }, [page, limit, selectedSources, selectedRatings, client]);

  useEffect(() => {
    const getData = async () => {
      await getDashboardData(clientString)
        .then(response => {
          setData(response);
          setDisabledButton(false);
        })
        .catch(error => {
          console.log(error);
          setDisabledButton(false);
        });
    }
    if (typeof client === 'string') {
      getData();
    }
  }, [client]);

  useEffect(() => {
    console.log(data);
    console.log(reviewsData)
  }, [data]);

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
              {currentTab === 'overview' && (
                <>
                  <Grid item xs={4}>
                    <Box display="flex" flexDirection="column" gap={2}>
                      <AverageStartRating
                        rating={data?.averageRating ? parseFloat(data.averageRating) : null}
                      />
                      <TotalReviews
                        amount={data?.totalReviews}
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
                      <ReviewGrowth
                        params={params}
                      />
                    </Box>
                  </Grid>
                  <Grid item xs={6}>
                    <StarRatingBreakDown
                      data={data?.starRatingBreakdown}
                    />
                  </Grid>
                  <Grid item xs={6}>
                    <ReviewSourceBreakDown
                      data={data?.reviewSourceBreakDown}
                    />
                  </Grid>
                </>
              )}
              {currentTab === 'reviews' && (
                <Grid item xs={12}>
                  <ReviewsTable />
                </Grid>
              )}
              {currentTab === 'sources' && (
                <>
                  <Grid item xs={12}>
                    <SourceGraph
                      data={data?.sourcesGraphData?.series}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <SourceTable
                      data={data?.sourceTableData}
                    />
                  </Grid>
                </>
              )}
              {currentTab === 'social_pages' && (
                <Grid item xs={12}>
                  <SocialPages />
                </Grid>
              )}
            </Grid>
          </Box>
        </Card>
      </Container>
      <Footer />
    </>
  );
}

DashboardTasks.getLayout = (page) => page;

export default DashboardTasks;
