export { onRenderClient };

import { hydrate } from "../output/Vike.ClientRouting.Run";
import { layout } from "../output/Vike.ClientRouting.Renderer.Layout";

async function onRenderClient(pageContext) {
  if (pageContext.isHydration) {
    // discards unsubscribe
    const { route } = hydrate(pageContext.dekuHydrationData)(layout)(pageContext.Page)();
    window.__dekuRoute = route;
  } else {
    window.__dekuRoute(pageContext.Page)();
  }
}
