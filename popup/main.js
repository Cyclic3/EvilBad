window.addEventListener("load", handler);

async function handler(e) {
  try {
    e.preventDefault();
    let cfg = await browser.storage.local.get("cfg");
    if (!Object.keys(cfg).length) {
      document.getElementById("message").innerText = "Not yet configured, please go to the extension settings";
      return;
    }
    let base = cfg.cfg.base;
    let tok = cfg.cfg.token;
    var headers = new Headers();
    headers.set("Authorization", "Bearer " + tok);
    let res = await fetch(`https://${base}/login/session_token`, {headers:headers});
    let res_js = await res.json();
    browser.tabs.create({url:res_js.session_url});

    window.close();

    return false;
  }
  catch(e) {
    document.getElementById("message").innerText = `Failed to log in: ${e}\nMaybe check your token?`;
    throw e;
  }
}
