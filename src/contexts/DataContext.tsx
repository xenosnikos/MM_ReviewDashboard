import { providers, ratings } from "@/helpers/constant";
import { createContext, ReactNode, useState } from "react";

interface DataContext {
  selectedSources: any[];
  setSelectedSources: (value: any[]) => void;
  selectedRatings: any[];
  setSelectedRatings: (value: any[]) => void;
  page: number;
  setPage: (value: number) => void;
  limit: number;
  setLimit: (value: number) => void;
  reviewsData: any;
  setReviewsData: (value: any) => void;
  data: any;
  setData: (value: any) => void;
  chartURI: any;
  setChartURI: (value: any) => void;
  donutURI: any;
  setDonutURI: (value: any) => void;
  donut2URI: any;
  setDonut2URI: (value: any) => void;
}

type Props = {
  children: ReactNode;
};

const DataContext = createContext<DataContext>({} as DataContext);
export default DataContext;

export const DataProvider = ({ children }: Props) => {
  const [selectedSources, setSelectedSources] = useState(providers);
  const [selectedRatings, setSelectedRatings] = useState(ratings);
  const [page, setPage] = useState<number>(0);
  const [limit, setLimit] = useState<number>(5);
  const [reviewsData, setReviewsData] = useState(null);
  const [data, setData] = useState(null);
  const [chartURI, setChartURI] = useState(null);
  const [donutURI, setDonutURI] = useState(null);
  const [donut2URI, setDonut2URI] = useState(null);
  
  return (
    <DataContext.Provider 
      value={{ 
        selectedSources, 
        setSelectedSources, 
        selectedRatings, 
        setSelectedRatings, 
        page, 
        setPage, 
        limit, 
        setLimit, 
        reviewsData, 
        setReviewsData,
        data, 
        setData,
        chartURI, 
        setChartURI,
        donutURI,
        setDonutURI,
        donut2URI, 
        setDonut2URI }}>
      {children}
    </DataContext.Provider>
  );
};