import { Document, Page, Text, View, StyleSheet, Image } from '@react-pdf/renderer';

function ExportPDF({ data, pdfUrl }) {
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

  const styles = StyleSheet.create({
    body: {
      flexDirection: 'column',
      backgroundColor: '#FFFFFF',
      padding: 20,
      fontFamily: 'Times-Roman',
      fontSize: 12,
      width: '100%',
      color: '#3d3d3d'
    },
    header: {
      flexDirection: 'row',
      justifyContent: 'flex-start',
      alignItems: 'center',
      paddingLeft: 15,
      width: '100%',
      height: 30,
      backgroundColor: '#dce5ed',
    },
    textHeader: {
      fontSize: 13,
      fontFamily: 'Times-Bold',
    },
    clientName: {
      fontFamily: 'Times-Italic',
      fontSize: 11
    },
    reviews: {
      flexDirection: 'row',
      justifyContent: 'flex-start',
      alignItems: 'center',
      width: '100%',
      height: 45,
      backgroundColor: '#dce5ed',
    },
    totalReviews: {
      flexDirection: 'row',
      justifyContent: 'center',
      alignItems: 'center',
      width: 120,
      height: '100%',
      backgroundColor: '#ff7f44',
      color: '#FFFFFF',
      borderBottomRightRadius: 50,
      borderTopRightRadius: 50,
    },
    textReviews: {
      paddingRight: 5
    },
    valueReviews: {
      fontSize: 16,
    },
    sectionReviews: {
      flexDirection: 'row',
      justifyContent: 'center',
      alignItems: 'center',
      width: 100,
      height: '100%',
      columnGap: 5,
    },
    sectionAverage: {
      width: '100%',
      paddingLeft: 15,
      paddingTop: 20,
      marginBottom: -8,
      flexDirection: 'row'
    },
    subSectionAverage: {
      width: '100%',
      height: 60,
      paddingLeft: 15,
      paddingRight: 15,
      paddingTop: 10,
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'space-between',
    },
    valueAverage: {
      fontSize: 18,
      fontFamily: 'Times-Bold',
    },
    sourceBreakdown: {
      width: '100%',
      display: 'flex',
      flexDirection: 'row',
      justifyContent: 'space-between',
      paddingBottom: 5
    },
    textBreakdown: {
      marginRight: 5,
      fontFamily: 'Times-Italic',
      fontSize: 11,
      color: '#ff7f44'
    },
    subTextBreakdown: {
      fontFamily: 'Times-Bold',
      fontSize: 10,
    },
    subSectionMonth: {
      width: '100%',
      flexDirection: 'row',
      justifyContent: 'space-between',
      paddingLeft: 80,
      paddingRight: 20,
      columnGap: 30,
      paddingTop: 10,
      backgroundColor: '#dce5ed'
    },
    subSectionValues: {
      display: 'flex',
      flexDirection: 'row',
      justifyContent: 'space-between',
      width: '100%',
    },
    title: {
      marginRight: 5,
      fontFamily: 'Times-Bold',
      paddingBottom: 10
    },
    table: {
      flexDirection: 'row',
      textAlign: 'center'
    },
    tableData: {
      paddingTop: 10,
      paddingRight: 50,
      paddingLeft: 10,
      flexDirection: 'row'
    },
    borderTop: {
      borderTop: '1px solid #aaaaaa'
    },
    borderBottom: {
      borderBottom: '1px solid #aaaaaa'
    },
    borderRight: {
      borderRight: '1px solid #aaaaaa'
    },
    borderLeft: {
      borderLeft: '1px solid #aaaaaa'
    },
    box: {
      width: 75,
    }
  });

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
        <Image src={pdfUrl} />
      </Page>
    </Document>
  );
};

export default ExportPDF;