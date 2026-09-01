// Netlify Function: receives a booking from the site form and emails it
// (branded HTML table) via the owner's Gmail. Credentials live in Netlify
// environment variables — never in the code/repo:
//   GMAIL_USER  — the Gmail address that sends the mail
//   GMAIL_PASS  — a Gmail "App Password" (16 chars), NOT the account password
//   LEAD_TO     — (optional) where to deliver; defaults to GMAIL_USER

function esc(s) {
  return String(s == null ? '' : s)
    .replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
}
function resp(code, obj) {
  return {
    statusCode: code,
    headers: {
      'Content-Type': 'application/json',
      // CORS: the site (GitHub Pages) and this function live on different
      // origins, so the browser needs these on the preflight and the response.
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'POST, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type',
      'Access-Control-Max-Age': '86400'
    },
    body: JSON.stringify(obj)
  };
}

function rowsHtml(children) {
  if (!children.length) {
    return '<tr><td colspan="3" style="padding:11px 12px;color:#857B72;font:14px sans-serif">—</td></tr>';
  }
  return children.map(function (c) {
    return '<tr>'
      + '<td style="padding:11px 12px;border-bottom:1px solid #EBE3D6;font:700 14.5px sans-serif;color:#2C2723">' + esc(c.name || '—') + '</td>'
      + '<td style="padding:11px 12px;border-bottom:1px solid #EBE3D6;font:700 14.5px sans-serif;color:#2C2723">' + esc(c.group || '—') + '</td>'
      + '<td style="padding:11px 12px;border-bottom:1px solid #EBE3D6;font:800 14.5px sans-serif;color:#5c8a3f;white-space:nowrap">' + esc(c.age || '') + '</td>'
      + '</tr>';
  }).join('');
}

function infoRow(k, v, href) {
  var val = href ? '<a href="' + esc(href) + '" style="color:#2C2723;font-weight:700;text-decoration:none">' + esc(v) + '</a>' : '<b>' + esc(v) + '</b>';
  return '<tr>'
    + '<td style="padding:3px 0;font:700 13px sans-serif;color:#A79B8C;width:96px">' + esc(k) + '</td>'
    + '<td style="padding:3px 0;font:15px sans-serif;color:#2C2723">' + val + '</td>'
    + '</tr>';
}

function buildHtml(d) {
  var contact = '';
  if (d.phone) contact += infoRow('Телефон', d.phone, 'tel:' + d.phone.replace(/[^\d+]/g, ''));
  if (d.email) contact += infoRow('E-mail', d.email, 'mailto:' + d.email);
  var wa = d.phone ? 'https://wa.me/' + d.phone.replace(/[^\d]/g, '') : '';
  return ''
    + '<div style="background:#ECE6DA;padding:24px;font-family:-apple-system,Segoe UI,Arial,sans-serif">'
    + '<table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="max-width:600px;margin:0 auto;background:#fff;border-radius:16px;overflow:hidden">'
    + '<tr><td style="background:#F5B301;padding:22px 26px">'
    + '<div style="font:800 20px sans-serif;color:#2C2723;letter-spacing:-.02em">funscool · детский сад</div>'
    + '<div style="font:700 13px sans-serif;color:#5c4a12;margin-top:2px">🔔 Новая заявка с сайта</div>'
    + '</td></tr>'
    + '<tr><td style="padding:24px 26px 6px">'
    + '<h2 style="font:800 18px sans-serif;color:#2C2723;margin:0 0 4px">Заявка на экскурсию</h2>'
    + '<p style="font:14px sans-serif;color:#857B72;margin:0 0 20px">Поступила через форму на сайте. Свяжитесь с родителем в ближайшее время.</p>'
    + '<div style="font:800 12px sans-serif;letter-spacing:.03em;color:#A79B8C;text-transform:uppercase;margin:0 0 8px">Дети</div>'
    + '<table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="border-collapse:collapse">'
    + '<tr>'
    + '<th align="left" style="background:#F4EEE2;padding:10px 12px;font:800 12.5px sans-serif;color:#6b6157;border-radius:8px 0 0 8px">Ребёнок</th>'
    + '<th align="left" style="background:#F4EEE2;padding:10px 12px;font:800 12.5px sans-serif;color:#6b6157">Группа</th>'
    + '<th align="left" style="background:#F4EEE2;padding:10px 12px;font:800 12.5px sans-serif;color:#6b6157;border-radius:0 8px 8px 0">Возраст</th>'
    + '</tr>' + rowsHtml(d.children) + '</table>'
    + '<div style="font:800 12px sans-serif;letter-spacing:.03em;color:#A79B8C;text-transform:uppercase;margin:22px 0 8px">Родитель и контакт</div>'
    + '<table role="presentation" cellpadding="0" cellspacing="0">' + infoRow('Родитель', d.parent || '—') + contact + '</table>'
    + (wa ? '<div style="margin-top:16px"><a href="' + esc(wa) + '" style="display:inline-block;background:#25D366;color:#fff;font:800 13.5px sans-serif;padding:10px 18px;border-radius:100px;text-decoration:none">Написать в WhatsApp</a></div>' : '')
    + '</td></tr>'
    + '<tr><td style="padding:16px 26px 22px;border-top:1px solid #EBE3D6;font:12px sans-serif;color:#A79B8C">Отправлено формой на funscool.rs · чтобы ответить родителю, нажмите «Ответить» — письмо уйдёт на его e-mail.</td></tr>'
    + '</table></div>';
}

