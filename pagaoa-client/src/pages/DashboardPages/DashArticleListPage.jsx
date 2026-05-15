import React, { useState, useEffect, useCallback } from "react";
import {
  Alert,
  Box,
  Button,
  Chip,
  CircularProgress,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  MenuItem,
  Paper,
  Snackbar,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import { useTheme } from "@mui/material/styles";
import { DataGrid } from "@mui/x-data-grid";
import useMediaQuery from "@mui/material/useMediaQuery";
import {
  fetchArticles,
  createArticle,
  updateArticle,
  deleteArticle,
  mapArticleFromApi,
} from "../../services/articleService";

// ─── Constants ────────────────────────────────────────────────────────────────

const STATUSES = ["draft", "published", "archived"];
const CATEGORIES = [
  "Pastries",
  "Breads",
  "Cakes",
  "Beverages",
  "Seasonal",
  "Behind the Scenes",
  "News",
  "Other",
];

const BLANK_FORM = {
  title: "",
  category: "",
  summary: "",
  content: "",
  status: "draft",
  thumbnailUrl: "",
};

const labelize = (v) => (v ? `${v.charAt(0).toUpperCase()}${v.slice(1)}` : "");

const statusColor = (status) => {
  if (status === "published") return "success";
  if (status === "archived") return "default";
  return "warning"; // draft
};

// ─── Component ────────────────────────────────────────────────────────────────

const DashArticleListPage = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  // ── Auth ─────────────────────────────────────────────────────────────────
  const currentUser = (() => {
    try {
      return JSON.parse(localStorage.getItem("currentUser")) || null;
    } catch {
      return null;
    }
  })();

  const isAdmin = currentUser?.type === "admin";
  const isEditor = currentUser?.type === "editor";
  const canEdit = isAdmin || isEditor;

  // ── State ─────────────────────────────────────────────────────────────────
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [apiError, setApiError] = useState("");
  const [toast, setToast] = useState({
    open: false,
    message: "",
    severity: "success",
  });

  const [modal, setModal] = useState({ open: false, id: null });
  const [form, setForm] = useState(BLANK_FORM);
  const [errors, setErrors] = useState({});
  const [submitting, setSubmitting] = useState(false);

  const [search, setSearch] = useState("");
  const [filterCategory, setFilterCategory] = useState("");
  const [filterStatus, setFilterStatus] = useState("");

  // ── Data fetch ────────────────────────────────────────────────────────────
  const loadArticles = useCallback(async () => {
    setLoading(true);
    setApiError("");
    try {
      const { data } = await fetchArticles();
      // Backend returns { articles: [...] }
      const raw = Array.isArray(data) ? data : (data.articles ?? []);
      setArticles(raw.map(mapArticleFromApi));
    } catch (err) {
      setApiError(
        err?.response?.data?.message ||
          "Failed to load articles. Check your connection.",
      );
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    loadArticles();
  }, [loadArticles]);

  // ── Helpers ───────────────────────────────────────────────────────────────
  const showToast = (message, severity = "success") =>
    setToast({ open: true, message, severity });

  const openModal = (article) => {
    setModal({ open: true, id: article?._id ?? article?.id ?? null });
    setForm(
      article
        ? {
            title: article.title ?? "",
            category: article.category ?? "",
            summary: article.summary ?? "",
            content: article.content ?? "",
            status: article.status ?? "draft",
            thumbnailUrl: article.thumbnailUrl ?? "",
          }
        : { ...BLANK_FORM },
    );
    setErrors({});
  };

  const closeModal = () => {
    setModal({ open: false, id: null });
    setForm({ ...BLANK_FORM });
    setErrors({});
  };

  const handleChange = ({ target: { name, value } }) => {
    setForm((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) setErrors((prev) => ({ ...prev, [name]: "" }));
  };

  // ── Validation ────────────────────────────────────────────────────────────
  const validate = () => {
    const errs = {};
    if (!form.title.trim()) errs.title = "Title is required.";
    if (!form.category) errs.category = "Category is required.";
    if (!form.summary.trim()) errs.summary = "Summary is required.";
    if (!form.content.trim()) errs.content = "Content is required.";
    if (!form.status) errs.status = "Status is required.";
    return errs;
  };

  // ── Submit ────────────────────────────────────────────────────────────────
  const handleSubmit = async (e) => {
    e.preventDefault();
    const nextErrors = validate();
    if (Object.keys(nextErrors).length) {
      setErrors(nextErrors);
      return;
    }

    const payload = {
      title: form.title.trim(),
      category: form.category,
      summary: form.summary.trim(),
      content: form.content.trim(),
      status: form.status,
      thumbnailUrl: form.thumbnailUrl.trim(),
      author: currentUser
        ? `${currentUser.firstName} ${currentUser.lastName}`.trim()
        : "Unknown",
      authorId: currentUser?._id ?? currentUser?.id,
    };

    setSubmitting(true);
    try {
      if (modal.id) {
        const { data } = await updateArticle(modal.id, payload);
        setArticles((prev) =>
          prev.map((a) =>
            a.id === modal.id ? mapArticleFromApi({ ...a, ...data }) : a,
          ),
        );
        showToast("Article updated successfully.");
      } else {
        const { data } = await createArticle(payload);
        setArticles((prev) => [...prev, mapArticleFromApi(data)]);
        showToast("Article created successfully.");
      }
      closeModal();
    } catch (err) {
      showToast(
        err?.response?.data?.message || "Failed to save article.",
        "error",
      );
    } finally {
      setSubmitting(false);
    }
  };

  // ── Archive / restore (admin only) ────────────────────────────────────────
  const toggleArchive = async (article) => {
    if (!isAdmin) return;
    const newStatus = article.status === "archived" ? "draft" : "archived";
    try {
      await updateArticle(article.id, { status: newStatus });
      setArticles((prev) =>
        prev.map((a) =>
          a.id === article.id ? { ...a, status: newStatus } : a,
        ),
      );
      showToast(
        `Article ${newStatus === "archived" ? "archived" : "restored to draft"}.`,
      );
    } catch {
      showToast("Failed to update article status.", "error");
    }
  };

  // ── Delete (admin only) ───────────────────────────────────────────────────
  const handleDelete = async (id) => {
    if (!isAdmin) return;
    if (!window.confirm("Delete this article permanently?")) return;
    try {
      await deleteArticle(id);
      setArticles((prev) => prev.filter((a) => a.id !== id));
      showToast("Article deleted.");
    } catch {
      showToast("Failed to delete article.", "error");
    }
  };

  // ── Filtered rows ─────────────────────────────────────────────────────────
  const filteredArticles = articles.filter((a) => {
    const q = search.toLowerCase();
    const matchesSearch =
      a.title?.toLowerCase().includes(q) ||
      a.author?.toLowerCase().includes(q) ||
      a.summary?.toLowerCase().includes(q);
    const matchesCat = filterCategory ? a.category === filterCategory : true;
    const matchesStatus = filterStatus ? a.status === filterStatus : true;
    return matchesSearch && matchesCat && matchesStatus;
  });

  // ── Field helper ──────────────────────────────────────────────────────────
  const fieldProps = (name, label, extra = {}) => ({
    name,
    label,
    value: form[name] ?? "",
    onChange: handleChange,
    error: Boolean(errors[name]),
    helperText: errors[name],
    fullWidth: true,
    ...extra,
  });

  // ── Columns ───────────────────────────────────────────────────────────────
  const columns = [
    {
      field: "title",
      headerName: "Title",
      flex: 1.5,
      minWidth: 200,
    },
    {
      field: "category",
      headerName: "Category",
      minWidth: 140,
    },
    {
      field: "author",
      headerName: "Author",
      minWidth: 160,
    },
    {
      field: "status",
      headerName: "Status",
      minWidth: 120,
      renderCell: ({ row }) => (
        <Chip
          size="small"
          label={labelize(row.status)}
          color={statusColor(row.status)}
          variant={row.status === "archived" ? "outlined" : "filled"}
        />
      ),
    },
    {
      field: "createdAt",
      headerName: "Created",
      minWidth: 130,
      valueGetter: (_, row) =>
        row.createdAt ? new Date(row.createdAt).toLocaleDateString() : "—",
    },
    {
      field: "actions",
      headerName: "Actions",
      minWidth: isAdmin ? 260 : 100,
      sortable: false,
      filterable: false,
      renderCell: ({ row }) => (
        <Stack direction="row" spacing={1} sx={{ py: 0.5 }}>
          {canEdit && (
            <Button
              size="small"
              variant="outlined"
              onClick={() => openModal(row)}
            >
              Edit
            </Button>
          )}
          {isAdmin && (
            <>
              <Button
                size="small"
                variant="contained"
                color={row.status === "archived" ? "success" : "warning"}
                onClick={() => toggleArchive(row)}
              >
                {row.status === "archived" ? "Restore" : "Archive"}
              </Button>
              <Button
                size="small"
                variant="contained"
                color="error"
                onClick={() => handleDelete(row.id)}
              >
                Delete
              </Button>
            </>
          )}
        </Stack>
      ),
    },
  ];

  // ── Render ────────────────────────────────────────────────────────────────
  return (
    <Box sx={{ width: "100%", minWidth: 0 }}>
      {/* ── Toolbar ──────────────────────────────────────────────────────── */}
      <Box
        sx={{
          mb: 3,
          display: "flex",
          flexWrap: "wrap",
          gap: 2,
          alignItems: "center",
        }}
      >
        <TextField
          placeholder="Search articles…"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          sx={{ flex: 1, minWidth: 180 }}
        />
        <TextField
          select
          label="Category"
          value={filterCategory}
          onChange={(e) => setFilterCategory(e.target.value)}
          sx={{ minWidth: 150 }}
        >
          <MenuItem value="">All</MenuItem>
          {CATEGORIES.map((c) => (
            <MenuItem key={c} value={c}>
              {c}
            </MenuItem>
          ))}
        </TextField>
        <TextField
          select
          label="Status"
          value={filterStatus}
          onChange={(e) => setFilterStatus(e.target.value)}
          sx={{ minWidth: 130 }}
        >
          <MenuItem value="">All</MenuItem>
          {STATUSES.map((s) => (
            <MenuItem key={s} value={s}>
              {labelize(s)}
            </MenuItem>
          ))}
        </TextField>
        {canEdit && (
          <Button
            variant="contained"
            onClick={() => openModal()}
            sx={{ width: { xs: "100%", sm: "auto" } }}
          >
            New Article
          </Button>
        )}
      </Box>

      {apiError && (
        <Alert severity="error" sx={{ mb: 2 }}>
          {apiError}
        </Alert>
      )}

      {/* ── Table ────────────────────────────────────────────────────────── */}
      <Paper sx={{ p: { xs: 1.5, sm: 2 }, minWidth: 0, overflow: "hidden" }}>
        {loading ? (
          <Box sx={{ display: "flex", justifyContent: "center", py: 6 }}>
            <CircularProgress />
          </Box>
        ) : filteredArticles.length ? (
          <Box sx={{ height: { xs: 460, sm: 520 }, width: "100%" }}>
            <DataGrid
              rows={filteredArticles}
              columns={columns}
              getRowId={(row) => row.id}
              disableRowSelectionOnClick
              pageSizeOptions={[5, 10, 25]}
              initialState={{
                pagination: { paginationModel: { pageSize: 10, page: 0 } },
              }}
              sx={{
                "& .MuiDataGrid-cell, & .MuiDataGrid-columnHeader": {
                  outline: "none",
                },
              }}
            />
          </Box>
        ) : (
          <Alert severity="info">
            No articles found. Adjust your search or filters, or create your
            first article.
          </Alert>
        )}
      </Paper>

      {/* ── Add / Edit Modal ──────────────────────────────────────────────── */}
      <Dialog
        open={modal.open}
        onClose={closeModal}
        fullWidth
        fullScreen={isMobile}
        maxWidth="md"
      >
        <Box component="form" onSubmit={handleSubmit}>
          <DialogTitle>{modal.id ? "Edit Article" : "New Article"}</DialogTitle>
          <DialogContent dividers sx={{ px: { xs: 2, sm: 3 } }}>
            <Stack spacing={2} sx={{ pt: 1 }}>
              <TextField {...fieldProps("title", "Title")} />

              <Stack direction={{ xs: "column", sm: "row" }} spacing={2}>
                <TextField
                  {...fieldProps("category", "Category", { select: true })}
                >
                  {CATEGORIES.map((c) => (
                    <MenuItem key={c} value={c}>
                      {c}
                    </MenuItem>
                  ))}
                </TextField>

                <TextField
                  {...fieldProps("status", "Status", { select: true })}
                >
                  {STATUSES.map((s) => (
                    <MenuItem key={s} value={s}>
                      {labelize(s)}
                    </MenuItem>
                  ))}
                </TextField>
              </Stack>

              <TextField
                {...fieldProps("summary", "Summary", {
                  multiline: true,
                  rows: 2,
                  placeholder: "Brief description shown on the listing page…",
                })}
              />

              <TextField
                {...fieldProps("content", "Content", {
                  multiline: true,
                  rows: 8,
                  placeholder: "Full article body…",
                })}
              />

              <TextField
                {...fieldProps("thumbnailUrl", "Thumbnail URL (optional)", {
                  placeholder: "https://example.com/image.jpg",
                })}
              />
            </Stack>
          </DialogContent>

          <DialogActions sx={{ px: 3, py: 2 }}>
            <Button onClick={closeModal} disabled={submitting}>
              Cancel
            </Button>
            <Button
              type="submit"
              variant="contained"
              disabled={submitting}
              startIcon={
                submitting ? (
                  <CircularProgress size={16} color="inherit" />
                ) : null
              }
            >
              {modal.id ? "Update Article" : "Publish Article"}
            </Button>
          </DialogActions>
        </Box>
      </Dialog>

      {/* ── Toast ────────────────────────────────────────────────────────── */}
      <Snackbar
        open={toast.open}
        autoHideDuration={3500}
        onClose={() => setToast((t) => ({ ...t, open: false }))}
        anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
      >
        <Alert
          onClose={() => setToast((t) => ({ ...t, open: false }))}
          severity={toast.severity}
          variant="filled"
          sx={{ width: "100%" }}
        >
          {toast.message}
        </Alert>
      </Snackbar>
    </Box>
  );
};

export default DashArticleListPage;
