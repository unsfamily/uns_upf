import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "../App.css";

const AdminDashboard = () => {
  const [pledges, setPledges] = useState([]);
  const [totalCount, setTotalCount] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [downloading, setDownloading] = useState(false);
  const [showPasswordModal, setShowPasswordModal] = useState(false);
  const [passwordData, setPasswordData] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });
  const [passwordError, setPasswordError] = useState("");
  const [passwordSuccess, setPasswordSuccess] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("adminToken");
    if (!token) {
      navigate("/admin/login");
      return;
    }

    fetchPledges(token);
    fetchPledgeCount(token);
  }, [navigate]);

  const fetchPledgeCount = async (token) => {
    try {
      const response = await fetch(
        `${process.env.REACT_APP_API_URL}/api/admin/pledges/count`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const data = await response.json();

      if (response.status === 401) {
        localStorage.removeItem("adminToken");
        navigate("/admin/login");
        return;
      }

      if (data.success) {
        setTotalCount(data.count);
      }
    } catch (err) {
      console.error("Error fetching pledge count:", err);
    }
  };

  const fetchPledges = async (token) => {
    try {
      const response = await fetch(
        `${process.env.REACT_APP_API_URL}/api/admin/pledges`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const data = await response.json();

      if (response.status === 401) {
        // Token expired or invalid
        localStorage.removeItem("adminToken");
        navigate("/admin/login");
        return;
      }

      if (data.success) {
        setPledges(data.data);
      } else {
        setError(data.message || "Failed to fetch pledges");
      }
    } catch (err) {
      console.error("Error fetching pledges:", err);
      setError("An error occurred while fetching pledges");
    } finally {
      setLoading(false);
    }
  };

  const handleDownloadExcel = async () => {
    setDownloading(true);
    try {
      const token = localStorage.getItem("adminToken");
      if (!token) {
        navigate("/admin/login");
        return;
      }

      const response = await fetch(
        `${process.env.REACT_APP_API_URL}/api/admin/pledges/export`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.status === 401) {
        localStorage.removeItem("adminToken");
        navigate("/admin/login");
        return;
      }

      if (response.ok) {
        const blob = await response.blob();
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement("a");
        a.href = url;
        a.download = `peace_pledges_${Date.now()}.xlsx`;
        document.body.appendChild(a);
        a.click();
        window.URL.revokeObjectURL(url);
        document.body.removeChild(a);
      } else {
        setError("Failed to download Excel file");
      }
    } catch (err) {
      console.error("Error downloading Excel:", err);
      setError("An error occurred while downloading the file");
    } finally {
      setDownloading(false);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("adminToken");
    navigate("/admin/login");
  };

  const handlePasswordChange = async (e) => {
    e.preventDefault();
    setPasswordError("");
    setPasswordSuccess("");

    // Validation
    if (passwordData.newPassword !== passwordData.confirmPassword) {
      setPasswordError("New passwords do not match");
      return;
    }

    if (passwordData.newPassword.length < 6) {
      setPasswordError("New password must be at least 6 characters");
      return;
    }

    try {
      const token = localStorage.getItem("adminToken");
      if (!token) {
        navigate("/admin/login");
        return;
      }

      const response = await fetch(
        `${process.env.REACT_APP_API_URL}/api/admin/change-password`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({
            currentPassword: passwordData.currentPassword,
            newPassword: passwordData.newPassword,
          }),
        }
      );

      const data = await response.json();

      if (response.status === 401) {
        if (data.message === "Current password is incorrect") {
          setPasswordError(data.message);
        } else {
          localStorage.removeItem("adminToken");
          navigate("/admin/login");
        }
        return;
      }

      if (data.success) {
        setPasswordSuccess("Password changed successfully!");
        setPasswordData({
          currentPassword: "",
          newPassword: "",
          confirmPassword: "",
        });
        setTimeout(() => {
          setShowPasswordModal(false);
          setPasswordSuccess("");
        }, 2000);
      } else {
        setPasswordError(data.message || "Failed to change password");
      }
    } catch (err) {
      console.error("Error changing password:", err);
      setPasswordError("An error occurred while changing password");
    }
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleString();
  };

  return (
    <div className="admin-dashboard">
      <div className="dashboard-header">
        <h1>Admin Dashboard</h1>
        <div className="dashboard-actions">
          <button
            onClick={() => setShowPasswordModal(true)}
            className="btn-settings"
          >
            Change Password
          </button>
          <button
            onClick={handleDownloadExcel}
            disabled={downloading || loading}
            className="btn-download"
          >
            {downloading ? "Downloading..." : "Download Excel"}
          </button>
          <button onClick={handleLogout} className="btn-logout">
            Logout
          </button>
        </div>
      </div>

      {loading && <div className="loading">Loading pledges...</div>}

      {error && <div className="error-message">{error}</div>}

      {!loading && !error && (
        <>
          {/* Stats Card */}
          <div className="stats-container">
            <div className="stat-card">
              <div className="stat-icon">📊</div>
              <div className="stat-content">
                <h3>Total Submissions</h3>
                <p className="stat-number">{totalCount}</p>
              </div>
            </div>
          </div>

          {/* Pledges Table */}
          <div className="pledges-container">
            <h2>Peace Pledge Submissions ({pledges.length})</h2>
            <div className="table-responsive">
              <table className="pledges-table">
                <thead>
                  <tr>
                    <th>ID</th>
                    <th>First Name</th>
                    <th>Last Name</th>
                    <th>Mobile</th>
                    <th>Email</th>
                    <th>Country</th>
                    <th>Address</th>
                    <th>Created At</th>
                  </tr>
                </thead>
                <tbody>
                  {pledges.length === 0 ? (
                    <tr>
                      <td colSpan="8" style={{ textAlign: "center" }}>
                        No pledges found
                      </td>
                    </tr>
                  ) : (
                    pledges.map((pledge) => (
                      <tr key={pledge.id}>
                        <td>{pledge.id}</td>
                        <td>{pledge.first_name}</td>
                        <td>{pledge.last_name}</td>
                        <td>{pledge.mobile || "N/A"}</td>
                        <td>{pledge.email}</td>
                        <td>{pledge.country}</td>
                        <td>{pledge.address || "N/A"}</td>
                        <td>{formatDate(pledge.created_at)}</td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </>
      )}

      {/* Password Change Modal */}
      {showPasswordModal && (
        <div
          className="modal-overlay"
          onClick={() => setShowPasswordModal(false)}
        >
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h2>Change Password</h2>
              <button
                className="modal-close"
                onClick={() => setShowPasswordModal(false)}
              >
                ×
              </button>
            </div>
            <form onSubmit={handlePasswordChange}>
              <div className="form-group">
                <label htmlFor="currentPassword">Current Password</label>
                <input
                  type="password"
                  id="currentPassword"
                  value={passwordData.currentPassword}
                  onChange={(e) =>
                    setPasswordData({
                      ...passwordData,
                      currentPassword: e.target.value,
                    })
                  }
                  required
                  placeholder="Enter current password"
                />
              </div>
              <div className="form-group">
                <label htmlFor="newPassword">New Password</label>
                <input
                  type="password"
                  id="newPassword"
                  value={passwordData.newPassword}
                  onChange={(e) =>
                    setPasswordData({
                      ...passwordData,
                      newPassword: e.target.value,
                    })
                  }
                  required
                  placeholder="Enter new password (min 6 characters)"
                />
              </div>
              <div className="form-group">
                <label htmlFor="confirmPassword">Confirm New Password</label>
                <input
                  type="password"
                  id="confirmPassword"
                  value={passwordData.confirmPassword}
                  onChange={(e) =>
                    setPasswordData({
                      ...passwordData,
                      confirmPassword: e.target.value,
                    })
                  }
                  required
                  placeholder="Confirm new password"
                />
              </div>
              {passwordError && (
                <div className="error-message">{passwordError}</div>
              )}
              {passwordSuccess && (
                <div className="success-message">{passwordSuccess}</div>
              )}
              <div className="modal-actions">
                <button
                  type="button"
                  className="btn-cancel"
                  onClick={() => setShowPasswordModal(false)}
                >
                  Cancel
                </button>
                <button type="submit" className="btn-primary">
                  Change Password
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminDashboard;