function buildText(d) {
  var lines = ['Новая заявка — Funscool', '', 'Дети:'];
  (d.children || []).forEach(function (c, i) {
    lines.push('  ' + (i + 1) + ') ' + (c.name || '—') + (c.group ? ' — ' + c.group : '') + (c.age ? ' (' + c.age + ')' : ''));
  });
  lines.push('', 'Родитель: ' + (d.parent || '—'));
  if (d.phone) lines.push('Телефон: ' + d.phone);
  if (d.email) lines.push('E-mail: ' + d.email);
  return lines.join('\n');
}

exports.handler = async function (event) {
  if (event.httpMethod === 'OPTIONS') return resp(200, {});
  if (event.httpMethod !== 'POST') return resp(405, { error: 'method not allowed' });

  var d;
  try { d = JSON.parse(event.body || '{}'); } catch (e) { return resp(400, { error: 'bad json' }); }
  if (d.hp) return resp(200, { ok: true });            // honeypot: pretend success, drop it

  d.children = Array.isArray(d.children) ? d.children.slice(0, 10).map(function (c) {
    return { name: String(c.name || '').slice(0, 120), group: String(c.group || '').slice(0, 60), age: String(c.age || '').slice(0, 30) };
  }) : [];
  d.parent = String(d.parent || '').slice(0, 120);
  d.phone = String(d.phone || '').slice(0, 60);
  d.email = String(d.email || '').slice(0, 160);
  if (!d.parent && !d.children.length) return resp(400, { error: 'empty' });

  var user = process.env.GMAIL_USER, pass = process.env.GMAIL_PASS;
  var to = process.env.LEAD_TO || user;
  if (!user || !pass) return resp(500, { error: 'not configured' });

  var nodemailer = require('nodemailer');
  var transporter = nodemailer.createTransport({ service: 'gmail', auth: { user: user, pass: pass } });
  try {
    await transporter.sendMail({
      from: '"Funscool — заявки" <' + user + '>',
      to: to,
      replyTo: d.email || undefined,
      subject: 'Новая заявка — Funscool' + (d.children.length ? ' (' + d.children.length + ')' : ''),
      text: buildText(d),
      html: buildHtml(d)
    });
    return resp(200, { ok: true });
  } catch (e) {
    return resp(502, { error: 'send failed' });
  }
};

// exposed for local preview/tests only
exports._buildHtml = buildHtml;
exports._buildText = buildText;
