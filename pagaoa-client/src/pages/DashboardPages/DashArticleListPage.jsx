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
} from "@mui/material";
import { useTheme } from "@mui/material/styles";
import useMediaQuery from "@mui/material/useMediaQuery";
import { DataGrid } from "@mui/x-data-grid";
import {
  fetchArticles,
  createArticle,
  updateArticle,
  deleteArticle,
} from "../../services/articleService";

// ─── Blank form matches Article schema exactly ────────────────────────────────
const BLANK_FORM = {
  name: "", // unique slug  e.g. "chocolate-chunk-cookies"
  title: "", // display title
  content: "", // single string in the form; sent as ["..."] to the API
  imageUrl: "", // required image URL
};

// ─── Component ────────────────────────────────────────────────────────────────
const DashArticleListPage = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  // ── Auth ──────────────────────────────────────────────────────────────────
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
  const [filterStatus, setFilterStatus] = useState(""); // "active" | "inactive" | ""

  // ── Fetch ─────────────────────────────────────────────────────────────────
  const loadArticles = useCallback(async () => {
    setLoading(true);
    setApiError("");
    try {
      const { data } = await fetchArticles();
      const raw = Array.isArray(data) ? data : (data.articles ?? []);
      setArticles(
        raw.map((a) => ({
          ...a,
          id: a._id ?? a.id,
          // content arrives as string[] from DB — join for display/editing
          content: Array.isArray(a.content)
            ? a.content.join("\n")
            : (a.content ?? ""),
        })),
      );
    } catch (err) {
      setApiError(err?.response?.data?.message || "Failed to load articles.");
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
            name: article.name ?? "",
            title: article.title ?? "",
            content: Array.isArray(article.content)
              ? article.content.join("\n")
              : (article.content ?? ""),
            imageUrl: article.imageUrl ?? "",
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
    if (!form.name.trim()) errs.name = "Name (slug) is required.";
    else if (/\s/.test(form.name.trim()))
      errs.name = "No spaces — use hyphens (e.g. my-article).";
    if (!form.title.trim()) errs.title = "Title is required.";
    if (!form.content.trim()) errs.content = "Content is required.";
    if (!form.imageUrl.trim()) errs.imageUrl = "Image URL is required.";
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

    // content is stored as string[] in MongoDB
    const payload = {
      name: form.name.trim().toLowerCase(),
      title: form.title.trim(),
      content: form.content.trim().split("\n").filter(Boolean),
      imageUrl: form.imageUrl.trim(),
    };

    setSubmitting(true);
    try {
      if (modal.id) {
        const { data } = await updateArticle(modal.id, payload);
        setArticles((prev) =>
          prev.map((a) =>
            a.id === modal.id
              ? {
                  ...a,
                  ...data,
                  id: modal.id,
                  content: Array.isArray(data.content)
                    ? data.content.join("\n")
                    : data.content,
                }
              : a,
          ),
        );
        showToast("Article updated successfully.");
      } else {
        const { data } = await createArticle(payload);
        setArticles((prev) => [
          ...prev,
          {
            ...data,
            id: data._id ?? data.id,
            content: Array.isArray(data.content)
              ? data.content.join("\n")
              : data.content,
          },
        ]);
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

  // ── Toggle isActive (archive / restore) — admin only ─────────────────────
  const toggleActive = async (article) => {
    if (!isAdmin) return;
    const updated = { isActive: !article.isActive };
    try {
      await updateArticle(article.id, updated);
      setArticles((prev) =>
        prev.map((a) => (a.id === article.id ? { ...a, ...updated } : a)),
      );
      showToast(`Article ${updated.isActive ? "restored" : "archived"}.`);
    } catch {
      showToast("Failed to update article.", "error");
    }
  };

  // ── Delete — admin only ───────────────────────────────────────────────────
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

  // ── Filter ────────────────────────────────────────────────────────────────
  const filteredArticles = articles.filter((a) => {
    const q = search.toLowerCase();
    const matchesSearch =
      a.title?.toLowerCase().includes(q) || a.name?.toLowerCase().includes(q);
    const matchesStatus =
      filterStatus === "active"
        ? a.isActive
        : filterStatus === "inactive"
          ? !a.isActive
          : true;
    return matchesSearch && matchesStatus;
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
    { field: "name", headerName: "Slug", minWidth: 200, flex: 1 },
    { field: "title", headerName: "Title", minWidth: 220, flex: 1.5 },
    {
      field: "isActive",
      headerName: "Status",
      minWidth: 110,
      renderCell: ({ row }) => (
        <Chip
          size="small"
          label={row.isActive ? "Active" : "Archived"}
          color={row.isActive ? "success" : "default"}
          variant={row.isActive ? "filled" : "outlined"}
        />
      ),
    },
    {
      field: "actions",
      headerName: "Actions",
      minWidth: isAdmin ? 240 : 90,
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
                color={row.isActive ? "warning" : "success"}
                onClick={() => toggleActive(row)}
              >
                {row.isActive ? "Archive" : "Restore"}
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
      {/* Toolbar */}
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
          placeholder="Search by title or slug…"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          sx={{ flex: 1, minWidth: 180 }}
        />
        <TextField
          select
          label="Status"
          value={filterStatus}
          onChange={(e) => setFilterStatus(e.target.value)}
          sx={{ minWidth: 130 }}
        >
          <MenuItem value="">All</MenuItem>
          <MenuItem value="active">Active</MenuItem>
          <MenuItem value="inactive">Archived</MenuItem>
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

      {/* Table */}
      <Paper sx={{ p: { xs: 1.5, sm: 2 }, overflow: "hidden" }}>
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
            No articles found. Adjust your search or create your first article.
          </Alert>
        )}
      </Paper>

      {/* Add / Edit Modal */}
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
              {/* Slug */}
              <TextField
                {...fieldProps("name", "Slug (unique name)", {
                  placeholder: "e.g. chocolate-chunk-cookies",
                  helperText:
                    errors.name ||
                    "Lowercase, hyphens only. Used in the page URL.",
                })}
              />

              {/* Title */}
              <TextField {...fieldProps("title", "Title")} />

              {/* Image URL */}
              <TextField
                {...fieldProps("imageUrl", "Image URL", {
                  placeholder: "https://example.com/image.jpg",
                })}
              />

              {/* Content — each line becomes one array entry in MongoDB */}
              <TextField
                {...fieldProps("content", "Content", {
                  multiline: true,
                  rows: 8,
                  placeholder: "Article body. Each paragraph on its own line.",
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
              {modal.id ? "Update Article" : "Save Article"}
            </Button>
          </DialogActions>
        </Box>
      </Dialog>

      {/* Toast */}
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
