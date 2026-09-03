/**
 * Funscool — приём заявки с сайта и отправка письма-таблички с ТВОЕГО Gmail.
 *
 * Куда вставлять: script.google.com → New project → удали пример,
 * вставь весь этот файл. Потом Deploy → New deployment → тип "Web app":
 *   • Execute as:  Me (твой аккаунт — с него уходит письмо)
 *   • Who has access:  Anyone
 * Нажми Deploy, разреши доступ к Gmail, скопируй URL (заканчивается на /exec)
 * и отдай его — я подключу форму сайта.
 */

// Кому приходят заявки (можно несколько через запятую):
var LEAD_TO = 'Kseniyashipareva@gmail.com, Raziusha0809@gmail.com, Welcome@funscool.rs';

function doPost(e) {
  try {
    var d = JSON.parse((e && e.postData && e.postData.contents) || '{}');
    if (d.hp) return json_({ ok: true }); // honeypot: тихо игнорируем ботов

    var children = (d.children && d.children.length) ? d.children.slice(0, 10).map(function (c) {
      return {
        name: String(c.name || '').slice(0, 120),
        group: String(c.group || '').slice(0, 60),
        age: String(c.age || '').slice(0, 30)
      };
    }) : [];
    var data = {
      children: children,
      parent: String(d.parent || '').slice(0, 120),
      phone: String(d.phone || '').slice(0, 60),
      email: String(d.email || '').slice(0, 160)
    };
    if (!data.parent && !data.children.length) return json_({ error: 'empty' });

    var subject = 'Новая заявка — Funscool' + (children.length ? ' (' + children.length + ')' : '');
    GmailApp.sendEmail(LEAD_TO, subject, buildText_(data), {
      name: 'Funscool — заявки',
      htmlBody: buildHtml_(data),
      replyTo: data.email || undefined
    });
    return json_({ ok: true });
  } catch (err) {
    return json_({ error: String(err) });
  }
}

function doGet() { return json_({ ok: true }); }

function json_(obj) {
  return ContentService.createTextOutput(JSON.stringify(obj)).setMimeType(ContentService.MimeType.JSON);
}

/* ---------- письмо ---------- */
function esc_(s) {
  return String(s == null ? '' : s)
    .replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
}
function rowsHtml_(children) {
  if (!children.length) return '<tr><td colspan="3" style="padding:11px 12px;color:#857B72;font:14px sans-serif">—</td></tr>';
  return children.map(function (c) {
    return '<tr>'
      + '<td style="padding:11px 12px;border-bottom:1px solid #EBE3D6;font:700 14.5px sans-serif;color:#2C2723">' + esc_(c.name || '—') + '</td>'
      + '<td style="padding:11px 12px;border-bottom:1px solid #EBE3D6;font:700 14.5px sans-serif;color:#2C2723">' + esc_(c.group || '—') + '</td>'
      + '<td style="padding:11px 12px;border-bottom:1px solid #EBE3D6;font:800 14.5px sans-serif;color:#5c8a3f;white-space:nowrap">' + esc_(c.age || '') + '</td>'
      + '</tr>';
  }).join('');
}
function infoRow_(k, v, href) {
  var val = href ? '<a href="' + esc_(href) + '" style="color:#2C2723;font-weight:700;text-decoration:none">' + esc_(v) + '</a>' : '<b>' + esc_(v) + '</b>';
  return '<tr><td style="padding:3px 0;font:700 13px sans-serif;color:#A79B8C;width:96px">' + esc_(k) + '</td>'
    + '<td style="padding:3px 0;font:15px sans-serif;color:#2C2723">' + val + '</td></tr>';
}
function buildHtml_(d) {
  var contact = '';
  if (d.phone) contact += infoRow_('Телефон', d.phone, 'tel:' + d.phone.replace(/[^\d+]/g, ''));
  if (d.email) contact += infoRow_('E-mail', d.email, 'mailto:' + d.email);
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
    + '</tr>' + rowsHtml_(d.children) + '</table>'
    + '<div style="font:800 12px sans-serif;letter-spacing:.03em;color:#A79B8C;text-transform:uppercase;margin:22px 0 8px">Родитель и контакт</div>'
    + '<table role="presentation" cellpadding="0" cellspacing="0">' + infoRow_('Родитель', d.parent || '—') + contact + '</table>'
    + (wa ? '<div style="margin-top:16px"><a href="' + esc_(wa) + '" style="display:inline-block;background:#25D366;color:#fff;font:800 13.5px sans-serif;padding:10px 18px;border-radius:100px;text-decoration:none">Написать в WhatsApp</a></div>' : '')
    + '</td></tr>'
    + '<tr><td style="padding:16px 26px 22px;border-top:1px solid #EBE3D6;font:12px sans-serif;color:#A79B8C">Отправлено формой на funscool.rs · чтобы ответить родителю, нажмите «Ответить».</td></tr>'
    + '</table></div>';
}
function buildText_(d) {
  var lines = ['Новая заявка — Funscool', '', 'Дети:'];
  (d.children || []).forEach(function (c, i) {
    lines.push('  ' + (i + 1) + ') ' + (c.name || '—') + (c.group ? ' — ' + c.group : '') + (c.age ? ' (' + c.age + ')' : ''));
  });
  lines.push('', 'Родитель: ' + (d.parent || '—'));
  if (d.phone) lines.push('Телефон: ' + d.phone);
  if (d.email) lines.push('E-mail: ' + d.email);
  return lines.join('\n');
}
