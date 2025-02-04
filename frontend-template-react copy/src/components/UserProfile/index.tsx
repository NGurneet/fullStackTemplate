import { useGetUserbyIdQuery } from '../../services/apiSlice';
import { Card, CardContent, Avatar, Typography, Button, CircularProgress } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import { useState } from 'react';
import { useParams } from 'react-router-dom';

const UserProfile = () => {
  const { id } = useParams(); // Get user ID from the URL params
  const { data: user, isLoading, error } = useGetUserbyIdQuery(id);
  const [isEditing, setIsEditing] = useState(false);

  if (isLoading) return <CircularProgress sx={{ display: 'block', mx: 'auto', mt: 4 }} />;
  if (error) return <Typography color="error" sx={{ textAlign: 'center', mt: 4 }}>Failed to load user data.</Typography>;

  return (
    <Card sx={{ maxWidth: 400, mx: 'auto', mt: 4, p: 2, textAlign: 'center' }}>
      <Avatar
        src={user?.avatar || '/assets/default-avatar.png'}
        alt={user?.name || 'User'}
        sx={{ width: 80, height: 80, mx: 'auto', mb: 2 }}
      />
      <CardContent>
        <Typography variant="h5">{user?.name || 'User Name'}</Typography>
        <Typography variant="body2" color="textSecondary">{user?.email}</Typography>

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
