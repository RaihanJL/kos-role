import React, { useEffect, useState } from "react";
import axios from "axios";

const RulesBox = ({ isAdmin }) => {
  const [rules, setRules] = useState("");
  const [isEditing, setIsEditing] = useState(false);
  const [editValue, setEditValue] = useState("");

  // Fetch rules saat komponen mount
  useEffect(() => {
    const fetchRules = async () => {
      const res = await axios.get("http://localhost:5000/rules");
      setRules(res.data?.content || "");
    };
    fetchRules();
  }, []);

  // Saat admin klik edit
  const handleEdit = () => {
    setEditValue(rules);
    setIsEditing(true);
  };

  // Update rules (PUT /rules)
  const handleSave = async () => {
    try {
      await axios.put(
        "http://localhost:5000/rules",
        { content: editValue },
        { withCredentials: true } // jika pakai cookie/session
      );
      setRules(editValue);
      setIsEditing(false);
    } catch (err) {
      alert("Gagal update rules!");
    }
  };

  return (
    <div
      className="box"
      style={{
        maxWidth: 1200,
        width: "95%",
        margin: "32px auto",
        position: "relative", // tambahkan ini!
      }}
    >
      {isAdmin && !isEditing && (
        <button
          className="button is-small is-info"
          style={{ position: "absolute", top: 16, right: 16, zIndex: 2 }}
          onClick={handleEdit}
        >
          Edit
        </button>
      )}
      {isEditing ? (
        <div>
          <textarea
            className="textarea"
            style={{ minHeight: 400 }}
            value={editValue}
            onChange={(e) => setEditValue(e.target.value)}
          />
          <div className="mt-2">
            <button className="button is-success mr-2" onClick={handleSave}>
              Simpan
            </button>
            <button className="button" onClick={() => setIsEditing(false)}>
              Batal
            </button>
          </div>
        </div>
      ) : (
        <pre
          style={{
            whiteSpace: "pre-wrap",
            background: "none",
            border: "none",
            fontFamily: "inherit",
          }}
        >
          {rules}
        </pre>
      )}
    </div>
  );
};

export default RulesBox;
