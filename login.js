const API_BASE = "https://analise-esportiva-ooz7.onrender.com";

const form = document.getElementById("form-login");

if (form) {
  form.addEventListener("submit", async (e) => {
    e.preventDefault();

    const email = document.getElementById("email").value.trim();
    const senha = document.getElementById("senha").value;

    try {
      const response = await fetch(`${API_BASE}/auth/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, senha })
      });

      const text = await response.text();
      let data = {};

      try {
        data = text ? JSON.parse(text) : {};
      } catch {
        data = {};
      }

      if (!response.ok) {
        throw new Error(data.erro || "Erro ao fazer login");
      }

      localStorage.setItem("token", data.token);
      localStorage.setItem("usuario", JSON.stringify(data.usuario));

      alert("Login realizado com sucesso!");
      window.location.href = "index.html";
    } catch (error) {
      console.error(error);
      alert(error.message || "Erro ao fazer login");
    }
  });
}