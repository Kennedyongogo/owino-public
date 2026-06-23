import React, { useState, useEffect, useMemo } from "react";
import {
  Box,
  Typography,
  Card,
  Button,
  CircularProgress,
  IconButton,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Rating,
  Stack,
} from "@mui/material";
import { ChevronLeft, ChevronRight, RateReview, FormatQuote, Close } from "@mui/icons-material";
import { useTheme, useMediaQuery } from "@mui/material";
import Swal from "sweetalert2";

const BRAND_BLUE = "#1a5fb4";
const BRAND_GOLD = "#f5c518";
const BRAND_BLUE_DARK = "#134a8c";

const fieldSx = {
  "& .MuiOutlinedInput-root": {
    backgroundColor: "#ffffff",
    borderRadius: 2,
    "& fieldset": { borderColor: "rgba(26, 95, 180, 0.22)" },
    "&:hover fieldset": { borderColor: BRAND_BLUE },
    "&.Mui-focused": { boxShadow: `0 0 0 3px rgba(245, 197, 24, 0.28)` },
    "&.Mui-focused fieldset": { borderColor: BRAND_BLUE, borderWidth: 2 },
  },
  "& .MuiInputLabel-root.Mui-focused": { color: BRAND_BLUE },
};

const swalFix = {
  customClass: { container: "swal-z-index-fix" },
  didOpen: () => {
    const el = document.querySelector(".swal-z-index-fix");
    if (el) el.style.zIndex = "9999";
  },
};

const ReviewCard = ({ review, compact }) => (
  <Card
    elevation={0}
    sx={{
      height: "100%",
      display: "flex",
      flexDirection: "column",
      borderRadius: 3,
      overflow: "hidden",
      border: `1px solid rgba(26, 95, 180, 0.12)`,
      background: "linear-gradient(180deg, #ffffff 0%, #f8fbff 100%)",
      boxShadow: "0 10px 36px rgba(26, 95, 180, 0.1)",
      transition: "transform 0.3s ease, box-shadow 0.3s ease",
      "&:hover": {
        transform: "translateY(-6px)",
        boxShadow: "0 16px 48px rgba(26, 95, 180, 0.18)",
      },
    }}
  >
    <Box
      sx={{
        height: 4,
        background: `linear-gradient(90deg, ${BRAND_BLUE}, ${BRAND_GOLD})`,
      }}
    />
    <Box sx={{ p: compact ? 2 : 2.5, flex: 1, display: "flex", flexDirection: "column" }}>
      <FormatQuote sx={{ color: BRAND_GOLD, fontSize: 28, mb: 1, opacity: 0.85 }} />
      <Typography
        sx={{
          fontSize: compact ? "0.82rem" : { xs: "0.88rem", md: "0.95rem" },
          color: "text.secondary",
          lineHeight: 1.7,
          flex: 1,
          display: "-webkit-box",
          WebkitLineClamp: compact ? 4 : 5,
          WebkitBoxOrient: "vertical",
          overflow: "hidden",
          mb: 2,
        }}
      >
        {review.comment}
      </Typography>
      <Box sx={{ borderTop: "1px solid rgba(26,95,180,0.1)", pt: 1.5 }}>
        <Typography
          sx={{
            fontWeight: 800,
            fontSize: compact ? "0.9rem" : "1rem",
            color: BRAND_BLUE_DARK,
            mb: 0.5,
          }}
        >
          {review.name}
        </Typography>
        <Rating value={review.rating} readOnly size="small" sx={{ color: BRAND_GOLD }} />
      </Box>
    </Box>
  </Card>
);

