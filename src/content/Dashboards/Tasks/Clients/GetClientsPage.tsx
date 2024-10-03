import React, { useState, useEffect, ChangeEvent, useContext } from "react";
import {
  Box,
  Typography,
  useTheme,
  TableContainer,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  TablePagination,
  Button,
  TextField,
  AlertColor
} from "@mui/material";
import api from "@/services/api/index";
import { GopinionClient } from "@/models";
import PageLoader from "@/components/Loader/index";
import { debounce } from "lodash";
import DataContext from "@/contexts/DataContext";
import CustomConfirm from "@/components/CustomConfirm";

interface PaginatedResponse {
  current_page: number;
  data: GopinionClient[];
  total: number;
  per_page: number;
  from: number;
  to: number;
}

interface ExtendedGopinionClient extends GopinionClient {
  is_available: boolean;
}

const GetClientsPage = () => {
  const theme = useTheme();
  const { setDataState, refresh } = useContext(DataContext);
  const [clients, setClients] = useState<ExtendedGopinionClient[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [page, setPage] = useState(0);
  const [limit, setLimit] = useState(5);
  const [total, setTotal] = useState(0);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedClientId, setSelectedClientId] = useState<number | null>(null);

  const fetchClients = async (search: string) => {
    try {
      setLoading(true);
      const response = await api.get<{ status: string; data: PaginatedResponse }>(
        "/getClients",
        {
          params: {
            per_page: limit,
            page: page + 1,
            search: search
          }
        }
      );
      if (response.data.status === "success") {
        setClients(response.data.data.data);
        setTotal(response.data.data.total);
        setError(null);
      } else {
        setClients([]);
        setTotal(0);
        setError("Failed to fetch clients");
      }
    } catch (err) {
      setError("An error occurred while fetching clients");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const debouncedFetchClients = debounce((search: string) => {
    fetchClients(search);
  }, 300);

  useEffect(() => {
    debouncedFetchClients(searchTerm);
    return () => {
      debouncedFetchClients.cancel();
    };
  }, [page, limit, searchTerm, refresh]);

  const handleAddClient = async (clientId: number, clientName: string) => {
    try {
      const response = await api.post("/createClient", {
        client_id: clientId,
        client_name: clientName
      });

      if (response.data.status === "success") {
        setDataState({
          alertMessage: "Client added successfully",
          alertSeverity: "success" as AlertColor,
          isAlertOpen: true,
          refresh: !refresh
        });
      } else {
        setDataState({
          alertMessage: response.data.message || "Failed to add client",
          alertSeverity: "error" as AlertColor,
          isAlertOpen: true
        });
      }
    } catch (error) {
      console.error("Error adding client:", error);
      setDataState({
        alertMessage: error.response?.data?.message || "Error adding client",
        alertSeverity: "error" as AlertColor,
        isAlertOpen: true
      });
    }
  };

  const handleRemoveClient = (clientId: number) => {
    setSelectedClientId(clientId);
    setDataState({
      isConfirmOpen: true,
      confirmAction: confirmRemoveClient
    });
  };

  const confirmRemoveClient = async () => {
    if (selectedClientId === null) return;

    try {
      const response = await api.post("/removeClient", { client_id: selectedClientId });

      if (response.data.status === "success") {
        setDataState({
          alertMessage: "Client removed successfully from the dashboard",
          alertSeverity: "success" as AlertColor,
          isAlertOpen: true,
          refresh: !refresh
        });
      } else {
        throw new Error(response.data.message);
      }
    } catch (error) {
      console.error("Error removing client:", error);
      setDataState({
        alertMessage: error.response?.data?.message || "Error removing client",
        alertSeverity: "error" as AlertColor,
        isAlertOpen: true
      });
    } finally {
      setSelectedClientId(null);
    }
  };

  const handlePageChange = (_event: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleLimitChange = (event: ChangeEvent<HTMLInputElement>) => {
    setLimit(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleSearchChange = (event: ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value);
    setPage(0);
  };

  if (loading && clients.length === 0) {
    return <PageLoader />;
  }

  if (error) {
    return <Typography color="error">{error}</Typography>;
  }

  return (
    <Box>
      <TextField
        fullWidth
        variant="outlined"
        label="Search Clients"
        value={searchTerm}
        onChange={handleSearchChange}
        sx={{ mb: 2 }}
      />
      {clients.length === 0 ? (
        <Typography
          variant="body1"
          sx={{
            marginTop: "45px",
            fontSize: `${theme.typography.pxToRem(22)}`,
            color: `${theme.palette.text.primary}`,
            textAlign: "center"
          }}
        >
          {searchTerm
            ? "No clients found matching your search."
            : "There are no clients."}
        </Typography>
      ) : (
        <>
          <TableContainer>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>ID</TableCell>
                  <TableCell>Name</TableCell>
                  <TableCell>URL Key</TableCell>
                  <TableCell>Create</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {clients.map((client) => (
                  <TableRow hover key={client.id}>
                    <TableCell>{client.id}</TableCell>
                    <TableCell>{client.name}</TableCell>
                    <TableCell>{client.urlKey}</TableCell>
                    <TableCell>
                      {client.is_available ? (
                        <Button
                          variant="outlined"
                          color="error"
                          style={{ width: "100px" }}
                          onClick={() => handleRemoveClient(client.id)}
                        >
                          REMOVE
                        </Button>
                      ) : (
                        <Button
                          variant="outlined"
                          style={{ width: "100px" }}
                          onClick={() => handleAddClient(client.id, client.name)}
                        >
                          ADD
                        </Button>
                      )}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
          <Box p={2}>
            <TablePagination
              component="div"
              count={total}
              onPageChange={handlePageChange}
              onRowsPerPageChange={handleLimitChange}
              page={page}
              rowsPerPage={limit}
              rowsPerPageOptions={[5, 10, 25, 30]}
            />
          </Box>
        </>
      )}
      <CustomConfirm onConfirm={confirmRemoveClient} />
    </Box>
  );
};

export default GetClientsPage;
