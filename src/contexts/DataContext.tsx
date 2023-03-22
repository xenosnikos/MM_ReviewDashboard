import { providers, ratings } from "@/helpers/constant";
import { createContext, ReactNode, useRef, useState } from "react";

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
  chartRef: any;
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
  const chartRef = useRef(null);
  
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
        chartRef }}>
      {children}
    </DataContext.Provider>
  );
};