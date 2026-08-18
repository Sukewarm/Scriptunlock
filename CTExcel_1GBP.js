// CTExcel UK £1 top-up frontend patch for Loon
// Only modifies the minimum top-up amount in the target JavaScript response.
// No personal data, account data, phone numbers, tokens, or request bodies are collected or stored.

let body = $response.body || "";

const exactOld = 'Number(r.ruleForm.otherAmount)<5&&(r.ruleForm.otherAmount=5)';
const exactNew = 'Number(r.ruleForm.otherAmount)<1&&(r.ruleForm.otherAmount=1)';

if (body.includes(exactOld)) {
  body = body.replace(exactOld, exactNew);
} else {
  // Fallback for minor minifier/variable-name changes while keeping the scope narrow.
  body = body.replace(
    /Number\(([^)]+\.otherAmount)\)<5&&\(\1=5\)/g,
    'Number($1)<1&&($1=1)'
  );
}

$done({ body });
