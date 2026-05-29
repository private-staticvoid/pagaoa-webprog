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
  FormControlLabel,
  IconButton,
  InputAdornment,
  MenuItem,
  Paper,
  Snackbar,
  Stack,
  Switch,
  TextField,
  Typography,
  useMediaQuery,
} from "@mui/material";
import { useTheme } from "@mui/material/styles";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import { DataGrid } from "@mui/x-data-grid";
import { fetchUsers, createUser, updateUser } from "../../services/UserService";

const TYPES = ["admin", "editor", "viewer"];
const GENDERS = ["male", "female", "other"];

const BLANK_FORM = {
  firstName: "",
  lastName: "",
  age: "",
  gender: "",
  contactNumber: "",
  email: "",
  type: "editor",
  username: "",
  password: "",
  address: "",
  isActive: true,
};

const labelize = (value) =>
  value ? `${value.charAt(0).toUpperCase()}${value.slice(1)}` : "";

const UsersPage = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  const currentUser = (() => {
    try {
      return JSON.parse(localStorage.getItem("currentUser")) || null;
    } catch {
      return null;
    }
  })();

  const isEditor = currentUser?.type === "editor";

  const [users, setUsers] = useState([]);
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
  const [showPassword, setShowPassword] = useState(false);

  const [search, setSearch] = useState("");
  const [filterType, setFilterType] = useState("");
  const [filterGender, setFilterGender] = useState("");
  const [filterStatus, setFilterStatus] = useState("");

  const loadUsers = useCallback(async () => {
    setLoading(true);
    setApiError("");
    try {
      const { data } = await fetchUsers();
      setUsers(
        data.users.map((u, i) => ({
          ...u,
          id: u._id ?? u.id ?? i + 1,
        })),
      );
    } catch (err) {
      setApiError(
        err?.response?.data?.message ||
          "Failed to load users. Check your connection.",
      );
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    loadUsers();
  }, [loadUsers]);

  const showToast = (message, severity = "success") =>
    setToast({ open: true, message, severity });

  const resetForm = () => {
    setForm({ ...BLANK_FORM });
    setErrors({});
  };

  // FIX: when editing, populate all existing fields and leave password blank
  // (API never returns the password — user only fills it in if they want to change it)
  const openModal = (user) => {
    const userId = user?._id ?? user?.id ?? null;
    setModal({ open: true, id: userId });
    if (user) {
      setForm({
        firstName: user.firstName ?? "",
        lastName: user.lastName ?? "",
        age: String(user.age ?? ""),
        gender: user.gender ?? "",
        contactNumber: user.contactNumber ?? "",
        email: user.email ?? "",
        type: user.type ?? "editor",
        username: user.username ?? "",
        password: "", // intentionally blank — fill only to change
        address: user.address ?? "",
        isActive: user.isActive ?? true,
      });
    } else {
      setForm({ ...BLANK_FORM });
    }
    setErrors({});
  };

  const closeModal = () => {
    setModal({ open: false, id: null });
    setShowPassword(false);
    resetForm();
  };

  const handleChange = ({ target: { name, value, checked, type } }) => {
    setForm((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
    if (errors[name]) setErrors((prev) => ({ ...prev, [name]: "" }));
  };

  // FIX: password is only required and validated on create, not on edit
  const validate = () => {
    const next = {};
    const isEditing = Boolean(modal.id);
    const email = form.email.trim().toLowerCase();
    const username = form.username.trim();

    const required = [
      ["firstName", "First name"],
      ["lastName", "Last name"],
      ["age", "Age"],
      ["gender", "Gender"],
      ["contactNumber", "Contact number"],
      ["email", "Email"],
      ["type", "Role"],
      ["username", "Username"],
      ["address", "Address"],
    ];

    // Password only required when creating a new user
    if (!isEditing) {
      required.push(["password", "Password"]);
    }

    required.forEach(([key, label]) => {
      if (!String(form[key] ?? "").trim()) next[key] = `${label} is required.`;
    });

    if (!next.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email))
      next.email = "Enter a valid email address.";
    if (!next.username && /\s/.test(username))
      next.username = "Username must not contain spaces.";

    // Only validate password length if a value was entered
    if (form.password && form.password.length < 8)
      next.password = "Password must be at least 8 characters.";

    if (!next.contactNumber && !/^\d{11}$/.test(form.contactNumber))
      next.contactNumber = "Contact number must be 11 digits.";
    if (!next.age && !/^\d+$/.test(form.age))
      next.age = "Age must be a number.";

    if (
      !next.email &&
      users.some((u) => u.id !== modal.id && u.email === email)
    )
      next.email = "Email address already exists.";
    if (
      !next.username &&
      users.some(
        (u) => u.id !== modal.id && u.username === username.toLowerCase(),
      )
    )
      next.username = "Username already exists.";

    return next;
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const nextErrors = validate();
    if (Object.keys(nextErrors).length) {
      setErrors(nextErrors);
      return;
    }

    // FIX: only include password in payload if the user actually typed one
    const payload = {
      firstName: form.firstName.trim(),
      lastName: form.lastName.trim(),
      age: form.age.trim(),
      gender: form.gender.trim().toLowerCase(),
      contactNumber: form.contactNumber.trim(),
      email: form.email.trim().toLowerCase(),
      type: form.type.trim().toLowerCase(),
      username: form.username.trim().toLowerCase(),
      address: form.address.trim(),
      isActive: form.isActive,
      ...(form.password ? { password: form.password } : {}),
    };

    setSubmitting(true);
    try {
      if (modal.id) {
        const { data } = await updateUser(modal.id, payload);
        setUsers((prev) =>
          prev.map((u) =>
            u.id === modal.id ? { ...u, ...data, id: modal.id } : u,
          ),
        );
        showToast("User updated successfully.");
      } else {
        const { data } = await createUser(payload);
        setUsers((prev) => [...prev, { ...data, id: data._id ?? data.id }]);
        showToast("User created successfully.");
      }
      closeModal();
    } catch (err) {
      showToast(
        err?.response?.data?.message ||
          "Failed to save user. Please try again.",
        "error",
      );
    } finally {
      setSubmitting(false);
    }
  };

  const toggleStatus = async (user) => {
    if (isEditor) return;
    const updated = { isActive: !user.isActive };
    try {
      await updateUser(user.id, updated);
      setUsers((prev) =>
        prev.map((u) => (u.id === user.id ? { ...u, ...updated } : u)),
      );
      showToast(`User ${updated.isActive ? "activated" : "disabled"}.`);
    } catch {
      showToast("Failed to update status.", "error");
    }
  };

  const filteredUsers = users.filter((u) => {
    const q = search.toLowerCase();
    const matchesSearch =
      u.firstName?.toLowerCase().includes(q) ||
      u.lastName?.toLowerCase().includes(q) ||
      u.email?.toLowerCase().includes(q) ||
      u.username?.toLowerCase().includes(q);
    const matchesType = filterType ? u.type === filterType : true;
    const matchesGender = filterGender ? u.gender === filterGender : true;
    const matchesStatus =
      filterStatus === "active"
        ? u.isActive
        : filterStatus === "inactive"
          ? !u.isActive
          : true;
    return matchesSearch && matchesType && matchesGender && matchesStatus;
  });

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

  const columns = [
    {
      field: "id",
      headerName: "ID",
      width: 80,
      valueGetter: (_, row) => row._id ?? row.id,
    },
    {
      field: "fullName",
      headerName: "Full Name",
      flex: 1,
      valueGetter: (_, row) =>
        `${row.firstName || ""} ${row.lastName || ""}`.trim(),
    },
    { field: "username", headerName: "Username", minWidth: 150 },
    { field: "age", headerName: "Age", width: 80 },
    {
      field: "gender",
      headerName: "Gender",
      minWidth: 110,
      valueGetter: (_, row) => labelize(row.gender),
    },
    { field: "email", headerName: "Email", flex: 1.1, minWidth: 220 },
    { field: "contactNumber", headerName: "Contact", minWidth: 150 },
    {
      field: "type",
      headerName: "Role",
      minWidth: 110,
      valueGetter: (_, row) => labelize(row.type),
    },
    {
      field: "status",
      headerName: "Status",
      minWidth: 120,
      sortable: false,
      renderCell: ({ row }) => (
        <Chip
          size="small"
          label={row.isActive ? "Active" : "Inactive"}
          color={row.isActive ? "success" : "default"}
          variant={row.isActive ? "filled" : "outlined"}
        />
      ),
    },
    {
      field: "actions",
      headerName: "Actions",
      minWidth: 220,
      sortable: false,
      filterable: false,
      renderCell: ({ row }) => (
        <Stack direction="row" spacing={1} sx={{ py: 0.5 }}>
          <Button
            size="small"
            variant="outlined"
            onClick={() => openModal(row)}
          >
            Edit
          </Button>
          {!isEditor && (
            <Button
              size="small"
              variant="contained"
              color={row.isActive ? "warning" : "success"}
              onClick={() => toggleStatus(row)}
            >
              {row.isActive ? "Disable" : "Activate"}
            </Button>
          )}
        </Stack>
      ),
    },
  ];

  if (isEditor) {
    return (
      <Box sx={{ p: 4 }}>
        <Alert severity="error">
          <Typography fontWeight={600}>Access Denied</Typography>
          You do not have permission to view the Users page.
        </Alert>
      </Box>
    );
  }

  return (
    <Box sx={{ width: "100%", minWidth: 0 }}>
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
          placeholder="Search users..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          sx={{ flex: 1, minWidth: 180 }}
        />
        <TextField
          select
          label="Role"
          value={filterType}
          onChange={(e) => setFilterType(e.target.value)}
          sx={{ minWidth: 120 }}
        >
          <MenuItem value="">All</MenuItem>
          {TYPES.map((t) => (
            <MenuItem key={t} value={t}>
              {labelize(t)}
            </MenuItem>
          ))}
        </TextField>
        <TextField
          select
          label="Gender"
          value={filterGender}
          onChange={(e) => setFilterGender(e.target.value)}
          sx={{ minWidth: 120 }}
        >
          <MenuItem value="">All</MenuItem>
          {GENDERS.map((g) => (
            <MenuItem key={g} value={g}>
              {labelize(g)}
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
          <MenuItem value="active">Active</MenuItem>
          <MenuItem value="inactive">Inactive</MenuItem>
        </TextField>
        <Button
          variant="contained"
          onClick={() => openModal()}
          sx={{ width: { xs: "100%", sm: "auto" } }}
        >
          Add User
        </Button>
      </Box>

      {apiError && (
        <Alert severity="error" sx={{ mb: 2 }}>
          {apiError}
        </Alert>
      )}

      <Paper sx={{ p: { xs: 1.5, sm: 2 }, minWidth: 0, overflow: "hidden" }}>
        {loading ? (
          <Box sx={{ display: "flex", justifyContent: "center", py: 6 }}>
            <CircularProgress />
          </Box>
        ) : filteredUsers.length ? (
          <Box
            sx={{ height: { xs: 460, sm: 520 }, width: "100%", minWidth: 0 }}
          >
            <DataGrid
              rows={filteredUsers}
              columns={columns}
              getRowId={(row) => row._id ?? row.id}
              disableRowSelectionOnClick
              pageSizeOptions={[5, 10, 25]}
              initialState={{
                pagination: { paginationModel: { pageSize: 10, page: 0 } },
              }}
              sx={{
                minWidth: 0,
                "& .MuiDataGrid-cell, & .MuiDataGrid-columnHeader": {
                  outline: "none",
                },
              }}
            />
          </Box>
        ) : (
          <Alert severity="info">
            No users found. Adjust search or filters.
          </Alert>
        )}
      </Paper>

      <Dialog
        open={modal.open}
        onClose={closeModal}
        fullWidth
        fullScreen={isMobile}
        maxWidth="md"
      >
        <Box component="form" onSubmit={handleSubmit}>
          <DialogTitle>{modal.id ? "Edit User" : "Add User"}</DialogTitle>
          <DialogContent dividers sx={{ px: { xs: 2, sm: 3 } }}>
            <Stack spacing={2} sx={{ pt: 1 }}>
              <Stack direction={{ xs: "column", sm: "row" }} spacing={2}>
                <TextField {...fieldProps("firstName", "First Name")} />
                <TextField {...fieldProps("lastName", "Last Name")} />
              </Stack>

              <Stack direction={{ xs: "column", sm: "row" }} spacing={2}>
                <TextField {...fieldProps("age", "Age")} />
                <TextField
                  {...fieldProps("gender", "Gender", { select: true })}
                >
                  {GENDERS.map((g) => (
                    <MenuItem key={g} value={g}>
                      {labelize(g)}
                    </MenuItem>
                  ))}
                </TextField>
              </Stack>

              <Stack direction={{ xs: "column", sm: "row" }} spacing={2}>
                <TextField {...fieldProps("contactNumber", "Contact Number")} />
                <TextField
                  {...fieldProps("email", "Email Address", {
                    type: "email",
                  })}
                />
              </Stack>

              <Stack direction={{ xs: "column", sm: "row" }} spacing={2}>
                <TextField {...fieldProps("type", "Role", { select: true })}>
                  {TYPES.filter((t) =>
                    currentUser?.type === "admin" ? true : t !== "admin",
                  ).map((t) => (
                    <MenuItem key={t} value={t}>
                      {labelize(t)}
                    </MenuItem>
                  ))}
                </TextField>
                <TextField {...fieldProps("username", "Username")} />
              </Stack>

              <TextField
                {...fieldProps(
                  "password",
                  modal.id
                    ? "New Password (leave blank to keep current)"
                    : "Password",
                  {
                    type: showPassword ? "text" : "password",
                    slotProps: {
                      input: {
                        endAdornment: (
                          <InputAdornment position="end">
                            <IconButton
                              edge="end"
                              onClick={() => setShowPassword((p) => !p)}
                              onMouseDown={(e) => e.preventDefault()}
                              aria-label={
                                showPassword ? "Hide password" : "Show password"
                              }
                            >
                              {showPassword ? (
                                <VisibilityOff />
                              ) : (
                                <Visibility />
                              )}
                            </IconButton>
                          </InputAdornment>
                        ),
                      },
                    },
                  },
                )}
              />

              <TextField
                {...fieldProps("address", "Address", {
                  multiline: true,
                  rows: 3,
                })}
              />

              <FormControlLabel
                control={
                  <Switch
                    name="isActive"
                    checked={form.isActive}
                    onChange={handleChange}
                  />
                }
                label={
                  form.isActive
                    ? "User status: Active"
                    : "User status: Inactive"
                }
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
              {modal.id ? "Update User" : "Save User"}
            </Button>
          </DialogActions>
        </Box>
      </Dialog>

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

export default UsersPage;
