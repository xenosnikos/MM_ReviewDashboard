import { Document, Page, Text, View, Image } from "@react-pdf/renderer";
import { styles } from "./styles";
import {
  logo,
  negativeIcon,
  neutralIcon,
  positiveIcon,
  reviewIcon,
  star
} from "@/components/ReviewIcons/icons";

function DocPDF({ data, reviewsData, chartURI, donutURI, donut2URI, chartTitle }) {
  const reviews = reviewsData?.data;

  const { positive, neutral, negative } = (data?.sourcesGraphData?.series || []).reduce(
    (acc, value) => {
      switch (value.name) {
        case "5 Stars":
        case "4 Stars":
          acc.positive += value.data.reduce((prev, curr) => prev + curr, 0);
          break;
        case "3 Stars":
          acc.neutral += value.data.reduce((prev, curr) => prev + curr, 0);
          break;
        case "2 Stars":
        case "1 Stars":
          acc.negative += value.data.reduce((prev, curr) => prev + curr, 0);
          break;
        default:
          break;
      }
      return acc;
    },
    { positive: 0, neutral: 0, negative: 0 }
  );

  const backStyle = (index: number) => {
    if (index % 2 === 0) return styles.backColor;
  };

  const rating = (value: number) => {
    const stars = Array(value).fill(star);
    return (
      <View style={styles.rowStar}>
        {stars.map((star, index) => (
          <Image key={index} src={star} style={styles.star} />
        ))}
      </View>
    );
  };

  return (
    <Document>
      <Page size="A4" style={styles.body}>
        <View style={[styles.header, styles.borderTop]}>
          <Text style={styles.textHeader}>Review Report - </Text>
          <Text style={styles.clientName}>{data?.clientName}</Text>
        </View>
        <View style={[styles.reviews, styles.borderTop, styles.borderBottom]}>
          <View style={styles.totalReviews}>
            <Image src={reviewIcon} style={styles.reviewIcon} />
            <Text>Reviews</Text>
            <Text style={styles.valueReviews}>{data?.totalReviews}</Text>
          </View>
          <View style={[styles.sectionReviews, styles.borderRight]}>
            <Image src={positiveIcon} style={styles.emoji} />
            <Text>Positive</Text>
            <Text style={[styles.valueReviews, styles.colorPurple]}>{positive}</Text>
          </View>
          <View style={[styles.sectionReviews, styles.borderRight]}>
            <Image src={neutralIcon} style={styles.emoji} />
            <Text>Neutral</Text>
            <Text style={[styles.valueReviews, styles.colorPurple]}>{neutral}</Text>
          </View>
          <View style={styles.sectionReviews}>
            <Image src={negativeIcon} style={styles.emoji} />
            <Text>Negative</Text>
            <Text style={[styles.valueReviews, styles.colorPurple]}>{negative}</Text>
          </View>
        </View>
        <View style={styles.sectionAverage}>
          <Text style={styles.title}>Average Rating</Text>
        </View>
        <View
          style={[
            styles.subSectionAverage,
            styles.borderBottom,
            styles.borderTop,
            styles.borderLeft,
            styles.borderRight
          ]}
        >
          <Text style={styles.valueAverage}>{data?.averageRating}</Text>
          <View style={styles.sourceBreakdown}>
            {data?.reviewSourceBreakDown.map((value: any, index: number) => (
              <View key={index} style={styles.table}>
                <Text style={styles.textBreakdown}>{value.type}</Text>
                <Text style={styles.subTextBreakdown}>({value.count}%)</Text>
              </View>
            ))}
          </View>
        </View>
        <View style={[styles.sectionAverage, styles.paddingTopChart]}>
          <Text style={styles.title}>{chartTitle}</Text>
        </View>
        <View style={[styles.center, styles.borderTop]}>
          <Image src={chartURI} style={styles.chartImage} />
        </View>
        <View
          style={[
            styles.sectionAverage,
            styles.donutsCharts,
            styles.paddingTopChart,
            styles.borderTop
          ]}
        >
          <Text style={styles.title}>Star Rating Breakdown</Text>
          <Text style={styles.title}>Review Source Breakdown</Text>
        </View>
        <View style={[styles.donutsCharts, styles.paddingBottom, styles.borderBottom]}>
          <View style={styles.borderRight}>
            <Image src={donutURI} />
          </View>
          <View>
            <Image src={donut2URI} />
          </View>
        </View>
        <View wrap={false}>
          <View style={styles.sectionAverage}>
            <Text style={styles.title}>Source Table Data</Text>
          </View>
          <View style={[styles.subSectionMonth, styles.borderTop]}>
            <View style={styles.section20}>
              <Text style={styles.title}>Source</Text>
            </View>
            <View style={styles.section16}>
              <Text style={styles.title}>This Month</Text>
            </View>
            <View style={styles.section16}>
              <Text style={styles.title}>Last 30 Days</Text>
            </View>
            <View style={styles.section16}>
              <Text style={styles.title}>Last Month</Text>
            </View>
            <View style={styles.section16}>
              <Text style={styles.title}>This Year</Text>
            </View>
            <View style={styles.section16}>
              <Text style={styles.title}>Total Count</Text>
            </View>
          </View>
          {data?.sourceTableData.map((value: any, index: number) => (
            <View key={index} style={[styles.tableData, styles.borderTop]}>
              <View style={styles.section20}>
                <Text style={styles.title}>{value.type}:</Text>
              </View>
              <View style={styles.section16}>
                <Text>{value.thisMonth || "0"}</Text>
              </View>
              <View style={styles.section16}>
                <Text>{value.lastThirtyDaysCount || "0"}</Text>
              </View>
              <View style={styles.section16}>
                <Text>{value.lastMonth || "0"}</Text>
              </View>
              <View style={styles.section16}>
                <Text>{value.thisYear || "0"}</Text>
              </View>
              <View style={styles.section16}>
                <Text>{value.totalCount || "0"}</Text>
              </View>
            </View>
          ))}
        </View>
        <View
          style={[
            styles.sectionAverage,
            styles.borderTop,
            styles.borderBottom,
            styles.paddingTop
          ]}
        >
          <Text style={styles.title}>Reviews</Text>
        </View>
        {reviews.map((review: any, index: number) => (
          <View
            key={index}
            wrap={false}
            style={[styles.reviewBox, styles.borderBottom, backStyle(index)]}
          >
            <View style={styles.sectionReview}>
              <View style={styles.sectionLogo}>
                <Image src={logo(review.type)} style={styles.logo} />
              </View>
              <Text style={styles.textDate}>
                {review.date} - {data.clientName}
              </Text>
            </View>
            <View style={styles.sectionReview}>
              <Text style={styles.textReviewer}>Review by {review.author}:</Text>
              {rating(review.rating)}
            </View>
            <View style={styles.sectionReview}>
              <Text style={styles.textComment}>
                {review.review ? review.review : "(No comments)"}
              </Text>
            </View>
          </View>
        ))}
      </Page>
    </Document>
  );
}

export default DocPDF;
