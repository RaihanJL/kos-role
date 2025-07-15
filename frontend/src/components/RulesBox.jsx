import React, { useEffect, useState } from "react";
import axios from "axios";
import "../styles/RulesBox.css";

const RulesBox = ({ isAdmin, boxStyle }) => {
  const [rules, setRules] = useState("");
  const [isEditing, setIsEditing] = useState(false);
  const [editValue, setEditValue] = useState("");

  useEffect(() => {
    const fetchRules = async () => {
      const res = await axios.get("http://localhost:5000/rules");
      setRules(res.data?.content || "");
    };
    fetchRules();
  }, []);

  const handleEdit = () => {
    setEditValue(rules);
    setIsEditing(true);
  };

  const handleSave = async () => {
    try {
      await axios.put(
        "http://localhost:5000/rules",
        { content: editValue },
        { withCredentials: true }
      );
      setRules(editValue);
      setIsEditing(false);
    } catch (err) {
      alert("Gagal update rules!");
    }
  };

  return (
    <div className="rules-box" style={boxStyle}>
      <div className="rules-header">
        <div className="rules-title">📜 Peraturan & Tata Tertib Kos</div>
        {isAdmin && !isEditing && (
          <button
            className="button is-info rules-edit-btn"
            onClick={handleEdit}
          >
            Edit
          </button>
        )}
      </div>
      {isEditing ? (
        <div>
          <textarea
            className="textarea rules-textarea"
            value={editValue}
            onChange={(e) => setEditValue(e.target.value)}
          />
          <div style={{ marginTop: 8 }}>
            <button
              className="button is-success mr-2"
              style={{
                fontWeight: 600,
                fontSize: 16,
                borderRadius: 8,
                marginRight: 10,
              }}
              onClick={handleSave}
            >
              Simpan
            </button>
            <button
              className="button"
              style={{
                fontWeight: 600,
                fontSize: 16,
                borderRadius: 8,
                background: "#f5f7fa",
              }}
              onClick={() => setIsEditing(false)}
            >
              Batal
            </button>
          </div>
        </div>
      ) : (
        <div className="rules-content">
          {rules || (
            <span style={{ color: "#888" }}>
              Belum ada peraturan yang ditambahkan.
            </span>
          )}
        </div>
      )}
    </div>
  );
};

export default RulesBox;
