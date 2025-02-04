import { Card, CardContent, Avatar, Typography, Button, CircularProgress } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const UserProfile = () => {
  const navigate = useNavigate();

  // Get the user data from localStorage and parse it
  const userData = localStorage.getItem("user");
  const user = userData ? JSON.parse(userData) : null;

  const [isEditing, setIsEditing] = useState(false);

  if (!user) {
    return <Typography color="error" sx={{ textAlign: 'center', mt: 4 }}>User data not available.</Typography>;
  }

  return (
    <Card sx={{ maxWidth: 400, mx: 'auto', mt: 4, p: 2, textAlign: 'center' }}>
      <Avatar
        src={user.avatar || '/assets/default-avatar.png'} // Use default avatar if not available
        alt={user.name || 'User'}
        sx={{ width: 80, height: 80, mx: 'auto', mb: 2 }}
      />
      <CardContent>
        <Typography variant="h5">{user.name || 'User Name'}</Typography>
        <Typography variant="body2" color="textSecondary">{user.email || 'user@example.com'}</Typography>

        <Button
          startIcon={<EditIcon />}
          variant="contained"
          color="primary"
          sx={{ mt: 2 }}
          onClick={() => setIsEditing(true)}
        >
          Edit Profile
        </Button>
      </CardContent>
    </Card>
  );
};

export default UserProfile;
