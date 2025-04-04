import axios from "axios";

export default async function handler(req, res) {
  if (req.method === "POST") {
    try {
      const { username, email, password } = req.body;
      console.log(req.body);
      const response = await axios.post("http://localhost:5000/api/auth/register", {
        username,
        email,
        password,
      });
      res.status(201).json(response.data);
    } catch (error) {
        console.log(error);
      res.status(500).json({ message: "Failed to register user" });
    }
  } else {
    res.status(405).json({ message: "Method Not Allowed" });
  }
}
