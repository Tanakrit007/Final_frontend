import React, { useEffect, useState } from "react";
import axios from "axios";
import Swal from "sweetalert2";

const Journal = () => {
  const [journals, setJournals] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editingId, setEditingId] = useState(null);
  const [formData, setFormData] = useState({
    title: "",
    author: "",
    category: "",
    publishYear: "",
    issn: "",
    volume: "",
    issue: "",
    publicationFrequency: "",
    publisher: "",
    description: ""
  });

  useEffect(() => {
    fetchJournals();
  }, []);

  // ดึงข้อมูลทั้งหมด
  const fetchJournals = async () => {
    try {
      const res = await axios.get("https://bookshop-api-er7t.onrender.com/api/journals");
      console.log("📦 ข้อมูลจาก API:", res.data);

      if (Array.isArray(res.data)) {
        setJournals(res.data);
      } else if (res.data && Array.isArray(res.data.data)) {
        setJournals(res.data.data);
      } else {
        console.warn("⚠️ API ไม่ส่ง array:", res.data);
        setJournals([]);
      }
    } catch (err) {
      console.error("❌ โหลดข้อมูลวารสารล้มเหลว:", err);
    } finally {
      setLoading(false);
    }
  };

  // อัปเดตข้อมูลใน form
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  // บันทึกหรือแก้ไขข้อมูล
  const handleSubmit = async (e) => {
  e.preventDefault();

  // ตรวจสอบค่าก่อนส่ง
  if (
    !formData.title ||
    !formData.author ||
    !formData.category ||
    !formData.publishYear ||
    !formData.issn ||
    !formData.volume ||
    !formData.issue ||
    !formData.publicationFrequency ||
    !formData.publisher ||
    !formData.description
  ) {
    Swal.fire("⚠️ ข้อมูลไม่ครบ", "กรุณากรอกทุกช่องก่อนบันทึก", "warning");
    return;
  }

  try {
    const payload = {
      ...formData,
      publishYear: Number(formData.publishYear), // แปลงเป็นตัวเลข
    };

    if (editingId) {
      await axios.put(`https://bookshop-api-er7t.onrender.com/api/journals/${editingId}`, payload);
      Swal.fire("✅ สำเร็จ", "อัปเดตวารสารเรียบร้อยแล้ว", "success");
    } else {
      await axios.post("https://bookshop-api-er7t.onrender.com/api/journals", payload);
      Swal.fire("✅ สำเร็จ", "เพิ่มวารสารใหม่เรียบร้อยแล้ว", "success");
    }

    // รีเซ็ตฟอร์ม
    setFormData({
      title: "",
      author: "",
      category: "",
      publishYear: "",
      issn: "",
      volume: "",
      issue: "",
      publicationFrequency: "",
      publisher: "",
      description: "",
    });
    setEditingId(null);
    fetchJournals();
  } catch (err) {
    console.error("❌ API Error:", err.response?.data || err);
    Swal.fire("❌ เกิดข้อผิดพลาด", err.response?.data?.message || "ไม่สามารถบันทึกข้อมูลได้", "error");
  }
};


  // ดึงข้อมูลไปแก้ไข
  const handleEdit = (journal) => {
    setEditingId(journal.itemId);
    setFormData({
      title: journal.title,
      author: journal.author,
      category: journal.category,
      publishYear: journal.publishYear,
      issn: journal.issn,
      volume: journal.volume,
      issue: journal.issue,
      publicationFrequency: journal.publicationFrequency,
      publisher: journal.publisher,
      description: journal.description
    });
  };

  // ลบข้อมูล
  const handleDelete = async (id) => {
    const confirm = await Swal.fire({
      title: "แน่ใจหรือไม่?",
      text: "เมื่อลบแล้วจะไม่สามารถกู้คืนได้!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "ลบ",
      cancelButtonText: "ยกเลิก",
    });
    if (confirm.isConfirmed) {
      try {
        await axios.delete(`https://bookshop-api-er7t.onrender.com/api/journals/${id}`);
        Swal.fire("ลบแล้ว!", "ข้อมูลถูกลบเรียบร้อยแล้ว", "success");
        fetchJournals();
      } catch (err) {
        Swal.fire("ผิดพลาด!", "ไม่สามารถลบข้อมูลได้", "error");
      }
    }
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">
        {editingId ? "✏️ แก้ไขวารสาร" : "➕ เพิ่มวารสารใหม่"}
      </h1>

      {/* ฟอร์มเพิ่ม/แก้ไข */}
      <form onSubmit={handleSubmit} className="grid grid-cols-2 gap-4 bg-gray-50 p-4 rounded-lg mb-6">
        <input type="text" name="title" value={formData.title} onChange={handleChange} placeholder="ชื่อวารสาร" className="input input-bordered" />
        <input type="text" name="author" value={formData.author} onChange={handleChange} placeholder="ผู้เขียน" className="input input-bordered" />
        <input type="text" name="category" value={formData.category} onChange={handleChange} placeholder="หมวดหมู่" className="input input-bordered" />
        <input type="number" name="publishYear" value={formData.publishYear} onChange={handleChange} placeholder="ปีที่เผยแพร่" className="input input-bordered" />
        <input type="text" name="issn" value={formData.issn} onChange={handleChange} placeholder="ISSN" className="input input-bordered" />
        <input type="text" name="volume" value={formData.volume} onChange={handleChange} placeholder="Volume" className="input input-bordered" />
        <input type="text" name="issue" value={formData.issue} onChange={handleChange} placeholder="Issue" className="input input-bordered" />
        <input type="text" name="publicationFrequency" value={formData.publicationFrequency} onChange={handleChange} placeholder="ความถี่ในการเผยแพร่" className="input input-bordered" />
        <input type="text" name="publisher" value={formData.publisher} onChange={handleChange} placeholder="สำนักพิมพ์" className="input input-bordered col-span-2" />
        <textarea name="description" value={formData.description} onChange={handleChange} placeholder="คำอธิบาย" className="textarea textarea-bordered col-span-2" />
        <button type="submit" className="btn btn-primary col-span-2">
          💾 {editingId ? "อัปเดตข้อมูล" : "บันทึก"}
        </button>
      </form>

      {/* ตารางข้อมูลทั้งหมด */}
      <h2 className="text-xl font-semibold mb-2">📚 รายการวารสารทั้งหมด</h2>
      <div className="overflow-x-auto">
        <table className="table w-full">
          <thead>
            <tr>
              <th>ชื่อวารสาร</th>
              <th>ผู้เขียน</th>
              <th>หมวดหมู่</th>
              <th>ปี</th>
              <th>ISSN</th>
              <th>จัดการ</th>
            </tr>
          </thead>
          <tbody>
            {journals.map((journal) => (
              <tr key={journal.itemId}>
                <td>{journal.title}</td>
                <td>{journal.author}</td>
                <td>{journal.category}</td>
                <td>{journal.publishYear}</td>
                <td>{journal.issn}</td>
                <td className="flex gap-2">
                  <button onClick={() => handleEdit(journal)} className="btn btn-sm btn-outline btn-info">✏️</button>
                  <button onClick={() => handleDelete(journal.itemId)} className="btn btn-sm btn-outline btn-error">🗑️</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Journal;
