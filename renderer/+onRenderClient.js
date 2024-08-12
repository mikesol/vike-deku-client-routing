export { onRenderClient };

import { hydrate } from "../output/Vike.ClientRouting.Run";
import { layout } from "../output/Vike.ClientRouting.Renderer.Layout";
import { page as index } from "../output/Vike.ClientRouting.Pages.Index.Page"
import { page as about } from "../output/Vike.ClientRouting.Pages.About.Page"

let dekuRoute;

async function onRenderClient(pageContext) {
  const { routeParams: { route } } = pageContext;
  const Page = route === "index" ? index : about;

  if (pageContext.isHydration) {
    // discards unsubscribe
    const { route } = hydrate(pageContext.dekuHydrationData)(layout)(Page)();
    dekuRoute = route;
  } else {
    dekuRoute(Page)();
  }
}
