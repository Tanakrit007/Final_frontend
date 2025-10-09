import React, { useEffect, useState } from "react";
import axios from "axios";

const Home = () => {
  const [items, setItems] = useState([]); // ✅ เริ่มต้นด้วย array เปล่า
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchItems = async () => {
      try {
        const res = await axios.get("https://bookshop-api-er7t.onrender.com/api/items");
        // ✅ ตรวจสอบว่าข้อมูลเป็น array จริงไหม
        if (Array.isArray(res.data)) {
          setItems(res.data);
        } else if (res.data && Array.isArray(res.data.data)) {
          // เผื่อ API ส่งมาในรูป { data: [...] }
          setItems(res.data.data);
        } else {
          console.error("รูปแบบข้อมูลไม่ถูกต้อง:", res.data);
          setItems([]); // fallback
        }
      } catch (err) {
        console.error("โหลดข้อมูลไม่สำเร็จ:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchItems();
  }, []);

  if (loading) {
    return <p className="text-center mt-10">กำลังโหลดข้อมูล...</p>;
  }

  if (!items.length) {
    return <p className="text-center mt-10">ไม่พบข้อมูลสินค้า</p>;
  }

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">📚 สินค้าทั้งหมด</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {items.map((item) => (
          <div key={item.itemId} className="card bg-base-100 shadow p-4">
            <h2 className="font-semibold text-lg">{item.title}</h2>
            <p className="text-sm text-gray-500">{item.author}</p>
            <p className="badge badge-outline mt-2">{item.itemType}</p>
            <p className="text-xs mt-1 text-success">{item.status}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Home;
