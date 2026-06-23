import React, { useState, useEffect, useMemo } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
  Box,
  Typography,
  Grid,
  Chip,
  CircularProgress,
  Button,
  LinearProgress,
  Stack,
  IconButton,
  Avatar,
  Divider,
} from "@mui/material";
import { motion } from "framer-motion";
import {
  ArrowBack,
  LocationOn,
  Bolt,
  CalendarToday,
  Close,
  ContactSupport,
} from "@mui/icons-material";
const BRAND_BLUE = "#1a5fb4";
const BRAND_GOLD = "#f5c518";
const BRAND_BLUE_DARK = "#134a8c";

const MotionBox = motion(Box);

const statusColors = {
  planning: { bg: "rgba(26, 95, 180, 0.12)", color: BRAND_BLUE },
  in_progress: { bg: "rgba(245, 197, 24, 0.2)", color: "#9a7b00" },
  completed: { bg: "rgba(46, 125, 50, 0.12)", color: "#2e7d32" },
  on_hold: { bg: "rgba(0, 0, 0, 0.08)", color: "#555" },
  cancelled: { bg: "rgba(211, 47, 47, 0.12)", color: "#c62828" },
};

const formatStatus = (status) =>
  (status || "").replace(/_/g, " ").replace(/\b\w/g, (c) => c.toUpperCase());

const formatDate = (d) =>
  d
    ? new Date(d).toLocaleDateString("en-KE", {
        year: "numeric",
        month: "long",
        day: "numeric",
      })
    : "Not specified";

const formatCurrency = (amount, currency = "KES") => {
  if (amount === null || amount === undefined || amount === "") return "Not specified";
  return new Intl.NumberFormat("en-KE", { style: "currency", currency }).format(amount);
};

const buildImageUrl = (url) => {
  if (!url) return "";
  if (url.startsWith("http")) return url;
  if (url.startsWith("uploads/")) return `/${url}`;
  if (url.startsWith("/uploads/")) return url;
  return url;
};

const isImageFile = (name) => /\.(jpg|jpeg|png|gif|bmp|webp)$/i.test(name || "");

const labelSx = {
  color: "rgba(26, 95, 180, 0.65)",
  fontSize: "0.72rem",
  fontWeight: 700,
  textTransform: "uppercase",
  letterSpacing: "0.06em",
};

const StatusChip = ({ status, onDark = false }) => {
  const s = statusColors[status] || statusColors.on_hold;
  if (onDark) {
    return (
      <Chip
        label={formatStatus(status)}
        size="small"
        sx={{
          fontWeight: 700,
          bgcolor: "rgba(255,255,255,0.95)",
          color: BRAND_BLUE_DARK,
          border: `1px solid ${BRAND_GOLD}`,
        }}
      />
    );
  }
  return (
    <Chip
      label={formatStatus(status)}
      size="small"
      sx={{ fontWeight: 700, bgcolor: s.bg, color: s.color, border: `1px solid ${s.color}33` }}
    />
  );
};

const InfoCell = ({ label, value, children, accent }) => (
  <Box
    sx={{
      p: { xs: 1.75, sm: 2 },
      borderRadius: 2,
      border: `1px solid ${accent ? "rgba(245,197,24,0.35)" : "rgba(26,95,180,0.14)"}`,
      bgcolor: accent ? "rgba(245,197,24,0.06)" : "rgba(26,95,180,0.03)",
      height: "100%",
      boxSizing: "border-box",
    }}
  >
    <Typography sx={labelSx}>{label}</Typography>
    {children ?? (
      <Typography
        sx={{
          fontWeight: 600,
          fontSize: { xs: "0.95rem", sm: "1rem" },
          mt: 0.75,
          wordBreak: "break-word",
          color: BRAND_BLUE_DARK,
        }}
      >
        {value}
      </Typography>
    )}
  </Box>
);

