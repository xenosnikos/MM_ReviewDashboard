import { StyleSheet } from "@react-pdf/renderer";

export const styles = StyleSheet.create({
  body: {
    flexDirection: "column",
    backgroundColor: "#FFFFFF",
    padding: 20,
    fontFamily: "Times-Roman",
    fontSize: 12,
    width: "100%",
    color: "#3d3d3d"
  },
  header: {
    flexDirection: "row",
    justifyContent: "flex-start",
    alignItems: "center",
    paddingLeft: 15,
    width: "100%",
    height: 30,
    backgroundColor: "#efefef"
  },
  textHeader: {
    fontSize: 13,
    fontFamily: "Times-Bold"
  },
  clientName: {
    fontFamily: "Times-Italic",
    fontSize: 11
  },
  reviews: {
    flexDirection: "row",
    justifyContent: "flex-start",
    alignItems: "center",
    width: "100%",
    height: 45,
    backgroundColor: "#efefef"
  },
  totalReviews: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    width: 120,
    height: "100%",
    backgroundColor: "#ff7f44",
    color: "#FFFFFF",
    borderBottomRightRadius: 50,
    borderTopRightRadius: 50,
    columnGap: 5
  },
  valueReviews: {
    fontSize: 16
  },
  colorOrange: {
    color: "#ff7f44"
  },
  colorPurple: {
    color: "#8D7CF1"
  },
  sectionReviews: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    width: 100,
    height: "100%",
    columnGap: 5
  },
  sectionAverage: {
    width: "100%",
    paddingLeft: 15,
    paddingTop: 20
  },
  subSectionAverage: {
    width: "100%",
    height: 60,
    paddingLeft: 15,
    paddingRight: 15,
    paddingTop: 10,
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between"
  },
  valueAverage: {
    fontSize: 18,
    fontFamily: "Times-Bold"
  },
  sourceBreakdown: {
    width: "100%",
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    paddingBottom: 5
  },
  textBreakdown: {
    marginRight: 5,
    fontFamily: "Times-Italic",
    fontSize: 11,
    color: "#ff7f44"
  },
  subTextBreakdown: {
    fontFamily: "Times-Bold",
    fontSize: 10
  },
  subSectionMonth: {
    width: "100%",
    flexDirection: "row",
    paddingTop: 10,
    backgroundColor: "#efefef"
  },
  section20: {
    width: "20%",
    paddingLeft: 20
  },
  section16: {
    width: "16%"
  },
  title: {
    marginRight: 5,
    fontFamily: "Times-Bold",
    paddingBottom: 10,
    fontSize: 13
  },
  table: {
    flexDirection: "row",
    textAlign: "center"
  },
  tableData: {
    width: "100%",
    paddingTop: 10,
    flexDirection: "row"
  },
  borderTop: {
    borderTop: "1px solid #aaaaaa"
  },
  borderBottom: {
    borderBottom: "1px solid #aaaaaa"
  },
  borderRight: {
    borderRight: "1px solid #aaaaaa"
  },
  borderLeft: {
    borderLeft: "1px solid #aaaaaa"
  },
  reviewBox: {
    width: "100%",
    height: "auto",
    padding: 7
  },
  backColor: {
    backgroundColor: "#efefef"
  },
  sectionReview: {
    width: "100%",
    marginTop: 10,
    marginBottom: 10,
    wrap: true,
    flexDirection: "row",
    justifyContent: "flex-start",
    alignItems: "center"
  },
  sectionLogo: {
    width: 50,
    display: "flex",
    alignItems: "center"
  },
  logo: {
    width: 40
  },
  textDate: {
    marginRight: 5,
    fontFamily: "Times-Italic",
    fontSize: 11
  },
  textReviewer: {
    fontFamily: "Times-Bold",
    fontSize: 11,
    paddingLeft: 7
  },
  textComment: {
    fontSize: 11,
    paddingLeft: 7,
    paddingRight: 7
  },
  paddingTopChart: {
    paddingTop: 50
  },
  paddingTop: {
    paddingTop: 30
  },
  paddingBottom: {
    paddingBottom: 20
  },
  rowStar: {
    flexDirection: "row",
    paddingLeft: 5
  },
  star: {
    width: 10,
    height: 10
  },
  reviewIcon: {
    width: 25
  },
  emoji: {
    width: 17.5,
    height: 17.5
  },
  center: {
    width: "100%",
    display: "flex",
    justifyContent: "center",
    alignItems: "center"
  },
  chartImage: {
    width: 500
  },
  donutsCharts: {
    width: "100%",
    flexDirection: "row",
    justifyContent: "space-around"
  }
});
