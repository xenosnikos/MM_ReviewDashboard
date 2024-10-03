import { useRouter } from "next/router";
import { Box, TextField } from "@mui/material";
import Autocomplete from "@mui/material/Autocomplete";
import { styled, lighten, darken } from "@mui/system";
import React, { useContext, useEffect, useState } from "react";
import { getClient } from "@/services";
import { Client } from "@/models";
import DataContext from "@/contexts/DataContext";
import { getCurrentUser } from "@/services/login/index";

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
      const storedClient = localStorage.getItem("selectedClient");
      if (storedClient) {
        return storedClient;
      }
    }
    return "";
  });

  const options = clients.map((option) => {
    const firstLetter = option.client_name[0].toUpperCase();
    return {
      firstLetter: /[0-9]/.test(firstLetter) ? "0-9" : firstLetter,
      ...option
    };
  });

  const handleGetClients = async (): Promise<void> => {
    try {
      const user = getCurrentUser();
      if (!user || !user.id) {
        throw new Error("User not logged in");
      }
      const response: Client[] = await getClient(user.id);
      setClients(response);
    } catch (error) {
      console.error("Error fetching clients:", error);
      setDataState({
        alertMessage: "Could not load clients, please try again later.",
        alertSeverity: "error",
        isAlertOpen: true
      });
    }
  };

  const handleChange = (_event: React.ChangeEvent<{}>, value: any) => {
    if (value) {
      setSelectedClient(value.client_name);
      setDataState({ clientId: value.client_id.toString() });

      if (typeof window !== "undefined") {
        localStorage.setItem("selectedClient", value.client_name);
        localStorage.setItem("clientId", value.client_id.toString());
        router.push(`/dashboards/tasks?client=${value.client_id}`);
      }
    }
  };

  useEffect(() => {
    handleGetClients();
  }, []);

  return (
    <Box sx={{ marginLeft: "10px", width: "250px" }}>
      <Autocomplete
        id="select-client"
        options={options.sort((a, b) => -b.firstLetter.localeCompare(a.firstLetter))}
        groupBy={(option) => option.firstLetter}
        getOptionLabel={(client) =>
          typeof client === "string" ? client : client.client_name
        }
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
                height: "38px",
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
