import { Box, Button } from "@mui/material";
import LockOpenTwoToneIcon from "@mui/icons-material/LockOpenTwoTone";
import { useRouter } from "next/router";

function SignOut() {
  const router = useRouter();

  const handleSignOut = () => {
    localStorage.removeItem("MM_token");
    router.push("/");
  };

  return (
    <Box sx={{ m: 1 }}>
      <Button color="primary" fullWidth onClick={handleSignOut}>
        <LockOpenTwoToneIcon sx={{ mr: 1 }} />
        Sign out
      </Button>
    </Box>
  );
}

export default SignOut;
