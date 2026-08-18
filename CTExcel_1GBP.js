// CTExcel UK £1 top-up frontend patch for Loon
// Modifies only the client-side minimum top-up amount from £5 to £1.
// No personal data, phone numbers, account data, tokens, or request bodies are collected or stored.

let body = $response.body || "";
let changed = false;

const oldText = 'Number(r.ruleForm.otherAmount)<5&&(r.ruleForm.otherAmount=5)';
const newText = 'Number(r.ruleForm.otherAmount)<1&&(r.ruleForm.otherAmount=1)';

if (body.includes(oldText)) {
  body = body.replace(oldText, newText);
  changed = true;
} else {
  const before = body;
  body = body.replace(
    /Number\(([^)]*?\.otherAmount)\)<5&&\(\1=5\)/g,
    'Number($1)<1&&($1=1)'
  );
  changed = body !== before;
}

if (changed && typeof $notification !== 'undefined') {
  $notification.post(
    'CTExcel £1 Top-up',
    'Patch applied',
    'Minimum amount changed from £5 to £1.'
  );
}

$done({ body });
