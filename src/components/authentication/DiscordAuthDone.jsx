import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

import { getUserDetails } from "../../api/auth";
import userDataStore from "../../datastore/userdata";

export function DiscordAuthDone() {
  const navigate = useNavigate();
  const [setUsername, setRanks] = userDataStore((s) => [
    s.setUsername,
    s.setRanks,
  ]);

  useEffect(() => {
    getUserDetails()
      .then((response) => {
        let userdata = response.data.user_data;
        setUsername(userdata.discord_name);
        setRanks(userdata.ranks);
        navigate("/members");
      })
      .catch((error) => {
        navigate("/auth_error");
      });
  }, [navigate, setUsername, setRanks]);
  return null;
}
