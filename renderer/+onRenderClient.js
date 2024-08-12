export { onRenderClient };

import { hydrate } from "../output/Vike.ClientRouting.Run";
import { layout } from "../output/Vike.ClientRouting.Renderer.Layout";
import { route } from "../output/Vike.Minimal.Pages.Route"

let dekuRoute;

async function onRenderClient(pageContext) {
  const Page = route(pageContext);
  if (pageContext.isHydration) {
    // discards unsubscribe
    const { route } = hydrate(pageContext.dekuHydrationData)(layout)(Page)();
    dekuRoute = route;
  } else {
    dekuRoute(Page)();
  }
}
