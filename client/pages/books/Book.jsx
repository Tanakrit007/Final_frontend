import React, { useEffect, useState } from "react";
import axios from "axios";
import Swal from "sweetalert2";

const Book = () => {
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [formData, setFormData] = useState({
    title: "",
    author: "",
    category: "",
    publishYear: "",
    isbn: "",
  });
  const [editingId, setEditingId] = useState(null);

  useEffect(() => {
    fetchBooks();
  }, []);

  const fetchBooks = async () => {
  try {
    const res = await axios.get("https://bookshop-api-er7t.onrender.com/api/books");
    console.log("📦 ข้อมูลที่ได้จาก API:", res.data);

    // ตรวจให้แน่ใจว่าเป็น array
    if (Array.isArray(res.data)) {
      setBooks(res.data);
    } else if (res.data && Array.isArray(res.data.data)) {
      setBooks(res.data.data);
    } else {
      console.warn("⚠️ API ไม่ส่ง array:", res.data);
      setBooks([]);
    }
  } catch (err) {
    console.error("❌ โหลดข้อมูลหนังสือล้มเหลว:", err);
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
  try {
    if (editingId) {
      await axios.put(`https://bookshop-api-er7t.onrender.com/api/books/${editingId}`, formData);
      Swal.fire("✅ สำเร็จ", "อัปเดตข้อมูลเรียบร้อยแล้ว", "success");
    } else {
      const res = await axios.post("https://bookshop-api-er7t.onrender.com/api/books", formData);
      console.log("📤 ผลลัพธ์จาก API:", res.data);
      Swal.fire("✅ สำเร็จ", "เพิ่มหนังสือใหม่เรียบร้อยแล้ว", "success");
    }
    setFormData({ title: "", author: "", category: "", publishYear: "", isbn: "" });
    setEditingId(null);
    fetchBooks();
  } catch (err) {
    console.error("❌ API error:", err.response ? err.response.data : err);
    Swal.fire("❌ เกิดข้อผิดพลาด", "ไม่สามารถบันทึกข้อมูลได้", "error");
  }
};


  const handleEdit = (book) => {
    setEditingId(book.itemId);
    setFormData({
      title: book.title,
      author: book.author,
      category: book.category,
      publishYear: book.publishYear,
      isbn: book.isbn,
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
        await axios.delete(`https://bookshop-api-er7t.onrender.com/api/books/${id}`);
        Swal.fire("ลบแล้ว!", "ข้อมูลถูกลบเรียบร้อยแล้ว", "success");
        fetchBooks();
      } catch (err) {
        Swal.fire("ผิดพลาด!", "ไม่สามารถลบข้อมูลได้", "error");
      }
    }
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">
        {editingId ? "✏️ แก้ไขหนังสือ" : "➕ เพิ่มหนังสือใหม่"}
      </h1>

      <form onSubmit={handleSubmit} className="grid grid-cols-2 gap-4 bg-gray-50 p-4 rounded-lg mb-6">
        <input type="text" name="title" value={formData.title} onChange={handleChange} placeholder="ชื่อเรื่อง" className="input input-bordered" />
        <input type="text" name="author" value={formData.author} onChange={handleChange} placeholder="ผู้แต่ง" className="input input-bordered" />
        <input type="text" name="category" value={formData.category} onChange={handleChange} placeholder="หมวดหมู่" className="input input-bordered" />
        <input type="number" name="publishYear" value={formData.publishYear} onChange={handleChange} placeholder="ปีพิมพ์" className="input input-bordered" />
        <input type="text" name="isbn" value={formData.isbn} onChange={handleChange} placeholder="ISBN" className="input input-bordered" />
        <button type="submit" className="btn btn-primary col-span-2">
          💾 {editingId ? "อัปเดตข้อมูล" : "บันทึก"}
        </button>
      </form>

      <h2 className="text-xl font-semibold mb-2">📚 รายการหนังสือทั้งหมด</h2>
      <div className="overflow-x-auto">
        <table className="table w-full">
          <thead>
            <tr>
              <th>ชื่อเรื่อง</th>
              <th>ผู้แต่ง</th>
              <th>หมวดหมู่</th>
              <th>สถานะ</th>
              <th>จัดการ</th>
            </tr>
          </thead>
          <tbody>
            {books.map((book) => (
              <tr key={book.itemId}>
                <td>{book.title}</td>
                <td>{book.author}</td>
                <td>{book.category}</td>
                <td>{book.status}</td>
                <td className="flex gap-2">
                  <button onClick={() => handleEdit(book)} className="btn btn-sm btn-outline btn-info">
                    ✏️
                  </button>
                  <button onClick={() => handleDelete(book.itemId)} className="btn btn-sm btn-outline btn-error">
                    🗑️
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Book;
