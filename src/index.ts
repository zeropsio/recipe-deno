import app from "./app.ts";

const port = parseInt(Deno.env.get("PORT") || "8000");

app.addEventListener("listen", ({ port }) => {
  console.log(`Server running on http://localhost:${port}`);
});

await app.listen({ port });
