document.getElementById("token").addEventListener("input", handler);
document.getElementById("base").addEventListener("input", handler);

async function handler(e) {
  e.preventDefault();
  let tok = document.getElementById("token").value;
  let base = document.getElementById("base").value;
  let obj = {"cfg": {"token": tok, "base": base}};
  await browser.storage.local.set(obj);
  return false;
}

async function load() {
    let cfg = await browser.storage.local.get("cfg");
    if (!Object.keys(cfg).length) {
      return;
    }
    document.getElementById("base").value = cfg.cfg.base;
    document.getElementById("token").value = cfg.cfg.token;
}
load();
