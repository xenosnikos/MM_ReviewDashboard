import { filterProvider, providers, ratings } from "@/helpers/constant";
import { createContext, ReactNode, useState } from "react";

interface DataContext {
  [key: string]: any;
}

type Props = {
  children: ReactNode;
};

const DataContext = createContext<DataContext>({} as DataContext);
export default DataContext;

function clientId() {
  if (typeof window !== "undefined") {
    const clientId = localStorage.getItem("clientId");
    if (clientId) {
      return clientId;
    }
  }
  return "";
}

const initialDataState = {
  selectedSources: providers,
  selectedRatings: ratings,
  page: 0,
  limit: 5,
  currentTab: "overview",
  reviewsData: null,
  data: null,
  disabledButton: false,
  requiredTextError: false,
  requiredPassError: false,
  alertMessage: "",
  alertSeverity: "error",
  isAlertOpen: false,
  isConfirmOpen: false,
  refresh: false,
  links: [],
  filter: filterProvider[0],
  refreshPDF: false,
  selectedDateOption: "all",
  startDate: null,
  endDate: null,
  chartTitle: "",
  clientId: clientId(),
  emails: []
};

type DataState = typeof initialDataState;

export const DataProvider = ({ children }: Props) => {
  const [dataState, setDataState] = useState<DataState>(initialDataState);

  const updateDataState = (updatedState: Partial<DataState>) => {
    setDataState((prevState) => ({
      ...prevState,
      ...updatedState
    }));
  };

  const value: DataContext = {
    ...dataState,
    setDataState: updateDataState
  };

  return <DataContext.Provider value={value}>{children}</DataContext.Provider>;
};
