import { useSelector } from "react-redux";

import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import CardMedia from "@mui/material/CardMedia";
import CardContent from "@mui/material/CardContent";
import Avatar from "@mui/material/Avatar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import { red } from "@mui/material/colors";
import MoreVertIcon from "@mui/icons-material/MoreVert";

import { userSelector } from "../features/auth";

const ProfilePage = () => {
  const { user } = useSelector(userSelector);

  const { username, name } = user;

  return (
    <Card sx={{ maxWidth: 345 }}>
      <CardHeader
        avatar={
          <Avatar sx={{ bgcolor: red[500] }} aria-label="recipe">
            {username?.slice(0, 2)}
          </Avatar>
        }
        action={
          <IconButton aria-label="settings">
            <MoreVertIcon />
          </IconButton>
        }
        title={username}
        subheader={name || "anon"}
      />
      <CardMedia
        component="img"
        height="400"
        image="https://images.unsplash.com/photo-1634926878768-2a5b3c42f139?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1056&q=80"
        alt={username}
      />
      <CardContent>
        <Typography variant="body2" color="text.secondary">
          Placeholder for some bio or selected / watched / ... moves?
        </Typography>
      </CardContent>
    </Card>
  );
};

export default ProfilePage;
