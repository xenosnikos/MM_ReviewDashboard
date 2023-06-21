import { useRouter } from 'next/router';
import { Box, MenuItem, TextField } from '@mui/material';
import { useEffect, useState } from 'react';
import { getClient } from '@/services';

export interface Client {
  id: number;
  name: string;
  urlKey: string;
  phoneNumber: string;
}

const SelectClient = () => {
  const router = useRouter();
  const { client } = router.query;
  const [currency, setCurrency] = useState<string>(() => {
    if (typeof window !== 'undefined') {
      return (
        client as string || localStorage.getItem('selectedClient') || ''
      );
    }
    return '';
  });
  const [clients, setClients] = useState<Client[]>([]);

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
    setCurrency(selectedClient);
    if (typeof window !== 'undefined') {
      localStorage.setItem('selectedClient', selectedClient);
      const currentUrl = new URL(window.location.href);
      currentUrl.searchParams.set('client', selectedClient);
      window.history.replaceState(null, '', currentUrl);
      router.reload();
    }
  };

  useEffect(() => {
    handleGetClients();
  }, []);

  useEffect(() => {
    if (!currency && clients.length > 0) {
      setCurrency(clients[0].urlKey);
    }
  }, [clients]);

  return (
    <Box sx={{ marginLeft: '10px', marginTop: '23px'}}>
      <TextField
        id="standard-select-currency"
        select
        value={currency}
        onChange={handleChange}
        helperText="Please select the client"
        variant="standard"
        sx={{
          '& .MuiInputBase-root': {
            fontSize: '20px',
            height: '36px',
            fontWeight: 'bold'
          },
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
