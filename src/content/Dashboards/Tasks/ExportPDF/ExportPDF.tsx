import { Document, Page, Text, View, Image } from '@react-pdf/renderer';
import { styles } from './styles';

function ExportPDF({ data, reviewsData }) {
  const googleLogo = 'http://localhost:3000/static/images/reviewslogo/google-logo.png';
  const yelpLogo = 'http://localhost:3000/static/images/reviewslogo/yelp-logo.png';
  const yellowPagesLogo = 'http://localhost:3000/static/images/reviewslogo/yellow-pages-logo.png';

  const positive = data?.sourcesGraphData?.series
    ?.filter(value => value.name === '4 Stars' || value.name === '5 Stars')
    .reduce((prev, curr) => prev.concat(curr.data), [])
    .reduce((prev, curr) => prev + curr, 0);

  const neutral = data?.sourcesGraphData?.series
    ?.find(value => value.name === '3 Stars')
    .data.reduce((prev, curr) => prev + curr, 0);

  const negative = data?.sourcesGraphData?.series
    ?.filter(value => value.name === '2 Stars' || value.name === '1 Stars')
    .reduce((prev, curr) => prev.concat(curr.data), [])
    .reduce((prev, curr) => prev + curr, 0);

  const reviewsReverse = reviewsData?.data?.reverse();  

  return (
    <Document>
      <Page size="A4" style={styles.body}>
        <View style={[styles.header, styles.borderTop]}>
          <Text style={styles.textHeader}>Review Report - </Text>
          <Text style={styles.clientName}>{data?.clientName}</Text>
        </View>
        <View style={[styles.reviews, styles.borderTop, styles.borderBottom]}>
          <View style={styles.totalReviews}>
            <Text style={styles.textReviews}>Total Reviews:</Text>
            <Text style={styles.valueReviews}>{data?.totalReviews}</Text>
          </View>
          <View style={[styles.sectionReviews, styles.borderRight]}>
            <Text style={styles.textReviews}>Positive:</Text>
            <Text style={styles.valueReviews}>{positive}</Text>
          </View>
          <View style={[styles.sectionReviews, styles.borderRight]}>
            <Text style={styles.textReviews}>Neutral:</Text>
            <Text style={styles.valueReviews}>{neutral}</Text>
          </View>
          <View style={styles.sectionReviews}>
            <Text style={styles.textReviews}>Negative:</Text>
            <Text style={styles.valueReviews}>{negative}</Text>
          </View>
        </View>
        <View style={styles.sectionAverage}>
          <Text style={styles.title}>Average Rating</Text>
        </View>
        <View style={[styles.subSectionAverage, styles.borderBottom, styles.borderTop, styles.borderLeft, styles.borderRight]}>
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
        <View style={styles.sectionAverage}>
          <Text style={styles.title}>Source Table Data</Text>
        </View>
        <View style={[styles.subSectionMonth, styles.borderTop]}>
          <Text style={styles.title}>This Month</Text>
          <Text style={styles.title}>Last 30 Days</Text>
          <Text style={styles.title}>Last Month</Text>
          <Text style={styles.title}>This Year</Text>
          <Text style={styles.title}>Total Count</Text>
        </View>
        {data?.sourceTableData.map((value: any, index: number) => (
          <View key={index} style={[styles.tableData, styles.borderTop]}>
            <Text style={[styles.title, styles.box]}>{value.type}:</Text>
            <View style={styles.subSectionValues}>
              <Text>{value.thisMonth || "0"}</Text>
              <Text>{value.lastThirtyDaysCount || "0"}</Text>
              <Text>{value.lastMonth || "0"}</Text>
              <Text>{value.thisYear || "0"}</Text>
              <Text>{value.totalCount || "0"}</Text>
            </View>
          </View>
        ))}
        <View style={[styles.sectionAverage, styles.borderTop, styles.paddingTop]}>
          <Text style={styles.title}>Reviews</Text>
        </View>
        {reviewsReverse.map((value: any, index: number) => (
          <View key={index} style={[styles.reviewBox, styles.borderTop]} >
            <View style={styles.sectionReview}>
              <Image src={googleLogo} style={styles.logo}/>
              <Text style={styles.textDate}>{value.date}</Text>
            </View>
            <View style={styles.sectionReview}>
              <Text style={styles.textReviewer}>Review by {value.author}: {value.rating} stars</Text>              
            </View>
            <View style={styles.sectionReview}>
              <Text style={styles.textComment}>{value.review}</Text>              
            </View>
          </View>
        ))}
      </Page>
    </Document>
  );
};

export default ExportPDF;