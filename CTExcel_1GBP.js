// CTExcel UK configurable top-up frontend patch for Loon
// Changes only the client-side minimum top-up amount.
// No personal data, phone numbers, account data, tokens, or request bodies are collected or stored.

function readMinimumAmount() {
  let raw = null;

  try {
    if (typeof $argument !== "undefined") raw = $argument;
  } catch (_) {}

  let value = null;

  if (raw && typeof raw === "object") {
    value = raw.min_amount;
  } else if (typeof raw === "string") {
    const text = raw.trim();

    // Support a plain value such as "1".
    if (/^\d+$/.test(text)) {
      value = text;
    } else {
      // Also support key-value argument strings such as "min_amount=1".
      text.split("&").forEach((pair) => {
        const index = pair.indexOf("=");
        if (index < 0) return;
        const key = decodeURIComponent(pair.slice(0, index).trim());
        const val = decodeURIComponent(pair.slice(index + 1).trim());
        if (key === "min_amount") value = val;
      });
    }
  }

  const parsed = Number.parseInt(String(value ?? "1"), 10);
  if (!Number.isFinite(parsed)) return 1;

  // The CTExcel page itself caps the custom top-up field at £500.
  return Math.min(500, Math.max(1, parsed));
}

const minAmount = readMinimumAmount();
let body = $response.body || "";
const before = body;

// Match the original CTExcel blur handler that forces values below £5 back to £5.
body = body.replace(
  /Number\(([^)]*?\.otherAmount)\)\s*<\s*5\s*&&\s*\(\s*\1\s*=\s*5\s*\)/g,
  (_, amountExpr) =>
    `Number(${amountExpr})<${minAmount}&&(${amountExpr}=${minAmount})`
);

const changed = body !== before;

// Notify only after the target code was matched and actually modified.
if (changed && typeof $notification !== "undefined") {
  $notification.post(
    "CTExcel Top-up",
    "Patch applied",
    `Minimum amount changed from £5 to £${minAmount}.`
  );
}

$done({ body });
