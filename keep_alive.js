// สคริปต์สำหรับป้องกัน Supabase (Free Tier) ถูก Pause
// จะถูกรันอัตโนมัติผ่าน GitHub Actions

const SUPABASE_URL = process.env.SUPABASE_URL;
const SUPABASE_ANON_KEY = process.env.SUPABASE_ANON_KEY;

if (!SUPABASE_URL || !SUPABASE_ANON_KEY) {
  console.error("❌ ไม่พบตั้งค่า SUPABASE_URL หรือ SUPABASE_ANON_KEY ใน Secrets");
  process.exit(1);
}

async function keepSupabaseAlive() {
  console.log("⏳ กำลังส่ง Request ไปที่ Supabase...");

  try {
    // ยิงคำสั่ง SELECT ง่ายๆ ไปที่ตาราง config แค่ 1 แถว เพื่อสร้าง Activity
    const response = await fetch(`${SUPABASE_URL}/rest/v1/config?select=id&limit=1`, {
      method: 'GET',
      headers: {
        'apikey': SUPABASE_ANON_KEY,
        'Authorization': `Bearer ${SUPABASE_ANON_KEY}`,
        'Content-Type': 'application/json'
      }
    });

    if (response.ok) {
      console.log("✅ Ping สำเร็จ! Supabase ตื่นอยู่ (Active)");
    } else {
      console.error("❌ เกิดข้อผิดพลาดจาก Supabase:", response.status, await response.text());
    }
  } catch (error) {
    console.error("❌ ไม่สามารถเชื่อมต่อ Supabase ได้:", error.message);
  }
}

keepSupabaseAlive();