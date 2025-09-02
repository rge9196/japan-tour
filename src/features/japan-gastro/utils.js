export const formatDate = (d) =>
  d.toLocaleDateString(undefined, {
    year: "numeric",
    month: "short",
    day: "numeric",
  });

export const downloadJSON = (filename, data) => {
  const blob = new Blob([JSON.stringify(data, null, 2)], {
    type: "application/json",
  });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = filename;
  document.body.appendChild(a);
  a.click();
  a.remove();
  URL.revokeObjectURL(url);
};

export const mailto = ({ name, email, phone, size, diet, notes, start, end }) => {
  const to = "tours@yourcompany.com"; // ← change this to your inbox
  const subject = encodeURIComponent(
    "Japan 11‑Day Gastronomy Tour — Booking Inquiry"
  );
  const body = encodeURIComponent(
    `Name: ${name}
Email: ${email}
Phone/WhatsApp: ${phone}
Group size: ${size}
Dietary notes: ${diet}

Message:
${notes}

Preferred dates: ${start} – ${end} (11 days)`
  );
  return `mailto:${to}?subject=${subject}&body=${body}`;
};