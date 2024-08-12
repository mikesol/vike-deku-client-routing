export { onRenderHtml };

import { escapeInject, dangerouslySkipEscape } from "vike/server";
import jsdomGlobal from "jsdom-global";
import { ssr } from "../output/Vike.ClientRouting.Run";
import { layout } from "../output/Vike.ClientRouting.Renderer.Layout";
import { page as index } from "../output/Vike.ClientRouting.Pages.Index.Page"
import { page as about } from "../output/Vike.ClientRouting.Pages.About.Page"

async function onRenderHtml(pageContext) {
  jsdomGlobal();
  const { routeParams: { route } } = pageContext;
  const Page = route === "index" ? index : about;

  document.getElementsByTagName("html")[0].innerHTML =
    "<head></head><body></body>";

  const cache = ssr(layout)(Page)();
  const viewHtml = dangerouslySkipEscape(cache.html);

  pageContext.dekuHydrationData = cache;

  return escapeInject`<!DOCTYPE html>
    <html>
      <head>
      <style>
        body {
          margin: 0;
          font-family: sans-serif;
        }
        * {
          box-sizing: border-box;
        }
        a {
          text-decoration: none;
        }

        .navitem {
          padding: 3px;
        }
      </style>
      </head>
      <body>
        ${viewHtml}
      </body>
    </html>`;
}