export default function ReviewsSection() {
  const theme = useTheme();
  const isMdUp = useMediaQuery(theme.breakpoints.up("md"));
  const cardsPerView = isMdUp ? 3 : 1;

  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [carouselIndex, setCarouselIndex] = useState(0);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [form, setForm] = useState({ name: "", comment: "", rating: 5 });

  const fetchReviews = async () => {
    try {
      setLoading(true);
      const res = await fetch("/api/public-reviews?limit=50");
      const data = await res.json();
      if (data.success) setReviews(data.data || []);
    } catch (err) {
      console.error("Failed to load reviews:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchReviews();
  }, []);

  const maxIndex = useMemo(
    () => Math.max(0, reviews.length - cardsPerView),
    [reviews.length, cardsPerView]
  );

  useEffect(() => {
    setCarouselIndex((i) => Math.min(i, maxIndex));
  }, [maxIndex, cardsPerView]);

  const arrowSx = {
    position: "absolute",
    top: "50%",
    transform: "translateY(-50%)",
    zIndex: 2,
    width: { xs: 40, sm: 44, md: 48 },
    height: { xs: 40, sm: 44, md: 48 },
    bgcolor: "#fff",
    color: BRAND_BLUE,
    border: `2px solid ${BRAND_GOLD}`,
    boxShadow: "0 6px 20px rgba(26,95,180,0.2)",
    "&:hover": { bgcolor: BRAND_BLUE, color: "#fff" },
    "&.Mui-disabled": {
      bgcolor: "rgba(255,255,255,0.6)",
      color: "rgba(26,95,180,0.35)",
      borderColor: "rgba(245,197,24,0.35)",
    },
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.name.trim() || !form.comment.trim() || !form.rating) {
      Swal.fire({
        icon: "warning",
        title: "Missing fields",
        text: "Please enter your name, rating, and review.",
        confirmButtonColor: BRAND_BLUE,
        ...swalFix,
      });
      return;
    }

    setSubmitting(true);
    try {
      const res = await fetch("/api/reviews", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      const data = await res.json();
      if (data.success) {
        setDialogOpen(false);
        setForm({ name: "", comment: "", rating: 5 });
        Swal.fire({
          icon: "success",
          title: "Thank you!",
          text: "Your review was submitted and will appear once approved by SafeWire.",
          timer: 2800,
          showConfirmButton: false,
          ...swalFix,
        });
      } else {
        Swal.fire({
          icon: "error",
          title: "Could not submit",
          text: data.message || "Please try again.",
          confirmButtonColor: BRAND_BLUE,
          ...swalFix,
        });
      }
    } catch (err) {
      Swal.fire({
        icon: "error",
        title: "Network error",
        text: err.message,
        confirmButtonColor: BRAND_BLUE,
        ...swalFix,
      });
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <Box
      id="reviews-section"
      sx={{
        pt: { xs: 1, sm: 1.25, md: 1.5, lg: 2 },
        pb: { xs: 0.5, sm: 1, md: 1.5 },
        px: { xs: 1, sm: 1.25, md: 1.5, lg: 2 },
        background: "linear-gradient(160deg, #f4f8ff 0%, #fffef5 50%, #f0f6ff 100%)",
        boxSizing: "border-box",
      }}
    >
      <Box sx={{ maxWidth: 1400, margin: "0 auto", width: "100%" }}>
        <Box sx={{ textAlign: "center", mb: { xs: 2, sm: 2.5, md: 3 } }}>
          <Typography
            variant="overline"
            sx={{ color: BRAND_GOLD, fontWeight: 800, letterSpacing: "0.14em", fontSize: "0.75rem" }}
          >
            CLIENT VOICES
          </Typography>
          <Typography
            variant="h2"
            sx={{
              fontWeight: 800,
              fontSize: { xs: "1.75rem", sm: "2.1rem", md: "2.5rem" },
              color: BRAND_BLUE_DARK,
              mt: 0.5,
              mb: 1,
            }}
          >
            Reviews
          </Typography>
          <Typography
            sx={{
              maxWidth: 520,
              mx: "auto",
              fontSize: { xs: "0.9rem", md: "1rem" },
              color: "text.secondary",
              lineHeight: 1.6,
              px: 1,
            }}
          >
            See what our clients say about SafeWire Electricals — and share your own experience.
          </Typography>
          <Box
            sx={{
              width: 64,
              height: 4,
              mx: "auto",
              mt: 2,
              borderRadius: 2,
              background: `linear-gradient(90deg, ${BRAND_BLUE}, ${BRAND_GOLD})`,
            }}
          />
          <Button
            variant="contained"
            startIcon={<RateReview />}
            onClick={() => setDialogOpen(true)}
            sx={{
              mt: 2.5,
              px: 3,
              py: 1.25,
              textTransform: "none",
              fontWeight: 700,
              fontSize: "1rem",
              color: "#fff",
              background: `linear-gradient(135deg, ${BRAND_BLUE} 0%, ${BRAND_BLUE_DARK} 100%)`,
              boxShadow: `0 6px 20px rgba(26, 95, 180, 0.35)`,
              border: `1px solid rgba(245, 197, 24, 0.35)`,
              "&:hover": {
                background: `linear-gradient(135deg, ${BRAND_BLUE_DARK} 0%, ${BRAND_BLUE} 100%)`,
              },
            }}
          >
            Submit a Review
          </Button>
        </Box>

        {loading ? (
          <Box sx={{ display: "flex", justifyContent: "center", py: 8 }}>
            <CircularProgress sx={{ color: BRAND_BLUE }} />
          </Box>
        ) : reviews.length === 0 ? (
          <Box sx={{ textAlign: "center", py: 6 }}>
            <RateReview sx={{ fontSize: 48, color: BRAND_BLUE, opacity: 0.35, mb: 1 }} />
            <Typography color="text.secondary" fontWeight={600}>
              Be the first to leave a review!
            </Typography>
          </Box>
        ) : (
          <Box sx={{ position: "relative", px: { xs: 5, sm: 5.5, md: 6 } }}>
            <IconButton
              onClick={() => setCarouselIndex((i) => Math.max(0, i - 1))}
              disabled={carouselIndex === 0}
              aria-label="Previous reviews"
              sx={{ ...arrowSx, left: 0 }}
            >
              <ChevronLeft />
            </IconButton>

            <Box sx={{ overflow: "hidden", borderRadius: 1 }}>
              <Box
                sx={{
                  display: "flex",
                  transition: "transform 0.45s cubic-bezier(0.4, 0, 0.2, 1)",
                  transform: `translateX(-${carouselIndex * (100 / cardsPerView)}%)`,
                }}
              >
                {reviews.map((review) => (
                  <Box
                    key={review.id}
                    sx={{
                      flex: `0 0 ${100 / cardsPerView}%`,
                      px: { xs: 0.75, sm: 1, md: 1.5 },
                      boxSizing: "border-box",
                    }}
                  >
                    <ReviewCard review={review} compact={isMdUp} />
                  </Box>
                ))}
              </Box>
            </Box>

            <IconButton
              onClick={() => setCarouselIndex((i) => Math.min(maxIndex, i + 1))}
              disabled={carouselIndex >= maxIndex}
              aria-label="Next reviews"
              sx={{ ...arrowSx, right: 0 }}
            >
              <ChevronRight />
            </IconButton>

            {reviews.length > cardsPerView && (
              <Box sx={{ display: "flex", justifyContent: "center", gap: 1, mt: 3 }}>
                {Array.from({ length: maxIndex + 1 }).map((_, i) => (
                  <Box
                    key={i}
                    onClick={() => setCarouselIndex(i)}
                    sx={{
                      width: i === carouselIndex ? 24 : 8,
                      height: 8,
                      borderRadius: 4,
                      bgcolor: i === carouselIndex ? BRAND_BLUE : "rgba(26,95,180,0.2)",
                      cursor: "pointer",
                      transition: "all 0.25s ease",
                    }}
                  />
                ))}
              </Box>
            )}
          </Box>
        )}
      </Box>

      <Dialog
        open={dialogOpen}
        onClose={() => !submitting && setDialogOpen(false)}
        fullWidth
        maxWidth="sm"
        PaperProps={{
          sx: { borderRadius: 3, overflow: "hidden", borderTop: `4px solid ${BRAND_GOLD}` },
        }}
      >
        <Box sx={{ height: 4, background: `linear-gradient(90deg, ${BRAND_BLUE}, ${BRAND_GOLD}, ${BRAND_BLUE})` }} />
        <DialogTitle sx={{ pb: 0 }}>
          <Stack direction="row" justifyContent="space-between" alignItems="flex-start">
            <Box>
              <Typography variant="h6" fontWeight={800} color={BRAND_BLUE}>
                Rate SafeWire
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Your review will be published after approval
              </Typography>
            </Box>
            <IconButton onClick={() => setDialogOpen(false)} size="small" sx={{ color: BRAND_BLUE }}>
              <Close />
            </IconButton>
          </Stack>
        </DialogTitle>
        <Box component="form" onSubmit={handleSubmit}>
          <DialogContent sx={{ pt: 2 }}>
            <Stack spacing={2}>
              <TextField
                label="Your name"
                required
                fullWidth
                size="small"
                value={form.name}
                onChange={(e) => setForm({ ...form, name: e.target.value })}
                sx={fieldSx}
              />
              <Box>
                <Typography sx={{ fontSize: "0.85rem", fontWeight: 600, color: BRAND_BLUE_DARK, mb: 0.75 }}>
                  Your rating
                </Typography>
                <Rating
                  value={form.rating}
                  onChange={(_, v) => setForm({ ...form, rating: v || 1 })}
                  size="large"
                  sx={{ color: BRAND_GOLD }}
                />
              </Box>
              <TextField
                label="Your review"
                required
                fullWidth
                multiline
                minRows={4}
                size="small"
                placeholder="Tell others about your experience with SafeWire..."
                value={form.comment}
                onChange={(e) => setForm({ ...form, comment: e.target.value })}
                sx={fieldSx}
              />
            </Stack>
          </DialogContent>
          <DialogActions sx={{ px: 3, pb: 2.5 }}>
            <Button onClick={() => setDialogOpen(false)} disabled={submitting} sx={{ textTransform: "none", color: BRAND_BLUE }}>
              Cancel
            </Button>
            <Button
              type="submit"
              variant="contained"
              disabled={submitting}
              sx={{
                textTransform: "none",
                fontWeight: 700,
                px: 3,
                background: `linear-gradient(135deg, ${BRAND_BLUE}, ${BRAND_BLUE_DARK})`,
              }}
            >
              {submitting ? <CircularProgress size={22} color="inherit" /> : "Submit Review"}
            </Button>
          </DialogActions>
        </Box>
      </Dialog>
    </Box>
  );
}
