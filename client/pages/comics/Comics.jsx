import React, { useEffect, useState } from "react";
import axios from "axios";
import Swal from "sweetalert2";

const Comics = () => {
  const [comics, setComics] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editingId, setEditingId] = useState(null);

  const [formData, setFormData] = useState({
    title: "",
    author: "",
    category: "",
    publishYear: "",
    isbn: "",
    series: "",
    volumeNumber: "",
    illustrator: "",
    colorType: "",
    targetAge: "",
    description: "",
  });

  useEffect(() => {
    fetchComics();
  }, []);

  const fetchComics = async () => {
    try {
      const res = await axios.get("https://bookshop-api-er7t.onrender.com/api/comics");
      console.log("📦 ข้อมูลจาก API:", res.data);

      if (Array.isArray(res.data)) {
        setComics(res.data);
      } else if (res.data && Array.isArray(res.data.data)) {
        setComics(res.data.data);
      } else {
        console.warn("⚠️ API ไม่ส่ง array:", res.data);
        setComics([]);
      }
    } catch (err) {
      console.error("❌ โหลดข้อมูลล้มเหลว:", err);
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // ตรวจสอบค่าว่าง
    if (
      !formData.title ||
      !formData.author ||
      !formData.category ||
      !formData.publishYear ||
      !formData.isbn ||
      !formData.series ||
      !formData.volumeNumber ||
      !formData.illustrator ||
      !formData.colorType ||
      !formData.targetAge ||
      !formData.description
    ) {
      Swal.fire("⚠️ ข้อมูลไม่ครบ", "กรุณากรอกข้อมูลให้ครบทุกช่อง", "warning");
      return;
    }

    const payload = {
      ...formData,
      publishYear: Number(formData.publishYear),
      volumeNumber: Number(formData.volumeNumber),
    };

    try {
      if (editingId) {
        await axios.put(`https://bookshop-api-er7t.onrender.com/api/comics/${editingId}`, payload);
        Swal.fire("✅ สำเร็จ", "อัปเดตข้อมูลเรียบร้อยแล้ว", "success");
      } else {
        await axios.post("https://bookshop-api-er7t.onrender.com/api/comics", payload);
        Swal.fire("✅ สำเร็จ", "เพิ่มการ์ตูนใหม่เรียบร้อยแล้ว", "success");
      }

      setFormData({
        title: "",
        author: "",
        category: "",
        publishYear: "",
        isbn: "",
        series: "",
        volumeNumber: "",
        illustrator: "",
        colorType: "",
        targetAge: "",
        description: "",
      });
      setEditingId(null);
      fetchComics();
    } catch (err) {
      console.error("❌ API Error:", err.response?.data || err);
      Swal.fire("❌ เกิดข้อผิดพลาด", err.response?.data?.message || "ไม่สามารถบันทึกข้อมูลได้", "error");
    }
  };

  const handleEdit = (comic) => {
    setEditingId(comic.itemId);
    setFormData({
      title: comic.title,
      author: comic.author,
      category: comic.category,
      publishYear: comic.publishYear,
      isbn: comic.isbn,
      series: comic.series,
      volumeNumber: comic.volumeNumber,
      illustrator: comic.illustrator,
      colorType: comic.colorType,
      targetAge: comic.targetAge,
      description: comic.description,
    });
  };

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
        await axios.delete(`https://bookshop-api-er7t.onrender.com/api/comics/${id}`);
        Swal.fire("ลบแล้ว!", "ข้อมูลถูกลบเรียบร้อยแล้ว", "success");
        fetchComics();
      } catch (err) {
        Swal.fire("ผิดพลาด!", "ไม่สามารถลบข้อมูลได้", "error");
      }
    }
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">
        {editingId ? "✏️ แก้ไขการ์ตูน" : "➕ เพิ่มการ์ตูนใหม่"}
      </h1>

      <form onSubmit={handleSubmit} className="grid grid-cols-2 gap-4 bg-gray-50 p-4 rounded-lg mb-6">
        <input type="text" name="title" value={formData.title} onChange={handleChange} placeholder="ชื่อเรื่อง" className="input input-bordered" />
        <input type="text" name="author" value={formData.author} onChange={handleChange} placeholder="ผู้เขียน" className="input input-bordered" />
        <input type="text" name="category" value={formData.category} onChange={handleChange} placeholder="หมวดหมู่" className="input input-bordered" />
        <input type="number" name="publishYear" value={formData.publishYear} onChange={handleChange} placeholder="ปีที่เผยแพร่" className="input input-bordered" />
        <input type="text" name="isbn" value={formData.isbn} onChange={handleChange} placeholder="ISBN" className="input input-bordered" />
        <input type="text" name="series" value={formData.series} onChange={handleChange} placeholder="Series" className="input input-bordered" />
        <input type="number" name="volumeNumber" value={formData.volumeNumber} onChange={handleChange} placeholder="Volume Number" className="input input-bordered" />
        <input type="text" name="illustrator" value={formData.illustrator} onChange={handleChange} placeholder="นักวาดภาพ" className="input input-bordered" />
        <input type="text" name="colorType" value={formData.colorType} onChange={handleChange} placeholder="ประเภทสี (FULL_COLOR/BLACK_WHITE)" className="input input-bordered" />
        <input type="text" name="targetAge" value={formData.targetAge} onChange={handleChange} placeholder="กลุ่มอายุเป้าหมาย" className="input input-bordered" />
        <textarea name="description" value={formData.description} onChange={handleChange} placeholder="คำอธิบาย" className="textarea textarea-bordered col-span-2" />
        <button type="submit" className="btn btn-primary col-span-2">
          💾 {editingId ? "อัปเดตข้อมูล" : "บันทึก"}
        </button>
      </form>

      <h2 className="text-xl font-semibold mb-2">📚 รายการการ์ตูนทั้งหมด</h2>
      <div className="overflow-x-auto">
        <table className="table w-full">
          <thead>
            <tr>
              <th>ชื่อเรื่อง</th>
              <th>ผู้เขียน</th>
              <th>หมวดหมู่</th>
              <th>ปี</th>
              <th>ISBN</th>
              <th>จัดการ</th>
            </tr>
          </thead>
          <tbody>
            {comics.map((comic) => (
              <tr key={comic.itemId}>
                <td>{comic.title}</td>
                <td>{comic.author}</td>
                <td>{comic.category}</td>
                <td>{comic.publishYear}</td>
                <td>{comic.isbn}</td>
                <td className="flex gap-2">
                  <button onClick={() => handleEdit(comic)} className="btn btn-sm btn-outline btn-info">✏️</button>
                  <button onClick={() => handleDelete(comic.itemId)} className="btn btn-sm btn-outline btn-error">🗑️</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Comics;
