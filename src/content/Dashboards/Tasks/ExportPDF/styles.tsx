import { StyleSheet } from '@react-pdf/renderer';

export const styles = StyleSheet.create({
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
    backgroundColor: '#efefef',
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
    backgroundColor: '#efefef',
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
    columnGap: 5,
  },
  valueReviews: {
    fontSize: 16,
  },
  colorOrange: {
    color: '#ff7f44',
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
    backgroundColor: '#efefef'
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
    paddingBottom: 10,
    fontSize: 13
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
  },
  reviewBox: {
    width: '100%',
    height: 'auto',
    padding: 7
  },
  backColor: {
    backgroundColor: '#efefef'
  },
  sectionReview: {
    width: '100%',
    height: 30,
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
  logo: {
    width: 60,
    height: 60
  },
  textDate: {
    marginRight: 5,
    fontFamily: 'Times-Italic',
    fontSize: 11,
  },
  textReviewer: {
    fontFamily: 'Times-Bold',
    fontSize: 11,
    paddingLeft: 7
  },
  textComment: {
    fontSize: 11,
    paddingLeft: 7
  },
  paddingTop: {
    paddingTop: 30
  },
  rowStar: {
    flexDirection: 'row',
    paddingLeft: 5
  },
  star: {
    width: 10,
    height: 10,
  },
  emoji: {
    width: 17.5,
    height: 17.5
  }
});