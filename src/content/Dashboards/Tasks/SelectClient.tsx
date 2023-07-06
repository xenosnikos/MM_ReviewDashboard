import { useRouter } from "next/router";
import { Box, MenuItem, TextField } from "@mui/material";
import { useContext, useEffect, useState } from "react";
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
      console.log(error);
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
      const currentUrl = new URL(window.location.href);
      currentUrl.searchParams.set("client", selectedClient);
      window.history.replaceState(null, "", currentUrl);
      router.reload();
    }
  };

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
        {clients
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
