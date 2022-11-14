import Head from 'next/head';
import SidebarLayout from '@/layouts/SidebarLayout';
import { ChangeEvent, useState } from 'react';
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
  const theme = useTheme();

  const [currentTab, setCurrentTab] = useState<string>('overview');

  const tabs = [
    { value: 'overview', label: 'Overview' },
    { value: 'reviews', label: 'Reviews' },
    { value: 'sources', label: 'Sources' }
  ];

  const handleTabsChange = (_event: ChangeEvent<{}>, value: string): void => {
    setCurrentTab(value);
  };

  return (
    <>
      <Head>
        <title>Tasks Dashboard</title>
      </Head>
      <PageTitleWrapper>
        <PageHeader />
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
                      <AverageStartRating />
                      <TotalReviews />
                    </Box>
                  </Grid>
                  <Grid item xs={8}>
                    <Box
                      p={4}
                      sx={{
                        background: `${theme.colors.alpha.black[5]}`
                      }}
                    >
                      <ReviewGrowth />
                    </Box>
                  </Grid>
                  <Grid item xs={6}>
                    <StarRatingBreakDown />
                  </Grid>
                  <Grid item xs={6}>
                    <ReviewSourceBreakDown />
                  </Grid>
                </>
              )}
              {currentTab === 'reviews' && (
                <Grid item xs={12}>
                  <ReviewsTable />
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