const SectionBlock = ({ overline, title, hint, count, children }) => (
  <Box
    component="section"
    sx={{
      width: "100%",
      borderBottom: "1px solid rgba(26, 95, 180, 0.1)",
      py: { xs: 3, sm: 3.5, md: 4 },
      px: { xs: 1, sm: 1.25, md: 1.5, lg: 2 },
      boxSizing: "border-box",
    }}
  >
    <Box sx={{ maxWidth: 1400, mx: "auto", width: "100%" }}>
      <Box sx={{ mb: { xs: 2, sm: 2.5 } }}>
        {overline && (
          <Typography
            variant="overline"
            sx={{ color: BRAND_GOLD, fontWeight: 800, letterSpacing: "0.14em", fontSize: "0.7rem" }}
          >
            {overline}
          </Typography>
        )}
        <Stack direction="row" alignItems="baseline" gap={1} flexWrap="wrap">
          <Typography
            variant="h5"
            sx={{ fontWeight: 800, color: BRAND_BLUE_DARK, fontSize: { xs: "1.2rem", md: "1.45rem" } }}
          >
            {title}
          </Typography>
          {count != null && (
            <Typography sx={{ color: BRAND_GOLD, fontWeight: 800, fontSize: "1rem" }}>
              ({count})
            </Typography>
          )}
        </Stack>
        {hint && (
          <Typography variant="body2" color="text.secondary" sx={{ mt: 0.5, maxWidth: 560 }}>
            {hint}
          </Typography>
        )}
        <Box
          sx={{
            width: 48,
            height: 3,
            mt: 1.25,
            borderRadius: 2,
            background: `linear-gradient(90deg, ${BRAND_BLUE}, ${BRAND_GOLD})`,
          }}
        />
      </Box>
      {children}
    </Box>
  </Box>
);

