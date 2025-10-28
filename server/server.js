// server.js
import express from "express";
import cors from "cors";

const app = express();
app.use(cors());

app.get("/api/users", async (req, res) => {
  try {
    const count = Math.min(parseInt(req.query.count || "10", 10), 5000);
    const gender = req.query.gender; // opcional: male|female
    const nat = req.query.nat;       // opcional: "us,gb,es"

    const params = new URLSearchParams({
      results: String(count),
      inc: "name,gender,location,email,dob,picture",
      noinfo: "true",
    });
    if (gender) params.set("gender", gender);
    if (nat) params.set("nat", nat);

    const url = `https://randomuser.me/api/?${params.toString()}`;
    const r = await fetch(url);
    if (!r.ok) throw new Error(`RandomUser error ${r.status}`);
    const data = await r.json();

    const users = (data.results || []).map(u => ({
      fullName: `${u.name.title} ${u.name.first} ${u.name.last}`.trim(),
      gender: u.gender,
      location: `${u.location.city}, ${u.location.state}, ${u.location.country}`,
      email: u.email,
      dobISO: u.dob?.date,
      photo: u.picture?.large
    }));

    res.json({ users, meta: { count: users.length } });
  } catch (e) {
    res.status(502).json({ error: "Upstream failure", detail: String(e) });
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`API on http://localhost:${PORT}`));