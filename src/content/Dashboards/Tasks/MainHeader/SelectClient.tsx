import { useRouter } from "next/router";
import { AlertColor, Box, TextField } from "@mui/material";
import React, { useContext, useEffect, useState } from "react";
import { getClient } from "@/services";
import DataContext from "@/contexts/DataContext";
import Autocomplete from "@mui/material/Autocomplete";
import { styled, lighten, darken } from "@mui/system";
import { Client } from "@/models";

const GroupHeader = styled("div")(({ theme }) => ({
  position: "sticky",
  top: "-8px",
  padding: "4px 10px",
  color: theme.palette.primary.main,
  backgroundColor:
    theme.palette.mode === "light"
      ? lighten(theme.palette.primary.light, 0.85)
      : darken(theme.palette.primary.main, 0.8)
}));

const GroupItems = styled("ul")({
  padding: 0
});

const SelectClient = () => {
  const router = useRouter();
  const { setDataState } = useContext(DataContext);
  const [clients, setClients] = useState<Client[]>([]);
  const [selectedClient, setSelectedClient] = useState<string>(() => {
    if (typeof window !== "undefined") {
      const selectedClient = localStorage.getItem("selectedClient");
      if (selectedClient) {
        return selectedClient;
      }
    }
    return "";
  });
  const options = clients.map((option) => {
    const firstLetter = option.name[0].toUpperCase();
    return {
      firstLetter: /[0-9]/.test(firstLetter) ? "0-9" : firstLetter,
      ...option
    };
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

  const handleChange = (_event: React.ChangeEvent<{}>, value: any) => {
    if (value) {
      setSelectedClient(value);

      setDataState({ clientId: value.id.toString() });

      if (typeof window !== "undefined") {
        localStorage.setItem("selectedClient", value.name);
        localStorage.setItem("clientId", value.id.toString());
        router.push(`/dashboards/tasks?client=${value.id}`);
      }
    }
  };

  useEffect(() => {
    handleGetClients();
  }, []);

  return (
    <Box
      sx={{
        marginLeft: "10px",
        width: "100%"
      }}
    >
      <Autocomplete
        id="select-client"
        options={options.sort((a, b) => -b.firstLetter.localeCompare(a.firstLetter))}
        groupBy={(option) => option.firstLetter}
        getOptionLabel={(client) => (typeof client === "string" ? client : client.name)}
        value={selectedClient}
        onChange={handleChange}
        renderInput={(params) => (
          <TextField
            {...params}
            label={selectedClient ? "" : "Please select the client"}
            variant="standard"
            sx={{
              "& .MuiInputBase-root": {
                fontSize: "20px",
                height: "36px",
                fontWeight: "bold"
              }
            }}
          />
        )}
        renderGroup={(params) => (
          <li key={params.key}>
            <GroupHeader>{params.group}</GroupHeader>
            <GroupItems>
              {React.Children.map(params.children, (child, index) => {
                return React.isValidElement(child)
                  ? React.cloneElement(child, { key: index })
                  : null;
              })}
            </GroupItems>
          </li>
        )}
      />
    </Box>
  );
};

export default SelectClient;