export default function ProjectDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [project, setProject] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [preview, setPreview] = useState({ open: false, url: "", fileName: "" });

  useEffect(() => {
    const fetchProject = async () => {
      try {
        setLoading(true);
        setError(null);
        const response = await fetch(`/api/public-projects/${id}`);
        const data = await response.json();
        if (!response.ok || !data.success) {
          throw new Error(data.message || "Project not found");
        }
        setProject(data.data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchProject();
  }, [id]);

  const related = useMemo(() => {
    if (!project) return { tasks: [], progressUpdates: [] };
    const tasks = project.tasks || [];
    const progressUpdates = tasks
      .flatMap((t) =>
        (t.progressUpdates || []).map((u) => ({
          ...u,
          taskName: t.name,
          taskId: t.id,
        }))
      )
      .sort(
        (a, b) =>
          new Date(b.date || b.createdAt || 0).getTime() -
          new Date(a.date || a.createdAt || 0).getTime()
      );
    return { tasks, progressUpdates };
  }, [project]);

  const handleBack = () => {
    navigate("/");
    setTimeout(() => {
      document.getElementById("projects-section")?.scrollIntoView({ behavior: "smooth" });
    }, 150);
  };

  const handleContact = () => {
    navigate("/");
    setTimeout(() => {
      document.getElementById("contact-section")?.scrollIntoView({ behavior: "smooth" });
    }, 150);
  };

  if (loading) {
    return (
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          minHeight: "60vh",
          background: "linear-gradient(160deg, #f4f8ff 0%, #fffef5 50%, #f0f6ff 100%)",
        }}
      >
        <CircularProgress sx={{ color: BRAND_BLUE }} />
      </Box>
    );
  }

  if (error || !project) {
    return (
      <Box
        sx={{
          px: { xs: 1.5, sm: 2 },
          py: 6,
          textAlign: "center",
          background: "linear-gradient(160deg, #f4f8ff 0%, #fffef5 50%, #f0f6ff 100%)",
          minHeight: "50vh",
        }}
      >
        <Typography color="error" fontWeight={600} sx={{ mb: 2 }}>
          {error || "Project not found"}
        </Typography>
        <Button
          variant="contained"
          startIcon={<ArrowBack />}
          onClick={handleBack}
          sx={{
            textTransform: "none",
            fontWeight: 700,
            background: `linear-gradient(135deg, ${BRAND_BLUE}, ${BRAND_BLUE_DARK})`,
          }}
        >
          Back to Projects
        </Button>
      </Box>
    );
  }

  const progress = project.progress_percent ?? 0;
  const budgetNum = parseFloat(project.budget_estimate) || 0;
  const actualNum = parseFloat(project.actual_cost) || 0;
  const budgetUsedPct =
    budgetNum > 0 ? Math.min(100, Math.round((actualNum / budgetNum) * 100)) : 0;
  const overBudget = actualNum > budgetNum && budgetNum > 0;

  return (
    <Box
      sx={{
        width: "100%",
        minHeight: "100vh",
        background: "linear-gradient(160deg, #f4f8ff 0%, #fffef5 50%, #f0f6ff 100%)",
        pb: { xs: "calc(env(safe-area-inset-bottom, 0px) + 72px)", md: 0 },
      }}
    >
      {/* Edge-to-edge hero */}
      <Box
        sx={{
          width: "100%",
          background: `linear-gradient(135deg, ${BRAND_BLUE} 0%, ${BRAND_BLUE_DARK} 100%)`,
          borderBottom: `3px solid ${BRAND_GOLD}`,
          position: "relative",
          overflow: "hidden",
          pt: { xs: "max(env(safe-area-inset-top, 0px), 12px)", md: 3 },
          pb: { xs: 3, md: 4 },
          px: { xs: 1, sm: 1.25, md: 1.5, lg: 2 },
        }}
      >
        <Box
          sx={{
            position: "absolute",
            top: -80,
            right: -60,
            width: 240,
            height: 240,
            borderRadius: "50%",
            bgcolor: "rgba(245,197,24,0.1)",
            pointerEvents: "none",
          }}
        />
        <Box sx={{ maxWidth: 1400, mx: "auto", width: "100%", position: "relative", zIndex: 1 }}>
          <Stack direction="row" alignItems="flex-start" spacing={1.5} mb={2}>
            <IconButton
              onClick={handleBack}
              aria-label="Back to projects"
              disableRipple
              sx={{
                color: "#fff",
                bgcolor: "rgba(255,255,255,0.12)",
                border: "1px solid rgba(245,197,24,0.35)",
                "&:hover": { bgcolor: "rgba(255,255,255,0.22)" },
                outline: "none",
                "&:focus": { outline: "none" },
                "&:focus-visible": {
                  outline: `2px solid ${BRAND_GOLD}`,
                  outlineOffset: 2,
                },
                "&.Mui-focusVisible": {
                  outline: `2px solid ${BRAND_GOLD}`,
                  outlineOffset: 2,
                },
              }}
            >
              <ArrowBack />
            </IconButton>
            <Box flex={1} minWidth={0}>
              <Stack direction="row" alignItems="center" spacing={0.75} mb={0.5}>
                <Bolt sx={{ color: BRAND_GOLD, fontSize: 22 }} />
                <Typography
                  variant="overline"
                  sx={{ color: BRAND_GOLD, fontWeight: 800, letterSpacing: "0.12em" }}
                >
                  SAFEWIRE PROJECT
                </Typography>
              </Stack>
              <Typography
                variant="h3"
                sx={{
                  fontWeight: 800,
                  color: "#fff",
                  fontSize: { xs: "1.5rem", sm: "1.85rem", md: "2.25rem" },
                  lineHeight: 1.2,
                  wordBreak: "break-word",
                }}
              >
                {project.name}
              </Typography>
              <Stack direction="row" alignItems="center" gap={1} mt={1.25} flexWrap="wrap" useFlexGap>
                <StatusChip status={project.status} onDark />
                {project.category && (
                  <Chip
                    label={project.category}
                    size="small"
                    sx={{
                      fontWeight: 700,
                      bgcolor: BRAND_GOLD,
                      color: BRAND_BLUE_DARK,
                      border: "1px solid rgba(255,255,255,0.5)",
                    }}
                  />
                )}
                {project.location_name && (
                  <Stack direction="row" alignItems="center" spacing={0.5}>
                    <LocationOn sx={{ fontSize: 16, color: BRAND_GOLD }} />
                    <Typography sx={{ color: "rgba(255,255,255,0.9)", fontSize: "0.85rem", fontWeight: 600 }}>
                      {project.location_name}
                    </Typography>
                  </Stack>
                )}
              </Stack>
            </Box>
            <Box sx={{ textAlign: "right", display: { xs: "none", sm: "block" } }}>
              <Typography variant="h4" fontWeight={800} sx={{ color: BRAND_GOLD, lineHeight: 1 }}>
                {progress}%
              </Typography>
              <Typography variant="caption" sx={{ color: "rgba(255,255,255,0.85)", fontWeight: 600 }}>
                complete
              </Typography>
            </Box>
          </Stack>

          <Box sx={{ display: { xs: "block", sm: "none" }, mb: 1 }}>
            <Typography variant="h5" fontWeight={800} sx={{ color: BRAND_GOLD }}>
              {progress}% complete
            </Typography>
          </Box>

          <LinearProgress
            variant="determinate"
            value={progress}
            sx={{
              height: { xs: 6, md: 8 },
              borderRadius: 4,
              bgcolor: "rgba(255,255,255,0.18)",
              "& .MuiLinearProgress-bar": {
                borderRadius: 4,
                background: `linear-gradient(90deg, ${BRAND_GOLD}, #fff8dc)`,
              },
            }}
          />
        </Box>
      </Box>

      {/* Overview */}
      <SectionBlock overline="OVERVIEW" title="Project Details" hint="What this SafeWire electrical project is about">
        <Grid container spacing={{ xs: 1.5, sm: 2 }}>
          <Grid size={{ xs: 12, md: 6 }}>
            <InfoCell label="Project Name" value={project.name} accent />
          </Grid>
          <Grid size={{ xs: 12, sm: 6, md: 3 }}>
            <InfoCell label="Location" value={project.location_name || "Not specified"} />
          </Grid>
          <Grid size={{ xs: 12, sm: 6, md: 3 }}>
            <InfoCell label="Category" value={project.category || "Electrical"} />
          </Grid>
          <Grid size={{ xs: 12 }}>
            <InfoCell label="Description">
              <Typography sx={{ mt: 0.75, lineHeight: 1.75, color: "#1a1a2e", whiteSpace: "pre-wrap" }}>
                {project.description || "Professional electrical work delivered by SafeWire Electricals."}
              </Typography>
            </InfoCell>
          </Grid>
        </Grid>
      </SectionBlock>

      {/* Schedule */}
      <SectionBlock overline="TIMELINE" title="Schedule & Status" hint="Current stage and key dates">
        <Grid container spacing={{ xs: 1.5, sm: 2 }}>
          <Grid size={{ xs: 12, sm: 6, md: 3 }}>
            <InfoCell label="Status">
              <Box mt={0.75}>
                <StatusChip status={project.status} />
              </Box>
            </InfoCell>
          </Grid>
          <Grid size={{ xs: 12, sm: 6, md: 3 }}>
            <InfoCell label="Progress">
              <Box mt={0.75}>
                <Typography fontWeight={700} color={BRAND_BLUE} sx={{ mb: 0.75 }}>
                  {progress}% complete
                </Typography>
                <LinearProgress
                  variant="determinate"
                  value={progress}
                  sx={{
                    height: 8,
                    borderRadius: 4,
                    bgcolor: "rgba(26,95,180,0.12)",
                    "& .MuiLinearProgress-bar": {
                      borderRadius: 4,
                      background: `linear-gradient(90deg, ${BRAND_BLUE}, ${BRAND_GOLD})`,
                    },
                  }}
                />
              </Box>
            </InfoCell>
          </Grid>
          <Grid size={{ xs: 12, sm: 6, md: 3 }}>
            <InfoCell label="Start Date" value={formatDate(project.start_date)} />
          </Grid>
          <Grid size={{ xs: 12, sm: 6, md: 3 }}>
            <InfoCell label="Target End" value={formatDate(project.end_date)} />
          </Grid>
        </Grid>
      </SectionBlock>

      {/* Financial */}
      <SectionBlock
        overline="SCOPE"
        title="Investment"
        hint="Estimated budget and spend to date on this project"
      >
        <Grid container spacing={{ xs: 1.5, sm: 2 }}>
          <Grid size={{ xs: 12, sm: 6 }}>
            <InfoCell
              label="Budget Estimate"
              value={formatCurrency(project.budget_estimate, project.currency)}
              accent
            />
          </Grid>
          <Grid size={{ xs: 12, sm: 6 }}>
            <InfoCell label="Actual Cost">
              <Typography
                sx={{
                  fontWeight: 700,
                  fontSize: { xs: "0.95rem", sm: "1rem" },
                  mt: 0.75,
                  color: overBudget ? "#c62828" : BRAND_BLUE,
                }}
              >
                {formatCurrency(project.actual_cost, project.currency)}
              </Typography>
            </InfoCell>
          </Grid>
          <Grid size={{ xs: 12, sm: 6 }}>
            <InfoCell label="Currency" value={project.currency || "KES"} />
          </Grid>
          {budgetNum > 0 && (
            <Grid size={{ xs: 12, sm: 6 }}>
              <InfoCell label="Budget Utilization">
                <Box mt={0.75}>
                  <Stack direction="row" justifyContent="space-between" mb={0.75}>
                    <Typography
                      variant="body2"
                      fontWeight={700}
                      sx={{ color: overBudget ? "#c62828" : "#9a7b00" }}
                    >
                      {budgetUsedPct}% used
                    </Typography>
                    <Typography variant="caption" color="text.secondary">
                      Remaining:{" "}
                      {formatCurrency(Math.max(0, budgetNum - actualNum), project.currency)}
                    </Typography>
                  </Stack>
                  <LinearProgress
                    variant="determinate"
                    value={budgetUsedPct}
                    sx={{
                      height: 8,
                      borderRadius: 4,
                      bgcolor: "rgba(26,95,180,0.12)",
                      "& .MuiLinearProgress-bar": {
                        borderRadius: 4,
                        background: overBudget
                          ? "#c62828"
                          : `linear-gradient(90deg, ${BRAND_BLUE}, ${BRAND_GOLD})`,
                      },
                    }}
                  />
                </Box>
              </InfoCell>
            </Grid>
          )}
        </Grid>
      </SectionBlock>

      {/* Team */}
      <SectionBlock overline="TEAM" title="People on this project" hint="SafeWire professionals behind the work">
        <Grid container spacing={{ xs: 1.5, sm: 2 }}>
          {project.client_name && (
            <Grid size={{ xs: 12, sm: 6 }}>
              <InfoCell label="Client" value={project.client_name} />
            </Grid>
          )}
          <Grid size={{ xs: 12, sm: project.client_name ? 6 : 12 }}>
            <InfoCell label="Lead Engineer">
              {project.engineer ? (
                <Stack direction="row" alignItems="center" spacing={1.5} mt={1}>
                  <Avatar
                    sx={{
                      bgcolor: BRAND_BLUE,
                      border: `2px solid ${BRAND_GOLD}`,
                      width: 48,
                      height: 48,
                      fontWeight: 700,
                    }}
                  >
                    {project.engineer.name?.charAt(0)}
                  </Avatar>
                  <Box>
                    <Typography fontWeight={700} color={BRAND_BLUE_DARK}>
                      {project.engineer.name}
                    </Typography>
                    {project.engineer.role && (
                      <Chip
                        label={formatStatus(project.engineer.role)}
                        size="small"
                        sx={{
                          mt: 0.5,
                          height: 22,
                          fontSize: "0.7rem",
                          bgcolor: "rgba(26,95,180,0.1)",
                          color: BRAND_BLUE,
                        }}
                      />
                    )}
                  </Box>
                </Stack>
              ) : (
                <Typography sx={{ mt: 0.75, fontWeight: 600, color: BRAND_BLUE_DARK }}>
                  SafeWire team
                </Typography>
              )}
            </InfoCell>
          </Grid>
        </Grid>
      </SectionBlock>

      {/* Tasks */}
      <SectionBlock
        overline="WORK PLAN"
        title="Project Tasks"
        hint="Key phases of electrical work"
        count={related.tasks.length}
      >
        {related.tasks.length === 0 ? (
          <Typography color="text.secondary" sx={{ py: 2 }}>
            Task breakdown will be published as the project progresses.
          </Typography>
        ) : (
          <Box sx={{ display: "flex", flexDirection: "column", gap: 1.5 }}>
            {related.tasks.map((task, index) => (
              <MotionBox
                key={task.id}
                initial={{ opacity: 0, y: 8 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.35, delay: index * 0.04 }}
                viewport={{ once: true }}
                sx={{
                  p: { xs: 1.75, sm: 2 },
                  borderRadius: 2,
                  border: "1px solid rgba(26,95,180,0.14)",
                  bgcolor: "rgba(255,255,255,0.7)",
                  display: "grid",
                  gridTemplateColumns: { xs: "1fr", sm: "auto 1fr auto" },
                  gap: { xs: 1, sm: 2 },
                  alignItems: { sm: "center" },
                }}
              >
                <Typography
                  sx={{
                    fontWeight: 800,
                    color: BRAND_BLUE,
                    fontSize: "0.85rem",
                    minWidth: 28,
                  }}
                >
                  {String(index + 1).padStart(2, "0")}
                </Typography>
                <Box minWidth={0}>
                  <Typography fontWeight={700} color={BRAND_BLUE_DARK} sx={{ mb: 0.5 }}>
                    {task.name}
                  </Typography>
                  {task.description && (
                    <Typography variant="body2" color="text.secondary" sx={{ mb: 0.75, lineHeight: 1.55 }}>
                      {task.description}
                    </Typography>
                  )}
                  <Stack direction="row" spacing={1} flexWrap="wrap" useFlexGap alignItems="center">
                    {task.status && <StatusChip status={task.status} />}
                    {task.assignedAdmin?.name && (
                      <Typography variant="caption" color="text.secondary">
                        Lead: {task.assignedAdmin.name}
                      </Typography>
                    )}
                  </Stack>
                  <Stack
                    direction="row"
                    spacing={2}
                    sx={{ mt: 1, display: { xs: "none", md: "flex" } }}
                  >
                    <Stack direction="row" alignItems="center" spacing={0.5}>
                      <CalendarToday sx={{ fontSize: 14, color: BRAND_BLUE }} />
                      <Typography variant="caption" color="text.secondary">
                        {formatDate(task.start_date)} → {formatDate(task.due_date)}
                      </Typography>
                    </Stack>
                  </Stack>
                </Box>
                <Box sx={{ minWidth: { sm: 100 }, textAlign: { sm: "right" } }}>
                  <Typography fontWeight={800} color={BRAND_GOLD} fontSize="1.1rem">
                    {task.progress_percent ?? 0}%
                  </Typography>
                  <LinearProgress
                    variant="determinate"
                    value={task.progress_percent ?? 0}
                    sx={{
                      mt: 0.5,
                      height: 4,
                      borderRadius: 2,
                      bgcolor: "rgba(26,95,180,0.1)",
                      "& .MuiLinearProgress-bar": {
                        background: `linear-gradient(90deg, ${BRAND_BLUE}, ${BRAND_GOLD})`,
                      },
                    }}
                  />
                </Box>
              </MotionBox>
            ))}
          </Box>
        )}
      </SectionBlock>

      {/* Progress updates */}
      <SectionBlock
        overline="ON SITE"
        title="Progress Updates"
        hint="Latest milestones and site photos"
        count={related.progressUpdates.length}
      >
        {related.progressUpdates.length === 0 ? (
          <Typography color="text.secondary" sx={{ py: 2 }}>
            Progress photos and updates will appear here as work continues.
          </Typography>
        ) : (
          <Stack spacing={2.5}>
            {related.progressUpdates.map((update, i) => (
              <Box
                key={update.id || i}
                sx={{
                  p: { xs: 2, sm: 2.5 },
                  borderRadius: 2,
                  border: "1px solid rgba(26,95,180,0.12)",
                  bgcolor: "rgba(255,255,255,0.75)",
                }}
              >
                <Stack
                  direction={{ xs: "column", sm: "row" }}
                  justifyContent="space-between"
                  alignItems={{ sm: "flex-start" }}
                  gap={1}
                  mb={1}
                >
                  <Box>
                    <Typography fontWeight={800} color={BRAND_BLUE}>
                      {update.taskName || "Site update"}
                    </Typography>
                    <Typography variant="caption" color="text.secondary">
                      {formatDate(update.date || update.createdAt)}
                    </Typography>
                  </Box>
                  <Chip
                    label={`${update.progress_percent ?? 0}%`}
                    size="small"
                    sx={{ bgcolor: "rgba(245,197,24,0.2)", color: "#9a7b00", fontWeight: 700 }}
                  />
                </Stack>
                <Typography variant="body2" color="text.secondary" sx={{ lineHeight: 1.65, mb: 1.5 }}>
                  {update.description}
                </Typography>
                {update.images?.length > 0 && (
                  <Box sx={{ display: "flex", gap: 1, flexWrap: "wrap" }}>
                    {update.images.map((img, idx) => {
                      const fileName = img.split("/").pop() || `Photo ${idx + 1}`;
                      if (!isImageFile(fileName)) return null;
                      const url = buildImageUrl(img);
                      return (
                        <Box
                          key={idx}
                          component="img"
                          src={url}
                          alt={fileName}
                          onClick={() => setPreview({ open: true, url, fileName })}
                          sx={{
                            width: { xs: 88, sm: 100, md: 120 },
                            height: { xs: 88, sm: 100, md: 120 },
                            objectFit: "cover",
                            borderRadius: 2,
                            cursor: "pointer",
                            border: "2px solid rgba(26,95,180,0.15)",
                            transition: "border-color 0.2s, transform 0.2s",
                            "&:hover": {
                              borderColor: BRAND_GOLD,
                              transform: "scale(1.03)",
                            },
                          }}
                        />
                      );
                    })}
                  </Box>
                )}
              </Box>
            ))}
          </Stack>
        )}
      </SectionBlock>

      {/* CTA — edge to edge */}
      <Box
        sx={{
          width: "100%",
          background: `linear-gradient(135deg, ${BRAND_BLUE_DARK} 0%, ${BRAND_BLUE} 100%)`,
          borderTop: `3px solid ${BRAND_GOLD}`,
          pt: { xs: 2, sm: 2.25, md: 2.5 },
          pb: { xs: 0.5, sm: 1, md: 1.5 },
          px: { xs: 1, sm: 1.25, md: 1.5, lg: 2 },
        }}
      >
        <Box sx={{ maxWidth: 1400, mx: "auto", width: "100%", textAlign: "center" }}>
          <Typography
            variant="h5"
            sx={{ fontWeight: 800, color: "#fff", mb: 0.75, fontSize: { xs: "1.15rem", md: "1.35rem" } }}
          >
            Interested in a project like this?
          </Typography>
          <Typography
            sx={{
              color: "rgba(255,255,255,0.88)",
              mb: 1.5,
              maxWidth: 480,
              mx: "auto",
              fontSize: { xs: "0.9rem", md: "1rem" },
              lineHeight: 1.55,
            }}
          >
            Talk to SafeWire about wiring, solar, or commercial electrical work for your home or business.
          </Typography>
          <Button
            variant="contained"
            startIcon={<ContactSupport />}
            onClick={handleContact}
            sx={{
              px: 3,
              py: 1.1,
              textTransform: "none",
              fontWeight: 700,
              color: BRAND_BLUE_DARK,
              bgcolor: BRAND_GOLD,
              border: "2px solid rgba(255,255,255,0.4)",
              "&:hover": { bgcolor: "#ffe066" },
            }}
          >
            Contact SafeWire
          </Button>
        </Box>
      </Box>

      {/* Image preview */}
      {preview.open && (
        <Box
          onClick={() => setPreview({ open: false, url: "", fileName: "" })}
          sx={{
            position: "fixed",
            inset: 0,
            bgcolor: "rgba(0,0,0,0.88)",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            zIndex: 1300,
            p: 2,
          }}
        >
          <Box
            onClick={(e) => e.stopPropagation()}
            sx={{
              position: "relative",
              maxWidth: "94%",
              maxHeight: "90vh",
              borderRadius: 3,
              overflow: "hidden",
              border: `3px solid ${BRAND_GOLD}`,
            }}
          >
            <IconButton
              onClick={() => setPreview({ open: false, url: "", fileName: "" })}
              sx={{
                position: "absolute",
                top: 8,
                right: 8,
                bgcolor: "rgba(0,0,0,0.5)",
                color: "#fff",
                "&:hover": { bgcolor: BRAND_BLUE },
              }}
            >
              <Close />
            </IconButton>
            <Box
              component="img"
              src={preview.url}
              alt={preview.fileName}
              sx={{ display: "block", maxWidth: "100%", maxHeight: "85vh", objectFit: "contain" }}
            />
          </Box>
        </Box>
      )}
    </Box>
  );
}
