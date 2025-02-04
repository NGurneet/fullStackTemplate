import React, { useRef, useState } from "react";
import { useTheme } from "@mui/material/styles";
import { Box, Card, CardContent, IconButton, Typography } from "@mui/material";
import PlayArrowIcon from "@mui/icons-material/PlayArrow";
import PauseIcon from "@mui/icons-material/Pause";
import { motion } from "framer-motion";

interface SongCardProps {
  song: {
    id: string;
    title: string;
    artist: string;
    songUrl: string;
  };
}

const SongCard: React.FC<SongCardProps> = ({ song }) => {
  const theme = useTheme();
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);

  const togglePlay = () => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause();
      } else {
        audioRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 1 }}
    >
      <Card
        sx={{
          display: "flex",
          flexDirection: "column",
          backgroundColor: theme.palette.background.default,
          borderRadius: 8,
          boxShadow: 3,
          overflow: "hidden",
          position: "relative",
          "&:hover": {
            boxShadow: 10,
            transform: "scale(1.05)",
            transition: "transform 0.3s ease, box-shadow 0.3s ease",
          },
        }}
      >
        {/* Image container */}
        <Box
          sx={{
            width: "100%",
            height: 250,
            position: "relative",
            overflow: "hidden",
          }}
        >
          <motion.img
            src="/images/song-cover.jpg"
            alt={song.title}
            style={{
              width: "100%",
              height: "100%",
              objectFit: "cover",
            }}
            whileHover={{ scale: 1.05 }}
            transition={{ duration: 0.3 }}
          />

          {/* Play button */}
          <Box
            sx={{
              position: "absolute",
              top: "50%",
              left: "50%",
              transform: "translate(-50%, -50%)",
              backgroundColor: "white",
              padding: 1,
              borderRadius: "50%",
              "&:hover": {
                backgroundColor: theme.palette.primary.main,
                color: "white",
                transition: "background-color 0.3s ease",
              },
            }}
          >
            <IconButton
              aria-label="play"
              onClick={togglePlay}
              sx={{
                color: theme.palette.primary.main,
              }}
            >
              {isPlaying ? (
                <PauseIcon sx={{ height: 50, width: 50 }} />
              ) : (
                <PlayArrowIcon sx={{ height: 50, width: 50 }} />
              )}
            </IconButton>
          </Box>
        </Box>

        {/* Audio Player (hidden) */}
        <audio ref={audioRef} src={song.songUrl} onEnded={() => setIsPlaying(false)} />

        {/* Song details with text truncation */}
        <Box sx={{ display: "flex", flexDirection: "column", padding: 2, flex: 1 }}>
          <CardContent sx={{ flex: "1 0 auto" }}>
            <Typography
              component="div"
              variant="h6"
              sx={{
                color: theme.palette.primary.main,
                overflow: "hidden",
                whiteSpace: "nowrap",
                textOverflow: "ellipsis",
              }}
              title={song.title} // Shows full text on hover
            >
              {song.title}
            </Typography>
            <Typography
              variant="body2"
              sx={{
                color: "white",
                overflow: "hidden",
                whiteSpace: "nowrap",
                textOverflow: "ellipsis",
              }}
              title={song.artist} // Shows full text on hover
            >
              {song.artist}
            </Typography>
          </CardContent>
        </Box>
      </Card>
    </motion.div>
  );
};

export default SongCard;
