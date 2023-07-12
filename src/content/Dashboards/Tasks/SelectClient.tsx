import { useRouter } from "next/router";
import { AlertColor, Box, MenuItem, TextField } from "@mui/material";
import { useContext, useEffect, useMemo, useState } from "react";
import { getClient } from "@/services";
import DataContext from "@/contexts/DataContext";

export interface Client {
  id: number;
  name: string;
  urlKey: string;
  phoneNumber: string;
}

const SelectClient = () => {
  const router = useRouter();
  const { setDataState } = useContext(DataContext);
  const [clients, setClients] = useState<Client[]>([]);
  const [clientName, setClientName] = useState<string>(() => {
    if (typeof window !== "undefined") {
      const selectedClient = localStorage.getItem("selectedClient");
      if (selectedClient) {
        return selectedClient;
      }
    }
    return "";
  });

  const handleGetClients = async (): Promise<void> => {
    try {
      const response: Client[] = await getClient();

      setClients(response);
    } catch (error) {
      const errorMessage = "Could not load clients, please try again later.";
      const severity: AlertColor = "error";

      setDataState({
        alertMessage: errorMessage,
        alertSeverity: severity,
        isAlertOpen: true
      });
    }
  };

  const handleChange = (event: React.ChangeEvent<{ value: unknown }>): void => {
    const selectedClient = event.target.value as string;
    setClientName(selectedClient);
    const selectedClientObj = clients.find((client) => client.urlKey === selectedClient);

    if (selectedClientObj) {
      setDataState({ clientId: selectedClientObj.id.toString() });
    }

    if (typeof window !== "undefined") {
      localStorage.setItem("selectedClient", selectedClient);
      localStorage.setItem("clientId", selectedClientObj.id.toString());
      router.push(`/dashboards/tasks?client=${selectedClient}`);
    }
  };

  const sortedClients = useMemo(() => {
    return clients.sort((a, b) => a.name.localeCompare(b.name));
  }, [clients]);

  useEffect(() => {
    handleGetClients();
  }, []);

  return (
    <Box sx={{ marginLeft: "10px", marginTop: "23px" }}>
      <TextField
        id="standard-select-currency"
        select
        value={clientName}
        onChange={handleChange}
        helperText="Please select the client"
        variant="standard"
        sx={{
          "& .MuiInputBase-root": {
            fontSize: "20px",
            height: "36px",
            fontWeight: "bold"
          }
        }}
      >
        {sortedClients
          .sort((a, b) => a.name.localeCompare(b.name))
          .map((client) => (
            <MenuItem key={client.id} value={client.urlKey}>
              {client.name}
            </MenuItem>
          ))}
      </TextField>
    </Box>
  );
};

export default SelectClient;
